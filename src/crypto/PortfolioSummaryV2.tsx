import * as React from 'react';
import { cn } from '../primitives/cn';
import { DonutChart } from '../charts/DonutChart';
import type { ChartColor } from '../charts/internal';
import { formatMoney } from '../commerce/money';
import { changeGlyph, formatPct } from './internal/format';
import type { PortfolioSummaryProps } from './PortfolioSummary';

/** Same public contract as {@link PortfolioSummary} — a drop-in alternate design. */
export type PortfolioSummaryV2Props = PortfolioSummaryProps;

/** Same cycled palette the DonutChart uses, so the custom legend swatches match. */
const PALETTE: ChartColor[] = ['primary', 'accent', 'success', 'warn', 'danger'];

/** Static `bg-*` token class per chart color slot (literal classes for JIT). */
const SWATCH_BG: Record<ChartColor, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
  muted: 'bg-neutral-400',
};

/**
 * PortfolioSummary, redesigned (v2): a **big total hero over a donut**. The total
 * sits in a filled `primary` hero band (rendered in the guaranteed `on-primary`
 * slot via `formatMoney`, integer cents — no drift) with a translucent on-fill
 * change chip and a soft sheen disc; below, a reused {@link DonutChart} pairs with
 * a custom legend that spells out each asset's share % (guarded against a zero
 * total). Distinct at a glance from the base's plain total + built-in legend.
 * Same props.
 */
export const PortfolioSummaryV2 = React.forwardRef<HTMLDivElement, PortfolioSummaryV2Props>(
  function PortfolioSummaryV2(
    { totalCents, currency = 'USD', changeCents, changePct, allocations = [], loading = false, className, ...rest },
    ref
  ) {
    const safeTotal = Number.isFinite(totalCents) ? Math.trunc(totalCents) : 0;
    const hasChange = changeCents != null || changePct != null;
    const delta = changePct ?? changeCents ?? 0;
    const allocTotal = allocations.reduce((sum, a) => sum + Math.max(a.value, 0), 0);

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn('overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-md', className)}
          {...rest}
        >
          <div aria-label="Loading portfolio" className="h-56 animate-pulse bg-neutral-100" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-md', className)}
        {...rest}
      >
        {/* Hero band. */}
        <div className="relative overflow-hidden bg-primary p-[var(--xen-space-lg)]">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-[var(--xen-radius-full)] bg-on-primary opacity-10"
          />
          <span className="relative block text-xs font-semibold text-on-primary opacity-80">Total balance</span>
          <span className="relative mt-1 block text-3xl font-bold tabular-nums text-on-primary">
            {formatMoney(safeTotal, currency)}
          </span>
          {hasChange ? (
            <span className="relative mt-[var(--xen-space-sm)] inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-full)] bg-on-primary/20 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold text-on-primary">
              <span aria-hidden>{changeGlyph(delta)}</span>
              {changeCents != null ? (
                <span className="tabular-nums">{formatMoney(Math.abs(Math.trunc(changeCents)), currency)}</span>
              ) : null}
              {changePct != null ? (
                <span
                  aria-label={`${changePct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct))}`}
                  className="tabular-nums"
                >
                  {formatPct(changePct)}
                </span>
              ) : null}
            </span>
          ) : null}
        </div>

        {/* Donut + custom share legend. */}
        {allocations.length > 0 ? (
          <div className="flex items-center gap-[var(--xen-space-lg)] p-[var(--xen-space-lg)]">
            <DonutChart
              data={allocations.map((a) => ({ label: a.label, value: a.value, color: a.color }))}
              size={120}
              aria-label={`Allocation across ${allocations.length} assets`}
            />
            <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-sm)]">
              {allocations.map((a, i) => {
                const swatch: ChartColor = a.color ?? PALETTE[i % PALETTE.length] ?? 'primary';
                const pct = allocTotal > 0 ? (Math.max(a.value, 0) / allocTotal) * 100 : 0;
                return (
                  <div key={`${a.label}-${i}`} className="flex items-center gap-[var(--xen-space-sm)]">
                    <span
                      aria-hidden
                      className={cn('h-2.5 w-2.5 shrink-0 rounded-[var(--xen-radius-full)]', SWATCH_BG[swatch])}
                    />
                    <span className="min-w-0 flex-1 truncate text-sm text-on-surface">{a.label}</span>
                    <span className="shrink-0 text-sm font-semibold tabular-nums text-muted">{`${pct.toFixed(1)}%`}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);
