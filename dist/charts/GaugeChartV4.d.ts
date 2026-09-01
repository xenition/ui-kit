import * as React from 'react';
import { type ChartToneV4 } from './PieChartV4';
export interface GaugeChartV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
    /** Current value. Clamped into `[min, max]`; non-finite reads as `min`. */
    value: number;
    /** Left end of the arc. Default 0. */
    min?: number;
    /** Right end of the arc. Default 100. */
    max?: number;
    /** Width in px; the height is derived from the semicircle. Default 200. */
    size?: number;
    /** Arc thickness in px. Omit for the family's derived thickness. */
    thickness?: number;
    /**
     * Opt in to a status hue (§1 rule 3) — a gauge that genuinely reads "over
     * budget" or "capacity critical". Omitted, the fill is slot 1.
     */
    tone?: ChartToneV4;
    /** The descriptive headline. HIG's rule: say the takeaway. */
    title?: string;
    /**
     * The one loud number, drawn in the arc's well. Defaults to the clamped
     * `value`; pass a formatted string ("£48,210", "72%") to override it.
     */
    summary?: string;
    /** The quiet line under the title. */
    caption?: string;
    /** Draw the `summary`. Default `true`. */
    showValue?: boolean;
    /** Swap the plot for a `SkeletonV4` at the same footprint (§4.5). */
    loading?: boolean;
    /** The empty state's wording. */
    emptyLabel?: string;
    /** Run the entrance reveal. Default `true`; reduced motion fades instead. */
    animate?: boolean;
}
/**
 * **V4 gauge** — a single value against a scale, so it is a figure with a
 * `summary` and **no legend**.
 *
 * That sentence is brief §5's whole direction for this component, and it is
 * load-bearing rather than descriptive: a legend is the identity channel's
 * redundancy (§4.8) and exists "whenever there are two or more series". One
 * series has no identity to disambiguate, so a legend on a gauge would be a
 * swatch next to the only colour on screen. The redundancy obligation is
 * discharged by the visible number instead, which is the strongest secondary
 * encoding the line has.
 *
 * Four changes against the base.
 *
 * 1. **The track is chrome.** `var(--xen-border)` was a hairline colour doing a
 *    track's job (§3, decision 3). It is `CHART_GRID_VAR` now — the derived
 *    neutral the whole line's grid takes, which follows the scheme without a
 *    dark rule of its own.
 * 2. **`strokeWidth={10}` became a derived thickness.** §5 asks for this by
 *    name; `radialThicknessV4` is the family's answer and is shared with
 *    `ProgressRingV4` and `DonutChartV4` so the three cannot drift.
 * 3. **The needle is gone.** It encoded the value a second time — the arc's end
 *    already *is* the value — and it cost `strokeWidth={2}` and `r={4}`, both
 *    on §1 rule 1's list of literals this pass exists to remove. Removing it is
 *    also what lets the well hold a number at the figure's own type step
 *    instead of the base's `fontSize={size * 0.14}`, which was a font size
 *    computed from a pixel width and belonged to no scale at all.
 * 4. **The fill is a palette slot or a `tone`.** The base's `color?: ChartColor`
 *    defaulted to `'primary'` and accepted `'danger'` as though the two were
 *    the same kind of choice. They are not: one is identity, one is state
 *    (§4.3), and only `tone` reaches a status hue.
 *
 * The empty state is a non-positive span. `min === max` is a gauge with no
 * scale, which the base papered over with `max - min || 1` — a silent lie that
 * draws a full arc for every value.
 */
export declare const GaugeChartV4: React.ForwardRefExoticComponent<GaugeChartV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GaugeChartV4.d.ts.map