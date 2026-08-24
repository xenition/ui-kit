import * as React from 'react';
import { ChartColor } from './internal';
export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
    /** Trend values, drawn as a compact line. */
    data: number[];
    /** Plot width in px. */
    width?: number;
    /** Plot height in px. */
    height?: number;
    /** Theme color token for the line. */
    color?: ChartColor;
}
/**
 * Compact inline trend line — a minimal SVG `<polyline>` with no axes, stroked
 * with `var(--xen-<color>)`. Scales the series into the box with a zero-range
 * guard; a single point renders a centered dot.
 */
export declare const Sparkline: React.ForwardRefExoticComponent<SparklineProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=Sparkline.d.ts.map