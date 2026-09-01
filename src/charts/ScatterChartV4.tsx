import * as React from 'react';
import { cn } from '../primitives/cn';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import {
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SCATTER_SERIES_CAP,
  foldChartSeries,
} from '../primitives/internal/v4-chart';
import {
  CHART_AXIS_VAR,
  CHART_GRID_VAR,
  ChartEmptyV4,
  chartVar,
  useChartV4,
} from './internal-v4';
import { LegendV4, type LegendV4Item, type LegendV4Tone } from './LegendV4';

export interface ScatterPointV4 {
  x: number;
  y: number;
  /** An optional name for this point, used in its tooltip. */
  label?: string;
}

export interface ScatterSeriesV4 {
  /** Stable identity for the series. Not rendered. */
  key: string;
  /** The series name, as it appears in the legend. */
  label: string;
  /** The points in this series. */
  points: ScatterPointV4[];
  /**
   * Opt this series into a status hue instead of its categorical slot.
   * Use only where it genuinely *means* good or bad (rule 3).
   */
  tone?: LegendV4Tone;
}

export interface ScatterChartV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
  /**
   * A single series' points — the short form.
   *
   * The web base called this `data` and the native base called it `points`,
   * which was itself a parity break. Rule 7 says the gap closes rather than
   * deepens, so both V4 twins take `data`.
   */
  data?: ScatterPointV4[];
  /**
   * Two or three series, in slot order. **Throws past
   * {@link CHART_SCATTER_SERIES_CAP}** — see the component doc.
   */
  series?: ScatterSeriesV4[];
  /** Plot width in px, used for the viewBox. The element itself is fluid. */
  width?: number;
  /** Plot height in px. Never auto (§4.2). */
  height?: number;
  /** x-domain bounds; defaults to the data range. */
  xDomain?: [number, number];
  /** y-domain bounds; defaults to the data range. */
  yDomain?: [number, number];
  /** Draw the two axis lines. Default `true`. */
  showAxes?: boolean;
  /** Draw the recessive horizontal grid. Default `true` (§3: chrome is recessive). */
  showGrid?: boolean;
  /** The descriptive headline (§4.2). Say the takeaway, not the axis names. */
  title?: string;
  /** The one loud number, when the figure has one. */
  summary?: string;
  /** The quiet line under the plot — "last 30 days". */
  caption?: string;
  /** Render the legend. Defaults to `true` at two or more series. */
  legend?: boolean;
  /** Per-mark hover tooltip. Default `true` (§4.6). */
  tooltip?: boolean;
  /** Format a coordinate for the tooltip. Default `String`. */
  valueFormat?: (value: number) => string;
  /** Called when a point is clicked. Gives every point a 44 hit area. */
  onPointSelect?: (point: ScatterPointV4, seriesIndex: number, pointIndex: number) => void;
  /** Show the loading placeholder at the plot's footprint instead of the marks. */
  loading?: boolean;
  /** What the empty state says. */
  emptyLabel?: string;
  /** Play the entrance reveal. Default `true` (§4.7). */
  animate?: boolean;
  /** Override the derived accessible sentence (rule 6). */
  'aria-label'?: string;
}

/**
 * HIG's tap floor as an SVG radius, so a painted 8px dot still has 44 of hit
 * area (rule 10).
 *
 * The kit's canonical 44 is `MIN_TAP` in `internal/nav-v4.ts`, but that is the
 * CSS expression `calc(var(--xen-space-2xl) - var(--xen-space-xs))` — and an
 * SVG geometry attribute takes a number, not a `var()`. Unlike the heatmap
 * cell's corner, a radius cannot be pushed into a stylesheet either: `r` is a
 * CSS geometry property, but the plot's coordinate system is a `viewBox` and a
 * CSS length would be resolved in the wrong space.
 *
 * So the number is restated here, as geometry, with this note. It is the *only*
 * copy of 44 in this module, and it exists because the platform cannot carry
 * the composed one into an SVG.
 */
const HIT_DIAMETER = 44;

/** How many recessive horizontal grid lines the plot carries. Geometry. */
const GRID_LINES = 4;

/**
 * The plot's inset, so a mark on the domain edge is not clipped by the viewBox.
 *
 * Half a hit target: enough that a point sitting exactly at the maximum has its
 * full painted dot *and* its ring inside the box, derived from the mark sizes
 * rather than picked (the base used `radius + 2`, where the 2 was untraceable).
 */
const PAD = CHART_MARK.dotSize / 2 + CHART_MARK.ring;

/**
 * Fold a series list down to the scatter's cap — {@link foldChartSeries} in
 * this form's own vocabulary.
 *
 * A scatter's series is a **set of points**, so folding is a union rather than
 * a sum: the tail's clouds become one cloud in the last slot, named
 * {@link CHART_OVERFLOW_LABEL}. Nothing is dropped and nothing is aggregated,
 * so the plot still shows every datum the caller handed over — it just stops
 * claiming to distinguish the ones past the cap.
 */
function foldScatterSeriesV4(series: ScatterSeriesV4[]): ScatterSeriesV4[] {
  const fold = foldChartSeries(series, CHART_SCATTER_SERIES_CAP);
  if (!fold.didFold) return fold.kept;
  return [
    ...fold.kept,
    {
      key: 'chart-overflow',
      label: CHART_OVERFLOW_LABEL,
      points: fold.folded.flatMap((s) => s.points),
    },
  ];
}

/**
 * **V4 scatter plot** — the one form in this module with a *hard series cap*,
 * and the reason that cap exists.
 *
 * ## Three series, and the fourth folds into "Other"
 *
 * Every other chart in the line may carry all five slots. A scatter may carry
 * `CHART_SCATTER_SERIES_CAP` — three — and a fourth series is **folded into
 * the last slot** and named {@link CHART_OVERFLOW_LABEL} in the legend rather
 * than painted a colour the palette never cleared.
 *
 * The reason is measured, not stylistic, and `v4-chart.ts` records it. A bar
 * chart, a line chart and a stack only ever place a series next to its
 * *neighbours in assignment order*, so the adjacent-pair CVD check is the
 * honest gate for them. A scatter places **any two marks side by side** — that
 * is what a scatter is — which is the strictly harder all-pairs test. The same
 * validator run that locked the palette reported the first three slots clearing
 * it (all-pairs normal-vision ΔE 18.3 light / 17.7 dark) and five slots not.
 *
 * So a scatter with four series is not a palette problem waiting for a fourth
 * colour. It is a chart that needs faceting, an "Other" fold, or small
 * multiples. Rule 4's argument applies with more force here than anywhere
 * else: silently painting the fourth cloud a colour a dichromat reads as the
 * second is worse than saying so, because nobody ever finds out.
 *
 * **It folds rather than throws, and that is a deliberate change of mind.**
 * The cap itself is unmoved — the palette still refuses a fourth slot — but a
 * scatter's series count arrives with the *data*, and a `RangeError` out of
 * render takes the page down. `foldChartSeries` in
 * `primitives/internal/v4-chart.ts` draws the line: the primitive throws,
 * because `chartVar(3)` is a mistake in the caller's own code; the component
 * folds, because it cannot know at build time how many series will arrive. The
 * tail's points are merged into one cloud in the last slot and the legend says
 * "Other" — the same answer `PieChartV4` gives, and unlike a throw, a reader
 * can see it.
 *
 * ## Every point carries a ring of surface
 *
 * Rule 5 names four secondary encodings and this form needs the fourth: two
 * points that overlap are, without a ring, one blob whose colour is neither
 * series. `data-xen-v4-mark-ring` is the shared adapter's paint rule —
 * `stroke: var(--xen-surface); paint-order: stroke` — so the ring is the page
 * showing through rather than a fourth colour, and it is stroked *under* the
 * fill so the painted dot keeps its full `CHART_MARK.dotSize`.
 *
 * The base instead set `fillOpacity={0.75}` on every point, which is the same
 * idea done wrong: two overlapping translucent dots make a *third*, darker
 * colour that is in neither series' key, and a single dot over the page is a
 * fourth. V4 paints at full strength and separates by geometry.
 *
 * ## What else changed from the base
 *
 * - **Axes were `var(--xen-border)`** — a hairline token doing an axis's job.
 *   They are `CHART_AXIS_VAR` at `CHART_MARK.stroke`, with the grid one step
 *   quieter behind them at `CHART_GRID_VAR` and a 1px hairline (§3, §4.4).
 * - **`radius` was a prop defaulting to 4** — a literal, and a scatter whose
 *   dot size a caller can shrink is a scatter whose marks stop being marks.
 *   The painted dot is `CHART_MARK.dotSize`, imported.
 * - **A single point rendered at the origin.** With one datum the domain span
 *   is zero, and `(x - x0) / 0` fed the `cx` attribute. §4.5 requires a single
 *   datum to render, so a zero span centres its point instead.
 * - **Tap area.** A painted 8px dot is not a target. When `onPointSelect` is
 *   given each mark also carries a transparent {@link HIT_DIAMETER} circle
 *   (rule 10). They overlap in a dense cloud, deliberately: the last-drawn wins,
 *   which is the same rule the paint order already follows, and a chooseable
 *   near-miss beats an unhittable exact one.
 */
export const ScatterChartV4 = React.forwardRef<HTMLDivElement, ScatterChartV4Props>(
  function ScatterChartV4(
    {
      data,
      series,
      width = 320,
      height = 200,
      xDomain,
      yDomain,
      showAxes = true,
      showGrid = true,
      title,
      summary,
      caption,
      legend,
      tooltip = true,
      valueFormat = String,
      onPointSelect,
      loading = false,
      emptyLabel = 'No data',
      animate = true,
      className,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) {
    const chart = useChartV4(animate);

    // One shape downstream: the `data` short form is series zero, and anything
    // past the cap is folded into the last slot rather than thrown at.
    const resolved: ScatterSeriesV4[] = foldScatterSeriesV4(
      series ?? (data !== undefined ? [{ key: 'series-1', label: 'Series 1', points: data }] : [])
    );

    const points = resolved.flatMap((s) => s.points);
    const xs = points.map((p) => p.x).filter(Number.isFinite);
    const ys = points.map((p) => p.y).filter(Number.isFinite);

    const header =
      title !== undefined || summary !== undefined ? (
        <div className="flex min-w-0 flex-col gap-xs">
          {title !== undefined ? (
            <TextV4 size="base" weight="semibold">
              {title}
            </TextV4>
          ) : null}
          {summary !== undefined ? (
            <TextV4 size="2xl" weight="bold" numeric="tabular">
              {summary}
            </TextV4>
          ) : null}
        </div>
      ) : null;

    const footer =
      caption !== undefined ? (
        <TextV4 size="sm" tone="mutedText">
          {caption}
        </TextV4>
      ) : null;

    const frameClass = cn('flex w-full flex-col gap-md', className);

    if (loading) {
      return (
        <div ref={ref} className={frameClass} {...rest}>
          {header}
          <SkeletonV4 variant="rect" width="100%" height={height} />
          {footer}
        </div>
      );
    }

    if (points.length === 0) {
      return (
        <div ref={ref} className={frameClass} {...rest}>
          {header}
          <ChartEmptyV4 label={emptyLabel} height={height} />
          {footer}
        </div>
      );
    }

    const [x0, x1] = xDomain ?? [Math.min(...xs), Math.max(...xs)];
    const [y0, y1] = yDomain ?? [Math.min(...ys), Math.max(...ys)];
    const xSpan = x1 - x0;
    const ySpan = y1 - y0;
    const plotW = Math.max(width - PAD * 2, 1);
    const plotH = Math.max(height - PAD * 2, 1);

    // §4.5: one datum renders. With a zero span there is no position to
    // compute, so the mark takes the middle of the plot rather than the origin
    // — the same answer §4.5 gives a one-point line ("a dot at the centre").
    const px = (x: number): number => PAD + (xSpan === 0 ? 0.5 : (x - x0) / xSpan) * plotW;
    const py = (y: number): number =>
      PAD + (1 - (ySpan === 0 ? 0.5 : (y - y0) / ySpan)) * plotH;

    const label =
      ariaLabel ??
      `Scatter plot${title !== undefined ? `, ${title}` : ''}, ${resolved.length} series, ` +
        `${points.length} points, x ${valueFormat(x0)} to ${valueFormat(x1)}, ` +
        `y ${valueFormat(y0)} to ${valueFormat(y1)}.`;

    const showLegend = legend ?? resolved.length >= 2;
    const legendItems: LegendV4Item[] = resolved.map((s) => ({
      label: s.label,
      ...(s.tone !== undefined ? { tone: s.tone } : {}),
    }));

    return (
      <div ref={ref} data-xen-v4-chart="" style={chart.rootProps.style} className={frameClass} {...rest}>
        {header}
        <svg
          {...chart.rootProps}
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height={height}
          role="img"
          aria-label={label}
          className="block"
        >
          {showGrid
            ? Array.from({ length: GRID_LINES }, (_, i) => {
                const y = PAD + (plotH * (i + 1)) / (GRID_LINES + 1);
                return (
                  <line
                    key={i}
                    data-xen-v4-grid=""
                    x1={PAD}
                    y1={y}
                    x2={width - PAD}
                    y2={y}
                    stroke={CHART_GRID_VAR}
                    // A hairline is the one bare number §4.4 allows.
                    strokeWidth={1}
                  />
                );
              })
            : null}
          {showAxes ? (
            <>
              <line
                data-xen-v4-axis=""
                x1={PAD}
                y1={height - PAD}
                x2={width - PAD}
                y2={height - PAD}
                stroke={CHART_AXIS_VAR}
                strokeWidth={CHART_MARK.stroke}
              />
              <line
                data-xen-v4-axis=""
                x1={PAD}
                y1={PAD}
                x2={PAD}
                y2={height - PAD}
                stroke={CHART_AXIS_VAR}
                strokeWidth={CHART_MARK.stroke}
              />
            </>
          ) : null}
          {resolved.map((s, si) =>
            s.points.map((p, pi) => {
              const cx = px(p.x);
              const cy = py(p.y);
              const reading = `${s.label}${p.label !== undefined ? ` · ${p.label}` : ''}: ${valueFormat(
                p.x
              )}, ${valueFormat(p.y)}`;
              return (
                <React.Fragment key={`${s.key}-${pi}`}>
                  <circle
                    data-xen-v4-mark-ring=""
                    data-series={si}
                    cx={cx}
                    cy={cy}
                    r={CHART_MARK.dotSize / 2}
                    fill={s.tone !== undefined ? `var(--xen-${s.tone})` : chartVar(si)}
                    strokeWidth={CHART_MARK.ring}
                  >
                    {tooltip ? <title>{reading}</title> : null}
                  </circle>
                  {onPointSelect !== undefined ? (
                    <circle
                      data-xen-v4-hit=""
                      cx={cx}
                      cy={cy}
                      r={HIT_DIAMETER / 2}
                      fill="transparent"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onPointSelect(p, si, pi)}
                    />
                  ) : null}
                </React.Fragment>
              );
            })
          )}
        </svg>
        {showLegend ? <LegendV4 items={legendItems} /> : null}
        {footer}
      </div>
    );
  }
);
