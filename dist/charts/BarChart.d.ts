import * as React from 'react';
import { ChartColor } from './internal';
export interface BarChartProps extends React.SVGAttributes<SVGSVGElement> {
    /** Bar values; each becomes a vertical bar sized by `value / max`. */
    data: number[];
    /** Optional labels rendered under each bar. */
    labels?: string[];
    /** Plot height in px. */
    height?: number;
    /** Theme color token for the bars. */
    color?: ChartColor;
    /** Value mapped to full bar height; defaults to the largest datum. */
    max?: number;
}
/**
 * Vertical bar chart — inline SVG `<rect>`s sized by `value / max`, filled with
 * `var(--xen-<color>)`. A `--xen-muted` baseline stands in for the axis. Labels
 * use the `text-muted` token class. Divide-by-zero is guarded via {@link safeMax}.
 */
export declare const BarChart: React.ForwardRefExoticComponent<BarChartProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=BarChart.d.ts.map