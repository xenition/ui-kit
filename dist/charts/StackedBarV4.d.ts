import * as React from 'react';
import { type ChartToneV4 } from '../primitives/internal/v4-chart';
/**
 * The opt-in to status colour, and the only way a segment paints one
 * (brief §4.3).
 *
 * A stack is the one bar form where status is often the *right* answer — a
 * pass/fail split, a budget under/over — so `tone` is per segment here rather
 * than per chart. Rule 3's "one or the other, never both" is enforced instead:
 * either every segment declares a tone or none does. A stack where segment 2 is
 * "failed" red and segment 4 is red because it is fourth cannot say which red
 * it means, so this component refuses to draw it.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type StackedBarV4Tone = ChartToneV4;
export interface StackedBarV4Segment {
    /** The segment's share of the total. Negative values are clamped to 0. */
    value: number;
    /**
     * What this segment is. Carried by the legend, the tooltip and the
     * accessible sentence — a stack without labels is a bar of colours.
     */
    label?: string;
    /** Status colour for this segment. All segments or none — see {@link StackedBarV4Tone}. */
    tone?: StackedBarV4Tone;
}
export interface StackedBarV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
    /** Segments laid end to end; each width is its share of the total. */
    segments: StackedBarV4Segment[];
    /** Bar height in px. */
    height?: number;
    /**
     * Show the legend. Defaults to **on at two or more segments** — brief §1
     * rule 5: the legend is the identity channel's redundancy and is not
     * optional where colour is carrying identity.
     */
    legend?: boolean;
    /**
     * Show each segment's value in the legend. Defaults to **on at
     * `CHART_DIRECT_LABEL_MAX` segments or fewer**. See {@link StackedBarV4} for
     * why a stack's direct labels live in the legend rather than in the bar.
     */
    showValues?: boolean;
    /** How a value is spelled, in the legend, the tooltip and the sentence. */
    format?: (value: number) => string;
    /** The descriptive headline. HIG's rule: say the takeaway, not the axes. */
    title?: string;
    /** The one loud number this figure is evidence for. */
    summary?: string;
    /** The quiet line — "vs last month", "last 30 days". */
    caption?: string;
    /** Render a skeleton at the bar's footprint instead of the bar. */
    loading?: boolean;
    /** What the empty state says. Keeps the footprint either way (brief §4.5). */
    emptyLabel?: string;
    /** Play the entrance reveal, once. Default `true` (brief §4.7). */
    animate?: boolean;
    /** Hover tooltip carrying the precise value. Default `true` (brief §4.6). */
    tooltip?: boolean;
    /** Fired when a segment is clicked. See the note on the bar chart's `onSelect`. */
    onSelect?: (index: number, value: number) => void;
}
/** The one `<style>` id this component injects from. Idempotent. */
export declare const STACKED_BAR_V4_STYLE_ID = "xen-v4-stacked-bar-styles";
/** Paint, keyed off the chart's own root attribute. */
export declare const STACKED_BAR_V4_CSS: string;
/**
 * **V4 stacked bar** — one horizontal bar split into its parts.
 *
 * The base is the module's clearest example of the defect this whole pass
 * exists to fix, because it makes the mistake twice:
 *
 * 1. **`seriesColor(i)` cycles the semantic slots.** Segment 3 is painted
 *    `success`, segment 4 `warn`, segment 5 `danger` — so a three-part revenue
 *    split renders as green, amber, red and reads as a health indicator.
 *    Nothing is wrong with segment 4; it is simply fourth. V4 takes the shared
 *    palette's slots in order, and status is opt-in per {@link
 *    StackedBarV4Tone}.
 * 2. **`opacity` as the way to tell segments apart.** The base's own doc
 *    comment recommends it: "distinguish series by varying the `opacity` of one
 *    theme color". Opacity is not a categorical channel — it is a *magnitude*
 *    channel, so a descending ramp says the fourth segment matters less than
 *    the first, and at the bottom of the ramp it says the fourth segment is
 *    **disabled**, because 0.38 of a colour is exactly what `v4-state.ts` uses
 *    to mean that. Retired outright: every segment is painted at full strength.
 *
 * ## The gap is the encoding
 *
 * `CHART_MARK.gap` of page between segments is not a style choice here, it is
 * the secondary encoding the palette's 6.5 adjacent CVD ΔE obliges (brief §1
 * rule 5). Two segments a dichromat cannot tell apart by hue are still visibly
 * two segments when a hairline of page runs between them — and a stack is the
 * one form where every pair of series is guaranteed to be adjacent, so it is
 * the form that needs it most. The base drew its segments flush.
 *
 * ## Where a stack's direct labels go
 *
 * Brief §4.4 asks for direct labels at four series or fewer. A stack cannot
 * take them in place: a segment is as wide as its share, so the 8% segment has
 * no room for "8%" and the label that does not fit is the one the reader most
 * wanted. So the legend carries the values instead — same channel, same four-
 * or-fewer rule, somewhere they fit. The tooltip carries the precise number
 * for the rest.
 *
 * ## Rounding
 *
 * `CHART_MARK.endRadius` at the **data end only** (brief §4.4): the stack's
 * right edge is where the total lands, and its left edge is the baseline. A bar
 * rounded at the baseline floats off its axis, which is why the base's
 * `rx={5}` pill is gone.
 */
export declare const StackedBarV4: React.ForwardRefExoticComponent<StackedBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StackedBarV4.d.ts.map