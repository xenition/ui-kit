import * as React from 'react';
import { type ChartIndicatorV4, type ChartToneV4 } from '../primitives/internal/v4-chart';
/**
 * The opt-in to status colour, and the only way a V4 chart paints one
 * (brief §4.3).
 *
 * A series wears `success` / `warn` / `danger` when it genuinely *means* good
 * or bad — an error rate, budget overspend, a pass/fail split. A series that
 * is merely first wears slot 1. Brief §1 rule 3 is explicit that a chart takes
 * one or the other and never both, which is why this is a single value on the
 * whole chart rather than a per-bar option: a bar chart where bar 4 is red and
 * "failures" is also red cannot say which red it means.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type BarChartV4Tone = ChartToneV4;
/**
 * The tooltip swatch shapes, following shadcn's `ChartTooltip` (brief §4.6).
 *
 * An **alias for the shared `ChartIndicatorV4`**. The per-component spelling
 * was a barrel-collision workaround from the parallel build — five files
 * exporting one name would have been five collisions — and it is kept as an
 * alias rather than deleted so nothing that imports it has to change.
 */
export type BarChartV4Indicator = ChartIndicatorV4;
export interface BarChartV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
    /** Bar values; each becomes a vertical bar sized by `value / max`. */
    data: number[];
    /** Optional labels rendered under each bar. */
    labels?: string[];
    /** The plot's own height in px. Never auto — shadcn's rule (brief §4.2). */
    height?: number;
    /** Value mapped to a full-height bar; defaults to the largest datum. */
    max?: number;
    /**
     * Status colour, for a series that genuinely means good or bad. Omit it and
     * every bar is slot 1 — see {@link BarChartV4Tone}.
     */
    tone?: BarChartV4Tone;
    /**
     * Draw the value above each bar. Defaults to **on at
     * `CHART_DIRECT_LABEL_MAX` bars or fewer** — direct labels are the strongest
     * secondary encoding this line has (brief §4.4), and above four they collide.
     */
    showValues?: boolean;
    /** How a value is spelled, in the labels and in the accessible sentence. */
    format?: (value: number) => string;
    /** The descriptive headline. HIG's rule: say the takeaway, not the axes. */
    title?: string;
    /** The one loud number this figure is evidence for. */
    summary?: string;
    /** The quiet line — "vs last month", "last 30 days". */
    caption?: string;
    /** Render a skeleton at the plot's footprint instead of the plot. */
    loading?: boolean;
    /** What the empty state says. Keeps the footprint either way (brief §4.5). */
    emptyLabel?: string;
    /** Play the entrance reveal, once. Default `true` (brief §4.7). */
    animate?: boolean;
    /** Hover tooltip carrying the precise value. Default `true` (brief §4.6). */
    tooltip?: boolean;
    /** The tooltip's swatch shape. */
    indicator?: BarChartV4Indicator;
    /**
     * Fired when a bar is clicked.
     *
     * `title` and `onSelect` are `Omit`ted from the inherited
     * `HTMLAttributes<HTMLDivElement>` on purpose: the DOM's `title` is a browser
     * tooltip and the DOM's `onSelect` is a text-selection event, and both would
     * silently win the name over the figure props §4.2 and §4.6 ask for. The
     * native twin has no such collision, so this is the one place where keeping
     * prop parity means subtracting from the web element's own surface.
     */
    onSelect?: (index: number, value: number) => void;
}
/** The one `<style>` id this component injects from. Idempotent. */
export declare const BAR_CHART_V4_STYLE_ID = "xen-v4-bar-chart-styles";
/**
 * Paint, keyed off the chart's own root attribute so it cannot reach another
 * component's marks. Every number in it is `CHART_MARK`, interpolated rather
 * than retyped (brief §1 rule 1).
 */
export declare const BAR_CHART_V4_CSS: string;
/**
 * **V4 vertical bar chart** — the bar family's reference implementation, and
 * where four of the brief's rules land at once.
 *
 * The base is five decisions the V4 line exists to retire:
 *
 * 1. **`color?: ChartColor` as an identity.** The base takes `'primary' |
 *    'accent' | 'success' | 'warn' | 'danger'` and paints every bar with it, so
 *    a caller who wanted a second bar chart on the page reached for `warn` and
 *    got a chart that reads as a warning. V4 has one categorical answer — slot
 *    1, from the shared palette — and one status answer, {@link
 *    BarChartV4Props.tone}, which is opt-in and means something (brief §1
 *    rule 3, §4.3).
 * 2. **Colour by value.** Brief §4.1 forbids it and this component is where the
 *    temptation is strongest: bar *length* already encodes magnitude, so
 *    spending the identity channel on it says nothing new and costs the reader
 *    the one channel that could have told two series apart. A single-series bar
 *    chart is **one colour** for every bar.
 * 3. **`stroke="var(--xen-muted)"` as the axis.** `muted` is a *text* colour
 *    with no contrast promise as a rule; the axis is chrome, and chrome is
 *    {@link CHART_AXIS_VAR} — the derived neutral at `CHART_AXIS_MIX`, one step
 *    more present than the grid behind it (brief §3.3).
 * 4. **`rx={2}` on the whole rect.** A bar rounded at the baseline floats off
 *    its axis. `CHART_MARK.endRadius` rounds the **data end only** (brief
 *    §4.4), which is the difference between a bar that sits on an axis and a
 *    lozenge hovering near one.
 * 5. **No secondary encoding.** The palette's worst adjacent CVD ΔE is 6.5,
 *    inside the 6–8 floor band, and that band is legal only with a second
 *    channel. Here it is `CHART_MARK.gap` of page between adjacent bars plus
 *    direct value labels at four bars or fewer.
 *
 * ## Why this twin is flex and not `<svg>`
 *
 * The base draws `<rect>`s into a 320-unit viewBox under
 * `preserveAspectRatio="none"`, which scales x and y by different factors the
 * moment the container is not 320 wide. Under that transform `CHART_MARK.gap`
 * is not 2px and `CHART_MARK.endRadius` is not a 4px corner — both are
 * whatever the container width happens to make them, and the corner comes out
 * as a stretched ellipse. Those two constants are the *whole* mark spec for
 * this family, so a rendering that cannot honour them exactly is not an
 * implementation of it.
 *
 * Laying the bars out as flex children instead keeps both in real pixels, makes
 * each bar a genuine hit target rather than an SVG node with no padding, and
 * costs nothing: a bar chart has no curves, no path data and no clipping. The
 * line family keeps its SVG, because a polyline genuinely needs one. The
 * palette plumbing is unchanged either way — {@link useChartV4} puts the custom
 * properties on the root and `[data-xen-v4-chart]` picks the scheme in CSS, on
 * a `<div>` exactly as on an `<svg>`.
 *
 * ## Tap targets
 *
 * Rule 10 asks for 44 of hit area on anything a pointer can hit. Each bar's hit
 * area is its full-height column slot, so at the default 120 height it clears
 * 44 on the vertical axis and takes the whole slot on the horizontal — which is
 * the most a bar chart can offer, since 12 bars in a 320-wide card cannot each
 * be 44 wide. A chart with more bars than its width can carry is a composition
 * problem (facet it, or bin it into a {@link HistogramV4}), not a padding one.
 */
export declare const BarChartV4: React.ForwardRefExoticComponent<BarChartV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BarChartV4.d.ts.map