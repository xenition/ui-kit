import * as React from 'react';
import { CHART_AREA_FILL_ALPHA, type ChartSeriesV4 } from '../primitives/internal/v4-chart';
/**
 * How many polygons a radar may carry.
 *
 * **Four, and it throws at five** — brief §5's "cap at four series and say so:
 * a radar with five overlapping polygons is unreadable regardless of palette".
 *
 * The reasoning is the same shape as `CHART_SCATTER_SERIES_CAP`'s and lands on
 * a different number for a different reason. A scatter is capped at three
 * because *any two marks can sit side by side*, which is the all-pairs contrast
 * test and the palette clears it on three slots. A radar's problem is not
 * contrast at all — every polygon crosses every other polygon at up to `n`
 * points, so the fifth one adds crossings, not information, and no palette can
 * fix a shape you cannot trace with your eye.
 *
 * It throws rather than dropping the fifth series, for the reason `chartVar`
 * throws rather than wrapping: silently rendering four of five series is a
 * chart that lies about its own data, and a caller who meant it wants a facet
 * or a small-multiple, not a quieter failure.
 */
export declare const RADAR_SERIES_CAP = 4;
/**
 * The alpha a series polygon's fill sits at under its full-strength stroke.
 *
 * Canonical in `primitives/internal/v4-chart.ts` — that module was closed to
 * the build groups while this file was written, which is exactly why the same
 * `0.18` was declared four times across the two twins and the two forms.
 * Re-exported under the old name so the specs and call sites that read it from
 * here keep working.
 */
export { CHART_AREA_FILL_ALPHA };
/**
 * A series' name and its status opt-in — brief §4.3's config/data split.
 * Canonical in `primitives/internal/v4-chart.ts`; re-exported here because the
 * radar's props reference it and callers import it from this file.
 */
export type { ChartSeriesV4 };
export interface RadarChartV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
    /**
     * One row of per-axis values per series, or a single row for the one-series
     * case. Short rows are padded with zero; non-finite values read as zero.
     *
     * The bases disagreed about the name and the shape — web took
     * `data?: number[]` plus `series?: number[][]`, native took a required
     * `series: number[][]` — and one of those spellings collides with §4.3, which
     * reserves `series` for the *config* array on all twenty components. V4
     * closes the parity gap on §4.3's side: `data` is the numbers, `series` is
     * what they are called.
     */
    data?: readonly number[] | readonly number[][];
    /** Axis names, drawn around the perimeter. Also fixes the spoke count. */
    axes?: readonly string[];
    /** Per-series names and status opt-ins, by array position (§4.3). */
    series?: readonly ChartSeriesV4[];
    /** The value mapped to the outer ring. Defaults to the largest datum. */
    max?: number;
    /** Concentric grid rings. Default 4. */
    rings?: number;
    /** Diameter in px. Default 200 — the web base's number, on both twins now. */
    size?: number;
    /** The descriptive headline. HIG's rule: say the takeaway. */
    title?: string;
    /** The one loud number, drawn above the plot. */
    summary?: string;
    /** The quiet line under the summary. */
    caption?: string;
    /** Show the legend. Default `true` at two or more series (§4.2). */
    legend?: boolean;
    /** Swap the plot for a `SkeletonV4` at the same footprint (§4.5). */
    loading?: boolean;
    /** The empty state's wording. */
    emptyLabel?: string;
    /** Run the entrance reveal. Default `true`; reduced motion fades instead. */
    animate?: boolean;
}
/**
 * **V4 radar chart** — rings that are grid, axes that are axes, and a hard cap
 * at four polygons.
 *
 * Five changes against the base.
 *
 * 1. **The chrome stopped being a border.** The base drew its rings with
 *    `stroke="var(--xen-border)"` and had no spokes on web at all. §3's third
 *    decision names that substitution as the bug — a hairline colour doing a
 *    grid's job — so the rings take `CHART_GRID_VAR` and the spokes take
 *    `CHART_AXIS_VAR`, "one step more present than the grid behind it", exactly
 *    as §5 asks.
 * 2. **The spokes stay hairline.** §4.4 gives an axis `CHART_MARK.stroke` (2),
 *    and that is right for the single baseline of a bar chart. A radar's spokes
 *    are not that line: there are `n` of them, they run *under* the data, and at
 *    2 they tie the series stroke drawn on top of them — at which point the
 *    reader cannot tell a polygon edge from an axis. So the spokes take the
 *    axis *colour* §5 specifies at the grid's hairline weight, which is the
 *    one bare number §1 rule 1 allows.
 * 3. **Fill under stroke, at a named alpha.** See {@link CHART_AREA_FILL_ALPHA}.
 * 4. **Four series, then it folds.** See {@link RADAR_SERIES_CAP}. The base
 *    cycled `seriesColor` with `i % 5`, so a fifth polygon was the first one's
 *    colour drawn over the top of it.
 * 5. **It became a figure.** Title, summary, caption and a legend — the legend
 *    being the identity channel's redundancy, which a radar needs more than any
 *    other form in this group because its polygons overlap by construction and
 *    the `CHART_MARK.gap` of surface that separates a pie's slices has nowhere
 *    to go here.
 */
export declare const RadarChartV4: React.ForwardRefExoticComponent<RadarChartV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RadarChartV4.d.ts.map