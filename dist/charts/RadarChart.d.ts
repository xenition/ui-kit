import * as React from 'react';
export interface RadarChartProps extends React.SVGAttributes<SVGSVGElement> {
    /** Single series of per-axis values. Ignored when `series` is provided. */
    data?: number[];
    /** Multiple series (each an equal-length per-axis value list). */
    series?: number[][];
    /** Optional axis labels, positioned around the perimeter. */
    labels?: string[];
    /** Value mapped to the outer ring; defaults to the largest datum. */
    max?: number;
    /** Diameter in px. */
    size?: number;
}
/**
 * Radar / spider chart — one polygon per series over evenly-spaced axes. Series
 * strokes/fills cycle the theme series vars (fill at low opacity); grid rings
 * use `--xen-border`. No literal colors. Guards empty data and a zero `max`.
 */
export declare const RadarChart: React.ForwardRefExoticComponent<RadarChartProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=RadarChart.d.ts.map