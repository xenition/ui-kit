import * as React from 'react';
import { ChartColor } from './internal';
export interface GaugeChartProps extends React.SVGAttributes<SVGSVGElement> {
    /** Current value, between `min` and `max`. */
    value: number;
    /** Lower bound (left of the arc). */
    min?: number;
    /** Upper bound (right of the arc). */
    max?: number;
    /** Diameter in px (the gauge occupies the top semicircle). */
    size?: number;
    /** Theme color token for the filled arc + needle. */
    color?: ChartColor;
    /** Show the numeric value in the center. */
    showValue?: boolean;
}
/**
 * Semicircular gauge — a `--xen-border` track arc, a value arc in
 * `var(--xen-<color>)`, and a needle to the current value. All colors are
 * tokens. `value` is clamped into `[min, max]` and a zero span is guarded.
 */
export declare const GaugeChart: React.ForwardRefExoticComponent<GaugeChartProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=GaugeChart.d.ts.map