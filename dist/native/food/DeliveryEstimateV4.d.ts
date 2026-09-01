import * as React from 'react';
import type { DeliveryEstimateProps } from './DeliveryEstimate';
export interface DeliveryEstimateV4Props extends DeliveryEstimateProps {
    /** Announced and shown in place of the window while it resolves. Default `'Estimating'`. */
    estimatingLabel?: string;
    /** The unit the window is expressed in. Default `'min'`. */
    unit?: string;
}
/**
 * **V4 delivery estimate** — same props as {@link DeliveryEstimate} plus
 * `estimatingLabel` and `unit`.
 *
 * ## Four changes
 *
 * 1. **A transposed window is no longer swallowed.** The base tested
 *    `maxMinutes > minMinutes` and dropped the max otherwise, so
 *    `min={35} max={20}` rendered a confident "35 min" and the 20 vanished
 *    without a word. `deliveryWindow()` reads the pair the way round a human
 *    would and renders "20–35 min".
 * 2. **The name it computes lands on an element that has a role.** It built a
 *    careful `"Estimated delivery: 25–35 min"` and hung it on a bare `View`,
 *    which has no role for a reader to stop on, so in the `badge` and `inline`
 *    variants it was announced inconsistently or not at all.
 * 3. **The badge stops being a ramp step.** `tokens.ramps.neutral[100]` is
 *    copied to native without inverting, so the pill was a near-white lozenge
 *    on a dark page. It is the module's one badge shape now.
 * 4. **The figure is tabular and the unit is a prop**, so an ETA that ticks
 *    down does not shuffle sideways and a non-English caller is not stuck with
 *    "min".
 */
export declare function DeliveryEstimateV4({ minMinutes, maxMinutes, mode, variant, caption, loading, estimatingLabel, unit, style, }: DeliveryEstimateV4Props): React.ReactElement;
//# sourceMappingURL=DeliveryEstimateV4.d.ts.map