import * as React from 'react';
import { ChartColor } from './internal';
export interface AreaChartProps extends React.SVGAttributes<SVGSVGElement> {
    /** Series values, plotted left-to-right; the area below the line is filled. */
    data: number[];
    /** Plot height in px (SVG viewBox height). */
    height?: number;
    /** Plot width in px (SVG viewBox width). */
    width?: number;
    /** Theme color token for the line + fill. */
    color?: ChartColor;
    /** Value mapped to the top of the plot; defaults to the series max. */
    max?: number;
    /** Value mapped to the bottom of the plot; defaults to the series min. */
    min?: number;
}
/**
 * Filled area chart — an inline SVG `<path>` for the line with a translucent
 * fill down to the baseline. Both stroke and fill reference `var(--xen-<color>)`
 * (fill at reduced opacity), so no literal colors appear. Scaling is guarded
 * against a zero range.
 */
export declare const AreaChart: React.ForwardRefExoticComponent<AreaChartProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=AreaChart.d.ts.map