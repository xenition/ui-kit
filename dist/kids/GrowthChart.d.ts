import * as React from 'react';
import type { ChartColor } from '../charts';
/** Which growth metric a chart plots. Drives the title + icon. */
export type GrowthMetric = 'height' | 'weight' | 'head' | 'other';
export interface GrowthChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Series of measurements over time (bare numbers indexed on x). */
    data: number[];
    /** Which growth metric this chart plots; drives the title + icon. */
    metric?: GrowthMetric;
    /** Unit suffix for the latest-value readout, e.g. "cm" or "kg". */
    unit?: string;
    /** Optional percentile subtitle, e.g. "75th percentile". */
    percentile?: string;
    /** Line color slot. */
    color?: ChartColor;
    /** Plot height in px. */
    height?: number;
    /** Loading placeholder state. */
    loading?: boolean;
    /** Copy shown when there is no data. */
    emptyLabel?: string;
}
/**
 * A child's growth curve — a titled {@link Card} wrapping the shared
 * {@link LineChart} with a latest-value + percentile readout. Reuses the charts
 * module rather than re-plotting. Renders the shared {@link EmptyState} when
 * `data` is empty. Token-bound throughout — no literal colors.
 */
export declare const GrowthChart: React.ForwardRefExoticComponent<GrowthChartProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GrowthChart.d.ts.map