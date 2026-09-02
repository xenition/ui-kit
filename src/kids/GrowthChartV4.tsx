import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TONE_VAR } from '../primitives/internal/tone-v4';
import type { GrowthChartProps, GrowthMetric } from './GrowthChart';
import {
  KIDS_CARD_CLASS,
  KIDS_CARD_GROUND_CLASS,
  spokenLine,
  TRACK_VAR,
} from './internal/tone-v4';

/**
 * One measurement, and when it was taken.
 *
 * An ISO instant and a number. Declared identically on both twins — this is the
 * shape that gives the chart a date axis at all.
 */
export interface GrowthPoint {
  /** ISO 8601 instant, e.g. `'2024-03-04'` or `'2024-03-04T09:00:00Z'`. */
  at: string;
  /** The measurement, in the chart's `unit`. */
  value: number;
}

export interface GrowthChartV4Props extends Omit<GrowthChartProps, 'data'> {
  /**
   * The base's bare series, kept so a `GrowthChart` swapped for a
   * `GrowthChartV4` behaves exactly as it did. Optional here — a caller with
   * `points` has no numbers to invent for it. `points` wins when both are set.
   */
  data?: number[];
  /** Measurements with their dates. Plotted on a real time axis. */
  points?: GrowthPoint[];
  /** A reference band to shade behind the curve, in the chart's own unit. */
  percentileBand?: { low: number; high: number };
  /** Render a measurement. Default `'82 cm'`. */
  formatValue?: (value: number, unit?: string) => string;
}

/** Glyph and default word per metric. */
const METRIC_META_V4: Record<GrowthMetric, { glyph: string; label: string }> = {
  height: { glyph: '📏', label: 'Height' },
  weight: { glyph: '⚖️', label: 'Weight' },
  head: { glyph: '🧢', label: 'Head circumference' },
  other: { glyph: '📈', label: 'Growth' },
};

/**
 * The plot's inset, in viewBox units.
 *
 * The vertical one is the fix for a real defect: with no inset a single
 * measurement — or the lowest of several — landed exactly on the bottom edge
 * and had half its dot clipped off by the SVG's own boundary.
 */
const PAD_X = 3;
const PAD_Y = 8;

/** Above this many samples a dot per datum is a caterpillar, not a chart. */
const DOT_LIMIT = 20;

/** One plotted sample: a position on each axis and the word for its x. */
interface Sample {
  x: number;
  y: number;
  label: string;
}

/**
 * Read the caller's measurements into plottable samples.
 *
 * `points` are sorted by their instant, which is the other half of the base's
 * defect: an unsorted array plotted on its index drew a *descending* curve for
 * a growing child, and nothing in the component noticed.
 */
function toSamples(points: GrowthPoint[] | undefined, data: number[] | undefined): Sample[] {
  if (points && points.length > 0) {
    return points
      .filter(
        (point) =>
          point != null && Number.isFinite(point.value) && Number.isFinite(Date.parse(point.at))
      )
      .map((point) => ({
        x: Date.parse(point.at),
        y: point.value,
        label: new Date(point.at).toLocaleDateString(),
      }))
      .sort((a, b) => a.x - b.x);
  }
  const series = Array.isArray(data) ? data : [];
  return series
    .map((value, index) => ({ x: index, y: value, label: `#${index + 1}` }))
    .filter((sample) => Number.isFinite(sample.y));
}

/**
 * **V4 growth chart** — same props as {@link GrowthChart} plus `points`,
 * `percentileBand` and `formatValue`.
 *
 * ## Six changes
 *
 * 1. **There is a date axis.** `data: number[]` plotted on the array index, so
 *    measurements at two months, four months and three years rendered evenly
 *    spaced — a growth curve whose whole subject is *rate* drawn with no time
 *    on it. `points` carries the instant with the measurement and the plot
 *    positions on it.
 * 2. **Unsorted input no longer draws a descending curve for a growing
 *    child.** The base plotted whatever order it was handed. `points` are
 *    sorted by `at` before anything is drawn.
 * 3. **A single measurement is not clipped.** One datum landed on the bottom
 *    edge of the SVG with half its dot outside the viewBox. The plot carries an
 *    inset, and a series with no spread on an axis is centred on it rather than
 *    pinned to an edge.
 * 4. **The series reaches a screen reader as numbers.** It was `role="img"`
 *    with a label saying only the latest value — the shape of a child's growth,
 *    which is the entire point, was unavailable. There is a real table of every
 *    date and measurement behind the plot, and the plot itself is `aria-hidden`
 *    rather than competing with it.
 * 5. **A percentile band can be drawn.** `percentile` was a caption with
 *    nothing behind it; a band is what makes a curve readable against a norm.
 *    It is a neutral wash, not a status colour — a child below a band has not
 *    triggered a system error.
 * 6. **Tokens.** `font-extrabold` is off the kit's weight scale, the skeleton
 *    was `bg-neutral-200` (a ramp step that inverts under `[data-theme=dark]`),
 *    the readout inked with the `primary` *fill* rather than `primary-text`,
 *    and the card sits on `card`/`on-card` so it still reads as raised in dark
 *    mode.
 */
export const GrowthChartV4 = React.forwardRef<HTMLDivElement, GrowthChartV4Props>(
  function GrowthChartV4(
    {
      data,
      points,
      metric = 'height',
      unit,
      percentile,
      percentileBand,
      color = 'primary',
      height = 160,
      loading = false,
      formatValue,
      emptyLabel = 'No measurements logged yet',
      className,
      ...rest
    },
    ref
  ) {
    const meta = METRIC_META_V4[metric];
    const show =
      formatValue ??
      ((value: number, suffix?: string) => `${value}${suffix ? ` ${suffix}` : ''}`);
    const shell = cn('flex flex-col gap-sm', KIDS_CARD_CLASS, KIDS_CARD_GROUND_CLASS, className);

    if (loading) {
      return (
        <div
          {...rest}
          ref={ref}
          data-xen-growth-chart=""
          role="status"
          aria-live="polite"
          aria-label={meta.label}
          className={shell}
        >
          <SkeletonV4 className="h-3 w-2/5" />
          <SkeletonV4 className="w-full rounded-[var(--xen-radius-md)]" style={{ height }} />
        </div>
      );
    }

    const samples = toSamples(points, data);

    if (samples.length === 0) {
      return (
        <EmptyStateV4
          {...rest}
          ref={ref}
          data-xen-growth-chart=""
          className={className}
          icon={<span className="text-3xl">📉</span>}
          title={`${meta.glyph} ${meta.label}`}
          description={emptyLabel}
        />
      );
    }

    const xs = samples.map((sample) => sample.x);
    const ys = samples.map((sample) => sample.y);
    const bandLow = percentileBand ? Math.min(percentileBand.low, percentileBand.high) : undefined;
    const bandHigh = percentileBand ? Math.max(percentileBand.low, percentileBand.high) : undefined;

    const xMin = Math.min(...xs);
    const xMax = Math.max(...xs);
    const yMin = Math.min(...ys, ...(bandLow !== undefined ? [bandLow] : []));
    const yMax = Math.max(...ys, ...(bandHigh !== undefined ? [bandHigh] : []));

    // A flat axis is centred, not pinned. One measurement has no spread on
    // either axis, and the base drew it on the floor of the plot.
    const plotX = (x: number): number =>
      xMax > xMin ? PAD_X + ((x - xMin) / (xMax - xMin)) * (100 - PAD_X * 2) : 50;
    const plotY = (y: number): number =>
      yMax > yMin ? 100 - PAD_Y - ((y - yMin) / (yMax - yMin)) * (100 - PAD_Y * 2) : 50;

    const path = samples.map((sample) => `${plotX(sample.x)},${plotY(sample.y)}`).join(' ');
    const latest = samples[samples.length - 1];
    const latestText = latest ? show(latest.y, unit) : undefined;
    const caption = spokenLine([`${meta.label} over time`, latestText, percentile]);

    return (
      <div {...rest} ref={ref} data-xen-growth-chart="" className={shell}>
        <div className="flex items-baseline justify-between gap-sm">
          <span className="text-base font-semibold text-on-card">
            <span aria-hidden="true">{`${meta.glyph} `}</span>
            {meta.label}
          </span>
          {latestText ? (
            <span className="text-lg font-bold text-primary-text">{latestText}</span>
          ) : null}
        </div>
        {percentile ? <p className="text-xs text-muted-text">{percentile}</p> : null}

        {/*
          The plot is decoration over the table below it. A chart drawn as
          `role="img"` with one number in its label hides the shape, which is
          the only thing a growth curve is for.
        */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height }}
        >
          {bandLow !== undefined && bandHigh !== undefined ? (
            <rect
              x={0}
              y={Math.min(plotY(bandHigh), plotY(bandLow))}
              width={100}
              height={Math.abs(plotY(bandLow) - plotY(bandHigh))}
              fill={TRACK_VAR}
            />
          ) : null}
          {samples.length > 1 ? (
            <polyline
              points={path}
              fill="none"
              stroke={TONE_VAR[color]}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
          {samples.length <= DOT_LIMIT
            ? samples.map((sample, index) => {
                const cx = plotX(sample.x);
                const cy = plotY(sample.y);
                return (
                  // A zero-length round-capped line, not a `<circle>`: under a
                  // non-uniform `preserveAspectRatio="none"` scale a circle is
                  // drawn as an ellipse, and a round cap is not.
                  <line
                    key={index}
                    x1={cx}
                    y1={cy}
                    x2={cx}
                    y2={cy}
                    stroke={TONE_VAR[color]}
                    strokeWidth={7}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })
            : null}
        </svg>

        <table className="sr-only">
          <caption>{caption}</caption>
          <thead>
            <tr>
              <th scope="col">{meta.label}</th>
              <th scope="col">{unit ?? meta.label}</th>
            </tr>
          </thead>
          <tbody>
            {samples.map((sample, index) => (
              <tr key={index}>
                <th scope="row">{sample.label}</th>
                <td>{show(sample.y, unit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
