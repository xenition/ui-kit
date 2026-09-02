import * as React from 'react';
import type { MetricRingProps } from './MetricRing';
export interface MetricRingV4Props extends MetricRingProps {
    /** Shown in place of the ring when there is no usable goal. Default `'No goal set'`. */
    noGoalLabel?: string;
    /** Format the measurement and its unit. Default `'540 kcal'`. */
    formatValue?: (value: number, unit?: string) => string;
}
/**
 * **V4 metric ring** — same props as {@link MetricRing} plus `noGoalLabel` and
 * `formatValue`.
 *
 * ## Four changes
 *
 * 1. **The ring announces its value.** `ProgressRing` hard-codes
 *    `accessibilityRole="image"`, so a component whose entire job is to show a
 *    number against a goal announced itself as a picture. The ring is wrapped
 *    in a `progressbar` carrying the percentage, and the drawing is hidden
 *    from the reader so the number is stated once rather than twice.
 * 2. **540 of 500 kcal reads as 540, not 500.** The base clamped the
 *    measurement and printed the clamped copy in the caption, so a metric that
 *    had been beaten looked exactly like one that had been met on the nose.
 *    The caption now shows what was measured and names the overshoot.
 * 3. **`ProgressRing` is handed a fraction against 1**, which is the same
 *    number the caption was derived from, so the arc and the words cannot
 *    disagree.
 * 4. **The "no goal" branch is a branch, not a zero.** `goal={0}` is now
 *    absence rather than nought per cent — a distinction the caption is free
 *    to say out loud.
 *
 * **Renders nothing without a `label`.**
 */
export declare function MetricRingV4({ label, value, goal, unit, color, size, centerLabel, noGoalLabel, formatValue, appearance, style, }: MetricRingV4Props): React.ReactElement | null;
//# sourceMappingURL=MetricRingV4.d.ts.map