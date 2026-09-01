import * as React from 'react';
import { type ChartToneV4 } from '../primitives/internal/v4-chart';
/**
 * The **radial family's shared geometry** lives in this file, and the other
 * four (`DonutChartV4`, `GaugeChartV4`, `ProgressRingV4`, `RadarChartV4`)
 * import from it.
 *
 * The *vocabulary* no longer does. `ChartToneV4` was declared here while the
 * radial group built, because `primitives/internal/v4-chart.ts` was closed to
 * the build groups mid-pass and three other groups were writing against it
 * concurrently. It landed in that module afterwards, so this file imports it
 * and re-exports it under the same name — the lift the doc comment promised,
 * with not a single call site changing shape.
 */
/**
 * The status opt-in, and the **only** way a component in this line paints a
 * status hue (brief §4.3). Canonical in
 * `primitives/internal/v4-chart.ts`; re-exported here because the radial
 * family's four other files already import it from this one.
 */
export type { ChartToneV4 };
/** The fill for a `tone`. The theme's own status slot, never a derived hue. */
export declare const toneVarV4: (tone: ChartToneV4) => string;
export interface PieDatumV4 {
    /**
     * The slice's name. **Required**, where the base made it optional.
     *
     * Brief §1 rule 5: the palette's worst adjacent CVD ΔE lands in the 6–8 floor
     * band, and that band is legal only with secondary encoding. The legend is
     * that encoding for this form, and a legend cannot be built out of slices
     * that have no name — so an unnamed slice is not a style choice here, it is
     * a chart that asks colour to carry identity alone.
     */
    label: string;
    /** The slice's magnitude. Non-finite and negative values are read as zero. */
    value: number;
    /**
     * Opt in to a status hue (brief §1 rule 3). Either **every** datum in a chart
     * carries one or none does — see {@link foldPieDataV4}, which throws on the
     * mixture, because a chart where slot 4 is red and "failures" is also red
     * cannot say which red it means.
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
 * The question was whether a pie with eleven slices is the caller's problem.
 * It is not, for two reasons the brief states and one the palette module
 * enforces:
 *
 * 1. The alternative is every caller writing the same reducer, slightly
 *    differently, and a kit exists to stop that.
 * 2. A pie with eleven slices is wrong in a way the kit *can* prevent, and
 *    Atlassian's practical ceiling of five or six distinct colours for one
 *    categorical chart is the measured version of that sentence.
 * 3. `chartVar(5)` **throws**. Without a fold, a six-slice pie is a crash, and
 *    a crash is a worse answer to "you have too many series" than a fold plus
 *    a legend row that says so.
 *
 * ## The arithmetic
 *
 * The brief's §5 phrasing is "sort descending, keep five, fold the tail", and
 * read as *five kept plus an Other* it asks for six marks out of a five-slot
 * palette that throws at index 5. Read as **five segments total** it is exactly
 * buildable, so that is the reading implemented: four named segments and the
 * folded tail in slot 5. The tail is therefore always at least two rows deep
 * (six inputs → four kept, two folded), which is why the legend can say
 * "categories" in the plural without a branch.
 *
 * ## Why the sort is conditional
 *
 * Only a chart that actually folds is sorted. `CHART_HUE_OFFSETS` is documented
 * as a sequence that "must not be re-sorted" because "the reader's memory of
 * 'green was Europe' is the only continuity a dashboard has" — and sorting the
 * *data* moves a series between slots just as surely as sorting the palette
 * would. At five or fewer segments there is nothing to decide, so the caller's
 * order is kept and a slice holds its colour when a sibling chart filters. At
 * six or more the sort is unavoidable: you cannot know which tail to fold
 * without ranking it.
 *
 * ## Zero and negative rows
 *
 * Dropped, not drawn. A zero-value row paints nothing and would still take a
 * legend swatch — a name and a colour against an invisible slice, which reads
 * as a rendering bug rather than as "this category is empty".
 *
 * Keep this function in step with the native twin; the two are the same
 * algorithm and the specs on both sides assert the same outputs.
 */
export declare function foldPieDataV4(data: readonly PieDatumV4[], otherLabel?: string): PieFoldV4;
/** The legend's word for a segment — the fold announces itself here (§5). */
export declare function segmentLegendLabelV4(segment: PieSegmentV4): string;
/** A segment's fill: its status hue if it has one, otherwise its slot. */
export declare function segmentFillV4(segment: PieSegmentV4, index: number): string;
/** Whole-percent share, for the legend and the spoken label. */
export declare function shareOfV4(value: number, total: number): number;
/** Point on a circle of radius `r` about `(cx, cy)`, `angle` in radians. */
export declare function polarV4(cx: number, cy: number, r: number, angle: number): [number, number];
/**
 * A pie wedge from `a0` to `a1`, in radians, measured from 3 o'clock.
 *
 * Callers start at `-Math.PI / 2` so the first slice begins at 12 o'clock,
 * which is where every reviewed system starts a part-to-whole.
 */
export declare function wedgePathV4(cx: number, cy: number, r: number, a0: number, a1: number): string;
/**
 * A donut segment — the annulus between `rInner` and `rOuter`.
 *
 * Lives here rather than in `DonutChartV4` because it is the same wedge maths
 * with a second radius, and two files deriving the same arc separately is how
 * a kit ends up with two donuts that do not line up.
 */
export declare function annulusPathV4(cx: number, cy: number, rOuter: number, rInner: number, a0: number, a1: number): string;
/**
 * One row of the radial family's legend.
 *
 * Carried a resolved `color` while `LegendV4` did not exist; it carries the
 * **slot** now, because that is the vocabulary `LegendV4` speaks and because a
 * resolved colour is a one-way door — a legend handed a hex cannot check that
 * the palette was never cycled, and refusing a sixth slot is the whole point of
 * `chartVar`. The three call sites already knew their slot; they were spending
 * it on a colour before handing it over.
 */
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
 * What the swap bought, beyond one implementation: the share percentage per
 * row is `LegendV4`'s own `value` slot, the swatch is the one every other form
 * in the module draws, and a sixth segment now fails through `chartVar` in the
 * legend as loudly as it does in the plot.
 */
export declare function RadialLegendV4({ items, className, }: {
    items: readonly RadialLegendItemV4[];
    className?: string;
}): React.ReactElement;
/**
 * The figure frame the radial family shares — brief §4.2's title / summary /
 * caption / legend slots in the one order they are ever drawn in.
 *
 * §3 is the argument: the current module is a set of *plots*, and what the
 * product needs is *figures* — "a plot is the ink, a figure is the ink plus the
 * sentence that says what it means". The plot is the `children`; everything
 * around it is that sentence.
 *
 * `role="img"` and the spoken label go on the **`<svg>`**, not on this wrapper.
 * Putting them here would make the title and the legend children of an `img`
 * role, which hides real text from a screen reader — the opposite of HIG's
 * point that a rendered chart plus a visible title is not accessible.
 */
export interface ChartFigureV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
    title?: string;
    summary?: React.ReactNode;
    caption?: string;
    legend?: React.ReactNode;
    children: React.ReactNode;
}
export declare const ChartFigureV4: React.ForwardRefExoticComponent<ChartFigureV4Props & React.RefAttributes<HTMLDivElement>>;
/**
 * The footprint-preserving loading placeholder — brief §4.5.
 *
 * A chart that collapses to zero height while its data is in flight is "the
 * single most common dashboard jank and is free to avoid", so the skeleton is
 * the plot's own square, not a text line.
 */
export declare function ChartLoadingV4({ size }: {
    size: number;
}): React.ReactElement;
export interface PieChartV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
    /** The slices. Six or more are sorted and folded — see {@link foldPieDataV4}. */
    data: readonly PieDatumV4[];
    /**
     * Diameter in px, and the figure's whole footprint.
     *
     * §4.2 asks for a `height` that is never auto; for a radial form the plot is
     * square, so `size` *is* that prop and carrying both would let a caller
     * describe a circle that is 160 wide and 200 tall.
     *
     * The twins disagreed here — web defaulted to 160, native to 200 — and V4
     * converges on 160 on both, because a V4 pie is a figure with a title and a
     * legend around it and the whole block, not the circle, is what has to fit a
     * dashboard column.
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
    /** Run the entrance reveal (§4.7). Default `true`; reduced motion fades. */
    animate?: boolean;
}
/**
 * **V4 pie chart** — a part-to-whole figure that never cycles the palette, and
 * where a sixth slice is folded rather than repainted.
 *
 * Four things changed, in the order they matter.
 *
 * 1. **Colour stopped meaning two things at once.** The base painted slice
 *    three `success`, slice four `warn` and slice five `danger` — a green,
 *    amber and red arc that protanopia and deuteranopia collapse almost
 *    completely, spent on regions where nothing was passing or failing. V4
 *    takes `chartVar(i)` in assignment order and reserves the status hues for
 *    `tone`, which is opt-in and all-or-nothing per chart (§1 rule 3).
 * 2. **A sixth slice is folded, not wrapped.** The base's `seriesColor` cycled
 *    with `i % 5`, so slice six was slice one's colour with a legend swatch
 *    repeating as though that were fine. `chartVar(5)` throws instead, and this
 *    component makes sure it never has to: {@link foldPieDataV4} sorts, keeps
 *    four and folds the tail into "Other" — brief §7's open question 2,
 *    answered by the component rather than by every caller.
 * 3. **The gap became a number with a reason.** The base separated slices with
 *    `strokeWidth={1}` against `--xen-surface`: the right idea at the wrong
 *    number. `CHART_MARK.gap` is that idea at the measured width, and it is not
 *    decoration — the palette's worst adjacent CVD ΔE is 6.5, inside the 6–8
 *    floor band, and that band is legal *only* with secondary encoding. Two
 *    slices a dichromat cannot separate by hue are still visibly two slices
 *    with a hairline of page between them.
 * 4. **It became a figure.** The base was a bare `<svg>` with a slice count for
 *    a label. §3: "a plot is the ink, a figure is the ink plus the sentence
 *    that says what it means" — so title, summary, caption and a legend that
 *    carries every slice's name and share, which is also the redundancy the
 *    contrast obligation is discharged with (§4.8).
 *
 * Hover carries the precise value through a native SVG `<title>` per slice —
 * progressive disclosure with no listener, no portal and no layout pass, which
 * is the whole of what this form needs: the legend already holds identity and
 * share, so the tooltip's job is only the exact number.
 */
export declare const PieChartV4: React.ForwardRefExoticComponent<PieChartV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PieChartV4.d.ts.map