import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives';
import { BarChart, type ChartColor } from '../charts';
import { formatMoney } from '../commerce';

export interface ForecastPeriod {
  /** Axis label (e.g. "Jan", "Q1"). */
  label: string;
  /** Forecast amount for the period in integer **cents**. */
  valueCents: number;
}

export interface DealForecastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Per-period forecast series. */
  periods: ForecastPeriod[];
  /** Heading (default "Forecast"). */
  title?: string;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Optional target/quota in cents — shown as a labelled reference. */
  targetCents?: number;
  /** Bar color token (default `primary`; use `success` for won-weighted). */
  color?: ChartColor;
  /** Plot height in px (default 128). */
  height?: number;
  /** Placeholder when there are no periods. */
  emptyLabel?: string;
}

/**
 * Revenue forecast block — a header with the summed pipeline total (and, when a
 * `targetCents` is given, attainment vs quota) over a reused {@link BarChart} of
 * per-period amounts. Values are integer cents formatted via `formatMoney`; the
 * bar heights are relative so the raw cents map straight to the chart. Renders
 * an empty placeholder for a zero-length series. Bar/text colors are `--xen-*`
 * token classes (`color` is a `ChartColor` token key) — no literals.
 */
export const DealForecast = React.forwardRef<HTMLDivElement, DealForecastProps>(function DealForecast(
  { periods, title = 'Forecast', currency = 'USD', targetCents, color = 'primary', height = 128, emptyLabel = 'No forecast data', className, ...rest },
  ref
) {
  const total = periods.reduce((sum, p) => sum + (Number.isFinite(p.valueCents) ? p.valueCents : 0), 0);
  const attainment = targetCents && targetCents > 0 ? Math.round((total / targetCents) * 100) : undefined;

  return (
    <Card ref={ref} className={cn('flex flex-col gap-[var(--xen-space-md)]', className)} {...rest}>
      <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
        <div>
          <p className="text-xs font-semibold text-muted">{title}</p>
          <p className="text-2xl font-bold text-on-surface">{formatMoney(total, currency)}</p>
        </div>
        {attainment != null ? (
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted">vs target</span>
            <span className={cn('text-base font-bold', attainment >= 100 ? 'text-success' : 'text-on-surface')}>{attainment}%</span>
          </div>
        ) : null}
      </div>

      {periods.length === 0 ? (
        <div className="py-[var(--xen-space-lg)] text-center text-sm text-muted">{emptyLabel}</div>
      ) : (
        <BarChart
          data={periods.map((p) => (Number.isFinite(p.valueCents) ? p.valueCents : 0))}
          labels={periods.map((p) => p.label)}
          color={color}
          height={height}
          aria-label={`Forecast across ${periods.length} periods, total ${formatMoney(total, currency)}`}
        />
      )}
    </Card>
  );
});
