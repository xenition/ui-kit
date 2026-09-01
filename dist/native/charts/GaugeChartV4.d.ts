import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ChartToneV4 } from './PieChartV4';
export interface GaugeChartV4Props {
    /** Current value. Clamped into `[min, max]`; non-finite reads as `min`. */
    value: number;
    /**
     * Left end of the arc. Default 0.
     *
     * The web base had a `min` and the native base did not, so the same gauge
     * could not be written twice. §1 rule 7 closes the gap on the richer side.
     */
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
    /** Run the entrance reveal. Default `true`; Reduce Motion shortens it. */
    animate?: boolean;
    /** Overrides the derived sentence (§1 rule 6). */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 gauge** — a single value against a scale, so it is a figure with a
 * `summary` and **no legend**.
 *
 * Requires `react-native-svg` (§7 open question 6).
 *
 * That sentence is §5's whole direction for this component and it is
 * load-bearing rather than descriptive: a legend is the identity channel's
 * redundancy (§4.8) and exists "whenever there are two or more series". One
 * series has no identity to disambiguate, so a legend here would be a swatch
 * next to the only colour on screen. The redundancy obligation is discharged by
 * the visible number instead — the strongest secondary encoding the line has.
 *
 * Four changes against the base.
 *
 * 1. **The track is chrome.** `colors.border` was a hairline colour doing a
 *    track's job (§3, decision 3). It is `palette.grid` now — the derived
 *    neutral the whole line's grid takes.
 * 2. **`thickness={18}` became a derived thickness.** §5 asks for this by name;
 *    `radialThicknessV4` is the family's answer, shared with `ProgressRingV4`
 *    and `DonutChartV4` so the three cannot drift.
 * 3. **The needle is gone.** It encoded the value a second time — the arc's end
 *    already *is* the value — and it cost a `strokeWidth={2}` literal. Removing
 *    it also lets the well hold the number at the figure's own type step.
 * 4. **The fill is a palette slot or a `tone`.** The base's
 *    `color?: keyof SemanticColors` defaulted to `'primary'` and accepted
 *    `'danger'` as though the two were the same kind of choice. They are not:
 *    one is identity, one is state (§4.3).
 *
 * The empty state is a non-positive span. `min === max` is a gauge with no
 * scale; the web base papered over it with `max - min || 1`, a silent lie that
 * draws a full arc for every value.
 */
export declare function GaugeChartV4({ value, min, max, size, thickness, tone, title, summary, caption, showValue, loading, emptyLabel, animate, accessibilityLabel, style, }: GaugeChartV4Props): React.ReactElement;
//# sourceMappingURL=GaugeChartV4.d.ts.map