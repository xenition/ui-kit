import * as React from 'react';
import { Card } from '../primitives/Card';
import { DonutChart } from '../charts/DonutChart';
import { Legend } from '../charts/Legend';
import type { ChartColor } from '../charts/internal';
import { MoneyAmount, type MoneyTone } from '../finance/MoneyAmount';
import { changeGlyph, changeToneClass, changeToneKey, formatPct } from './internal/format';

/** One slice of the allocation donut. */
export interface AllocationSlice {
  /** Asset label (e.g. `ETH`). */
  label: string;
  /** Share weight (fiat value or percentage — the donut normalizes). */
  value: number;
  /** Optional semantic color; falls back to a cycled palette. */
  color?: ChartColor;
}

export interface PortfolioSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total portfolio value in integer **cents**. */
  totalCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** 24h change in integer **cents** (signed → tone). */
  changeCents?: number;
  /** 24h change as a percentage (signed → tone; ▲/▼ glyph so not color-only). */
  changePct?: number;
  /** Allocation breakdown → a reused {@link DonutChart} + {@link Legend}. */
  allocations?: AllocationSlice[];
  /** Skeleton state while the portfolio loads. */
  loading?: boolean;
}

/**
 * The top-of-portfolio hero: a big total ({@link MoneyAmount}), a token-toned
 * 24h change (gain = `success`, loss = `danger`, with a ▲/▼ glyph + accessible
 * up/down label so it is never color-only), and a reused {@link DonutChart} of
 * the allocation breakdown with a {@link Legend}. All amounts are integer cents
 * — no float drift. Empty `allocations` simply hides the chart. Web parity of
 * the native `PortfolioSummary`.
 */
export const PortfolioSummary = React.forwardRef<HTMLDivElement, PortfolioSummaryProps>(
  function PortfolioSummary(
    { totalCents, currency = 'USD', changeCents, changePct, allocations = [], loading = false, className, ...rest },
    ref
  ) {
    const toneKey = changeToneKey(changePct ?? changeCents ?? 0);
    const changeMoneyTone: MoneyTone =
      toneKey === 'muted' ? 'neutral' : toneKey === 'success' ? 'income' : 'expense';

    if (loading) {
      return (
        <Card ref={ref} className={className} {...rest}>
          <div aria-label="Loading portfolio" className="h-32 animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" />
        </Card>
      );
    }

    return (
      <Card ref={ref} className={className} {...rest}>
        <div className="flex flex-col gap-[var(--xen-space-md)]">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-muted">Total balance</span>
            <MoneyAmount cents={totalCents} currency={currency} tone="neutral" size="xl" />
            {changeCents != null || changePct != null ? (
              <div className="flex items-center gap-[var(--xen-space-sm)]">
                <span aria-hidden="true" className={changeToneClass(toneKey)}>
                  {changeGlyph(changePct ?? changeCents ?? 0)}
                </span>
                {changeCents != null ? (
                  <MoneyAmount cents={changeCents} currency={currency} tone={changeMoneyTone} size="sm" signDisplay="always" />
                ) : null}
                {changePct != null ? (
                  <span
                    aria-label={`${changePct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct))}`}
                    className={`text-sm font-semibold tabular-nums ${changeToneClass(toneKey)}`}
                  >
                    {formatPct(changePct)}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>

          {allocations.length > 0 ? (
            <div className="flex flex-col items-center gap-[var(--xen-space-sm)]">
              <DonutChart
                data={allocations.map((a) => ({ label: a.label, value: a.value, color: a.color }))}
                size={180}
                aria-label={`Allocation across ${allocations.length} assets`}
              />
              <Legend items={allocations.map((a) => ({ label: a.label, color: a.color }))} />
            </div>
          ) : null}
        </div>
      </Card>
    );
  }
);
