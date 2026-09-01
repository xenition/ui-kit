import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type LegendV4Tone } from './LegendV4';
export interface ComparisonBarsV4Group {
    /** The group's name, drawn under its bars. */
    label: string;
    /** One value per series, in series order. Short rows simply have fewer bars. */
    values: number[];
}
export interface ComparisonBarsV4Series {
    /** Stable identity for the series. Not rendered. */
    key: string;
    /** The series name, as it appears in the legend. */
    label: string;
    /**
     * Opt this series into a status hue instead of its categorical slot.
     * Use only where it genuinely *means* good or bad (rule 3).
     */
    tone?: LegendV4Tone;
}
export interface ComparisonBarsV4Props {
    /** The groups, in reading order. */
    data: ComparisonBarsV4Group[];
    /**
     * The series being compared within each group, in slot order.
     *
     * Defaults to as many unnamed series as the widest group has values — which
     * renders, but a comparison whose series have no names has no legend worth
     * reading, so pass this.
     */
    series?: ComparisonBarsV4Series[];
    /** The value mapped to a full-height bar. Defaults to the largest datum. */
    max?: number;
    /** The plot's own height in px. Never auto (§4.2). */
    height?: number;
    /** The descriptive headline (§4.2). Say the takeaway. */
    title?: string;
    /** The one loud number, when the figure has one. */
    summary?: string;
    /** The quiet line under the plot — "vs last quarter". */
    caption?: string;
    /** Render the legend. Defaults to `true` at two or more series. */
    legend?: boolean;
    /** Reserved for parity with the web twin, which ships hover (§4.6). */
    tooltip?: boolean;
    /**
     * Print each bar's value above it — the direct-label channel (§4.4).
     * Defaults on at `CHART_DIRECT_LABEL_MAX` groups or fewer.
     */
    showValues?: boolean;
    /** Format a value for its direct label and spoken name. Default `String`. */
    valueFormat?: (value: number) => string;
    /** Called when a bar is pressed. */
    onBarSelect?: (groupIndex: number, seriesIndex: number, value: number) => void;
    /** Show the loading placeholder at the plot's footprint instead of the bars. */
    loading?: boolean;
    /** What the empty state says. */
    emptyLabel?: string;
    /** Play the entrance reveal. Default `true` (§4.7). */
    animate?: boolean;
    /** Override the derived accessible sentence (rule 6). */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 grouped comparison bars** — `View`/flex, no SVG, as the base is.
 *
 * A grouped bar chart is a nested list of rectangles whose *gaps carry meaning*
 * — `CHART_MARK.gap` inside a group, a full spacing step between groups — which
 * a flex row expresses exactly, in tokens, with the group labels sharing the
 * bars' own flex distribution. There is nothing here `react-native-svg` would
 * draw better, so brief §7 open question 6's requirement does not apply to this
 * component. The new web twin is built on the same layout model for the same
 * reason, so the two cannot drift.
 *
 * ## The descending-opacity trick is retired
 *
 * The base cycles two theme colours and then falls back to
 * `OPACITY_STEPS = [1, 0.6, 0.35, 0.2]`. Three things are wrong with it, and
 * they are the same three the palette module was written to end:
 *
 * 1. **A fourth series at 0.2 alpha reads as disabled**, because 0.38 alpha is
 *    exactly what disabled content is drawn at in this kit. The chart says
 *    "this series is switched off" when it means "this series is fourth".
 * 2. **Alpha is not a separable channel from lightness.** Two series at 0.6 and
 *    0.35 of one hue differ only in lightness, which is the *one* channel the
 *    palette deliberately reserves to keep adjacent slots apart for a dichromat
 *    — so the trick spends the safety margin rather than adding to it.
 * 3. **It cycles.** `seriesColors[si % seriesColors.length]` paints the third
 *    series the first colour again, at a different alpha: two encodings for one
 *    fact, and neither is legible.
 *
 * V4 takes a slot per series in assignment order and **folds past the fifth**,
 * because `chartSlotColor` does. A sixth series arrives with the DATA, though,
 * so the COMPONENT folds rather than throwing: the tail's bars share the last
 * slot and the legend carries one row named `CHART_OVERFLOW_LABEL`. The bars
 * are not summed — a group's bars are compared, not composed. Keep in step
 * with the web twin.
 *
 * ## The two gaps are the secondary encoding
 *
 * Rule 5 requires it and §5 names it for this component specifically:
 * `CHART_MARK.gap` of page between bars *inside* a group, and a full
 * `spacing.md` between groups. That difference is what makes the grouping
 * readable without colour at all — a reader counts three bars, a space, three
 * bars. The base used a bare `gap: 2` inside groups and `spacing.sm` between
 * them, which is nearly the same ratio arrived at by accident; this is the same
 * idea with both numbers traceable.
 *
 * ## Marks
 *
 * `CHART_MARK.endRadius` at the **data end only** (§4.4). A bar rounded at the
 * baseline floats off its axis; the base sets only the top corners, which is
 * the one thing it got right and is kept. The baseline itself is `palette.axis`
 * at `CHART_MARK.stroke`; the base painted it `colors.muted`, a *text* colour
 * doing an axis's job (§3), at a bare `height: 1`.
 */
export declare function ComparisonBarsV4({ data, series, max, height, title, summary, caption, legend, tooltip: _tooltip, showValues, valueFormat, onBarSelect, loading, emptyLabel, animate: _animate, accessibilityLabel, style, }: ComparisonBarsV4Props): React.ReactElement;
//# sourceMappingURL=ComparisonBarsV4.d.ts.map