import * as React from 'react';
import { type ChartColor } from '../charts';
export interface TemperatureGraphProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'color'> {
    /** Temperature series (one value per period). */
    data: number[];
    /** X-axis tick labels aligned to `data` (e.g. hours). Optional. */
    labels?: string[];
    /** Unit suffix for the min/max annotations. Default `'°'`. */
    unit?: string;
    /** Card title. Default `'Temperature'`. */
    title?: string;
    /** Line color token key. Default `'primary'`. */
    color?: ChartColor;
    /** Plot height in px. Default `160`. */
    height?: number;
    /** Plot width in px. Default `300`. */
    width?: number;
    /** Message shown when `data` is empty. */
    emptyLabel?: string;
}
/**
 * Temperature trend graph (web parity of the native `TemperatureGraph`) — a thin
 * wrapper over the shared web `LineChart` that adds a titled card, min/max
 * annotations, and optional x-axis labels. The line color is a semantic token
 * key (default `primary`); the chart itself is token-bound and handles the
 * empty/flat/single-point cases. Renders a muted empty state when `data` is
 * empty. All colors come from the `--xen-*` tokens via Tailwind classes.
 */
export declare const TemperatureGraph: React.ForwardRefExoticComponent<TemperatureGraphProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TemperatureGraph.d.ts.map