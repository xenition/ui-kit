import * as React from 'react';
import { Animated, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import {
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
  type ChartToneV4,
} from '../../primitives/internal/v4-chart';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { EASING_ENTER, V4_MOTION } from '../primitives/internal/motion-v4';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { useXenitionTheme, type SemanticColors } from '../theme';
import {
  ChartEmptyV4,
  chartSlotColor,
  useChartPaletteV4,
  type ChartPaletteV4,
} from './internal-v4';
import { LegendV4 } from './LegendV4';

/**
 * The **radial family's shared geometry** on native, and the mirror of
 * `src/charts/PieChartV4.tsx`'s. The other four (`DonutChartV4`,
 * `GaugeChartV4`, `ProgressRingV4`, `RadarChartV4`) import from it.
 *
 * The *vocabulary* no longer lives here. `ChartToneV4` was declared in this
 * file while the radial group built, because `primitives/internal/v4-chart.ts`
 * was closed to the build groups mid-pass. It landed in that module afterwards
 * and this file now imports it, re-exporting under the same name so the
 * family's four other files keep their existing import.
 *
 * **`react-native-svg` is required.** Brief §7's open question 6 settles the
 * policy: only `SparklineV4` and `MiniBarV4` keep a `View` fallback, because
 * only a mark that small can be faked with flex boxes; every other native chart
 * states the requirement in its doc comment, and an arc cannot be drawn with a
 * `View` at all.
 */

/**
 * The status opt-in, and the **only** way a component in this line paints a
 * status hue (brief §4.3). Canonical in
 * `primitives/internal/v4-chart.ts`, which is what keeps the two twins from
 * drifting to different member lists; re-exported here because the radial
 * family's four other native files already import it from this one.
 */
export type { ChartToneV4 };

/** The fill for a `tone`. The theme's own status slot, never a derived hue. */
export function toneColorV4(colors: SemanticColors, tone: ChartToneV4): string {
  return colors[tone];
}

export interface PieDatumV4 {
  /**
   * The slice's name. Required, because the legend is this form's secondary
   * encoding (§1 rule 5) and a legend cannot be built out of unnamed slices.
   */
  label: string;
  /** The slice's magnitude. Non-finite and negative values read as zero. */
  value: number;
  /**
   * Opt in to a status hue (§1 rule 3). Either **every** datum in a chart
   * carries one or none does; see {@link foldPieDataV4}.
   */
  tone?: ChartToneV4;
}

/** One drawn segment: a datum, or the tail of several folded into "Other". */
export interface PieSegmentV4 extends PieDatumV4 {
  /** How many source rows this segment carries. `1` for a plain slice. */
  folded: number;
}

/** What {@link foldPieDataV4} resolves a caller's data down to. */
export interface PieFoldV4 {
  /** At most {@link CHART_SERIES_COUNT} segments, in assignment order. */
  segments: PieSegmentV4[];
  /** The sum of every drawn segment. Zero means "render the empty state". */
  total: number;
  /** How many source rows were folded into "Other". `0` when nothing folded. */
  foldedCount: number;
  /** Whether the chart paints status hues rather than palette slots. */
  toned: boolean;
}

/**
 * The default name for the folded tail. Overridable per chart.
 *
 * Aliases the shared {@link CHART_OVERFLOW_LABEL} rather than repeating the
 * string: every component that folds a data-driven series list names its tail
 * with the same word, and a pie that said "Other" while a stacked bar said
 * "Rest" would read as two different concepts on one dashboard.
 */
export const PIE_OTHER_LABEL = CHART_OVERFLOW_LABEL;

/**
 * Sort, keep, fold — brief §7's **open question 2, answered in the affirmative
 * and implemented here**: the component owns the "Other" fold, not the caller.
 *
 * Three reasons, the first two from the brief and the third from the palette
 * module:
 *
 * 1. The alternative is every caller writing the same reducer, slightly
 *    differently, and a kit exists to stop that.
 * 2. A pie with eleven slices is wrong in a way the kit *can* prevent —
 *    Atlassian's ceiling of five or six distinct colours for one categorical
 *    chart is the measured version of that sentence.
 * 3. `chartSlotColor(palette, 5)` **throws**. Without a fold, a six-slice pie
 *    is a crash, and a crash is a worse answer to "too many series" than a fold
 *    with a legend row that says so.
 *
 * ## The arithmetic
 *
 * §5 says "sort descending, keep five, fold the tail". Read as *five kept plus
 * an Other* it asks for six marks out of a five-slot palette that throws at
 * index 5; read as **five segments total** it is exactly buildable, so that is
 * the reading implemented — four named segments and the folded tail in slot 5.
 * The tail is therefore always at least two rows deep (six inputs → four kept,
 * two folded), which is why the legend can say "categories" without a branch.
 *
 * ## Why the sort is conditional
 *
 * Only a chart that folds is sorted. `CHART_HUE_OFFSETS` is documented as a
 * sequence that must not be re-sorted because "the reader's memory of 'green
 * was Europe' is the only continuity a dashboard has" — and sorting the *data*
 * moves a series between slots just as surely. At five or fewer there is
 * nothing to decide, so the caller's order stands; at six or more the ranking
 * is unavoidable.
 *
 * Zero and negative rows are dropped rather than drawn: they paint nothing and
 * would still take a legend swatch, which reads as a rendering bug.
 *
 * Keep in step with the web twin — the same algorithm, and both specs assert
 * the same outputs.
 */
export function foldPieDataV4(
  data: readonly PieDatumV4[],
  otherLabel: string = PIE_OTHER_LABEL
): PieFoldV4 {
  const clean: PieSegmentV4[] = [];
  let toned = 0;
  for (const d of data) {
    const value = Number.isFinite(d.value) ? Math.max(d.value, 0) : 0;
    if (d.tone !== undefined) toned += 1;
    if (value <= 0) continue;
    clean.push(
      d.tone === undefined
        ? { label: d.label, value, folded: 1 }
        : { label: d.label, value, tone: d.tone, folded: 1 }
    );
  }

  // §1 rule 3, enforced rather than documented: "one or the other in a chart,
  // never both". A half-toned chart is the one composition where a reader
  // cannot tell an identity red from a failure red.
  if (toned > 0 && toned !== data.length) {
    throw new RangeError(
      '@xenition/ui charts: a chart is either all `tone` or all palette slots, never both. ' +
        'Status colour is reserved for a series that genuinely means good or bad (brief §1 rule 3); ' +
        'a segment that is merely fourth wears slot 4.'
    );
  }

  const total = clean.reduce((sum, s) => sum + s.value, 0);
  const isToned = toned > 0;

  // A toned chart never folds: it is not spending the five-slot palette, so
  // there is no index to run out of, and the residual of a pass/fail split is
  // neither passing nor failing.
  if (isToned || clean.length <= CHART_SERIES_COUNT) {
    return { segments: clean, total, foldedCount: 0, toned: isToned };
  }

  const sorted = [...clean].sort((a, b) => b.value - a.value);
  const kept = sorted.slice(0, CHART_SERIES_COUNT - 1);
  const tail = sorted.slice(CHART_SERIES_COUNT - 1);
  const folded: PieSegmentV4 = {
    label: otherLabel,
    value: tail.reduce((sum, s) => sum + s.value, 0),
    folded: tail.length,
  };
  return { segments: [...kept, folded], total, foldedCount: tail.length, toned: false };
}

/** The legend's word for a segment — the fold announces itself here (§5). */
export function segmentLegendLabelV4(segment: PieSegmentV4): string {
  return segment.folded > 1 ? `${segment.label} (${segment.folded} categories)` : segment.label;
}

/** A segment's fill: its status hue if it has one, otherwise its slot. */
export function segmentFillV4(
  palette: ChartPaletteV4,
  colors: SemanticColors,
  segment: PieSegmentV4,
  index: number
): string {
  return segment.tone === undefined
    ? chartSlotColor(palette, index)
    : toneColorV4(colors, segment.tone);
}

/** Whole-percent share, for the legend and the spoken label. */
export function shareOfV4(value: number, total: number): number {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

/** Point on a circle of radius `r` about `(cx, cy)`, `angle` in radians. */
export function polarV4(cx: number, cy: number, r: number, angle: number): [number, number] {
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

/** Two decimals, and never `NaN` — the guard the base left to chance. */
export const coordV4 = (n: number): string => (Number.isFinite(n) ? n.toFixed(2) : '0');

/** A pie wedge from `a0` to `a1` in radians, measured from 3 o'clock. */
export function wedgePathV4(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const [x0, y0] = polarV4(cx, cy, r, a0);
  const [x1, y1] = polarV4(cx, cy, r, a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${coordV4(cx)} ${coordV4(cy)} L${coordV4(x0)} ${coordV4(y0)} A${coordV4(r)} ${coordV4(r)} 0 ${large} 1 ${coordV4(x1)} ${coordV4(y1)} Z`;
}

/** A donut segment — the annulus between `rInner` and `rOuter`. */
export function annulusPathV4(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  a0: number,
  a1: number
): string {
  const [ox0, oy0] = polarV4(cx, cy, rOuter, a0);
  const [ox1, oy1] = polarV4(cx, cy, rOuter, a1);
  const [ix1, iy1] = polarV4(cx, cy, rInner, a1);
  const [ix0, iy0] = polarV4(cx, cy, rInner, a0);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return (
    `M${coordV4(ox0)} ${coordV4(oy0)} A${coordV4(rOuter)} ${coordV4(rOuter)} 0 ${large} 1 ${coordV4(ox1)} ${coordV4(oy1)} ` +
    `L${coordV4(ix1)} ${coordV4(iy1)} A${coordV4(rInner)} ${coordV4(rInner)} 0 ${large} 0 ${coordV4(ix0)} ${coordV4(iy0)} Z`
  );
}

/** One row of the radial family's legend. */
export interface RadialLegendItemV4 {
  label: string;
  /** Categorical slot for the swatch. Defaults to the row's index. */
  slot?: number;
  /** Status hue instead of a slot, for a row that means good or bad. */
  tone?: ChartToneV4;
  /** The quiet trailing figure — a share, a count. */
  value?: string;
}

/**
 * The radial family's legend.
 *
 * This used to be the markup itself — `LegendV4` was Group D's component and
 * was not on disk while this group built, so its spec was drawn locally and the
 * doc comment said the coordinator would swap the element when it landed. That
 * is what this is: **the body is now `LegendV4`**, and the name and the three
 * call sites (`PieChartV4`, `DonutChartV4`, `RadarChartV4`) are unchanged.
 *
 * The radial family stacks its legend under a square plot rather than wrapping
 * it in a row, which is why `vertical` is passed: a donut's rows sit one above
 * another beneath the ring, where a bar chart's run along under the bars.
 */
export function RadialLegendV4({
  items,
  style,
}: {
  items: readonly RadialLegendItemV4[];
  style?: StyleProp<ViewStyle>;
}): React.ReactElement {
  return (
    <LegendV4
      vertical
      style={style}
      items={items.map((item, i) => ({
        key: item.label,
        label: item.label,
        slot: item.slot ?? i,
        ...(item.tone === undefined ? {} : { tone: item.tone }),
        ...(item.value === undefined ? {} : { value: item.value }),
      }))}
    />
  );
}

/**
 * The figure frame the radial family shares — brief §4.2's title / summary /
 * caption / legend slots in the one order they are ever drawn in.
 *
 * §3 is the argument: the module today is a set of *plots*, and the product
 * needs *figures* — "a plot is the ink, a figure is the ink plus the sentence
 * that says what it means".
 *
 * `accessibilityRole="image"` and the spoken label go on the **plot**, not on
 * this wrapper: making the title and legend children of an image role hides
 * real text from VoiceOver, which is the opposite of HIG's point that a
 * rendered chart plus a visible title is not accessible.
 */
export function ChartFigureV4({
  title,
  summary,
  caption,
  legend,
  children,
  style,
}: {
  title?: string;
  summary?: string;
  caption?: string;
  legend?: React.ReactNode;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const hasHeader = title !== undefined || summary !== undefined || caption !== undefined;
  return (
    <View style={[{ gap: tokens.spacing.md, alignItems: 'flex-start' }, style]}>
      {hasHeader ? (
        // §4.1's "between a title and its supporting line" step: one thought
        // about one number, so anything larger reads as stacked rows.
        <View style={{ gap: tokens.spacing.xs }}>
          {title === undefined ? null : (
            <TextV4 size="base" weight="semibold">
              {title}
            </TextV4>
          )}
          {summary === undefined ? null : (
            <TextV4 size="2xl" weight="bold" numeric="tabular">
              {summary}
            </TextV4>
          )}
          {caption === undefined ? null : (
            <TextV4 size="sm" tone="mutedText">
              {caption}
            </TextV4>
          )}
        </View>
      ) : null}
      {children}
      {legend}
    </View>
  );
}

/**
 * The empty state for the **radial** family — brief §4.5.
 *
 * Kept as a name after the consolidation pass, and deliberately: it is no
 * longer a second implementation, only the shared {@link ChartEmptyV4} with
 * the one thing a radial form needs that a full-bleed one does not — a
 * **square footprint**. A line chart's placeholder reserves height and lets
 * width come from the parent; a donut, gauge, ring or radar is `size × size`,
 * and a placeholder that reserved only height would let the chart collapse
 * horizontally while its data was in flight — the same jank on the other axis.
 *
 * So `width` became a prop of the shared component and this stayed as the
 * radial family's four call sites' name for it. One implementation, one
 * spelling per footprint shape.
 */
export function RadialEmptyV4({
  label,
  width,
  height,
}: {
  label?: string;
  width: number;
  height: number;
}): React.ReactElement {
  return <ChartEmptyV4 label={label} width={width} height={height} />;
}

/** The loading placeholder, at the plot's own footprint (§4.5). */
export function ChartLoadingV4({
  width,
  height,
  circle = true,
}: {
  width: number;
  height: number;
  circle?: boolean;
}): React.ReactElement {
  return <SkeletonV4 variant={circle ? 'circle' : 'rect'} width={width} height={height} />;
}

/**
 * The entrance reveal — §4.7, once, and never on a data update.
 *
 * **A fade, where web wipes.** The web sheet reveals with
 * `transform: scaleY(0.94)` off `transform-origin: bottom`; React Native has no
 * transform origin, so the same declaration would scale a chart about its
 * centre and read as a zoom rather than a wipe. Rather than reimplement an
 * origin with a measured offset — which needs a layout pass before the first
 * frame and is exactly the "motion-on frame before the answer lands" the V4
 * root exists to avoid — native takes the reduced-motion relief as its normal
 * entrance. Same duration, same easing, same "once, never on update".
 *
 * It is never removed entirely: an element that appears with no transition
 * reads as a glitch (`design.md` §36.10), so Reduce Motion shortens the fade to
 * `V4_MOTION.standard` rather than dropping it.
 */
export function ChartRevealV4({
  animate,
  children,
  style,
}: {
  animate: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}): React.ReactElement {
  const reduced = useReducedMotion();
  const enter = React.useRef(new Animated.Value(animate ? 0 : 1)).current;

  React.useEffect(() => {
    if (!animate) {
      enter.setValue(1);
      return;
    }
    const run = Animated.timing(enter, {
      toValue: 1,
      duration: reduced ? V4_MOTION.standard : V4_MOTION.enter,
      easing: EASING_ENTER,
      useNativeDriver: true,
    });
    run.start();
    // Stopped on unmount, not left running. A 400ms timer that outlives its
    // component is a state update on a dead tree in an app and a "Jest
    // environment torn down" in a spec — the same leak, seen from two ends.
    return () => run.stop();
  }, [animate, enter, reduced]);

  return <Animated.View style={[{ opacity: enter }, style]}>{children}</Animated.View>;
}

export interface PieChartV4Props {
  /** The slices. Six or more are sorted and folded — see {@link foldPieDataV4}. */
  data: readonly PieDatumV4[];
  /**
   * Diameter in px, and the plot's whole footprint.
   *
   * §4.2 asks for a height that is never auto; a radial plot is square, so
   * `size` *is* that prop. The twins disagreed — web defaulted to 160, native
   * to 200 — and V4 converges on 160 on both, because a V4 pie is a figure with
   * a title and a legend around it and the whole block, not the circle, has to
   * fit a dashboard column.
   */
  size?: number;
  /** The descriptive headline. HIG's rule: say the takeaway, not the axes. */
  title?: string;
  /** The one loud number, drawn above the plot. */
  summary?: string;
  /** The quiet line — "last 30 days", "vs last month". */
  caption?: string;
  /** Show the legend. Default `true` at two or more segments (§4.2). */
  legend?: boolean;
  /** Swap the plot for a `SkeletonV4` at the same footprint (§4.5). */
  loading?: boolean;
  /** The empty state's wording. */
  emptyLabel?: string;
  /** What the folded tail is called in the legend. Default `'Other'`. */
  otherLabel?: string;
  /** Run the entrance reveal (§4.7). Default `true`; Reduce Motion shortens it. */
  animate?: boolean;
  /** Overrides the derived sentence (§1 rule 6). */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * **V4 pie chart** — a part-to-whole figure that never cycles the palette, and
 * where a sixth slice is folded rather than repainted.
 *
 * Requires `react-native-svg` (§7 open question 6).
 *
 * Four things changed, in the order they matter.
 *
 * 1. **Colour stopped meaning two things at once.** The base cycled
 *    `['primary', 'accent', 'success', 'warn', 'danger']`, so slice three was
 *    painted `success` and slice five `danger` — a green-amber-red arc that
 *    protanopia and deuteranopia collapse almost completely, spent on regions
 *    where nothing was passing or failing. V4 takes the derived palette in
 *    assignment order and reserves the status hues for `tone` (§1 rule 3).
 * 2. **A sixth slice is folded, not wrapped — and not dimmed.** The base did
 *    something worse than wrapping: `sliceOpacity` stepped every wrapped slice
 *    down by `0.25`, so slice six was slice one at 75% and slice eleven was
 *    invisible. `chartSlotColor` throws past slot 5 instead, and
 *    {@link foldPieDataV4} makes sure it never has to.
 * 3. **The gap became a number with a reason.** The base had no separation at
 *    all on native — adjacent slices touched — where web at least drew a 1px
 *    hairline. `CHART_MARK.gap` of `palette.ring` (the page colour) is that
 *    idea at the measured width, and it is not decoration: the palette's worst
 *    adjacent CVD ΔE is 6.5, inside the 6–8 floor band, and that band is legal
 *    *only* with secondary encoding.
 * 4. **It became a figure.** Title, summary, caption and a legend carrying
 *    every slice's name and share — which is also how the sub-3:1 fills
 *    discharge their contrast-relief obligation (§4.8).
 */
export function PieChartV4({
  data,
  size = 160,
  title,
  summary,
  caption,
  legend,
  loading = false,
  emptyLabel,
  otherLabel = PIE_OTHER_LABEL,
  animate = true,
  accessibilityLabel,
  style,
}: PieChartV4Props): React.ReactElement {
  const { colors } = useXenitionTheme();
  const palette = useChartPaletteV4();
  const fold = React.useMemo(() => foldPieDataV4(data, otherLabel), [data, otherLabel]);

  const frame = (plot: React.ReactNode, legendNode?: React.ReactNode): React.ReactElement => (
    <ChartFigureV4
      title={title}
      summary={summary}
      caption={caption}
      legend={legendNode}
      style={style}
    >
      {plot}
    </ChartFigureV4>
  );

  if (loading) return frame(<ChartLoadingV4 width={size} height={size} />);
  if (fold.segments.length === 0 || fold.total <= 0) {
    return frame(<RadialEmptyV4 label={emptyLabel} width={size} height={size} />);
  }

  const cx = size / 2;
  const cy = size / 2;
  // Half the surface gap is spent outside every arc, so a 160 pie occupies 160.
  const r = size / 2 - CHART_MARK.gap / 2;

  const showLegend = legend ?? fold.segments.length > 1;
  const legendNode = showLegend ? (
    <RadialLegendV4
      items={fold.segments.map((segment, i) => ({
        label: segmentLegendLabelV4(segment),
        slot: i,
        ...(segment.tone === undefined ? {} : { tone: segment.tone }),
        value: `${shareOfV4(segment.value, fold.total)}%`,
      }))}
    />
  ) : undefined;

  const top = fold.segments.reduce((a, b) => (b.value > a.value ? b : a));
  const spoken =
    accessibilityLabel ??
    `Pie chart, ${fold.segments.length} slice${fold.segments.length === 1 ? '' : 's'}, ` +
      `largest ${top.label} at ${shareOfV4(top.value, fold.total)}%` +
      (fold.foldedCount > 0
        ? `, ${fold.foldedCount} smaller categories folded into ${otherLabel}`
        : '');

  let angle = -Math.PI / 2;
  const only = fold.segments[0] as PieSegmentV4;

  return frame(
    <ChartRevealV4 animate={animate}>
      <View accessibilityRole="image" accessibilityLabel={spoken}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G>
            {fold.segments.length === 1 ? (
              // One non-zero segment is a whole ring, and an arc path cannot
              // express 360° — its endpoints coincide and nothing is drawn.
              // The circle is the shape that survives it, which matters at
              // exactly the moment a filter narrows a chart to one category.
              <Circle cx={cx} cy={cy} r={r} fill={segmentFillV4(palette, colors, only, 0)} />
            ) : (
              fold.segments.map((segment, i) => {
                const a0 = angle;
                const a1 = angle + (segment.value / fold.total) * Math.PI * 2;
                angle = a1;
                return (
                  <Path
                    key={segment.label}
                    d={wedgePathV4(cx, cy, r, a0, a1)}
                    fill={segmentFillV4(palette, colors, segment, i)}
                    stroke={palette.ring}
                    strokeWidth={CHART_MARK.gap}
                  />
                );
              })
            )}
          </G>
        </Svg>
      </View>
    </ChartRevealV4>,
    legendNode
  );
}
