import * as React from 'react';
import { cn } from '../primitives/cn';
import { Sparkline } from '../charts/Sparkline';
import { formatMoney } from '../commerce/money';
import type { BalanceHeaderProps } from './BalanceHeader';

/** Same public contract as {@link BalanceHeader} — a drop-in alternate design. */
export type BalanceHeaderV2Props = BalanceHeaderProps;

/**
 * BalanceHeader, redesigned (v2): a **big centered hero** over a full-width
 * sparkline band. Everything is center-aligned — the caption, the oversized
 * figure, and a pill-shaped change chip (tinted with the up/down slot) — then a
 * {@link Sparkline} spans the full width beneath as a trend "floor". Distinct at
 * a glance from the base's left-aligned stack. Same props, integer cents.
 */
export const BalanceHeaderV2 = React.forwardRef<HTMLDivElement, BalanceHeaderV2Props>(
  function BalanceHeaderV2(
    {
      label = 'Total balance',
      balanceCents,
      currency = 'USD',
      changeCents,
      changePct,
      trend,
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
    const hasTrend = Array.isArray(trend) && trend.length > 0;

    return (
      <div
        ref={ref}
        role="group"
        className={cn('flex flex-col items-center gap-[var(--xen-space-sm)] text-center', className)}
        {...rest}
      >
        <span className="text-sm text-muted">{label}</span>
        {loading ? (
          <div aria-label="Loading balance" className="h-12 w-52 rounded-[var(--xen-radius-sm)] bg-border" />
        ) : (
          <span className="text-5xl font-bold tabular-nums text-on-surface">
            {format(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency)}
          </span>
        )}
        {hasChange && !loading ? (
          <span
            className={cn(
              'inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-full)] px-[var(--xen-space-sm)] py-0.5 text-sm font-semibold',
              chipClass
            )}
          >
            <span className="text-xs">{arrow}</span>
            <span>
              {format(Math.abs(Math.trunc(changeCents as number)), currency)}
              {typeof changePct === 'number' ? ` (${changePct > 0 ? '+' : ''}${changePct}%)` : ''}
            </span>
          </span>
        ) : null}
        {hasTrend && !loading ? (
          <Sparkline
            data={trend as number[]}
            height={48}
            color={up ? 'success' : 'danger'}
            className="mt-[var(--xen-space-xs)] w-full self-stretch"
          />
        ) : null}
      </div>
    );
  }
);
