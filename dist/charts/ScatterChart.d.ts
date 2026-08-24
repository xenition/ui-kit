import * as React from 'react';
import { ChartColor } from './internal';
export interface ScatterPoint {
    x: number;
    y: number;
}
export interface ScatterChartProps extends React.SVGAttributes<SVGSVGElement> {
    /** Points plotted as circles; the domain auto-fits unless bounds are given. */
    data: ScatterPoint[];
    /** Plot width in px. */
    width?: number;
    /** Plot height in px. */
    height?: number;
    /** Theme color token for the points. */
    color?: ChartColor;
    /** Point radius in px. */
    radius?: number;
    /** Optional x-domain bounds; default to the data range. */
    xDomain?: [number, number];
    /** Optional y-domain bounds; default to the data range. */
    yDomain?: [number, number];
}
/**
 * Scatter plot — one inline SVG `<circle>` per point, filled with
 * `var(--xen-<color>)`; axes use `--xen-border`. Domains auto-fit the data (or
 * take explicit bounds) with zero-span guards, and y is flipped so larger
 * values sit higher.
 */
export declare const ScatterChart: React.ForwardRefExoticComponent<ScatterChartProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=ScatterChart.d.ts.map