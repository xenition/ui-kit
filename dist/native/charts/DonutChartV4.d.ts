import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type PieDatumV4 } from './PieChartV4';
export type { PieDatumV4 as DonutDatumV4 } from './PieChartV4';
export interface DonutChartV4Props {
    /** The segments. Six or more are sorted and folded into "Other". */
    data: readonly PieDatumV4[];
    /** Outer diameter in px, and the plot's whole footprint. Default 160. */
    size?: number;
    /**
     * Ring thickness **as a fraction of the outer radius**, `0` to `1`. Omit for
     * the family's derived thickness.
     *
     * The bases disagreed on what this prop meant: web took a fraction (`0.42`),
     * native took pixels (`32`), so the same number produced a hairline on one
     * twin and a solid disc on the other. That is the prop-parity break §1 rule 7
     * exists to close, and V4 closes it on the fraction — a thickness in pixels
     * does not survive a caller changing `size`.
     */
    thickness?: number;
    /** The descriptive headline. HIG's rule: say the takeaway. */
    title?: string;
    /**
     * The one loud number, drawn **in the hole** — §5's "donut's centre is a slot
     * for `summary`". Replaces the base's `centerLabel`.
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
    /** Run the entrance reveal. Default `true`; Reduce Motion shortens it. */
    animate?: boolean;
    /** Overrides the derived sentence (§1 rule 6). */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 donut chart** — the pie's sibling, and the one radial form with a place
 * to put the number.
 *
 * Requires `react-native-svg` (§7 open question 6).
 *
 * Everything `PieChartV4` changed applies here for the same reasons: slots in
 * assignment order instead of a status arc, `CHART_MARK.gap` of page between
 * segments instead of nothing at all, and the "Other" fold at six or more
 * instead of the base's descending-opacity wrap. Three things are this
 * component's own.
 *
 * 1. **The hole is a slot, not a hole.** §5: "donut's centre is a slot for
 *    `summary`", and §3 puts the number ahead of the plot in the reading order
 *    because "the number is bigger than the chart is loud". A donut is the one
 *    form where those land in the same place. The base's `centerLabel` is
 *    retired — it took a raw string at `typography.scale.lg` on the heading
 *    face, a treatment nothing else in the kit used.
 * 2. **The hole is transparent.** The base drew full pie wedges and then
 *    painted a `colors.surface` circle over them, which works until the donut
 *    sits on a card, a tinted panel or an image — at which point a
 *    surface-coloured disc appears in the middle of the chart. It also meant
 *    the *single-segment* case punched its hole and the multi-segment case did
 *    not, so a filtered donut changed shape. V4 draws real annuli.
 * 3. **The thickness is derived.** `radialThicknessV4` is the family's one
 *    answer, shared with `GaugeChartV4` and `ProgressRingV4`.
 */
export declare function DonutChartV4({ data, size, thickness, title, summary, caption, legend, loading, emptyLabel, otherLabel, animate, accessibilityLabel, style, }: DonutChartV4Props): React.ReactElement;
//# sourceMappingURL=DonutChartV4.d.ts.map