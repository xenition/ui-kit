import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ChartColor } from '../charts/internal';
import { MoneyAmount, type MoneyTone } from '../finance/MoneyAmount';
import { changeGlyph, changeToneClass, changeToneKey, formatPct } from './internal/format';
import type { PortfolioSummaryProps } from './PortfolioSummary';

/** Same public contract as {@link PortfolioSummary} — a drop-in alternate design. */
export type PortfolioSummaryV3Props = PortfolioSummaryProps;

/** Same cycled palette the DonutChart uses, so the bar segments match a donut view. */
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
 * PortfolioSummary, redesigned (v3): a **minimal, total-first** block. The total
 * leads big through {@link MoneyAmount} (integer cents — no drift) with an inline
 * ▲/▼ change, then a single compact **stacked allocation bar** replaces the donut,
 * with a small dot legend beneath. No card, no chart deps — a lean header.
 * Distinct at a glance from the base's donut card and v2's hero band. Same props;
 * an empty or all-zero allocation simply hides the bar.
 */
export const PortfolioSummaryV3 = React.forwardRef<HTMLDivElement, PortfolioSummaryV3Props>(
  function PortfolioSummaryV3(
    { totalCents, currency = 'USD', changeCents, changePct, allocations = [], loading = false, className, ...rest },
    ref
  ) {
    const delta = changePct ?? changeCents ?? 0;
    const toneKey = changeToneKey(delta);
    const changeMoneyTone: MoneyTone =
      toneKey === 'muted' ? 'neutral' : toneKey === 'success' ? 'income' : 'expense';

    if (loading) {
      return (
        <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
          <div aria-label="Loading portfolio" className="h-14 animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" />
        </div>
      );
    }

    const allocTotal = allocations.reduce((sum, a) => sum + Math.max(a.value, 0), 0);
    const hasChange = changeCents != null || changePct != null;

    return (
      <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-md)]', className)} {...rest}>
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          <span className="text-sm font-semibold text-muted">Total balance</span>
          <div className="flex flex-wrap items-baseline gap-[var(--xen-space-sm)]">
            <MoneyAmount cents={totalCents} currency={currency} tone="neutral" size="xl" />
            {hasChange ? (
              <span className="inline-flex items-center gap-[var(--xen-space-xs)]">
                <span aria-hidden className={changeToneClass(toneKey)}>
                  {changeGlyph(delta)}
                </span>
                {changeCents != null ? (
                  <MoneyAmount cents={changeCents} currency={currency} tone={changeMoneyTone} size="sm" signDisplay="always" />
                ) : null}
                {changePct != null ? (
                  <span
                    aria-label={`${changePct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct))}`}
                    className={cn('text-sm font-semibold tabular-nums', changeToneClass(toneKey))}
                  >
                    {formatPct(changePct)}
                  </span>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>

        {allocations.length > 0 && allocTotal > 0 ? (
          <div className="flex flex-col gap-[var(--xen-space-sm)]">
            <div
              role="img"
              aria-label={`Allocation across ${allocations.length} assets`}
              className="flex h-2.5 overflow-hidden rounded-[var(--xen-radius-full)] bg-neutral-100"
            >
              {allocations.map((a, i) => {
                const swatch: ChartColor = a.color ?? PALETTE[i % PALETTE.length] ?? 'primary';
                const share = Math.max(a.value, 0) / allocTotal;
                if (share <= 0) return null;
                return (
                  <span
                    key={`${a.label}-${i}`}
                    className={cn('block h-full', SWATCH_BG[swatch])}
                    style={{ flexBasis: 0, flexGrow: share }}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap gap-[var(--xen-space-md)]">
              {allocations.map((a, i) => {
                const swatch: ChartColor = a.color ?? PALETTE[i % PALETTE.length] ?? 'primary';
                return (
                  <span key={`${a.label}-${i}`} className="inline-flex items-center gap-[var(--xen-space-xs)]">
                    <span aria-hidden className={cn('h-2 w-2 rounded-[var(--xen-radius-full)]', SWATCH_BG[swatch])} />
                    <span className="text-xs text-muted">{a.label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);
