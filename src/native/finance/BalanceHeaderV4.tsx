import * as React from 'react';
import { Animated, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';
import { SparklineV4 } from '../charts/SparklineV4';
import type { ChartToneV4 } from '../charts/SparklineV4';
import { formatMoney } from '../commerce/money';
import { TABULAR, moneyInk, pctText, placeholderGround, signParts, spokenLine } from './internal/ledger-v4';
import type { BalanceHeaderProps } from './BalanceHeader';

export interface BalanceHeaderV4Props extends BalanceHeaderProps {
  /** BCP-47 locale for the percentage. Defaults to the runtime's. */
  locale?: string;
  /** Announced while the figure is loading. Default `'Loading balance'`. */
  loadingLabel?: string;
}

/** The words the change is announced with — the arrow's shape said in speech. */
const CHANGE_WORDS = { credit: 'up', debit: 'down' };

/** The placeholder's width, in `xl` steps, where the base wrote `width: 160`. */
const PLACEHOLDER_STEPS = 5;

/**
 * **V4 balance header** — same props as {@link BalanceHeader} plus `locale`
 * and `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The sparkline is toned from the series it draws.** Its colour came from
 *    `changeCents`, which is optional — so a header given only a `trend` fell
 *    to the `up` branch and drew a *collapsing* balance in `success`. The line
 *    now reads its own first and last datum, and a flat series takes no status
 *    hue at all, because flat is not good news either.
 * 2. **A zero change is not a green gain.** `>= 0` painted "+$0.00" in
 *    `success` with an up arrow. `signParts()` gives zero its own branch.
 * 3. **The percentage goes through `Intl`.** It was built by string
 *    concatenation — unrounded and unclamped, so `12.3456789` printed in full,
 *    and its decimal mark was hard-locked to `.` while the amount beside it
 *    was localised.
 * 4. **The placeholder is the shared skeleton**, an opaque state mix, not
 *    `colors.border` — the hairline colour, which is a different thing on
 *    every ground and reads as a rule rather than as content arriving. The
 *    loading region is announced once, with wording the caller owns.
 * 5. **The block is one summary** carrying the label, the balance and the
 *    change, and the captions take `mutedText` rather than the promise-free
 *    `colors.muted`.
 */
export function BalanceHeaderV4({
  label = 'Total balance',
  balanceCents,
  currency = 'USD',
  changeCents,
  changePct,
  trend,
  formatMoney: format = formatMoney,
  loading = false,
  locale,
  loadingLabel = 'Loading balance',
  appearance = 'classic',
  style,
}: BalanceHeaderV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const enter = useEnter();

  const balance = format(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency);

  const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
  const change = signParts(changeCents ?? 0, undefined, CHANGE_WORDS);
  const changeText = hasChange
    ? `${format(Math.abs(Math.trunc(changeCents as number)), currency)}${
        typeof changePct === 'number' ? ` (${pctText(changePct, locale)}%)` : ''
      }`
    : null;
  // Zero has no arrow: an arrow is a direction, and there is no direction.
  const arrow = change.direction === 'credit' ? '▲' : change.direction === 'debit' ? '▼' : '';

  // The line's tone comes from the series, not from an optional sibling prop.
  const first = trend?.[0];
  const last = trend != null && trend.length > 0 ? trend[trend.length - 1] : undefined;
  const trendTone: ChartToneV4 | undefined =
    first == null || last == null || last === first
      ? undefined
      : last > first
        ? 'success'
        : 'danger';

  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  return (
    <Animated.View
      accessible
      accessibilityRole="summary"
      accessibilityLabel={
        loading
          ? loadingLabel
          : spokenLine([label, balance, hasChange ? change.word : null, changeText])
      }
      style={[surface, { gap: tokens.spacing.xs }, enter, style]}
    >
      <TextV4 size="sm" tone="mutedText">
        {label}
      </TextV4>
      {loading ? (
        <View
          style={{
            height: tokens.typography.scale['3xl'],
            width: tokens.spacing.xl * PLACEHOLDER_STEPS,
            borderRadius: tokens.radius.sm,
            backgroundColor: placeholderGround(theme),
          }}
        />
      ) : (
        <TextV4 size="3xl" weight="bold" tone="onSurface" numeric="tabular">
          {balance}
        </TextV4>
      )}
      {hasChange && !loading ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {arrow !== '' ? (
            <TextV4
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              size="xs"
              style={{ color: moneyInk(theme, change.tone) }}
            >
              {arrow}
            </TextV4>
          ) : null}
          <TextV4
            size="sm"
            weight="semibold"
            style={[{ color: moneyInk(theme, change.tone) }, TABULAR]}
          >
            {changeText}
          </TextV4>
        </View>
      ) : null}
      {trend != null && trend.length > 0 && !loading ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ marginTop: tokens.spacing.xs }}
        >
          <SparklineV4 data={trend} tone={trendTone} />
        </View>
      ) : null}
    </Animated.View>
  );
}
