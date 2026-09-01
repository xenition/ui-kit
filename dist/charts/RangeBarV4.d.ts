import * as React from 'react';
import { type ChartToneV4 } from '../primitives/internal/v4-chart';
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
export interface RangeBarV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
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
     * Reveal the range in words on hover even when
     * {@link RangeBarV4Props.showValues} is off. Default `true` (brief §4.6).
     */
    tooltip?: boolean;
    /** Fired when the bar is clicked. See the note on the bar chart's `onSelect`. */
    onSelect?: (start: number, end: number) => void;
}
/** The one `<style>` id this component injects from. Idempotent. */
export declare const RANGE_BAR_V4_STYLE_ID = "xen-v4-range-bar-styles";
/**
 * Paint, keyed off the chart's own root attribute. Three chrome roles, kept
 * distinct: the range is data, the track is grid, the domain rule is axis
 * (brief §3.3).
 */
export declare const RANGE_BAR_V4_CSS = "\n[data-xen-v4-range-bar] [data-xen-v4-range] { background-color: var(--xen-v4-mark-fill); }\n[data-xen-v4-range-bar] [data-xen-v4-chart-track] { background-color: var(--xen-chart-grid); }\n[data-xen-v4-range-bar] [data-xen-v4-chart-axis] { background-color: var(--xen-chart-axis); }\n";
/**
 * **V4 floating bar** — one band, `start` to `end`, on a domain.
 *
 * Web has never had this component. `RangeBar` exists only under
 * `native/charts/`, which is why `COMPONENTS.md` counts 20 and the web module
 * ships 16 (brief §6). It is built here as V4 only — there is no base to
 * mirror, so there is no base to write — with the native props verbatim and
 * `className` in place of `style`.
 *
 * **This is the one bar form rounded at both ends**, and the reason is worth
 * stating because it is the exception that proves brief §4.4's rule. Every
 * other bar in this family has a baseline: it grows from zero, and rounding the
 * end it grows *from* lifts it off its own axis. A range bar has no baseline.
 * Both of its ends are data — `start` is as much a measurement as `end` — so
 * `CHART_MARK.endRadius` applies to both, and a square end here would read as a
 * bar that had been clipped rather than one that had been measured.
 *
 * What it takes from the shared decisions:
 *
 * - **Track from {@link CHART_GRID_VAR}**, not `colors.border`. The native base
 *   paints `colors.border` — a hairline colour doing a fill's job, and one that
 *   does not follow the scheme the way the derived chrome neutral does.
 * - **The domain axis from {@link CHART_AXIS_VAR}**, one step more present than
 *   the track behind it (brief §3.3). The native base draws no axis at all, so
 *   its range floats on a grey pill with nothing to read it against.
 * - **Slot 1, or a `tone`.** Never `color?: ChartColor` as an identity: the
 *   native base's `color = 'primary'` default is a semantic slot standing in
 *   for a series colour, which is what brief §1 rule 2 exists to retire.
 * - **A zero-width range is a point, not nothing.** `start === end` is a real
 *   reading — a distribution collapsed to one value — so the mark floors at
 *   `CHART_MARK.dotSize`, this line's smallest painted point, rather than at
 *   the 1px hairline that would make it look like a rendering artefact.
 *
 * The value labels sit **under the axis** rather than floating over the mark.
 * Centring an unmeasured label over a percentage offset is not something React
 * Native can do without measuring first, and a twin pair where one platform
 * labels in place and the other labels underneath is a parity break dressed up
 * as a platform difference.
 */
export declare const RangeBarV4: React.ForwardRefExoticComponent<RangeBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RangeBarV4.d.ts.map