import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ChartIndicatorV4, type ChartToneV4 } from '../../primitives/internal/v4-chart';
/**
 * The opt-in to status colour, and the only way a V4 chart paints one
 * (brief §4.3).
 *
 * A series wears `success` / `warn` / `danger` when it genuinely *means* good
 * or bad — an error rate, budget overspend, a pass/fail split. A series that is
 * merely first wears slot 1. Brief §1 rule 3 is explicit that a chart takes one
 * or the other and never both, which is why this is a single value on the whole
 * chart rather than a per-bar option: a bar chart where bar 4 is red and
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
export interface BarChartV4Props {
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
    /** Press-to-reveal value bubble. Default `true` (brief §4.6). */
    tooltip?: boolean;
    /** The tooltip's swatch shape. */
    indicator?: BarChartV4Indicator;
    /** Fired when a bar is pressed. */
    onSelect?: (index: number, value: number) => void;
    /** Accessible one-line summary; derived from the data when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 vertical bar chart (native)** — the twin of `charts/BarChartV4`, prop
 * for prop.
 *
 * The base is five decisions the V4 line exists to retire:
 *
 * 1. **`color?: ChartColor` as an identity.** `colors[color]` paints every bar
 *    with a semantic slot, so a second bar chart on the screen reached for
 *    `warn` and became a chart that reads as a warning. V4 has one categorical
 *    answer — slot 1 from the shared palette — and one status answer,
 *    {@link BarChartV4Props.tone}, which is opt-in and means something.
 * 2. **Colour by value.** Brief §4.1 forbids it, and a bar chart is where the
 *    temptation is strongest: bar *length* already encodes magnitude. A
 *    single-series bar chart is **one colour** for every bar.
 * 3. **`colors.muted` as the axis.** `muted` is a de-emphasised *text* colour
 *    with no contrast promise as a rule. The axis is chrome and chrome is
 *    `palette.axis` — the derived neutral at `CHART_AXIS_MIX`, one step more
 *    present than the grid behind it (brief §3.3).
 * 4. **`radius.sm` on the bar top.** Right idea, wrong source: the mark
 *    geometry belongs to `CHART_MARK`, so one bar chart in the kit cannot round
 *    at 4 while the next rounds at whatever the seed's `radius.sm` compiled to
 *    — on a `sharp` seed the base's bars have no rounded end at all.
 *    `CHART_MARK.endRadius` rounds the **data end only**; a bar rounded at the
 *    baseline floats off its axis (brief §4.4).
 * 5. **`gap: tokens.spacing.xs` between bars.** A spacing token doing a mark's
 *    job, and 4 where the mark spec says 2. `CHART_MARK.gap` is the surface
 *    showing between two fills, and it is one of the secondary encodings the
 *    palette's 6–8 CVD band obliges (brief §1 rule 5).
 *
 * Press is native's answer to web's hover (brief §4.6): a bar reveals its
 * precise value and fires {@link BarChartV4Props.onSelect}. Each bar's target
 * is its full-height column slot, carried out to rule 10's 44 floor
 * *vertically* by `hitSlop`; horizontally it stays inside its slot, because a
 * `hitSlop` wider than the slot overlaps the neighbouring bar's target and
 * starts answering the wrong bar.
 *
 * No `react-native-svg`. A bar chart has no curves, no path data and no
 * clipping, so flex `View`s draw it exactly — and unlike an SVG under
 * `preserveAspectRatio`, they keep `CHART_MARK.gap` at 2 real pixels and
 * `CHART_MARK.endRadius` at a real 4px corner at every container width.
 */
export declare function BarChartV4({ data, labels, height, max, tone, showValues, format, title, summary, caption, loading, emptyLabel, animate, tooltip, indicator, onSelect, accessibilityLabel, style, }: BarChartV4Props): React.ReactElement;
//# sourceMappingURL=BarChartV4.d.ts.map