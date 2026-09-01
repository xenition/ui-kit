import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { LineChartV4 } from '../charts/LineChartV4';
import { clampPercent, TONE_INK, type FarmTone } from './internal/farm-v4';
import type { ChartToneV4 } from '../primitives/internal/v4-chart';
import type { ProgressTone } from '../primitives/Progress';
import type { SoilMoistureCardProps, SoilMoistureStatus } from './SoilMoistureCard';

export interface SoilMoistureCardV4Props extends SoilMoistureCardProps {
  /** Override the band names — three English words lived inside the component. */
  statusLabels?: Partial<Record<SoilMoistureStatus, string>>;
  /** Shown in place of the reading when there is none. Default `'—'`. */
  unknownLabel?: string;
  /** Label for the trend chart. Default `'Trend'`. */
  trendLabel?: string;
}

/**
 * Band → tone and default label.
 *
 * `dry` and `optimal` are genuinely a caution and a good outcome, so they keep
 * `warn` and `success`. **`wet` does not get one**: saturated soil is a
 * *reading*, not a verdict — whether it is bad depends on the crop — and §5 of
 * the brief reserves the status colours for things that really mean good or
 * bad. It takes the brand slot, as the base did.
 */
const STATUS_META: Record<
  SoilMoistureStatus,
  { label: string; tone: ProgressTone & FarmTone; chart?: ChartToneV4 }
> = {
  dry: { label: 'Dry', tone: 'warn', chart: 'warn' },
  optimal: { label: 'Optimal', tone: 'success', chart: 'success' },
  wet: { label: 'Saturated', tone: 'primary' },
};

/** Where the bands sit, when `status` is not supplied. */
function deriveStatus(pct: number): SoilMoistureStatus {
  if (pct < 30) return 'dry';
  if (pct > 70) return 'wet';
  return 'optimal';
}

/**
 * **V4 soil moisture card** — the web twin of the native
 * `SoilMoistureCardV4`, same props as {@link SoilMoistureCard} plus
 * `statusLabels`, `unknownLabel` and `trendLabel`.
 *
 * ## Five changes
 *
 * 1. **The trend is `LineChartV4`**, on the validated chart palette, and it is
 *    given a status tone **only** where the band genuinely is one. The base
 *    passed a semantic colour straight through as an identity, which is what
 *    `CHARTS-V4-BRIEF.md` §2/§3 retired.
 * 2. **The reading takes contrast-corrected ink.** A `3xl` number painted in
 *    the `warn` *fill* slot was the largest low-contrast element on the card.
 * 3. **The soil temperature carries an icon, not an emoji glued into the
 *    string.**
 * 4. **The reading is tabular**, so a dashboard of sensors lines up.
 * 5. **Every caption moves to `muted-text`.**
 *
 * With no `moisture` the card still composes: the badge, the label and the
 * trend all stand on their own.
 */
export const SoilMoistureCardV4 = React.forwardRef<HTMLDivElement, SoilMoistureCardV4Props>(
  function SoilMoistureCardV4(
    {
      moisture,
      label,
      status,
      trend,
      soilTemp,
      title = 'Soil moisture',
      chartHeight = 90,
      statusLabels,
      unknownLabel = '—',
      trendLabel = 'Trend',
      className,
      ...rest
    },
    ref
  ) {
    const pct = clampPercent(moisture);
    const band = status ?? (pct != null ? deriveStatus(pct) : 'optimal');
    const meta = STATUS_META[band];
    const bandLabel = statusLabels?.[band] ?? meta.label;
    const series = Array.isArray(trend) ? trend : [];

    return (
      <CardV4
        ref={ref}
        data-xen-soil-moisture=""
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        <div className="flex items-center gap-sm">
          <IconV4 glyph="💧" size="base" className={TONE_INK[meta.tone]} />
          <h3 className="min-w-0 flex-1 text-base font-semibold text-on-card">{title}</h3>
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {bandLabel}
          </BadgeV4>
        </div>

        <div className="flex items-baseline gap-xs">
          <span
            className={cn(
              'font-heading text-3xl font-bold [font-variant-numeric:tabular-nums]',
              TONE_INK[meta.tone]
            )}
          >
            {pct != null ? String(pct) : unknownLabel}
          </span>
          {pct != null ? <span className="text-base text-muted-text">%</span> : null}
          {soilTemp != null ? (
            <span className="ml-sm flex items-center gap-xs text-sm text-muted-text [font-variant-numeric:tabular-nums]">
              <IconV4 glyph="🌡️" size="sm" />
              {soilTemp}
            </span>
          ) : null}
        </div>

        {label != null ? <p className="text-xs text-muted-text">{label}</p> : null}

        {pct != null ? <ProgressV4 value={pct} tone={meta.tone} /> : null}

        {series.length > 1 ? (
          <LineChartV4
            data={series}
            height={chartHeight}
            // `LineChartV4` carries tone on the SERIES, not the chart: a chart
            // has no single meaning, a series does.
            series={[{ key: 'moisture', label: trendLabel, tone: meta.chart }]}
            caption={trendLabel}
            aria-label={`${title} ${trendLabel}, ${series.length} samples`}
          />
        ) : null}
      </CardV4>
    );
  }
);
