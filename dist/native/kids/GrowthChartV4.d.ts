import * as React from 'react';
import type { GrowthChartProps } from './GrowthChart';
/** One dated measurement. An ISO instant and a value. Declared identically on both twins. */
export interface GrowthPoint {
    at: string;
    value: number;
}
export interface GrowthChartV4Props extends Omit<GrowthChartProps, 'data'> {
    /**
     * Undated readings plotted on the array index — the base's shape, kept so an
     * existing caller sees no change.
     *
     * **Optional here where the base makes it required**, because a caller who
     * has `points` has no bare numbers to invent. `ActivityFeedV4` and
     * `QuickActionsV4` re-declare a required base prop the same way.
     */
    data?: number[];
    /** Dated measurements. Sorted by `at` before plotting; supersedes `data`. */
    points?: GrowthPoint[];
    /** Unit suffix for every reading, e.g. `'cm'`. */
    unit?: string;
    /** A reference band in the value's own unit, e.g. the 25th–75th centile. */
    percentileBand?: {
        low: number;
        high: number;
    };
    /** Format a reading. Default `'68 cm'`. */
    formatValue?: (v: number, unit?: string) => string;
    /** Copy shown when there is nothing to plot. */
    emptyLabel?: string;
}
/**
 * **V4 growth chart** — same props as {@link GrowthChart} plus `points`,
 * `percentileBand`, `formatValue` and a `unit` that now reaches every reading.
 *
 * ## Five changes
 *
 * 1. **A growth curve has a date axis.** The base took `data: number[]` and
 *    plotted it on the *array index*, so measurements at 2 months, 4 months and
 *    3 years rendered evenly spaced — a chart of a child's growth in which the
 *    horizontal axis meant nothing. Worse, unsorted input drew a *descending*
 *    curve for a growing child, because nothing put the readings in order.
 *    `points` carries `{ at, value }`, is sorted by `at`, and is laid out in
 *    **real time**: the gap between two measurements on screen is the gap
 *    between them in life. `data` still works and still plots on the index,
 *    so an existing caller sees no change.
 * 2. **A single measurement is visible.** One datum landed exactly on the
 *    bottom edge with half the dot clipped off the plot. The domain is padded,
 *    and a lone reading sits in the middle of the box.
 * 3. **The plot fits the card it is in.** It was a fixed 300px box inside a
 *    `lg`-padded card, so on a narrow phone the curve ran under the padding and
 *    on a tablet it stranded a third of the card empty. The plot measures its
 *    own column.
 * 4. **The series reaches a screen reader as numbers.** The base handed the
 *    whole thing to a `role="img"` with "Height over time" on it — a picture
 *    with a caption, which is nothing at all. The card is one spoken sentence
 *    carrying the count, the span of dates, the first and latest readings and
 *    the change between them; the drawing itself is marked decorative, because
 *    it is.
 * 5. **The card is a card and its skeleton is a skeleton** — `card`/`onCard`
 *    rather than the page's `surface`, and `skeletonFill` rather than
 *    `colors.border`, the hairline colour used as a fill.
 *
 * **Renders an empty state, never a frame around nothing** (§4.5).
 */
export declare function GrowthChartV4({ data, points, metric, unit, percentile, percentileBand, color, height, loading, formatValue, emptyLabel, style, }: GrowthChartV4Props): React.ReactElement;
//# sourceMappingURL=GrowthChartV4.d.ts.map