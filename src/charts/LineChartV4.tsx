import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { LegendV4 } from './LegendV4';
import { TextV4 } from '../primitives/TextV4';
import {
  CHART_AXIS_VAR,
  CHART_GRID_VAR,
  ChartEmptyV4,
  chartVar,
  useChartV4,
} from './internal-v4';
import {
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
  foldChartSeries,
  type ChartIndicatorV4,
  type ChartSeriesV4,
  type ChartToneV4,
} from '../primitives/internal/v4-chart';

/**
 * **V4 line chart** — and, because it is the first of the twenty to land, the
 * file that carries the *figure frame* the rest of the line family composes.
 *
 * ## What the base got wrong
 *
 * `LineChart` takes `data: number[]`. One series. That single fact is why
 * every dashboard in the product reaches past this module and hand-rolls an
 * SVG: a revenue chart with Direct / Referral / Organic on it cannot be
 * expressed at all, so the component that exists to draw it is skipped. Brief
 * §5 Group A names this first for that reason.
 *
 * Four more, in the order a reader notices them:
 *
 * 1. **Colour was a semantic token.** `color = 'primary'` resolving to
 *    `var(--xen-primary)`, and a multi-series form would have had to reach for
 *    the base's `SERIES` cycle — which paints series four `warn` and series
 *    five `danger` (brief §1 rule 2, and the whole argument in
 *    `primitives/internal/v4-chart.ts`). V4 takes the derived categorical
 *    palette: {@link chartVar} per slot, in assignment order, never cycled.
 * 2. **`r={3}` and `strokeWidth={2}` were typed in.** Brief §1 rule 1 lists
 *    both as violations to remove; they are {@link CHART_MARK.dotSize} and
 *    {@link CHART_MARK.stroke} now, imported rather than retyped.
 * 3. **`showDots` was a boolean the caller had to guess at.** Brief §5: it
 *    "becomes automatic below ~20 points and off above". A dot per datum on a
 *    90-point series is a caterpillar, not a chart; a dot per datum on eight
 *    points is what tells a reader where the samples actually are.
 * 4. **A picture of a chart.** Brief §3.4: "An SVG chart that cannot be
 *    hovered is a picture of a chart." V4 ships a crosshair and a tooltip by
 *    default, which is also what lets the grid stay recessive — the precise
 *    number lives in the tip, so the plot only has to carry the shape (HIG's
 *    progressive disclosure, §4.6).
 *
 * ## Why the marks are drawn the way they are
 *
 * The plot stretches: `preserveAspectRatio="none"`, so a 320-unit viewBox
 * fills whatever column it is dropped into. The base did the same and paid for
 * it silently — under a non-uniform scale a `strokeWidth={2}` line is 2px tall
 * and 0.6px wide, and an `r={3}` circle is an ellipse. Both marks here carry
 * `vector-effect="non-scaling-stroke"`, and a **dot is a zero-length
 * round-capped line** rather than a `<circle>`: a round cap is a true circle of
 * the stroke's own width no matter what the viewBox does to the axes. That is
 * the only way to get `CHART_MARK.dotSize` to mean 8 painted pixels in a
 * responsive plot without measuring the container.
 *
 * The ring of surface each dot carries (brief §4.4) is a second, wider line
 * underneath it wearing `data-xen-v4-mark-ring`, so its colour comes from the
 * shared sheet in `internal-v4` rather than from a value typed here.
 *
 * ## Secondary encoding
 *
 * The palette's worst adjacent CVD ΔE is 6.5, inside the 6–8 floor band, and
 * that band is legal only with secondary encoding (brief §1 rule 5). This
 * component ships three: a legend whenever there are two or more series,
 * direct labels at {@link CHART_DIRECT_LABEL_MAX} or fewer, and the ring of
 * page colour around every dot. It never asks colour to carry identity alone.
 *
 * @example
 * ```tsx
 * <LineChartV4
 *   title="Revenue"
 *   summary="£48,210"
 *   caption="vs last month"
 *   data={[direct, referral, organic]}
 *   series={[
 *     { key: 'direct', label: 'Direct' },
 *     { key: 'referral', label: 'Referral' },
 *     { key: 'organic', label: 'Organic' },
 *   ]}
 *   labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
 * />
 * ```
 */

/**
 * `ChartToneV4` — the opt-in to status colour, and the only way a V4 chart
 * paints one (brief §4.3) — and `ChartSeriesV4`, shadcn's config/data split.
 *
 * Both were declared here while the line family was built, because
 * `primitives/internal/v4-chart.ts` was closed to the build groups mid-pass.
 * They landed in that module afterwards and this file now **imports** them;
 * the re-export below keeps `import { type ChartToneV4 } from './LineChartV4'`
 * working for the four call sites that already spell it that way.
 */
export type { ChartIndicatorV4, ChartSeriesV4, ChartToneV4 };

/** One row of a legend, when a caller supplies the rows itself. */
export interface ChartLegendItemV4 {
  /** React key and identity. Falls back to the label. */
  key?: string;
  /** The row's text. Never truncated — a clipped identity is no identity. */
  label: string;
  /** Categorical slot to draw the swatch from. Defaults to the row's index. */
  slot?: number;
  /** Status hue instead of a slot, for a row that means good or bad. */
  tone?: ChartToneV4;
}

/**
 * Above this many points a dot per datum stops being information.
 *
 * Brief §5 asks for "automatic below ~20 points and off above". It is a
 * **count**, not a size — the one other category of bare number §1 rule 1
 * allows alongside geometry — and it lives here as a named constant so the
 * area chart can hold the identical threshold rather than pick its own.
 */
export const CHART_AUTO_DOT_MAX = 20;

/**
 * How many horizontal reference rules the plot carries.
 *
 * Three, not "one per gridline of a Y axis this component does not have":
 * top, middle and baseline. Brief §3.3 wants chrome recessive, and three rules
 * is the fewest that still gives the eye a horizon to read a slope against.
 */
const GRID_ROWS = 3;

/**
 * The most x-axis labels a plot will print before it starts thinning them.
 *
 * HIG's density rule (brief §5, Group B's `HistogramV4` note): labels thin out
 * rather than rotate. Six is what fits under a 320-unit plot at `type.xs`
 * without touching.
 */
const AXIS_LABEL_MAX = 6;

/** The one `<style>` id the line family's figure frame injects from. */
export const CHART_FIGURE_V4_STYLE_ID = 'xen-v4-chart-figure-styles';

/**
 * Two rules a utility class bound to a token cannot say.
 *
 * The tooltip is positioned against a percentage of the plot's width and has
 * to be pulled back by half its own (unknown) width — a `transform` a Tailwind
 * class has no arbitrary value for at this precision — and it must never eat
 * the pointer events that drive it, or moving onto the tip would move the
 * crosshair off the point the tip is describing.
 */
export const CHART_FIGURE_V4_CSS = `
[data-xen-v4-chart-tip] {
  transform: translateX(-50%);
  pointer-events: none;
}
`;

/** A point in viewBox units. */
interface PlotPoint {
  x: number;
  y: number;
}

/** One resolved series: its config, its numbers and the ink it is painted in. */
interface ResolvedSeries {
  key: string;
  label: string;
  values: number[];
  ink: string;
  points: PlotPoint[];
}

/** Clamp into `[0, 1]`, treating a non-finite input as 0. */
const clamp01 = (n: number): number => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);

/** Status hue → the token that paints it. The only status ink a V4 chart has. */
const toneVar = (tone: ChartToneV4): string => `var(--xen-${tone})`;

/**
 * `number[]` or `number[][]` → always `number[][]`.
 *
 * The base's single-series shape stays valid — brief §1 rule 8, additive only —
 * and a caller who has one series does not have to wrap it in an array to use
 * the component that finally supports several.
 */
export function toSeriesRowsV4(data: number[] | number[][]): number[][] {
  if (data.length === 0) return [];
  return typeof data[0] === 'number' ? [data as number[]] : (data as number[][]);
}

/**
 * The ink for series `i`: its slot, or its status hue when it declared one.
 *
 * {@link chartVar} throws past the fifth slot rather than wrapping, which is
 * the whole point of brief §1 rule 4 — so a sixth series arrives as a loud
 * `RangeError` naming the fix (fold it into "Other", or facet) instead of as
 * two lines quietly sharing a colour.
 */
export function seriesInkV4(index: number, tone?: ChartToneV4): string {
  return tone !== undefined ? toneVar(tone) : chartVar(index);
}

/**
 * Evenly-spaced indices to print an axis label at, at most `max` of them.
 *
 * Thinning rather than rotating: a rotated tick is unreadable on a phone and
 * changes the plot's height, which is the layout shift §4.5 exists to stop.
 */
export function thinAxisIndicesV4(count: number, max = AXIS_LABEL_MAX): number[] {
  if (count <= 0) return [];
  if (count <= max) return Array.from({ length: count }, (_, i) => i);

  // A FRACTIONAL step, rounded per label, is what shipped — and it does not
  // thin, it clumps. At 10 points and a cap of 6 the step is 1.8 and
  // `Math.round(i * step)` yields [0, 2, 4, 5, 7, 9]: 4 and 5 are ADJACENT, so
  // two dates print on top of each other ("13 Aug6 Aug") while the gap either
  // side of them is left empty. Found on a 390pt screen the first time these
  // charts were rendered in a browser rather than asserted in a spec.
  //
  // An integer stride cannot clump, because every gap is the same width by
  // construction.
  const stride = Math.ceil((count - 1) / (max - 1));
  const out: number[] = [];
  for (let i = 0; i < count - 1; i += stride) out.push(i);

  // The last label is kept unconditionally — on a time axis the two labels a
  // reader actually needs are the ends, and a stride that does not divide
  // evenly would otherwise drop "today". If keeping it would sit it beside its
  // neighbour, the neighbour goes instead: the end is worth more than the
  // even spacing.
  const last = count - 1;
  if ((out[out.length - 1] as number) === last - 1) out.pop();
  out.push(last);
  return out;
}

/**
 * The shared props of every **figure** in the line family — brief §4.2's
 * frame, which `LineChartV4` and `AreaChartV4` both wear and which
 * `SparklineV4` and `MiniBarV4` deliberately do not (they are marks inside
 * someone else's figure).
 */
export interface ChartFigureV4Props {
  /**
   * The descriptive headline. HIG's rule, quoted in brief §2: say the
   * takeaway — "Chance of light rain in the next hour" — not the axis names.
   */
  title?: React.ReactNode;
  /** The one loud number. Read before the plot, which is the evidence for it. */
  summary?: React.ReactNode;
  /** The quiet line — "vs last month", "last 30 days". */
  caption?: React.ReactNode;
  /**
   * The legend. Defaults to `true` at two or more series, because a legend is
   * not decoration in this line — it is the identity channel's redundancy
   * (brief §1 rule 5). Pass rows to label something the `series` config does
   * not cover.
   */
  legend?: boolean | ChartLegendItemV4[];
  /**
   * The plot's own height in px. **Never auto** — shadcn's `ChartContainer`
   * refuses to auto-size for the same reason (brief §2), and a declared
   * footprint is what stops the page reflowing when the data lands.
   */
  height?: number;
  /** Render the loading skeleton at the plot's footprint instead of the plot. */
  loading?: boolean;
  /** What the empty state says. Never a bare string in the tree; see §4.5. */
  emptyLabel?: string;
  /** Play the entrance reveal. Default `true`; reduced motion turns it into a fade. */
  animate?: boolean;
}

export interface LineChartV4Props
  extends ChartFigureV4Props,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * One series (`number[]`, the base's shape) or several (`number[][]`).
   *
   * Capped at {@link CHART_SERIES_COUNT} by {@link chartVar}, which throws
   * rather than cycling.
   */
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
   * Draw a dot at each datum. Defaults to **automatic**: on at
   * {@link CHART_AUTO_DOT_MAX} points or fewer, off above.
   */
  showDots?: boolean;
  /** Horizontal reference rules behind the plot. Default `true`. */
  grid?: boolean;
  /** Crosshair + tooltip on hover. Default `true` (brief §3.4, §4.6). */
  tooltip?: boolean;
  /** How the tooltip draws its per-series swatch. Default `'line'`. */
  indicator?: ChartIndicatorV4;
  /** Direct series labels at the end of each line. Defaults on at four or fewer. */
  directLabels?: boolean;
  /** How a value is spoken and printed. Default `String`. */
  formatValue?: (value: number) => string;
  /** Fired when a point is clicked, and on the native twin when it is pressed. */
  onPointPress?: (index: number) => void;
}

/**
 * The tooltip's and the legend's per-series swatch.
 *
 * Its size is {@link CHART_MARK.dotSize} and its thickness
 * {@link CHART_MARK.stroke} — brief §4.8 is explicit that a swatch is
 * `dotSize`, "not a 10×10 literal", which is what the base `Legend` ships
 * (`h-2.5 w-2.5` on web, `width: 10, height: 10` on native; both on §1 rule
 * 1's list).
 *
 * Drawn as a tiny inline SVG rather than a `<span>` with a background,
 * because the ink is a `var(--xen-chart-N)` reference: an SVG `fill` /
 * `stroke` is an **attribute**, which survives every CSSOM, whereas the same
 * value in an inline `style` is dropped outright by the jsdom-class parsers
 * this kit's specs and any SSR style extractor run on. `internal-v4` makes the
 * same call for the palette itself and says so; this is the same reason one
 * level down.
 */
export function ChartSwatchV4({
  ink,
  indicator,
}: {
  ink: string;
  indicator: ChartIndicatorV4;
}): React.ReactElement {
  const w = CHART_MARK.dotSize;
  if (indicator === 'dot') {
    return (
      <svg
        data-xen-v4-chart-swatch="dot"
        aria-hidden="true"
        focusable="false"
        width={w}
        height={w}
        viewBox={`0 0 ${w} ${w}`}
        className="shrink-0"
      >
        <circle cx={w / 2} cy={w / 2} r={w / 2} fill={ink} />
      </svg>
    );
  }
  return (
    <svg
      data-xen-v4-chart-swatch={indicator}
      aria-hidden="true"
      focusable="false"
      width={w}
      height={CHART_MARK.stroke}
      viewBox={`0 0 ${w} ${CHART_MARK.stroke}`}
      className="shrink-0"
    >
      <line
        x1={0}
        y1={CHART_MARK.stroke / 2}
        x2={w}
        y2={CHART_MARK.stroke / 2}
        stroke={ink}
        strokeWidth={CHART_MARK.stroke}
        strokeLinecap="round"
        strokeDasharray={indicator === 'dashed' ? `${CHART_MARK.stroke} ${CHART_MARK.stroke}` : undefined}
      />
    </svg>
  );
}

/**
 * The line family's legend.
 *
 * This used to be the markup itself — `LegendV4` (Group D) was not on disk
 * while this group built, so the shape that component is specified to have was
 * drawn here instead, and the doc comment said the coordinator's pass was the
 * right place to swap the body. That is what this is: **the body is now
 * `LegendV4`**, and the name, the props and the two call sites are unchanged.
 *
 * The mapping is one to one because the stand-in was built to the same spec:
 * `key` → `key`, `slot` → `slot` (defaulting to the row index either way),
 * `tone` → `tone`, and `indicator` chooses a dot or a rule. What `LegendV4`
 * adds on top is the part a stand-in could not have: the toggle behaviour, the
 * 44 hit floor behind it, and the derived `Legend: …` sentence.
 */
export function ChartLegendV4({
  items,
  indicator = 'dot',
}: {
  items: ChartLegendItemV4[];
  indicator?: ChartIndicatorV4;
}): React.ReactElement {
  return (
    <LegendV4
      indicator={indicator}
      items={items.map((item, i) => ({
        key: item.key ?? item.label,
        label: item.label,
        slot: item.slot ?? i,
        ...(item.tone === undefined ? {} : { tone: item.tone }),
      }))}
    />
  );
}

/**
 * A dot on a line, drawn as a zero-length round-capped stroke.
 *
 * See the file header: a `<circle>` under `preserveAspectRatio="none"` is an
 * ellipse, and `r={3}` is one of the literals brief §1 rule 1 retires. A round
 * cap with `vector-effect="non-scaling-stroke"` is a true circle of exactly
 * {@link CHART_MARK.dotSize} painted pixels at any viewBox scale, and the ring
 * of surface underneath it comes from the shared `data-xen-v4-mark-ring` rule.
 */
export function ChartDotV4({
  x,
  y,
  ink,
}: {
  x: number;
  y: number;
  ink: string;
}): React.ReactElement {
  return (
    <>
      <line
        data-xen-v4-mark-ring=""
        x1={x}
        y1={y}
        x2={x}
        y2={y}
        strokeWidth={CHART_MARK.dotSize + CHART_MARK.ring * 2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y}
        stroke={ink}
        strokeWidth={CHART_MARK.dotSize}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </>
  );
}

/**
 * Scale a series into the viewBox.
 *
 * The two guards brief §4.5 asks the spec to assert: a **single** datum sits
 * at the horizontal centre rather than dividing by `length - 1`, and a **flat**
 * series divides by 1 rather than by `max - min`. The base sources guard the
 * second unevenly and the first not at all on some forms; `Infinity` in a `d`
 * attribute is a blank chart with no error.
 */
export function plotSeriesV4(
  values: number[],
  lo: number,
  span: number,
  width: number,
  height: number
): PlotPoint[] {
  return values.map((v, i) => ({
    x: values.length === 1 ? width / 2 : (i / (values.length - 1)) * width,
    y: height - clamp01((v - lo) / span) * height,
  }));
}

export const LineChartV4 = React.forwardRef<HTMLDivElement, LineChartV4Props>(function LineChartV4(
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

  // ── §4.5: loading and empty both keep the footprint ──────────────────
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

  const flat = rows.flat();
  const hi = max ?? Math.max(...flat);
  const lo = min ?? Math.min(...flat);
  // A flat series is a horizontal line through the middle, not a division by
  // zero — the guard the base had and the one thing it got right here.
  const span = hi - lo || 1;

  /*
    Past the palette's five slots the tail shares the last one rather than
    throwing. `chartVar(5)` still throws — asking the palette for a sixth slot
    is a mistake in the caller's own code — but a line chart's series count
    arrives with the DATA, and a `RangeError` out of render takes the page down.
    `foldChartSeries` in `primitives/internal/v4-chart.ts` draws that line: the
    primitive throws, the component folds.

    Lines are not summed the way a stack's or a pie's segments are, because a
    line is not a part of a whole — the average of three series is a fourth
    series nobody asked for. So the tail keeps its own shapes, shares slot 5,
    and the legend carries ONE row for it named `CHART_OVERFLOW_LABEL`. What a
    reader loses is the ability to tell the sixth line from the seventh, which
    is exactly what the palette was refusing to promise in the first place.
  */
  const fold = foldChartSeries(rows);
  const slotOf = (i: number): number => Math.min(i, CHART_SERIES_COUNT - 1);

  const resolved: ResolvedSeries[] = rows.map((values, i) => {
    const cfg = series?.[i];
    return {
      key: cfg?.key ?? `series-${i}`,
      label: cfg?.label ?? `Series ${i + 1}`,
      values,
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
  // Direct labels default OFF, and that is a correction rather than caution.
  // Each one is positioned at `left: 100%` of the plot — entirely outside it —
  // and the plot reserves no right-hand gutter, so at a phone width inside a
  // card there is nowhere for the label to go and it collides with whatever is
  // beside the chart. Defaulting it on meant every two-series chart shipped
  // broken at 390pt unless the caller knew to turn it off.
  //
  // The channel is still worth having (brief §4.4: at four or fewer series
  // direct labels are the strongest secondary encoding available) — it needs a
  // gutter first. Until the plot reserves one, a caller who has the room asks
  // for it explicitly.
  // The cap is a RULE, not a default: above four series the labels collide
  // whatever the caller asked for, so asking explicitly does not buy past it.
  const showDirect = (directLabels ?? false) && resolved.length <= CHART_DIRECT_LABEL_MAX;

  // §4.8: the sentence names the form, the series count and the range. It is
  // the accessibility story — HIG is explicit that a rendered plot plus a
  // visible title is NOT accessible.
  const derivedLabel = [
    'Line chart',
    typeof title === 'string' ? title : undefined,
    resolved.length > 1 ? `${resolved.length} series` : undefined,
    `${pointCount} point${pointCount === 1 ? '' : 's'}`,
    `${formatValue(Math.min(...flat))} to ${formatValue(Math.max(...flat))}`,
  ]
    .filter(Boolean)
    .join(', ');

  const xOf = (i: number): number => (pointCount === 1 ? width / 2 : (i / (pointCount - 1)) * width);
  const pctOf = (i: number): string => `${pointCount === 1 ? 50 : (i / (pointCount - 1)) * 100}%`;

  const pick = (clientX: number, rect: DOMRect): void => {
    // jsdom hands back a zero-width rect; falling back to 1 keeps the ratio
    // finite so the spec can drive this path without a layout engine.
    const w = rect.width || 1;
    const t = clamp01((clientX - rect.left) / w);
    setActive(Math.round(t * (pointCount - 1)));
  };

  return (
    <div
      ref={ref}
      role="img"
      aria-label={derivedLabel}
      className={cn('flex w-full min-w-0 flex-col gap-md', className)}
      {...rest}
    >
      {/*
        §4.2's order — title → summary → plot → axis labels → legend — and
        NN/g's F-pattern argument for it: the most important number belongs
        top-left, and the plot underneath is the evidence for it rather than
        the claim itself (§3.1, "the number is bigger than the chart is loud").
      */}
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
            ? (e) => pick(e.clientX, e.currentTarget.getBoundingClientRect())
            : undefined
        }
        onPointerLeave={tooltip ? () => setActive(null) : undefined}
        onClick={
          onPointPress !== undefined
            ? (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const w = rect.width || 1;
                const t = clamp01((e.clientX - rect.left) / w);
                onPointPress(Math.round(t * (pointCount - 1)));
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
          {/*
            Chrome, not data. `CHART_GRID_VAR` is the derived neutral mixed at
            `CHART_GRID_MIX`; the base painted its axes `var(--xen-muted)` and
            its grids `var(--xen-border)` — a TEXT colour and a HAIRLINE colour
            doing an axis's job (brief §3.3).
          */}
          {grid
            ? Array.from({ length: GRID_ROWS }, (_, i) => {
                const y = (i / (GRID_ROWS - 1)) * height;
                return (
                  <line
                    key={`grid-${i}`}
                    data-xen-v4-chart-grid=""
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke={CHART_GRID_VAR}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })
            : null}

          {resolved.map((s) => (
            <polyline
              key={s.key}
              data-xen-v4-chart-line={s.key}
              points={s.points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')}
              fill="none"
              stroke={s.ink}
              strokeWidth={CHART_MARK.stroke}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/*
            §4.5: "a line of one point is a dot at the centre". A one-point
            polyline paints nothing at all, which is the empty-looking chart a
            caller reports as "the data never arrived".
          */}
          {resolved.map((s) =>
            dots || s.points.length === 1
              ? s.points.map((p, i) => (
                  <ChartDotV4 key={`${s.key}-${i}`} x={p.x} y={p.y} ink={s.ink} />
                ))
              : null
          )}

          {active !== null && tooltip ? (
            <>
              <line
                data-xen-v4-chart-crosshair=""
                x1={xOf(active)}
                y1={0}
                x2={xOf(active)}
                y2={height}
                stroke={CHART_AXIS_VAR}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              {resolved.map((s) => {
                const p = s.points[active];
                return p === undefined ? null : (
                  <ChartDotV4 key={`active-${s.key}`} x={p.x} y={p.y} ink={s.ink} />
                );
              })}
            </>
          ) : null}
        </svg>

        {/*
          Direct labels — the strongest secondary encoding available at four or
          fewer series (§4.4), drawn as HTML rather than `<text>` so the type
          comes from `TextV4` and the scale rather than from a `font-size`
          typed into an SVG attribute.
        */}
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
          {thinAxisIndicesV4(Math.min(labels.length, pointCount)).map((i, n, all) => {
            // The first and last labels are ANCHORED to the plot's edges, not
            // centred on their point. A centred label at 100% hangs half its
            // width past the plot; inside a card that width-constrains it and
            // it wraps, so "Sun 30" broke into two lines and the "30" landed
            // on the legend. Centring is right for every label that has room
            // on both sides, and wrong for the two that do not.
            const first = n === 0;
            const last = n === all.length - 1;
            const anchor = first
              ? { left: 0 }
              : last
                ? { right: 0 }
                : { left: pctOf(i) };
            return (
              <span
                key={`axis-${i}`}
                className={first || last ? 'absolute whitespace-nowrap' : 'absolute -translate-x-1/2 whitespace-nowrap'}
                style={anchor}
              >
                <TextV4 size="xs" tone="mutedText">
                  {labels[i]}
                </TextV4>
              </span>
            );
          })}
        </div>
      ) : null}

      {showLegend ? <ChartLegendV4 items={legendItems} indicator="dot" /> : null}
    </div>
  );
});
