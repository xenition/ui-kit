import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ChartToneV4 } from '../../primitives/internal/v4-chart';
/**
 * The opt-in to status colour, and the only way this chart paints one
 * (brief §4.3).
 *
 * A bar chart wears `success` / `warn` / `danger` when its series genuinely
 * *means* good or bad. A series that is merely first wears slot 1. Rule 3 is
 * explicit that a chart takes one or the other and never both, which is why
 * this is one value for the whole chart rather than a per-row option.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type ColumnChartV4Tone = ChartToneV4;
export interface ColumnChartV4Datum {
    label: string;
    value: number;
}
export interface ColumnChartV4Props {
    /** Labelled values, rendered one per row as a horizontal bar. */
    data: ColumnChartV4Datum[];
    /** Value mapped to a full-width bar; defaults to the largest datum. */
    max?: number;
    /** Per-bar track height in px. */
    barHeight?: number;
    /**
     * Show the numeric value beside each label. Defaults to **on at
     * `CHART_DIRECT_LABEL_MAX` rows or fewer** — direct labels are the strongest
     * secondary encoding this line has (brief §4.4). The base defaulted this
     * `false`, which left a chart whose only encoding was bar length and a
     * palette that needs a second channel.
     */
    showValues?: boolean;
    /** Status colour. Omit it and every bar is slot 1 — see {@link ColumnChartV4Tone}. */
    tone?: ColumnChartV4Tone;
    /** How a value is spelled, in the labels and in the accessible sentence. */
    format?: (value: number) => string;
    /** The descriptive headline. HIG's rule: say the takeaway, not the axes. */
    title?: string;
    /** The one loud number this figure is evidence for. */
    summary?: string;
    /** The quiet line — "vs last month", "last 30 days". */
    caption?: string;
    /**
     * The footprint the **empty and loading** states hold, in px.
     *
     * A row list has no plot height of its own — it is as tall as its rows — so
     * unlike every other chart in this family `height` does not size the plot. It
     * exists because brief §4.5 asks that all three states keep the footprint.
     */
    height?: number;
    /** Render a skeleton at the footprint instead of the rows. */
    loading?: boolean;
    /** What the empty state says. */
    emptyLabel?: string;
    /** Play the entrance reveal, once. Default `true` (brief §4.7). */
    animate?: boolean;
    /**
     * Reveal a pressed row's value even when
     * {@link ColumnChartV4Props.showValues} is off. Default `true` (brief §4.6).
     */
    tooltip?: boolean;
    /** Fired when a row is pressed. */
    onSelect?: (index: number, value: number) => void;
    /** Accessible one-line summary; derived from the data when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 horizontal bar chart (native)** — one labelled row per datum, the twin
 * of `charts/ColumnChartV4` prop for prop.
 *
 * What the base got wrong, in the order it misleads a reader:
 *
 * 1. **`color?: ColumnChartColor` as an identity.** `colors[color]` paints
 *    every bar with a semantic slot, so a second chart on the screen reached
 *    for `warn` and became a chart that reads as a warning. V4 has one
 *    categorical answer — slot 1 from the shared palette — and one status
 *    answer, `tone` (brief §1 rule 3, §4.3).
 * 2. **Never colour by value.** A bar's *length* already encodes magnitude
 *    (brief §4.1). Every bar here is one colour.
 * 3. **`colors.border` as the track.** `border` is a hairline colour; a track
 *    is chrome, and chrome is `palette.grid` — the derived neutral at
 *    `CHART_GRID_MIX`, which follows the scheme with no dark rule of its own.
 *    The **baseline** is one step more present at `palette.axis`, and this
 *    chart has a real one: a horizontal bar grows rightward from x = 0, which
 *    the base drew as nothing at all.
 * 4. **`radius.full` on both ends of both the track and the fill.** A bar
 *    rounded at the baseline floats off its axis. `CHART_MARK.endRadius` rounds
 *    the **data end only** (brief §4.4) — here the right edge — and the track
 *    matches so a full bar and its track share one silhouette. It also stops
 *    being seed-dependent: on a `sharp` seed `radius.full` compiles to 0 and
 *    the base's bars lose their rounding entirely.
 * 5. **`showValues` defaulting off.** The palette's worst adjacent CVD ΔE is
 *    6.5, inside the 6–8 floor band, and that band is legal only with a second
 *    channel. At four rows or fewer the value label is that channel.
 *
 * Each row is a real press target at the 44 floor (`minTap`, rule 10) rather
 * than a 12px-tall strip, and rows sit on the spacing rhythm rather than on
 * `CHART_MARK.gap`: the constant is the hairline of page between two fills that
 * would otherwise *touch*, and two labelled rows never touch.
 */
export declare function ColumnChartV4({ data, max, barHeight, showValues, tone, format, title, summary, caption, height, loading, emptyLabel, animate, tooltip, onSelect, accessibilityLabel, style, }: ColumnChartV4Props): React.ReactElement;
//# sourceMappingURL=ColumnChartV4.d.ts.map