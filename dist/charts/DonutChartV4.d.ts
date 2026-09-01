import * as React from 'react';
import { type PieDatumV4 } from './PieChartV4';
export type { PieDatumV4 as DonutDatumV4 } from './PieChartV4';
export interface DonutChartV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
    /** The segments. Six or more are sorted and folded into "Other". */
    data: readonly PieDatumV4[];
    /** Outer diameter in px, and the plot's whole footprint. Default 160. */
    size?: number;
    /**
     * Ring thickness **as a fraction of the outer radius**, `0` to `1`. Omit for
     * the family's derived thickness.
     *
     * The bases disagreed on what this prop even meant: web took a fraction
     * (`0.42`), native took pixels (`32`), so the same number produced a hairline
     * on one twin and a solid disc on the other. That is a prop-parity break of
     * the kind brief §1 rule 7 exists to close, and V4 closes it on the fraction,
     * because a thickness in pixels does not survive a caller changing `size`.
     */
    thickness?: number;
    /** The descriptive headline. HIG's rule: say the takeaway. */
    title?: string;
    /**
     * The one loud number, drawn **in the hole** — brief §5's "donut's centre is
     * a slot for `summary`".
     */
    summary?: string;
    /** The quiet line under the title. */
    caption?: string;
    /** Show the legend. Default `true` at two or more segments. */
    legend?: boolean;
    /** Swap the plot for a `SkeletonV4` at the same footprint. */
    loading?: boolean;
    /** The empty state's wording. */
    emptyLabel?: string;
    /** What the folded tail is called in the legend. Default `'Other'`. */
    otherLabel?: string;
    /** Run the entrance reveal. Default `true`; reduced motion fades instead. */
    animate?: boolean;
}
/**
 * **V4 donut chart** — the pie's sibling, and the one radial form with a place
 * to put the number.
 *
 * Everything `PieChartV4` changed applies here for the same reasons: slots in
 * assignment order instead of a status arc, `CHART_MARK.gap` of surface between
 * segments instead of `strokeWidth={1}`, and the "Other" fold at six or more
 * rather than a palette that wraps. Three things are this component's own.
 *
 * 1. **The hole is a slot, not a hole.** Brief §5 is explicit — "donut's centre
 *    is a slot for `summary`" — and §3 puts the number above the plot in the
 *    reading order for a reason: "the number is bigger than the chart is loud".
 *    A donut is the one form where those two land in the same place, so
 *    `summary` is typeset in the middle at the figure's `2xl` bold rather than
 *    the base's hand-rolled `text-lg font-semibold`, and the caption sits under
 *    it in the same well. The base's `centerLabel` is retired: it took a raw
 *    string at a size nothing else in the kit used.
 * 2. **The segments are real annuli.** The base drew full pie wedges and then
 *    punched a `--xen-surface` circle over the top of them. That works until
 *    the donut sits on anything that is not `--xen-surface` — a `card`, a
 *    tinted panel, an image — at which point a surface-coloured disc appears in
 *    the middle of the chart. V4 draws the ring itself, so the hole is actually
 *    a hole and whatever is behind the chart shows through it.
 * 3. **The thickness is derived.** `radialThicknessV4` is the family's one
 *    answer, shared with `GaugeChartV4` and `ProgressRingV4`, so the three do
 *    not each pick a ring weight; a caller who wants something else passes a
 *    fraction of the radius rather than a pixel count that stops being right
 *    the moment `size` changes.
 */
export declare const DonutChartV4: React.ForwardRefExoticComponent<DonutChartV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DonutChartV4.d.ts.map