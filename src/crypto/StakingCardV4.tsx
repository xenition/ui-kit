import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { ButtonV4 } from '../primitives/ButtonV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import type { BadgeTone } from '../primitives/Badge';
import { MoneyAmount } from '../finance/MoneyAmount';
import { BADGE_V4, TABULAR_CLASS } from './internal/market-v4';
import { formatPrice, formatToken } from './internal/format';
import type { StakingCardProps, StakingStatus } from './StakingCard';

export interface StakingCardV4Props extends StakingCardProps {
  /** Caption over the yield figure. Default `'APY'`. */
  apyLabel?: string;
}

const STATUS_META: Record<StakingStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  unbonding: { label: 'Unbonding', glyph: '◷', tone: 'warn' },
  inactive: { label: 'Inactive', glyph: '•', tone: 'neutral' },
};

/**
 * A yield printed as a **level**, not a movement.
 *
 * `formatPct` prefixes `+` for any positive value — it exists to render a
 * *change* — so a 4.2% APY rendered as "+4.20%", which reads as the yield
 * having gone up by 4.2 points. `formatPrice` with an empty symbol is the same
 * fixed-precision `Intl` path with no sign applied.
 */
function formatApy(apy: number): string {
  return `${formatPrice(apy, { symbol: '', decimals: 2 })}%`;
}

/**
 * **V4 staking card** — the web twin of the native `StakingCardV4`, same props
 * as {@link StakingCard} plus `apyLabel`.
 *
 * ## Four changes
 *
 * 1. **APY is printed without a change sign.** See {@link formatApy}: the base
 *    ran the yield through `formatPct`, so every position advertised a
 *    "+4.20%" that reads as a movement in the rate rather than the rate.
 * 2. **APY is not `success`.** It was coloured green unconditionally, and a
 *    yield is a level — the number is identical whether the position is up or
 *    down. Green here spends the gain slot on a constant, and leaves nothing
 *    to say when something actually gains.
 * 3. **The twins agree.** The staked figure took the `xl` step on the web and
 *    `lg` on the phone — it is the card's headline number, so both take `xl`.
 *    The card was `elevated` on the phone and `outlined` on the web. And Claim
 *    wore `tone="success"` on native only, a status colour spent on an action,
 *    which the line does not do. All three now match.
 * 4. **Ink is ink.** `text-muted` and `text-success` are fill slots; the
 *    captions, the rewards figure and the money now use the contrast-corrected
 *    `*Text` forms, and every stacked figure is tabular.
 */
export const StakingCardV4 = React.forwardRef<HTMLDivElement, StakingCardV4Props>(
  function StakingCardV4(
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
      apyLabel = 'APY',
      className,
      ...rest
    },
    ref
  ) {
    const meta = STATUS_META[status];
    const hasRewards = rewardsAmount != null && rewardsAmount > 0;

    return (
      <Card ref={ref} variant="elevated" className={className} {...rest}>
        <div className="flex flex-col gap-md">
          <div className="flex items-center gap-sm">
            <div className="min-w-0 flex-1">
              <div className="text-base font-bold text-on-card">{symbol}</div>
              {name != null ? <div className="text-xs text-muted-text">{name}</div> : null}
            </div>
            <BadgeV4 tone={meta.tone} {...BADGE_V4}>
              <span aria-hidden="true">{meta.glyph}</span> {meta.label}
            </BadgeV4>
          </div>

          <div className="flex justify-between gap-md">
            <div className="flex flex-col gap-xs">
              <span className="text-xs text-muted-text">Staked</span>
              <span className={cn('text-xl font-bold text-on-card', TABULAR_CLASS)}>
                {formatToken(stakedAmount, { decimals, symbol })}
              </span>
              {stakedValueCents != null ? (
                <MoneyAmount cents={stakedValueCents} currency={currency} tone="muted" size="sm" />
              ) : null}
            </div>
            {apy != null ? (
              <div className="flex flex-col items-end gap-xs">
                <span className="text-xs text-muted-text">{apyLabel}</span>
                <span className={cn('text-xl font-bold text-on-card', TABULAR_CLASS)}>
                  {formatApy(apy)}
                </span>
              </div>
            ) : null}
          </div>

          {rewardsAmount != null ? (
            <div className="flex items-center justify-between gap-sm border-t border-border pt-sm">
              <span className="text-sm text-muted-text">Rewards</span>
              <span
                className={cn(
                  'text-base font-bold',
                  TABULAR_CLASS,
                  // A reward genuinely IS a gain, so the success slot is spent
                  // on a gain — but on the ink form, not the fill.
                  hasRewards ? 'text-success-text' : 'text-muted-text'
                )}
              >
                {formatToken(rewardsAmount, { decimals, symbol })}
              </span>
            </div>
          ) : null}

          {onClaim != null || onUnstake != null ? (
            <div className="flex gap-sm">
              {onClaim != null ? (
                <ButtonV4
                  variant="primary"
                  onClick={onClaim}
                  disabled={!hasRewards || loading}
                  className="flex-1"
                >
                  Claim
                </ButtonV4>
              ) : null}
              {onUnstake != null ? (
                <ButtonV4
                  variant="outline"
                  onClick={onUnstake}
                  disabled={loading}
                  className="flex-1"
                >
                  Unstake
                </ButtonV4>
              ) : null}
            </div>
          ) : null}
        </div>
      </Card>
    );
  }
);
