import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatMoney } from '../../commerce/money';
import { BADGE_V4, spokenLine, toneInk } from './internal/market-v4';
import { formatPrice, formatToken } from './internal/format';
import type { StakingCardProps, StakingStatus } from './StakingCard';

export interface StakingCardV4Props extends StakingCardProps {
  /** Caption over the yield figure. Default `'APY'`. */
  apyLabel?: string;
}

const STATUS_META: Record<
  StakingStatus,
  { label: string; glyph: string; tone: 'success' | 'warn' | 'neutral' }
> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  unbonding: { label: 'Unbonding', glyph: '◷', tone: 'warn' },
  inactive: { label: 'Inactive', glyph: '•', tone: 'neutral' },
};

/**
 * A yield printed as a level: two fixed decimals, a `%`, and no sign.
 *
 * `formatPct` prefixes `+` for any positive number, which is right for a
 * *change* and wrong for a *rate* — see the doc block below. `formatPrice`
 * with an empty symbol is the module's own fixed-precision formatter with the
 * sign logic left out, so there is no second number formatter here.
 */
function formatApy(apy: number): string {
  return `${formatPrice(apy, { symbol: '', decimals: 2 })}%`;
}

/**
 * **V4 staking position** — same props as {@link StakingCard} plus `apyLabel`.
 *
 * ## Four changes
 *
 * 1. **APY is printed without a change sign.** `formatPct` prefixes `+` for
 *    every positive value, so a 4.2% yield rendered as **`+4.20%`** — which
 *    reads as a movement *in* the rate, not as the rate. An APY is a level.
 * 2. **APY is not `success`.** The base coloured it green unconditionally. A
 *    yield is not a gain; it is a number that happens to be positive, and
 *    spending the success slot on it means the one colour that should mean
 *    "this went well" is on screen whether or not anything did.
 * 3. **The two twins agree about the actions.** Native gave Claim
 *    `tone="success"` and web did not, so the same button was green on the
 *    phone and brand-coloured on the laptop; both now take the default
 *    primary. `disabled` is `!hasRewards || loading` for Claim and `loading`
 *    for Unstake, as the web twin already had it.
 * 4. **The figures are announced as figures.** "Staked, 12.5 ETH, $30,000" is
 *    one stop instead of three, and the fiat and token amounts are tabular so
 *    the two stacked columns line up.
 */
export function StakingCardV4({
  symbol,
  name,
  stakedAmount,
  decimals = 4,
  stakedValueCents,
  currency = 'USD',
  apy,
  rewardsAmount,
  status = 'active',
  apyLabel = 'APY',
  onClaim,
  onUnstake,
  loading = false,
  style,
}: StakingCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!symbol) return null;

  const meta = STATUS_META[status];
  const hasRewards = rewardsAmount != null && rewardsAmount > 0;
  const stakedText = formatToken(stakedAmount, { decimals, symbol });

  return (
    <CardV4 variant="elevated" style={style}>
      <View style={{ gap: tokens.spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
              {symbol}
            </TextV4>
            {name != null ? (
              <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
                {name}
              </TextV4>
            ) : null}
          </View>
          <BadgeV4 tone={meta.tone} {...BADGE_V4}>
            {`${meta.glyph} ${meta.label}`}
          </BadgeV4>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
          }}
        >
          <View
            accessible
            accessibilityLabel={spokenLine([
              'Staked',
              stakedText,
              stakedValueCents != null ? formatMoney(stakedValueCents, currency) : null,
            ])}
            style={{ gap: tokens.spacing.xs, minWidth: 0 }}
          >
            <TextV4 size="xs" tone="mutedText">
              Staked
            </TextV4>
            <TextV4 size="xl" weight="bold" tone="onSurface" numeric="tabular">
              {stakedText}
            </TextV4>
            {stakedValueCents != null ? (
              <MoneyAmount cents={stakedValueCents} currency={currency} tone="muted" size="sm" />
            ) : null}
          </View>

          {apy != null ? (
            <View
              accessible
              accessibilityLabel={spokenLine([apyLabel, formatApy(apy)])}
              style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}
            >
              <TextV4 size="xs" tone="mutedText">
                {apyLabel}
              </TextV4>
              {/* A level, in the surface's own ink. Green here would mean the
                  rate itself was good news, which no rate is on its own. */}
              <TextV4 size="xl" weight="bold" tone="onSurface" numeric="tabular">
                {formatApy(apy)}
              </TextV4>
            </View>
          ) : null}
        </View>

        {rewardsAmount != null ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: tokens.spacing.sm,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              paddingTop: tokens.spacing.sm,
            }}
          >
            <TextV4 size="sm" tone="mutedText">
              Rewards
            </TextV4>
            <TextV4
              size="base"
              weight="bold"
              numeric="tabular"
              style={{
                color: hasRewards ? toneInk(theme, 'success') : colors.mutedText,
              }}
            >
              {formatToken(rewardsAmount, { decimals, symbol })}
            </TextV4>
          </View>
        ) : null}

        {onClaim != null || onUnstake != null ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
            {onClaim != null ? (
              <ButtonV4
                variant="primary"
                onPress={onClaim}
                disabled={!hasRewards || loading}
                loading={loading}
                style={{ flex: 1 }}
              >
                Claim
              </ButtonV4>
            ) : null}
            {onUnstake != null ? (
              <ButtonV4
                variant="outline"
                onPress={onUnstake}
                disabled={loading}
                loading={loading}
                style={{ flex: 1 }}
              >
                Unstake
              </ButtonV4>
            ) : null}
          </View>
        ) : null}
      </View>
    </CardV4>
  );
}
