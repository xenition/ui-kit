import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ChartToneV4 } from '../../primitives/internal/v4-chart';
import { type SemanticColors } from '../theme';
import { type ChartPaletteV4 } from './internal-v4';
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
export declare function toneColorV4(colors: SemanticColors, tone: ChartToneV4): string;
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
export declare const PIE_OTHER_LABEL = "Other";
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
export declare function foldPieDataV4(data: readonly PieDatumV4[], otherLabel?: string): PieFoldV4;
/** The legend's word for a segment — the fold announces itself here (§5). */
export declare function segmentLegendLabelV4(segment: PieSegmentV4): string;
/** A segment's fill: its status hue if it has one, otherwise its slot. */
export declare function segmentFillV4(palette: ChartPaletteV4, colors: SemanticColors, segment: PieSegmentV4, index: number): string;
/** Whole-percent share, for the legend and the spoken label. */
export declare function shareOfV4(value: number, total: number): number;
/** Point on a circle of radius `r` about `(cx, cy)`, `angle` in radians. */
export declare function polarV4(cx: number, cy: number, r: number, angle: number): [number, number];
/** Two decimals, and never `NaN` — the guard the base left to chance. */
export declare const coordV4: (n: number) => string;
/** A pie wedge from `a0` to `a1` in radians, measured from 3 o'clock. */
export declare function wedgePathV4(cx: number, cy: number, r: number, a0: number, a1: number): string;
/** A donut segment — the annulus between `rInner` and `rOuter`. */
export declare function annulusPathV4(cx: number, cy: number, rOuter: number, rInner: number, a0: number, a1: number): string;
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
export declare function RadialLegendV4({ items, style, }: {
    items: readonly RadialLegendItemV4[];
    style?: StyleProp<ViewStyle>;
}): React.ReactElement;
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
export declare function ChartFigureV4({ title, summary, caption, legend, children, style, }: {
    title?: string;
    summary?: string;
    caption?: string;
    legend?: React.ReactNode;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}): React.ReactElement;
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
export declare function RadialEmptyV4({ label, width, height, }: {
    label?: string;
    width: number;
    height: number;
}): React.ReactElement;
/** The loading placeholder, at the plot's own footprint (§4.5). */
export declare function ChartLoadingV4({ width, height, circle, }: {
    width: number;
    height: number;
    circle?: boolean;
}): React.ReactElement;
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
export declare function ChartRevealV4({ animate, children, style, }: {
    animate: boolean;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}): React.ReactElement;
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
export declare function PieChartV4({ data, size, title, summary, caption, legend, loading, emptyLabel, otherLabel, animate, accessibilityLabel, style, }: PieChartV4Props): React.ReactElement;
//# sourceMappingURL=PieChartV4.d.ts.map