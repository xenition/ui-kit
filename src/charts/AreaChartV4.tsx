import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { CHART_GRID_VAR, ChartEmptyV4, useChartV4 } from './internal-v4';
import {
  CHART_AREA_FILL_ALPHA,
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
  foldChartSeries,
} from '../primitives/internal/v4-chart';
import {
  CHART_AUTO_DOT_MAX,
  CHART_FIGURE_V4_CSS,
  CHART_FIGURE_V4_STYLE_ID,
  ChartDotV4,
  ChartLegendV4,
  ChartSwatchV4,
  plotSeriesV4,
  seriesInkV4,
  thinAxisIndicesV4,
  toSeriesRowsV4,
  type ChartFigureV4Props,
  type ChartIndicatorV4,
  type ChartLegendItemV4,
  type ChartSeriesV4,
} from './LineChartV4';

/**
 * How much of its line's colour an area fill keeps.
 *
 * Brief §4.4: "Area fills sit under their line at reduced alpha; the line keeps
 * full strength. The fill is context, the line is the data." §5 Group A then
 * says to "retire `fillOpacity` guesses" — and a guess is what the two base
 * twins shipped: `0.18` on web, `0.2` on native, for the same mark.
 *
 * The number now lives in `primitives/internal/v4-chart.ts` beside
 * `CHART_MARK`, where the two twins and `RadarChartV4` read the *same* binding
 * rather than four copies that agree today. Re-exported here so the specs and
 * call sites that read it from this file are unchanged.
 */
export { CHART_AREA_FILL_ALPHA };

export interface AreaChartV4Props
  extends ChartFigureV4Props,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** One series (`number[]`, the base's shape) or several (`number[][]`). */
  data: number[] | number[][];
  /** Names and tones for the series, index-aligned with `data`. */
  series?: ChartSeriesV4[];
  /** Category labels under the plot, one per point. Thinned, never rotated. */
  labels?: string[];
  /** The viewBox width. Geometry only — the plot still fills its column. */
  width?: number;
  /** Value at the top of the plot. Defaults to the largest datum. */
  max?: number;
  /** Value at the bottom of the plot. Defaults to the smallest datum. */
  min?: number;
  /**
   * Stack the series into bands rather than overlaying them.
   *
   * A stack is the honest form when the series are parts of a whole; an
   * overlay is honest when they are independent quantities. The base offered
   * neither, because it offered one series.
   */
  stacked?: boolean;
  /**
   * Draw a dot at each datum. Defaults to **automatic**: on at
   * {@link CHART_AUTO_DOT_MAX} points or fewer, off above.
   */
  showDots?: boolean;
  /** Horizontal reference rules behind the plot. Default `true`. */
  grid?: boolean;
  /** Crosshair + tooltip on hover. Default `true`. */
  tooltip?: boolean;
  /** How the tooltip draws its per-series swatch. Default `'line'`. */
  indicator?: ChartIndicatorV4;
  /** Direct series labels at the end of each band. Defaults on at four or fewer. */
  directLabels?: boolean;
  /** How a value is spoken and printed. Default `String`. */
  formatValue?: (value: number) => string;
  /** Fired when a point is clicked, and on the native twin when it is pressed. */
  onPointPress?: (index: number) => void;
}

/** Clamp into `[0, 1]`, treating a non-finite input as 0. */
const clamp01 = (n: number): number => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);

/** A point in viewBox units. */
interface PlotPoint {
  x: number;
  y: number;
}

/**
 * The area under a run of points, closed down to the baseline **or** onto the
 * band beneath it when the chart is stacked.
 *
 * The lower edge is walked in reverse so the path never crosses itself; a
 * self-crossing area is what produces the hourglass artefact the base's
 * `L last.x height L first.x height Z` shortcut shows the moment two series
 * are drawn on one plot.
 */
function areaPath(top: PlotPoint[], bottom: PlotPoint[] | null, baseline: number): string {
  if (top.length === 0) return '';
  const first = top[0] as PlotPoint;
  const last = top[top.length - 1] as PlotPoint;
  const up = top.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
  if (bottom === null) {
    return `${up} L${last.x.toFixed(2)} ${baseline} L${first.x.toFixed(2)} ${baseline} Z`;
  }
  const down = [...bottom]
    .reverse()
    .map((p) => `L${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');
  return `${up} ${down} Z`;
}

/** A polyline's `points` string. */
const polyOf = (pts: PlotPoint[]): string =>
  pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

/**
 * **V4 area chart** — `LineChartV4`'s twin, for the case where the space
 * under the line means something.
 *
 * ## What the base got wrong
 *
 * The same single-series ceiling as `LineChart`, plus two of its own:
 *
 * 1. **`fillOpacity={0.18}` on web, `fillOpacity = 0.2` on native.** One mark,
 *    two numbers, neither of them a decision — brief §1 rule 1 lists
 *    `fillOpacity={0.15}` among the literals this pass exists to retire. See
 *    {@link CHART_AREA_FILL_ALPHA} for the number and the argument.
 * 2. **The closing path crosses itself.** `M…L last.x baseline L first.x
 *    baseline Z` closes along the bottom from right to left *after* jumping
 *    straight down, which happens to look right for one series over a flat
 *    baseline and produces a bow-tie the moment the lower edge is another
 *    series. That is exactly what stacking needs, so it is fixed here rather
 *    than worked around.
 *
 * ## Stacking, and the gap that makes it readable
 *
 * Brief §5: "Stacked areas get `CHART_MARK.gap` between bands." That is not
 * decoration — it is the secondary encoding the palette's 6–8 CVD band obliges
 * (§1 rule 5). Two adjacent bands a dichromat cannot separate by hue are still
 * visibly two bands when a hairline of page runs between them.
 *
 * The gap is painted as a `CHART_MARK.gap`-wide stroke of `--xen-surface`
 * along each band's lower boundary, carrying
 * `vector-effect="non-scaling-stroke"` so it is exactly 2 painted pixels
 * whatever the responsive viewBox does to the axes. Insetting the geometry
 * instead would make the gap wider on a wide screen and invisible on a narrow
 * one, which is how a "2px separator" becomes a 6px stripe on a desktop.
 *
 * Everything else — the figure frame, the crosshair, the legend, the derived
 * label, the dot geometry — is `LineChartV4`'s and is composed from it rather
 * than re-typed.
 */
export const AreaChartV4 = React.forwardRef<HTMLDivElement, AreaChartV4Props>(function AreaChartV4(
  {
    data,
    series,
    labels,
    title,
    summary,
    caption,
    legend,
    height = 160,
    width = 320,
    max,
    min,
    stacked = false,
    showDots,
    grid = true,
    tooltip = true,
    indicator = 'line',
    directLabels,
    loading = false,
    emptyLabel = 'No data',
    animate = true,
    formatValue = String,
    onPointPress,
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(CHART_FIGURE_V4_STYLE_ID, CHART_FIGURE_V4_CSS);
  const chart = useChartV4(animate);
  const [active, setActive] = React.useState<number | null>(null);

  const rows = toSeriesRowsV4(data);
  const pointCount = rows.reduce((n, row) => Math.max(n, row.length), 0);

  if (loading) {
    return (
      <div ref={ref} className={cn('flex w-full flex-col gap-md', className)} {...rest}>
        <SkeletonV4 variant="rect" height={height} />
      </div>
    );
  }
  if (pointCount === 0) {
    return (
      <div ref={ref} className={cn('flex w-full flex-col gap-md', className)} {...rest}>
        <ChartEmptyV4 label={emptyLabel} height={height} />
      </div>
    );
  }

  // A stack plots cumulative totals; an overlay plots the values themselves.
  // Both then share one scale, so the bands of a stack always reach the top.
  const cumulative: number[][] = [];
  rows.forEach((row, i) => {
    const below = cumulative[i - 1];
    cumulative.push(row.map((v, j) => v + (below?.[j] ?? 0)));
  });
  const plotted = stacked ? cumulative : rows;

  const flat = plotted.flat();
  const rawFlat = rows.flat();
  const hi = max ?? Math.max(...flat);
  // A stack is read against zero — a band that floats off a non-zero baseline
  // is not a part of a whole any more. An overlay keeps the data's own floor.
  const lo = min ?? (stacked ? Math.min(0, ...flat) : Math.min(...flat));
  const span = hi - lo || 1;
  const baseline = height - clamp01((0 - lo) / span) * height;

  /*
    Past the palette's five slots the tail shares the last one rather than
    throwing. The palette primitive still throws — asking it for a sixth slot is
    a mistake in the caller's own code — but this chart's series count arrives
    with the DATA, and a `RangeError` out of render takes the screen down.
    `foldChartSeries` in `primitives/internal/v4-chart.ts` draws that line: the
    primitive throws, the component folds.

    Bands and lines are not summed the way a stack's or a pie's segments are,
    because a line is not a part of a whole — the average of three series is a
    fourth series nobody asked for. So the tail keeps its own shapes, shares the
    last slot, and the legend carries ONE row for it named
    `CHART_OVERFLOW_LABEL`. What a reader loses is the ability to tell the sixth
    line from the seventh, which is exactly what the palette was refusing to
    promise in the first place.
  */
  const fold = foldChartSeries(plotted);
  const slotOf = (i: number): number => Math.min(i, CHART_SERIES_COUNT - 1);

  const resolved = plotted.map((values, i) => {
    const cfg = series?.[i];
    return {
      key: cfg?.key ?? `series-${i}`,
      label: cfg?.label ?? `Series ${i + 1}`,
      values: rows[i] ?? values,
      ink: seriesInkV4(slotOf(i), cfg?.tone),
      points: plotSeriesV4(values, lo, span, width, height),
    };
  });

  const dots = showDots ?? pointCount <= CHART_AUTO_DOT_MAX;
  const showLegend = legend === undefined ? resolved.length >= 2 : legend !== false;
  const legendItems: ChartLegendItemV4[] = Array.isArray(legend)
    ? legend
    : fold.didFold
      ? [
          ...fold.kept.map((_, i) => ({
            key: resolved[i]?.key ?? `series-${i}`,
            label: resolved[i]?.label ?? `Series ${i + 1}`,
            slot: i,
            tone: series?.[i]?.tone,
          })),
          {
            key: 'chart-overflow',
            label: `${CHART_OVERFLOW_LABEL} (${fold.folded.length} series)`,
            slot: CHART_SERIES_COUNT - 1,
          },
        ]
      : resolved.map((s, i) => ({ key: s.key, label: s.label, slot: i, tone: series?.[i]?.tone }));
  const showDirect =
    directLabels ??
    (resolved.length >= 2 && resolved.length <= CHART_DIRECT_LABEL_MAX && series !== undefined);

  const derivedLabel = [
    stacked ? 'Stacked area chart' : 'Area chart',
    typeof title === 'string' ? title : undefined,
    resolved.length > 1 ? `${resolved.length} series` : undefined,
    `${pointCount} point${pointCount === 1 ? '' : 's'}`,
    `${formatValue(Math.min(...rawFlat))} to ${formatValue(Math.max(...rawFlat))}`,
  ]
    .filter(Boolean)
    .join(', ');

  const pctOf = (i: number): string => `${pointCount === 1 ? 50 : (i / (pointCount - 1)) * 100}%`;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={derivedLabel}
      className={cn('flex w-full min-w-0 flex-col gap-md', className)}
      {...rest}
    >
      {title !== undefined || summary !== undefined || caption !== undefined ? (
        <div className="flex min-w-0 flex-col gap-xs">
          {title !== undefined ? (
            <TextV4 size="base" weight="semibold" tone="onSurface">
              {title}
            </TextV4>
          ) : null}
          {summary !== undefined ? (
            <TextV4 size="2xl" weight="bold" tone="onSurface" numeric="tabular">
              {summary}
            </TextV4>
          ) : null}
          {caption !== undefined ? (
            <TextV4 size="sm" tone="mutedText">
              {caption}
            </TextV4>
          ) : null}
        </div>
      ) : null}

      <div
        className="relative w-full"
        style={{ height }}
        onPointerMove={
          tooltip
            ? (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const w = rect.width || 1;
                setActive(Math.round(clamp01((e.clientX - rect.left) / w) * (pointCount - 1)));
              }
            : undefined
        }
        onPointerLeave={tooltip ? () => setActive(null) : undefined}
        onClick={
          onPointPress !== undefined
            ? (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const w = rect.width || 1;
                onPointPress(
                  Math.round(clamp01((e.clientX - rect.left) / w) * (pointCount - 1))
                );
              }
            : undefined
        }
      >
        <svg
          {...chart.rootProps}
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height={height}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
          className="overflow-visible"
        >
          {grid ? (
            <line
              data-xen-v4-chart-grid=""
              x1={0}
              y1={baseline}
              x2={width}
              y2={baseline}
              stroke={CHART_GRID_VAR}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ) : null}

          {/*
            Fills first, every one of them, then the gaps, then the strokes.
            Painting a band's stroke before the next band's fill would bury it:
            the fill is context and the line is the data, so the data goes on
            top (§4.4).
          */}
          {resolved.map((s, i) => (
            <path
              key={`fill-${s.key}`}
              data-xen-v4-chart-area={s.key}
              d={areaPath(
                s.points,
                stacked && i > 0 ? (resolved[i - 1]?.points ?? null) : null,
                baseline
              )}
              fill={s.ink}
              fillOpacity={CHART_AREA_FILL_ALPHA}
              stroke="none"
            />
          ))}

          {stacked
            ? resolved.slice(0, -1).map((s) => (
                <polyline
                  key={`gap-${s.key}`}
                  data-xen-v4-chart-gap={s.key}
                  points={polyOf(s.points)}
                  fill="none"
                  stroke="var(--xen-surface)"
                  strokeWidth={CHART_MARK.gap}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))
            : null}

          {resolved.map((s) => (
            <polyline
              key={`line-${s.key}`}
              data-xen-v4-chart-line={s.key}
              points={polyOf(s.points)}
              fill="none"
              stroke={s.ink}
              strokeWidth={CHART_MARK.stroke}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {resolved.map((s) =>
            dots || s.points.length === 1
              ? s.points.map((p, i) => (
                  <ChartDotV4 key={`${s.key}-${i}`} x={p.x} y={p.y} ink={s.ink} />
                ))
              : null
          )}

          {active !== null && tooltip ? (
            <line
              data-xen-v4-chart-crosshair=""
              x1={pointCount === 1 ? width / 2 : (active / (pointCount - 1)) * width}
              y1={0}
              x2={pointCount === 1 ? width / 2 : (active / (pointCount - 1)) * width}
              y2={height}
              stroke={CHART_GRID_VAR}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
        </svg>

        {showDirect
          ? resolved.map((s) => {
              const last = s.points[s.points.length - 1];
              return last === undefined ? null : (
                <span
                  key={`direct-${s.key}`}
                  data-xen-v4-chart-direct-label={s.key}
                  className="pointer-events-none absolute -translate-y-1/2 pl-xs"
                  style={{ left: `${(last.x / width) * 100}%`, top: `${(last.y / height) * 100}%` }}
                >
                  <TextV4 size="xs" tone="mutedText">
                    {s.label}
                  </TextV4>
                </span>
              );
            })
          : null}

        {active !== null && tooltip ? (
          <div
            data-xen-v4-chart-tip=""
            role="presentation"
            className="bg-popover text-on-popover border-border absolute top-0 z-10 flex flex-col gap-xs rounded-[var(--xen-radius-md)] border px-sm py-xs"
            style={{ left: pctOf(active) }}
          >
            {labels?.[active] !== undefined ? (
              <TextV4 size="xs" tone="mutedText">
                {labels[active]}
              </TextV4>
            ) : null}
            {resolved.map((s) => {
              const v = s.values[active];
              return v === undefined ? null : (
                <span key={`tip-${s.key}`} className="inline-flex items-center gap-xs">
                  <ChartSwatchV4 ink={s.ink} indicator={indicator} />
                  <TextV4 size="xs" tone="onPopover">
                    {s.label}
                  </TextV4>
                  <TextV4 size="xs" weight="semibold" tone="onPopover" numeric="tabular">
                    {formatValue(v)}
                  </TextV4>
                </span>
              );
            })}
          </div>
        ) : null}
      </div>

      {labels !== undefined && labels.length > 0 ? (
        <div data-xen-v4-chart-axis="" className="relative h-[var(--xen-text-xs)] w-full">
          {thinAxisIndicesV4(Math.min(labels.length, pointCount)).map((i) => (
            <span
              key={`axis-${i}`}
              className="absolute -translate-x-1/2"
              style={{ left: pctOf(i) }}
            >
              <TextV4 size="xs" tone="mutedText">
                {labels[i]}
              </TextV4>
            </span>
          ))}
        </div>
      ) : null}

      {showLegend ? <ChartLegendV4 items={legendItems} indicator="dot" /> : null}
    </div>
  );
});
