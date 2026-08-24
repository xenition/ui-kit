import * as React from 'react';
import { Card } from '../primitives';
import { BarChart, LineChart } from '../charts';
import { formatUsage } from './internal/format';
import { utilityKind, type UtilityKind } from './internal/status';

export type { UtilityKind };

/** One period's consumption. */
export interface ConsumptionPoint {
  /** Axis label (e.g. "Jan", "W1"). */
  label: string;
  /** Consumption for the period, in `unit`s. */
  value: number;
}

export interface ConsumptionChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Utility line — drives the title glyph, label, and default unit. */
  kind: UtilityKind;
  /** Ordered per-period consumption. */
  data: ConsumptionPoint[];
  /** Chart family — reuses the token-bound `BarChart` or `LineChart` (default `bar`). */
  variant?: 'bar' | 'line';
  /** Metered unit override (defaults to the utility's canonical unit). */
  unit?: string;
  /** Decimal places for the printed total (default `0`). */
  decimals?: number;
  /** Title override (defaults to "<Utility> usage"). */
  title?: string;
  /** Plot height in px (default `140`). */
  height?: number;
  /** Loading skeleton flag — renders a placeholder instead of the chart. */
  loading?: boolean;
}

/**
 * A consumption-over-time chart card that **reuses** the token-bound `BarChart` /
 * `LineChart` primitives rather than drawing its own geometry. It derives the
 * period total from the data (via `formatUsage`, so it never renders `NaN`),
 * renders an accessible summary, and degrades to an inline empty message when
 * there are no points (guarded indexing throughout). Every color traces to a
 * `--xen-*` token — the charts express series via theme color keys, never a
 * literal. Web parity of the native `ConsumptionChart`.
 */
export const ConsumptionChart = React.forwardRef<HTMLDivElement, ConsumptionChartProps>(
  function ConsumptionChart(
    { kind, data, variant = 'bar', unit, decimals = 0, title, height = 140, loading = false, className, ...rest },
    ref
  ) {
    const kd = utilityKind(kind);
    const u = unit ?? kd.unit;
    const points = Array.isArray(data) ? data : [];
    const heading = title ?? `${kd.label} usage`;

    if (loading) {
      return (
        <Card ref={ref} className={className} {...rest}>
          <div aria-busy="true" aria-label="Loading usage chart" className="flex flex-col gap-[var(--xen-space-sm)]">
            <div className="h-4 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
            <div
              className="animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100"
              style={{ height }}
            />
          </div>
        </Card>
      );
    }

    const values = points.map((p) => (Number.isFinite(p.value) ? Math.max(0, p.value) : 0));
    const labels = points.map((p) => p.label);
    const total = values.reduce((sum, v) => sum + v, 0);

    return (
      <Card ref={ref} className={className} {...rest}>
        <div className="mb-[var(--xen-space-md)] flex items-end justify-between">
          <span className="text-base font-bold text-on-surface">{heading}</span>
          <span className="text-xs text-muted">Total {formatUsage(total, u, decimals)}</span>
        </div>

        {points.length === 0 ? (
          <p className="text-sm text-muted">No usage recorded yet.</p>
        ) : variant === 'line' ? (
          <LineChart
            data={values}
            height={height}
            color="primary"
            aria-label={`${heading} line chart, ${points.length} periods, total ${formatUsage(total, u, decimals)}`}
          />
        ) : (
          <BarChart
            data={values}
            labels={labels}
            height={height}
            color="primary"
            aria-label={`${heading} bar chart, ${points.length} periods, total ${formatUsage(total, u, decimals)}`}
          />
        )}
      </Card>
    );
  }
);
