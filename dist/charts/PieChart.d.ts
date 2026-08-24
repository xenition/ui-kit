import * as React from 'react';
import { ChartColor } from './internal';
export interface PieDatum {
    value: number;
    label?: string;
    /** Override the auto-cycled series color for this slice. */
    color?: ChartColor;
}
export interface PieChartProps extends React.SVGAttributes<SVGSVGElement> {
    /** Slice values; each slice's angle is `value / total`. */
    data: PieDatum[];
    /** Diameter in px. */
    size?: number;
}
/**
 * Pie chart — inline SVG arc `<path>`s, one per slice. Slice colors cycle the
 * theme series vars (`var(--xen-primary|accent|success|warn|danger)`); no
 * literal colors. A total of zero renders the empty state; a single non-zero
 * slice draws a full `<circle>` (arc paths can't express 360°).
 */
export declare const PieChart: React.ForwardRefExoticComponent<PieChartProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=PieChart.d.ts.map