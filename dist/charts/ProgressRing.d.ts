import * as React from 'react';
import { ChartColor } from './internal';
export interface ProgressRingProps extends React.SVGAttributes<SVGSVGElement> {
    /** Current value, between 0 and `max`. */
    value: number;
    /** Value representing a full ring. */
    max?: number;
    /** Diameter in px. */
    size?: number;
    /** Ring stroke width in px. */
    thickness?: number;
    /** Theme color token for the progress stroke. */
    color?: ChartColor;
    /** Show the percentage in the center. */
    showValue?: boolean;
}
/**
 * Circular progress indicator — a `--xen-border` track circle plus a
 * `var(--xen-<color>)` progress circle drawn with `stroke-dasharray` /
 * `stroke-dashoffset`. The ratio is clamped to `[0, 1]` and a zero `max` is
 * guarded; the optional center label uses `text-on-surface`.
 */
export declare const ProgressRing: React.ForwardRefExoticComponent<ProgressRingProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=ProgressRing.d.ts.map