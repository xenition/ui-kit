import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ChartToneV4 } from '../../primitives/internal/v4-chart';
/**
 * The opt-in to status colour, and the only way this chart paints one
 * (brief §4.3).
 *
 * A range genuinely means something bad often enough to earn the prop — a
 * latency band over its budget, a temperature outside its safe window — and it
 * ships with the visible `start`–`end` label, never colour alone.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type RangeBarV4Tone = ChartToneV4;
export interface RangeBarV4Props {
    /** Start of the highlighted range, in domain units. */
    start: number;
    /** End of the highlighted range, in domain units. */
    end: number;
    /** Domain minimum — the track's left edge. */
    domainMin?: number;
    /** Domain maximum — the track's right edge. */
    domainMax?: number;
    /** Track height in px. */
    height?: number;
    /** Status colour. Omit it and the range is slot 1 — see {@link RangeBarV4Tone}. */
    tone?: RangeBarV4Tone;
    /**
     * Show the domain ends and the range itself in words. Default `true` — one
     * mark is well inside `CHART_DIRECT_LABEL_MAX`, and a floating bar with no
     * numbers anywhere is a picture of a range rather than a reading of one.
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
    /** Render a skeleton at the track's footprint instead of the track. */
    loading?: boolean;
    /** What the empty state says. Keeps the footprint either way (brief §4.5). */
    emptyLabel?: string;
    /** Play the entrance reveal, once. Default `true` (brief §4.7). */
    animate?: boolean;
    /**
     * Reveal the range in words on press even when
     * {@link RangeBarV4Props.showValues} is off. Default `true` (brief §4.6).
     */
    tooltip?: boolean;
    /** Fired when the bar is pressed. */
    onSelect?: (start: number, end: number) => void;
    /** Accessible one-line summary; derived from the data when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 floating bar (native)** — one band, `start` to `end`, on a domain.
 *
 * **This is the one bar form rounded at both ends**, and the reason is worth
 * stating because it is the exception that proves brief §4.4's rule. Every
 * other bar in this family has a baseline: it grows from zero, and rounding the
 * end it grows *from* lifts it off its own axis. A range bar has no baseline.
 * Both of its ends are data — `start` is as much a measurement as `end` — so
 * `CHART_MARK.endRadius` applies to both, and a square end here would read as a
 * bar that had been clipped rather than one that had been measured.
 *
 * What the base got wrong:
 *
 * - **`colors.border` as the track.** A hairline colour doing a fill's job, and
 *   one that does not follow the scheme the way the derived chrome neutral
 *   does. The track is `palette.grid` (brief §3.3).
 * - **No axis at all.** The range floats on a grey pill with nothing to read it
 *   against. V4 draws the domain axis at `palette.axis`, one step more present
 *   than the track behind it.
 * - **`color = 'primary'` as an identity.** A semantic slot standing in for a
 *   series colour, which is what brief §1 rule 2 exists to retire. Slot 1, or a
 *   `tone` that means something.
 * - **`radius.full` on the track and the fill.** Seed-dependent: on a `sharp`
 *   seed both compile to 0 and the range loses its ends entirely.
 *   `CHART_MARK.endRadius` is the mark spec and does not move with the seed.
 * - **`Math.max(domainMax - domainMin, 1)` as the divisor.** A collapsed or
 *   inverted domain then draws a confident-looking band at an arbitrary place.
 *   V4 renders the empty state instead, at the same footprint (brief §4.5).
 * - **A zero-width range drawn as nothing.** `start === end` is a real reading
 *   — a distribution collapsed to one value — so the mark floors at
 *   `CHART_MARK.dotSize`, this line's smallest painted point.
 *
 * The value labels sit **under the axis** rather than floating over the mark:
 * centring an unmeasured label over a percentage offset is not something React
 * Native can do without measuring first, and a twin pair where one platform
 * labels in place and the other labels underneath is a parity break dressed up
 * as a platform difference.
 */
export declare function RangeBarV4({ start, end, domainMin, domainMax, height, tone, showValues, format, title, summary, caption, loading, emptyLabel, animate, tooltip, onSelect, accessibilityLabel, style, }: RangeBarV4Props): React.ReactElement;
//# sourceMappingURL=RangeBarV4.d.ts.map