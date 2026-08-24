import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge, Progress } from '../primitives';
import type { BadgeTone, IconColor } from '../primitives';
import { LineChart } from '../charts';
import type { ChartColor } from '../charts';

/** Moisture band — colors the reading and pairs with a text chip. */
export type SoilMoistureStatus = 'dry' | 'optimal' | 'wet';

export interface SoilMoistureCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Current volumetric moisture percent (0–100). Clamped/guarded. */
  moisture?: number;
  /** Sensor / zone label (e.g. "Zone 3 · 30cm"). */
  label?: string;
  /** Moisture band. Default derived from `moisture` thresholds. */
  status?: SoilMoistureStatus;
  /** Recent moisture samples for the trend line. Empty → no chart. */
  trend?: number[];
  /** Companion reading (e.g. soil temperature "18°C"). */
  soilTemp?: string;
  /** Card title. Default "Soil moisture". */
  title?: string;
  /** Chart height in px. Default 90. */
  chartHeight?: number;
}

const STATUS_META: Record<
  SoilMoistureStatus,
  {
    label: string;
    text: string;
    icon: IconColor;
    chart: ChartColor;
    tone: BadgeTone;
    progress: 'primary' | 'success' | 'warn';
  }
> = {
  dry: { label: 'Dry', text: 'text-warn', icon: 'warn', chart: 'warn', tone: 'warn', progress: 'warn' },
  optimal: {
    label: 'Optimal',
    text: 'text-success',
    icon: 'success',
    chart: 'success',
    tone: 'success',
    progress: 'success',
  },
  wet: {
    label: 'Saturated',
    text: 'text-primary',
    icon: 'primary',
    chart: 'primary',
    tone: 'primary',
    progress: 'primary',
  },
};

function deriveStatus(moisture: number): SoilMoistureStatus {
  if (moisture < 30) return 'dry';
  if (moisture > 70) return 'wet';
  return 'optimal';
}

/**
 * A soil-moisture panel — a titled {@link Card} showing the current percent
 * (colored by band and paired with a text {@link Badge}, never color alone), a
 * fill {@link Progress}, an optional companion soil-temperature reading, and a
 * recent {@link LineChart} trend. The moisture value is clamped to [0,100] and
 * `status` defaults to a threshold-derived band. An empty `trend` simply omits
 * the chart. Token-bound throughout — no literal colors.
 */
export const SoilMoistureCard = React.forwardRef<HTMLDivElement, SoilMoistureCardProps>(
  function SoilMoistureCard(
    {
      moisture,
      label,
      status,
      trend,
      soilTemp,
      title = 'Soil moisture',
      chartHeight = 90,
      className,
      ...rest
    },
    ref
  ) {
    const pct =
      typeof moisture === 'number' ? Math.max(0, Math.min(100, moisture)) : undefined;
    const band = status ?? (pct != null ? deriveStatus(pct) : 'optimal');
    const meta = STATUS_META[band];
    const series = Array.isArray(trend) ? trend : [];

    return (
      <Card ref={ref} data-xen-soil-moisture-card="" className={className} {...rest}>
        <div className="flex items-center gap-1">
          <Icon glyph="💧" color={meta.icon} size="base" />
          <span className="flex-1 text-base font-semibold text-on-surface">{title}</span>
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </div>

        <div className="mt-2 flex items-baseline gap-1">
          <span className={cn('font-heading text-3xl font-bold', meta.text)}>
            {pct != null ? `${pct}` : '—'}
          </span>
          {pct != null ? <span className="text-base text-muted">%</span> : null}
          {soilTemp != null ? (
            <span className="ml-2 text-sm text-muted">🌡️ {soilTemp}</span>
          ) : null}
        </div>

        {label != null ? <p className="mt-0.5 text-xs text-muted">{label}</p> : null}

        {pct != null ? (
          <div className="mt-2">
            <Progress value={pct} tone={meta.progress} />
          </div>
        ) : null}

        {series.length > 1 ? (
          <div className="mt-3">
            <LineChart
              data={series}
              height={chartHeight}
              color={meta.chart}
              aria-label={`${title} trend, ${series.length} samples`}
            />
          </div>
        ) : null}
      </Card>
    );
  }
);
