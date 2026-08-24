import * as React from 'react';
import type { PieDatum } from './PieChart';
export interface DonutChartProps extends React.SVGAttributes<SVGSVGElement> {
    /** Slice values; each slice's angle is `value / total`. */
    data: PieDatum[];
    /** Outer diameter in px. */
    size?: number;
    /** Ring thickness as a fraction of the radius (0–1). */
    thickness?: number;
    /** Optional centered label (e.g. a total). */
    centerLabel?: string;
}
/**
 * Donut chart — a pie with a `--xen-surface` hole punched in the center (drawn
 * as a surface-filled `<circle>` over the slices). Slice colors cycle the theme
 * series vars; the center label uses the `text-on-surface` token class. Guards
 * a zero total and a single full slice.
 */
export declare const DonutChart: React.ForwardRefExoticComponent<DonutChartProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=DonutChart.d.ts.map