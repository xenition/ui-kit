import * as React from 'react';
import type { GrowthChartProps } from './GrowthChart';
/**
 * One measurement, and when it was taken.
 *
 * An ISO instant and a number. Declared identically on both twins — this is the
 * shape that gives the chart a date axis at all.
 */
export interface GrowthPoint {
    /** ISO 8601 instant, e.g. `'2024-03-04'` or `'2024-03-04T09:00:00Z'`. */
    at: string;
    /** The measurement, in the chart's `unit`. */
    value: number;
}
export interface GrowthChartV4Props extends Omit<GrowthChartProps, 'data'> {
    /**
     * The base's bare series, kept so a `GrowthChart` swapped for a
     * `GrowthChartV4` behaves exactly as it did. Optional here — a caller with
     * `points` has no numbers to invent for it. `points` wins when both are set.
     */
    data?: number[];
    /** Measurements with their dates. Plotted on a real time axis. */
    points?: GrowthPoint[];
    /** A reference band to shade behind the curve, in the chart's own unit. */
    percentileBand?: {
        low: number;
        high: number;
    };
    /** Render a measurement. Default `'82 cm'`. */
    formatValue?: (value: number, unit?: string) => string;
}
/**
 * **V4 growth chart** — same props as {@link GrowthChart} plus `points`,
 * `percentileBand` and `formatValue`.
 *
 * ## Six changes
 *
 * 1. **There is a date axis.** `data: number[]` plotted on the array index, so
 *    measurements at two months, four months and three years rendered evenly
 *    spaced — a growth curve whose whole subject is *rate* drawn with no time
 *    on it. `points` carries the instant with the measurement and the plot
 *    positions on it.
 * 2. **Unsorted input no longer draws a descending curve for a growing
 *    child.** The base plotted whatever order it was handed. `points` are
 *    sorted by `at` before anything is drawn.
 * 3. **A single measurement is not clipped.** One datum landed on the bottom
 *    edge of the SVG with half its dot outside the viewBox. The plot carries an
 *    inset, and a series with no spread on an axis is centred on it rather than
 *    pinned to an edge.
 * 4. **The series reaches a screen reader as numbers.** It was `role="img"`
 *    with a label saying only the latest value — the shape of a child's growth,
 *    which is the entire point, was unavailable. There is a real table of every
 *    date and measurement behind the plot, and the plot itself is `aria-hidden`
 *    rather than competing with it.
 * 5. **A percentile band can be drawn.** `percentile` was a caption with
 *    nothing behind it; a band is what makes a curve readable against a norm.
 *    It is a neutral wash, not a status colour — a child below a band has not
 *    triggered a system error.
 * 6. **Tokens.** `font-extrabold` is off the kit's weight scale, the skeleton
 *    was `bg-neutral-200` (a ramp step that inverts under `[data-theme=dark]`),
 *    the readout inked with the `primary` *fill* rather than `primary-text`,
 *    and the card sits on `card`/`on-card` so it still reads as raised in dark
 *    mode.
 */
export declare const GrowthChartV4: React.ForwardRefExoticComponent<GrowthChartV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GrowthChartV4.d.ts.map