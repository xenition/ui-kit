import * as React from 'react';
import type { MetricRingProps } from './MetricRing';
import { type Appearance } from './internal/tone-v4';
export interface MetricRingV4Props extends MetricRingProps {
    /** Copy when no usable goal was given. Default `'No goal set'`. */
    noGoalLabel?: string;
    /** Render the measurement and the goal. Default `'540 kcal'`. */
    formatValue?: (value: number, unit?: string) => string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 metric ring** — same props as {@link MetricRing} plus `noGoalLabel`,
 * `formatValue` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **The ring is a meter, and says so.** It delegated to `ProgressRing`,
 *    which hard-codes `accessibilityRole="image"` — so the one number the
 *    component exists to show was a picture with a caption, and a reader had no
 *    way to ask for the value. It is now a `role="progressbar"` with a real
 *    `aria-valuenow`, drawn here rather than inherited.
 * 2. **540 kcal against a goal of 0 no longer reads as 0%.** The base's guard
 *    caught `goal <= 0` for the ring but the same expression elsewhere in the
 *    module returned a percentage of nought; `goalParts` makes "no goal" a
 *    distinct answer from "nought per cent" everywhere at once.
 * 3. **An exceeded goal keeps its measurement.** `Math.min(value, goal)` was
 *    applied to the *number on screen*, so 12,400 steps against 10,000 printed
 *    "10000 / 10000". The arc still stops at full; the caption does not.
 * 4. **The track is not a hairline.** `--xen-border` is the colour of a 1px
 *    rule; at a tenth of a 120px ring it reads as an outline around a hole
 *    rather than as the unfilled part of the measure.
 * 5. **The no-goal branch keeps `className` and `appearance`.** It used to
 *    return an unstyled node, dropping whatever the caller had laid out — the
 *    same bug the native twin has in `ActivityRings` and `WaterTracker`.
 */
export declare const MetricRingV4: React.ForwardRefExoticComponent<MetricRingV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MetricRingV4.d.ts.map