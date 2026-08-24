import * as React from 'react';
import { ChartColor } from './internal';
export interface ColumnChartDatum {
    label: string;
    value: number;
}
export interface ColumnChartProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Labelled values rendered as horizontal bars. */
    data: ColumnChartDatum[];
    /** Theme color token for the bars. */
    color?: ChartColor;
    /** Value mapped to full bar width; defaults to the largest datum. */
    max?: number;
    /** Per-bar track height in px. */
    barHeight?: number;
    /** Show the numeric value beside each bar. */
    showValues?: boolean;
}
/**
 * Horizontal bar chart — one labelled row per datum, each an inline SVG track
 * (`--xen-border`) with a fill `<rect>` in `var(--xen-<color>)` scaled to
 * `value / max`. Labels/values use token classes; scaling is guarded against a
 * zero divisor.
 */
export declare const ColumnChart: React.ForwardRefExoticComponent<ColumnChartProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ColumnChart.d.ts.map