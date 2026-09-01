import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { BarChart, LineChart } from '../charts';
import { formatUsage } from './internal/format';
import { utilityKind } from './internal/status';
import type { ConsumptionChartProps } from './ConsumptionChart';

/** Drop-in for {@link ConsumptionChartProps} — same props, a different design. */
export type ConsumptionChartV4Props = ConsumptionChartProps;

/**
 * ConsumptionChart — **V4** design. A clean, elevated card that **reuses** the
 * same token-bound `BarChart` / `LineChart` primitives (same data, same series
 * color) rather than drawing its own geometry. A refined header pairs the kind
 * glyph in the signature brand-gradient disc with a derived period total (via
 * `formatUsage`, so it never renders `NaN`) and a small legend. Preserves the
 * loading skeleton and the empty state. Same props/behavior as
 * {@link ConsumptionChartProps}; token-only colors.
 */
export const ConsumptionChartV4 = React.forwardRef<HTMLDivElement, ConsumptionChartV4Props>(
  function ConsumptionChartV4(
    { kind, data, variant = 'bar', unit, decimals = 0, title, height = 140, loading = false, className, ...rest },
    ref
  ) {
    const kd = utilityKind(kind);
    const u = unit ?? kd.unit;
    const points = Array.isArray(data) ? data : [];
    const heading = title ?? `${kd.label} usage`;

    const cardClass = 'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5';

    if (loading) {
      return (
        <div ref={ref} className={cn(cardClass, className)} {...rest}>
          <div aria-busy="true" aria-label="Loading usage chart" className="flex flex-col gap-[var(--xen-space-sm)]">
            <div className="h-4 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
            <div className="animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" style={{ height }} />
          </div>
        </div>
      );
    }

    const values = points.map((p) => (Number.isFinite(p.value) ? Math.max(0, p.value) : 0));
    const labels = points.map((p) => p.label);
    const total = values.reduce((sum, v) => sum + v, 0);

    return (
      <div ref={ref} className={cn(cardClass, className)} {...rest}>
        <div className="mb-[var(--xen-space-md)] flex items-center justify-between gap-[var(--xen-space-md)]">
          <div className="flex min-w-0 flex-1 items-center gap-[var(--xen-space-md)]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
              <Icon glyph={kd.glyph} size="lg" color="onPrimary" aria-label={`${kd.label} usage`} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-base font-bold text-on-surface">{heading}</span>
              <span className="text-xs text-muted">Total {formatUsage(total, u, decimals)}</span>
            </div>
          </div>
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

        {points.length > 0 ? (
          <div className="mt-[var(--xen-space-md)] flex items-center gap-[var(--xen-space-xs)]">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-xs text-muted">
              {kd.label} usage ({u})
            </span>
          </div>
        ) : null}
      </div>
    );
  }
);
