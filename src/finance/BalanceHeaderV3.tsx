import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce/money';
import type { BalanceHeaderProps } from './BalanceHeader';

/** Same public contract as {@link BalanceHeader} — a drop-in alternate design. */
export type BalanceHeaderV3Props = BalanceHeaderProps;

/**
 * BalanceHeader, redesigned (v3): a **left-aligned compact** row. The caption
 * sits small above, then the figure and an inline soft change chip share one
 * baseline-aligned row — no sparkline, no oversized type. Built to sit tight in
 * a card header or toolbar. Distinct at a glance from the base's stacked hero
 * and v2's centered hero. Same props, integer-cents money, token-pure.
 */
export const BalanceHeaderV3 = React.forwardRef<HTMLDivElement, BalanceHeaderV3Props>(
  function BalanceHeaderV3(
    {
      label = 'Total balance',
      balanceCents,
      currency = 'USD',
      changeCents,
      changePct,
      trend: _trend,
      formatMoney: format = formatMoney,
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
    const up = (changeCents ?? 0) >= 0;
    const chipClass = up ? 'text-success bg-success/10' : 'text-danger bg-danger/10';
    const arrow = up ? '▲' : '▼';

    return (
      <div ref={ref} role="group" className={cn('flex flex-col gap-0.5', className)} {...rest}>
        <span className="text-xs text-muted">{label}</span>
        <div className="flex flex-wrap items-baseline gap-[var(--xen-space-sm)]">
          {loading ? (
            <div aria-label="Loading balance" className="h-7 w-32 rounded-[var(--xen-radius-sm)] bg-border" />
          ) : (
            <span className="text-2xl font-bold tabular-nums text-on-surface">
              {format(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency)}
            </span>
          )}
          {hasChange && !loading ? (
            <span
              className={cn(
                'inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-sm)] px-[var(--xen-space-xs)] py-px text-xs font-semibold',
                chipClass
              )}
            >
              <span>{arrow}</span>
              <span>
                {typeof changePct === 'number'
                  ? `${changePct > 0 ? '+' : ''}${changePct}%`
                  : format(Math.abs(Math.trunc(changeCents as number)), currency)}
              </span>
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);
