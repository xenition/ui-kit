import * as React from 'react';
import { type HealthColor } from './internal';
export type MetricRingColor = HealthColor;
export interface MetricRingProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Metric name shown under the ring, e.g. "Move". */
    label: string;
    /** Current value; clamped to `[0, goal]`. */
    value: number;
    /** Goal / full-ring value. */
    goal: number;
    /** Unit shown in the caption, e.g. "kcal". */
    unit?: string;
    /** Ring arc color (semantic token). */
    color?: MetricRingColor;
    /** Outer diameter in px. */
    size?: number;
    /** Center text override; defaults to the percentage. */
    centerLabel?: string;
}
/**
 * A single labelled progress ring for one health metric — wraps the charts
 * {@link ProgressRing} and adds a value/goal caption below. When `goal <= 0` it
 * degrades to a muted "No goal set" note. Web parity of the native `MetricRing`;
 * the ring carries an `aria-label`, token-only colors.
 */
export declare const MetricRing: React.ForwardRefExoticComponent<MetricRingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MetricRing.d.ts.map