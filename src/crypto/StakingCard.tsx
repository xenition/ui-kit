import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatPct, formatToken } from './internal/format';

/** Lifecycle state of a staking position. */
export type StakingStatus = 'active' | 'unbonding' | 'inactive';

export interface StakingCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
  /** Loading state — disables the action buttons. */
  loading?: boolean;
}

const STATUS_META: Record<StakingStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  unbonding: { label: 'Unbonding', glyph: '◷', tone: 'warn' },
  inactive: { label: 'Inactive', glyph: '•', tone: 'neutral' },
};

/**
 * A staking position card: asset header with a status badge (glyph + label, so
 * state is not color-only), the staked amount + fiat value, a highlighted APY,
 * claimable rewards toned `success`, and Claim / Unstake actions. Claim is
 * disabled when there are no rewards. All token amounts are fixed-precision and
 * fiat is integer cents — no float drift. Web parity of the native
 * `StakingCard`.
 */
export const StakingCard = React.forwardRef<HTMLDivElement, StakingCardProps>(function StakingCard(
  {
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
    className,
    ...rest
  },
  ref
) {
  const meta = STATUS_META[status];
  const hasRewards = rewardsAmount != null && rewardsAmount > 0;

  return (
    <Card ref={ref} className={className} {...rest}>
      <div className="flex flex-col gap-[var(--xen-space-md)]">
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <div className="min-w-0 flex-1">
            <div className="text-base font-bold text-on-surface">{symbol}</div>
            {name != null ? <div className="text-xs text-muted">{name}</div> : null}
          </div>
          <Badge tone={meta.tone}>
            <span aria-hidden="true">{meta.glyph}</span> {meta.label}
          </Badge>
        </div>

        <div className="flex justify-between gap-[var(--xen-space-md)]">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted">Staked</span>
            <span className="text-xl font-bold tabular-nums text-on-surface">
              {formatToken(stakedAmount, { decimals, symbol })}
            </span>
            {stakedValueCents != null ? (
              <MoneyAmount cents={stakedValueCents} currency={currency} tone="muted" size="sm" />
            ) : null}
          </div>
          {apy != null ? (
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-xs text-muted">APY</span>
              <span className="text-xl font-bold tabular-nums text-success">{formatPct(apy)}</span>
            </div>
          ) : null}
        </div>

        {rewardsAmount != null ? (
          <div className="flex items-center justify-between gap-[var(--xen-space-sm)] border-t border-border pt-[var(--xen-space-sm)]">
            <span className="text-sm text-muted">Rewards</span>
            <span className={cn('text-base font-bold tabular-nums', hasRewards ? 'text-success' : 'text-muted')}>
              {formatToken(rewardsAmount, { decimals, symbol })}
            </span>
          </div>
        ) : null}

        {onClaim != null || onUnstake != null ? (
          <div className="flex gap-[var(--xen-space-sm)]">
            {onClaim != null ? (
              <Button variant="primary" onClick={onClaim} disabled={!hasRewards || loading} className="flex-1">
                Claim
              </Button>
            ) : null}
            {onUnstake != null ? (
              <Button variant="outline" onClick={onUnstake} disabled={loading} className="flex-1">
                Unstake
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
});
