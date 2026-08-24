import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Button, Badge } from '../primitives';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatPct, formatToken } from './internal/format';

/** Lifecycle state of a staking position. */
export type StakingStatus = 'active' | 'unbonding' | 'inactive';

export interface StakingCardProps {
  /** Staked asset ticker (e.g. `ETH`, `ATOM`). */
  symbol: string;
  /** Asset long name (e.g. `Ethereum`). */
  name?: string;
  /** Amount currently staked, in token units. */
  stakedAmount: number;
  /** Fraction digits for token amounts (default `4`). */
  decimals?: number;
  /** Fiat value of the stake, in integer **cents**. */
  stakedValueCents?: number;
  /** ISO 4217 currency for fiat values (default `USD`). */
  currency?: string;
  /** Annual percentage yield (e.g. `4.2`). */
  apy?: number;
  /** Claimable rewards, in token units. */
  rewardsAmount?: number;
  /** Position lifecycle — shown as a glyph + labelled badge, not color-only. */
  status?: StakingStatus;
  /** Fires when the claim button is pressed (disabled when no rewards). */
  onClaim?: () => void;
  /** Fires when the unstake button is pressed. */
  onUnstake?: () => void;
  /** Loading state for the action buttons. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const STATUS_META: Record<StakingStatus, { label: string; glyph: string; tone: 'success' | 'warn' | 'neutral' }> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  unbonding: { label: 'Unbonding', glyph: '◷', tone: 'warn' },
  inactive: { label: 'Inactive', glyph: '•', tone: 'neutral' },
};

/**
 * A staking position card: asset header with a status badge (glyph + label, so
 * state is not color-only), the staked amount + fiat value, a highlighted APY,
 * claimable rewards toned `success`, and Claim / Unstake actions. Claim is
 * disabled when there are no rewards. All token amounts are fixed-precision and
 * fiat is integer cents — no float drift. Token-bound throughout.
 */
export function StakingCard({
  symbol,
  name,
  stakedAmount,
  decimals = 4,
  stakedValueCents,
  currency = 'USD',
  apy,
  rewardsAmount,
  status = 'active',
  onClaim,
  onUnstake,
  loading = false,
  style,
}: StakingCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const hasRewards = rewardsAmount != null && rewardsAmount > 0;
  const rewardSlot: keyof SemanticColors = hasRewards ? 'success' : 'muted';

  return (
    <Card variant="elevated" style={style}>
      <View style={{ gap: tokens.spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
              {symbol}
            </Text>
            {name != null ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{name}</Text>
            ) : null}
          </View>
          <Badge tone={meta.tone} variant="soft" size="sm">
            {`${meta.glyph} ${meta.label}`}
          </Badge>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          <View style={{ gap: 2 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Staked</Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
              {formatToken(stakedAmount, { decimals, symbol })}
            </Text>
            {stakedValueCents != null ? (
              <MoneyAmount cents={stakedValueCents} currency={currency} tone="muted" size="sm" />
            ) : null}
          </View>
          {apy != null ? (
            <View style={{ alignItems: 'flex-end', gap: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>APY</Text>
              <Text style={{ color: colors.success, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
                {formatPct(apy)}
              </Text>
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
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Rewards</Text>
            <Text style={{ color: colors[rewardSlot], fontSize: tokens.typography.scale.base, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
              {formatToken(rewardsAmount, { decimals, symbol })}
            </Text>
          </View>
        ) : null}

        {onClaim != null || onUnstake != null ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
            {onClaim != null ? (
              <Button variant="primary" tone="success" onPress={onClaim} disabled={!hasRewards} loading={loading} style={{ flex: 1 }}>
                Claim
              </Button>
            ) : null}
            {onUnstake != null ? (
              <Button variant="outline" onPress={onUnstake} loading={loading} style={{ flex: 1 }}>
                Unstake
              </Button>
            ) : null}
          </View>
        ) : null}
      </View>
    </Card>
  );
}
