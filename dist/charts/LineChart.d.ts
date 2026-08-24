import * as React from 'react';
import { ChartColor } from './internal';
export interface LineChartProps extends React.SVGAttributes<SVGSVGElement> {
    /** Series values, plotted left-to-right and joined by a polyline. */
    data: number[];
    /** Plot height in px (SVG viewBox height). */
    height?: number;
    /** Plot width in px (SVG viewBox width). */
    width?: number;
    /** Theme color token for the line. */
    color?: ChartColor;
    /** Value mapped to the top of the plot; defaults to the series max. */
    max?: number;
    /** Value mapped to the bottom of the plot; defaults to the series min. */
    min?: number;
    /** Draw a dot at each datum. */
    showDots?: boolean;
}
/**
 * Single-series line chart drawn as an inline SVG `<polyline>` — token-bound
 * (`stroke: var(--xen-<color>)`), no literal colors and no charting dependency.
 * Values are scaled into the viewBox with divide-by-zero guards; a flat series
 * (min === max) renders as a centered horizontal line.
 */
export declare const LineChart: React.ForwardRefExoticComponent<LineChartProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=LineChart.d.ts.map