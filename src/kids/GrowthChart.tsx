import * as React from 'react';
import { Card, Icon } from '../primitives';
import type { IconColor } from '../primitives';
import { LineChart } from '../charts';
import type { ChartColor } from '../charts';
import { EmptyState } from '../commerce';

/** Which growth metric a chart plots. Drives the title + icon. */
export type GrowthMetric = 'height' | 'weight' | 'head' | 'other';

interface MetricMeta {
  glyph: string;
  label: string;
}

const METRIC_META: Record<GrowthMetric, MetricMeta> = {
  height: { glyph: '📏', label: 'Height' },
  weight: { glyph: '⚖️', label: 'Weight' },
  head: { glyph: '🧢', label: 'Head circumference' },
  other: { glyph: '📈', label: 'Growth' },
};

/** Chart color tokens that also map to an `Icon` color slot (all but `accent`). */
const ICON_COLOR: Record<ChartColor, IconColor> = {
  primary: 'primary',
  accent: 'primary',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
  muted: 'muted',
};

export interface GrowthChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Series of measurements over time (bare numbers indexed on x). */
  data: number[];
  /** Which growth metric this chart plots; drives the title + icon. */
  metric?: GrowthMetric;
  /** Unit suffix for the latest-value readout, e.g. "cm" or "kg". */
  unit?: string;
  /** Optional percentile subtitle, e.g. "75th percentile". */
  percentile?: string;
  /** Line color slot. */
  color?: ChartColor;
  /** Plot height in px. */
  height?: number;
  /** Loading placeholder state. */
  loading?: boolean;
  /** Copy shown when there is no data. */
  emptyLabel?: string;
}

/**
 * A child's growth curve — a titled {@link Card} wrapping the shared
 * {@link LineChart} with a latest-value + percentile readout. Reuses the charts
 * module rather than re-plotting. Renders the shared {@link EmptyState} when
 * `data` is empty. Token-bound throughout — no literal colors.
 */
export const GrowthChart = React.forwardRef<HTMLDivElement, GrowthChartProps>(function GrowthChart(
  { data, metric = 'height', unit, percentile, color = 'primary', height = 160, loading = false, emptyLabel = 'No measurements logged yet', className, ...rest },
  ref
) {
  const meta = METRIC_META[metric] ?? METRIC_META.other;
  const series = Array.isArray(data) ? data : [];

  if (loading) {
    return (
      <Card ref={ref} data-xen-growth-chart="" aria-label="Loading growth chart" className={className} {...rest}>
        <div className="space-y-2">
          <div className="h-3 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="w-full animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200" style={{ height }} />
        </div>
      </Card>
    );
  }

  if (series.length === 0) {
    return (
      <EmptyState
        ref={ref}
        data-xen-growth-chart=""
        aria-label={emptyLabel}
        className={className}
        icon={<span className="text-3xl">📉</span>}
        title={`${meta.glyph} ${meta.label}`}
        description={emptyLabel}
        {...rest}
      />
    );
  }

  const latest = series[series.length - 1];

  return (
    <Card
      ref={ref}
      data-xen-growth-chart=""
      aria-label={`${meta.label} growth${latest !== undefined ? `, latest ${latest}${unit ? ` ${unit}` : ''}` : ''}${percentile ? `, ${percentile}` : ''}`}
      className={className}
      {...rest}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-base font-bold text-on-surface">
          <Icon glyph={meta.glyph} size="base" color={ICON_COLOR[color]} /> {meta.label}
        </span>
        {latest !== undefined ? (
          <span className="text-lg font-extrabold text-primary">
            {latest}
            {unit ? ` ${unit}` : ''}
          </span>
        ) : null}
      </div>
      {percentile ? <p className="text-xs text-muted">{percentile}</p> : null}
      <div className="mt-3">
        <LineChart data={series} color={color} height={height} showDots aria-label={`${meta.label} over time`} />
      </div>
    </Card>
  );
});
