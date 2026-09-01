import * as React from 'react';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import {
  CHART_AREA_FILL_ALPHA,
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  foldChartSeries,
  type ChartSeriesV4,
} from '../primitives/internal/v4-chart';
import {
  CHART_AXIS_VAR,
  CHART_GRID_VAR,
  ChartEmptyV4,
  chartVar,
  useChartV4,
} from './internal-v4';
import {
  ChartFigureV4,
  RadialLegendV4,
  toneVarV4,
} from './PieChartV4';

/**
 * How many polygons a radar may carry.
 *
 * **Four, and it throws at five** — brief §5's "cap at four series and say so:
 * a radar with five overlapping polygons is unreadable regardless of palette".
 *
 * The reasoning is the same shape as `CHART_SCATTER_SERIES_CAP`'s and lands on
 * a different number for a different reason. A scatter is capped at three
 * because *any two marks can sit side by side*, which is the all-pairs contrast
 * test and the palette clears it on three slots. A radar's problem is not
 * contrast at all — every polygon crosses every other polygon at up to `n`
 * points, so the fifth one adds crossings, not information, and no palette can
 * fix a shape you cannot trace with your eye.
 *
 * It throws rather than dropping the fifth series, for the reason `chartVar`
 * throws rather than wrapping: silently rendering four of five series is a
 * chart that lies about its own data, and a caller who meant it wants a facet
 * or a small-multiple, not a quieter failure.
 */
export const RADAR_SERIES_CAP = 4;

/**
 * The alpha a series polygon's fill sits at under its full-strength stroke.
 *
 * Canonical in `primitives/internal/v4-chart.ts` — that module was closed to
 * the build groups while this file was written, which is exactly why the same
 * `0.18` was declared four times across the two twins and the two forms.
 * Re-exported under the old name so the specs and call sites that read it from
 * here keep working.
 */
export { CHART_AREA_FILL_ALPHA };

/**
 * How much of the radius the plot keeps when axis labels ring it.
 *
 * A ratio, not a spacing token, and deliberately so: the gutter has to be
 * expressed in the same units as the `viewBox`, and a `viewBox` unit is not a
 * CSS pixel once the SVG is scaled. Sharing the ratio between the twins is also
 * what keeps a native radar and a web radar the same drawing — the native base
 * reserved a flat `8` and the web base reserved `1`, so the two were visibly
 * different components.
 */
const LABELLED_PLOT_RATIO = 0.82;

/** How many concentric grid rings a radar draws when the caller says nothing. */
const DEFAULT_RINGS = 4;

/**
 * A series' name and its status opt-in — brief §4.3's config/data split.
 * Canonical in `primitives/internal/v4-chart.ts`; re-exported here because the
 * radar's props reference it and callers import it from this file.
 */
export type { ChartSeriesV4 };

export interface RadarChartV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /**
   * One row of per-axis values per series, or a single row for the one-series
   * case. Short rows are padded with zero; non-finite values read as zero.
   *
   * The bases disagreed about the name and the shape — web took
   * `data?: number[]` plus `series?: number[][]`, native took a required
   * `series: number[][]` — and one of those spellings collides with §4.3, which
   * reserves `series` for the *config* array on all twenty components. V4
   * closes the parity gap on §4.3's side: `data` is the numbers, `series` is
   * what they are called.
   */
  data?: readonly number[] | readonly number[][];
  /** Axis names, drawn around the perimeter. Also fixes the spoke count. */
  axes?: readonly string[];
  /** Per-series names and status opt-ins, by array position (§4.3). */
  series?: readonly ChartSeriesV4[];
  /** The value mapped to the outer ring. Defaults to the largest datum. */
  max?: number;
  /** Concentric grid rings. Default 4. */
  rings?: number;
  /** Diameter in px. Default 200 — the web base's number, on both twins now. */
  size?: number;
  /** The descriptive headline. HIG's rule: say the takeaway. */
  title?: string;
  /** The one loud number, drawn above the plot. */
  summary?: string;
  /** The quiet line under the summary. */
  caption?: string;
  /** Show the legend. Default `true` at two or more series (§4.2). */
  legend?: boolean;
  /** Swap the plot for a `SkeletonV4` at the same footprint (§4.5). */
  loading?: boolean;
  /** The empty state's wording. */
  emptyLabel?: string;
  /** Run the entrance reveal. Default `true`; reduced motion fades instead. */
  animate?: boolean;
}

/** Normalise the two accepted `data` shapes into rows. */
function toRows(data: RadarChartV4Props['data']): number[][] {
  if (data === undefined || data.length === 0) return [];
  const first = data[0];
  if (typeof first === 'number') return [(data as readonly number[]).slice()];
  return (data as readonly (readonly number[])[]).map((row) => row.slice());
}

/** A point at spoke `i` of `n`, `radius` from the centre, starting at 12. */
function spoke(c: number, radius: number, i: number, n: number): [number, number] {
  const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
  return [c + radius * Math.cos(angle), c + radius * Math.sin(angle)];
}

/** A point list for a `<polygon>`, with no `NaN` in it. */
function points(list: readonly [number, number][]): string {
  return list
    .map(([x, y]) => `${Number.isFinite(x) ? x.toFixed(2) : '0'},${Number.isFinite(y) ? y.toFixed(2) : '0'}`)
    .join(' ');
}

/**
 * **V4 radar chart** — rings that are grid, axes that are axes, and a hard cap
 * at four polygons.
 *
 * Five changes against the base.
 *
 * 1. **The chrome stopped being a border.** The base drew its rings with
 *    `stroke="var(--xen-border)"` and had no spokes on web at all. §3's third
 *    decision names that substitution as the bug — a hairline colour doing a
 *    grid's job — so the rings take `CHART_GRID_VAR` and the spokes take
 *    `CHART_AXIS_VAR`, "one step more present than the grid behind it", exactly
 *    as §5 asks.
 * 2. **The spokes stay hairline.** §4.4 gives an axis `CHART_MARK.stroke` (2),
 *    and that is right for the single baseline of a bar chart. A radar's spokes
 *    are not that line: there are `n` of them, they run *under* the data, and at
 *    2 they tie the series stroke drawn on top of them — at which point the
 *    reader cannot tell a polygon edge from an axis. So the spokes take the
 *    axis *colour* §5 specifies at the grid's hairline weight, which is the
 *    one bare number §1 rule 1 allows.
 * 3. **Fill under stroke, at a named alpha.** See {@link CHART_AREA_FILL_ALPHA}.
 * 4. **Four series, then it folds.** See {@link RADAR_SERIES_CAP}. The base
 *    cycled `seriesColor` with `i % 5`, so a fifth polygon was the first one's
 *    colour drawn over the top of it.
 * 5. **It became a figure.** Title, summary, caption and a legend — the legend
 *    being the identity channel's redundancy, which a radar needs more than any
 *    other form in this group because its polygons overlap by construction and
 *    the `CHART_MARK.gap` of surface that separates a pie's slices has nowhere
 *    to go here.
 */
export const RadarChartV4 = React.forwardRef<HTMLDivElement, RadarChartV4Props>(
  function RadarChartV4(
    {
      data,
      axes,
      series,
      max,
      rings = DEFAULT_RINGS,
      size = 200,
      title,
      summary,
      caption,
      legend,
      loading = false,
      emptyLabel,
      animate = true,
      className,
      ...rest
    },
    ref
  ) {
    const chart = useChartV4(animate);
    const rows = React.useMemo(() => toRows(data), [data]);

    /*
      Past `RADAR_SERIES_CAP` the tail shares the last slot rather than
      throwing. The cap is unmoved and the reason for it is unchanged — five
      overlapping polygons are unreadable regardless of palette — but a radar's
      series count arrives with the DATA, and a `RangeError` out of render takes
      the page down. `foldChartSeries` draws the line the whole module now
      follows: the primitive throws, the component folds.

      Polygons are not averaged into one, because the mean of three profiles is
      a fourth profile nobody measured. The tail keeps its own shapes, shares
      the last slot, and the legend carries one row named
      `CHART_OVERFLOW_LABEL` — which is the honest statement: these are the
      series past the point the chart can distinguish.
    */
    const fold = foldChartSeries(rows, RADAR_SERIES_CAP);
    const slotOf = (i: number): number => Math.min(i, RADAR_SERIES_CAP - 1);

    const frame = (plot: React.ReactNode, legendNode?: React.ReactNode): React.ReactElement => (
      <ChartFigureV4
        ref={ref}
        title={title}
        summary={summary}
        caption={caption}
        legend={legendNode}
        className={className}
        {...rest}
      >
        {plot}
      </ChartFigureV4>
    );

    if (loading) return frame(<SkeletonV4 variant="circle" width={size} height={size} />);

    const axisCount = Math.max(axes?.length ?? 0, ...rows.map((row) => row.length), 0);
    if (rows.length === 0 || axisCount === 0) {
      return frame(<ChartEmptyV4 label={emptyLabel} height={size} />);
    }

    const c = size / 2;
    const hasLabels = axes !== undefined && axes.length > 0;
    // The label ring eats into the plot; without labels the plot is the circle
    // less a hairline, so the stroke stays inside the viewBox.
    const r = hasLabels ? (size / 2) * LABELLED_PLOT_RATIO : size / 2 - 1;

    // Floored at 1 so it is always a safe divisor — a radar of all zeros is a
    // legitimate dataset ("nobody scored on anything") and must draw a
    // collapsed polygon at the centre, not `NaN` in every point.
    const finite = rows.flat().filter((v) => Number.isFinite(v));
    const ceiling = Math.max(
      max !== undefined && Number.isFinite(max) ? max : finite.length > 0 ? Math.max(...finite) : 1,
      1
    );

    const ringCount = Number.isFinite(rings) ? Math.max(Math.round(rings), 1) : DEFAULT_RINGS;
    const seriesFill = (i: number): string => {
      const tone = series?.[i]?.tone;
      return tone === undefined ? chartVar(slotOf(i)) : toneVarV4(tone);
    };

    const showLegend = legend ?? rows.length > 1;
    const legendNode = showLegend ? (
      <RadialLegendV4
        items={
          fold.didFold
            ? [
                ...fold.kept.map((_, i) => {
                  const tone = series?.[i]?.tone;
                  return {
                    label: series?.[i]?.label ?? `Series ${i + 1}`,
                    slot: i,
                    ...(tone === undefined ? {} : { tone }),
                  };
                }),
                {
                  label: `${CHART_OVERFLOW_LABEL} (${fold.folded.length} series)`,
                  slot: RADAR_SERIES_CAP - 1,
                },
              ]
            : rows.map((_, i) => {
                const tone = series?.[i]?.tone;
                return {
                  label: series?.[i]?.label ?? `Series ${i + 1}`,
                  slot: i,
                  ...(tone === undefined ? {} : { tone }),
                };
              })
        }
      />
    ) : undefined;

    const spoken =
      `Radar chart, ${rows.length} series, ${axisCount} ax${axisCount === 1 ? 'is' : 'es'}, ` +
      `0 to ${ceiling}`;

    return frame(
      <svg
        {...chart.rootProps}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label={spoken}
        className="inline-block"
      >
        {Array.from({ length: ringCount }, (_, ri) => {
          const rr = (r * (ri + 1)) / ringCount;
          return (
            <polygon
              key={`ring-${ri}`}
              points={points(Array.from({ length: axisCount }, (_, i) => spoke(c, rr, i, axisCount)))}
              fill="none"
              stroke={CHART_GRID_VAR}
              strokeWidth={1}
            />
          );
        })}
        {Array.from({ length: axisCount }, (_, i) => {
          const [x, y] = spoke(c, r, i, axisCount);
          return (
            <line
              key={`spoke-${i}`}
              x1={c}
              y1={c}
              x2={x.toFixed(2)}
              y2={y.toFixed(2)}
              stroke={CHART_AXIS_VAR}
              strokeWidth={1}
            />
          );
        })}
        {rows.map((row, si) => {
          const paint = seriesFill(si);
          const pts = Array.from({ length: axisCount }, (_, i) => {
            const raw = row[i];
            const v = Number.isFinite(raw) ? Math.min(Math.max(raw as number, 0), ceiling) : 0;
            return spoke(c, (v / ceiling) * r, i, axisCount);
          });
          return (
            <polygon
              key={series?.[si]?.key ?? `series-${si}`}
              points={points(pts)}
              fill={paint}
              fillOpacity={CHART_AREA_FILL_ALPHA}
              stroke={paint}
              strokeWidth={CHART_MARK.stroke}
            >
              <title>{series?.[si]?.label ?? `Series ${si + 1}`}</title>
            </polygon>
          );
        })}
        {hasLabels
          ? (axes as readonly string[]).slice(0, axisCount).map((label, i) => {
              // Halfway across the gutter the plot gave up: clear of the outer
              // ring, and still inside the viewBox at 3 and 9 o'clock.
              const [x, y] = spoke(c, (r + size / 2) / 2, i, axisCount);
              return (
                <text
                  key={`axis-${i}`}
                  x={x.toFixed(2)}
                  y={y.toFixed(2)}
                  className="fill-current text-muted-text text-xs"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {label}
                </text>
              );
            })
          : null}
      </svg>,
      legendNode
    );
  }
);
