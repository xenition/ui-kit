import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { formatMoney as formatCents } from '../../commerce/money';
import { meterParts } from '../../kids/family-v4';
import {
  cardStyle,
  percentValue,
  skeletonBlockStyle,
  spokenLine,
  toneInk,
} from './internal/tone-v4';
import type { AllowanceTrackerProps } from './AllowanceTracker';

export interface AllowanceTrackerV4Props extends AllowanceTrackerProps {
  /** Format an amount in whole currency units. Default: `Intl.NumberFormat`. */
  formatMoney?: (amount: number, currency?: string) => string;
  /** BCP-47 locale for the default formatter. Default: the runtime's own. */
  locale?: string;
  /** Copy for the five labelled parts. */
  labels?: {
    balance?: string;
    earned?: string;
    spent?: string;
    add?: string;
    spend?: string;
  };
}

/** An ISO 4217 code, as opposed to the `'$'` the base defaults `currency` to. */
const CURRENCY_CODE = /^[A-Za-z]{3}$/;

/**
 * **V4 allowance tracker** — same props as {@link AllowanceTracker} plus
 * `formatMoney`, `locale` and `labels`.
 *
 * ## Five changes
 *
 * 1. **Money is formatted, not concatenated.** The base built every amount as
 *    `` `${currency}${amount.toLocaleString()}` ``, so `balance={-5}` printed
 *    **`$-5`** — the sign wedged between the symbol and the digits — and
 *    `5.5` printed `$5.5` rather than `$5.50`. `formatMoney` from
 *    `commerce/money` handles a real ISO code; a bare symbol falls back to a
 *    localised number with the symbol in front and the sign in front of *that*.
 *    A `formatMoney` override and a `locale` are both accepted.
 * 2. **The savings meter draws what it announces.** The base computed a clamped
 *    percentage and then used it **only as a truthiness gate**, handing the raw
 *    `balance` and `target` to the bar — so a balance of −20 against a $100
 *    goal announced `valuenow=-20` against `valuemin=0`. `meterParts` gives the
 *    bar a clamped ratio and the readout the untouched number, which are two
 *    different jobs the base was doing with one variable.
 * 3. **A goal of nought still shows the balance.** `target={0}` used to remove
 *    the whole goal block; now the goal line renders with the reading and no
 *    meter, because the money in the wallet is real either way.
 * 4. **Spending is not an error.** The base inked spent-this-period in
 *    `colors.danger`. A child buying something with their own allowance has not
 *    caused a fault; the direction is carried by the `−` in front of the
 *    amount and by the word above it. Earned keeps `successText`, which is a
 *    genuine positive event.
 * 5. **The card is a card.** It painted `surface` — the page colour — so it
 *    never read as raised, and its skeleton painted `colors.border`, the
 *    hairline colour used as a fill. Both are tokens now (`card`/`onCard`,
 *    `skeletonFill`), and the actions clear the 44 tap floor.
 */
export function AllowanceTrackerV4({
  balance,
  currency = '$',
  earned,
  spent,
  goal,
  loading = false,
  emptyLabel = 'No allowance set up yet',
  formatMoney,
  locale,
  labels,
  onAdd,
  onWithdraw,
  style,
}: AllowanceTrackerV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const copy = {
    balance: labels?.balance ?? 'Balance',
    earned: labels?.earned ?? 'Earned',
    spent: labels?.spent ?? 'Spent',
    add: labels?.add ?? 'Add',
    spend: labels?.spend ?? 'Spend',
  };

  const money =
    formatMoney ??
    ((amount: number, code?: string): string => {
      if (!Number.isFinite(amount)) return '—';
      const iso = code != null && CURRENCY_CODE.test(code) ? code.toUpperCase() : undefined;
      // `commerce/money` carries minor units, which is the shape every other
      // priced component in the kit uses; this module carries whole units.
      if (iso) return formatCents(Math.round(amount * 100), iso, locale);
      const digits = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(Math.abs(amount));
      // The sign goes in front of the symbol, which is the whole of defect 1.
      return `${amount < 0 ? '−' : ''}${code ?? ''}${digits}`;
    });

  const container = [cardStyle(theme), style];

  if (loading) {
    return (
      <View accessible accessibilityLabel="Loading allowance" style={container}>
        <View
          style={skeletonBlockStyle(theme, { height: tokens.typography.scale.xs, width: '35%' })}
        />
        <View
          style={skeletonBlockStyle(theme, { height: tokens.typography.scale['2xl'], width: '50%' })}
        />
      </View>
    );
  }

  if (!Number.isFinite(balance)) {
    return (
      <View accessible accessibilityLabel={emptyLabel} style={container}>
        <TextV4 size="base" weight="bold" tone="onCard">
          {copy.balance}
        </TextV4>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: tokens.spacing.lg,
            gap: tokens.spacing.xs,
          }}
        >
          <TextV4
            size="2xl"
            allowFontScaling={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            🐷
          </TextV4>
          <TextV4 size="sm" tone="mutedText" align="center">
            {emptyLabel}
          </TextV4>
        </View>
      </View>
    );
  }

  const reading = money(balance, currency);
  const parts = goal ? meterParts(balance, goal.target) : undefined;

  return (
    <View style={container}>
      <View
        accessible
        accessibilityLabel={spokenLine([copy.balance, reading])}
        style={{ gap: tokens.spacing.xs }}
      >
        <TextV4 size="xs" tone="mutedText">
          {copy.balance}
        </TextV4>
        <TextV4 size="3xl" weight="bold" tone="onCard" numeric="tabular">
          {reading}
        </TextV4>
      </View>

      {typeof earned === 'number' || typeof spent === 'number' ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xl }}>
          {typeof earned === 'number' ? (
            <View
              accessible
              accessibilityLabel={spokenLine([copy.earned, money(earned, currency)])}
              style={{ gap: tokens.spacing.xs }}
            >
              <TextV4 size="xs" tone="mutedText">
                {copy.earned}
              </TextV4>
              <TextV4
                size="base"
                weight="bold"
                numeric="tabular"
                style={{ color: toneInk(theme, 'success') }}
              >
                {`+${money(earned, currency)}`}
              </TextV4>
            </View>
          ) : null}
          {typeof spent === 'number' ? (
            <View
              accessible
              accessibilityLabel={spokenLine([copy.spent, money(spent, currency)])}
              style={{ gap: tokens.spacing.xs }}
            >
              <TextV4 size="xs" tone="mutedText">
                {copy.spent}
              </TextV4>
              {/* Neutral ink, not `danger`: a child spending their own allowance
                  is not a fault, and the `−` already says which way it went. */}
              <TextV4 size="base" weight="bold" tone="onCard" numeric="tabular">
                {`−${money(spent, currency)}`}
              </TextV4>
            </View>
          ) : null}
        </View>
      ) : null}

      {goal ? (
        <View style={{ gap: tokens.spacing.xs }}>
          <View
            accessible
            accessibilityLabel={spokenLine([
              goal.label,
              `${reading} / ${money(goal.target, currency)}`,
              parts?.hasLimit === true ? `${parts.percent}%` : null,
            ])}
            style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }}
          >
            <TextV4
              size="sm"
              weight="semibold"
              tone="onCard"
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >
              {`🎯 ${goal.label}`}
            </TextV4>
            <TextV4 size="xs" tone="mutedText" numeric="tabular" numberOfLines={1}>
              {`${reading} / ${money(goal.target, currency)}`}
            </TextV4>
          </View>
          {parts?.hasLimit === true ? (
            <View
              accessible
              accessibilityRole="progressbar"
              accessibilityLabel={spokenLine([goal.label, `${parts.percent}%`])}
              accessibilityValue={percentValue(parts.percent)}
            >
              <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                <ProgressV4 value={parts.percent ?? 0} max={100} tone="success" />
              </View>
            </View>
          ) : null}
        </View>
      ) : null}

      {onAdd || onWithdraw ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {onAdd ? (
            <ButtonV4 size="md" variant="soft" tone="success" onPress={onAdd} style={{ flex: 1 }}>
              {copy.add}
            </ButtonV4>
          ) : null}
          {onWithdraw ? (
            <ButtonV4 size="md" variant="outline" onPress={onWithdraw} style={{ flex: 1 }}>
              {copy.spend}
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
