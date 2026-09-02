import * as React from 'react';
import type { WaterTrackerProps } from './WaterTracker';
export interface WaterTrackerV4Props extends WaterTrackerProps {
    /** Shown when there is no usable goal. Default `'No hydration goal set'`. */
    noGoalLabel?: string;
    /** Format the volume total. Default `'2500 ml'`. */
    formatAmount?: (ml: number) => string;
    /** Name one glass. Default `'Glass 3, filled'`. */
    glassLabel?: (index: number, filled: boolean) => string;
}
/**
 * **V4 water tracker** — same props as {@link WaterTracker} plus
 * `noGoalLabel`, `formatAmount` and `glassLabel`.
 *
 * ## Six changes
 *
 * 1. **Ten glasses against a goal of eight now read as ten.** The base clamped
 *    the count into the goal, so someone who drank 2 500 ml saw "8 / 8 · 2000
 *    ml" — the overshoot, which is the only interesting thing about that day,
 *    was destroyed rather than merely not drawn. The extra glasses are drawn,
 *    counted and announced.
 * 2. **Filled and empty are different shapes, not different alphas.** The base
 *    wrote `{isFilled ? '🥛' : '🥛'}` — a dead ternary — and carried the whole
 *    distinction in `opacity: 0.3`, which is inside M3's disabled band and
 *    reads as "this glass is unavailable". A glass is now a drawn vessel with
 *    a real fill level.
 * 3. **A glass is a 44 target.** At roughly 20px they were the smallest
 *    controls in the module and the most tapped control on a hydration screen.
 * 4. **The readout is a real `progressbar`.** The base put an
 *    `accessibilityLabel` on a non-`accessible` `Animated.View`, where iOS
 *    ignores it, so the card had no spoken summary at all.
 * 5. **The "no goal" branch keeps `style` and `appearance`.** It returned a
 *    bare `<Text>` before either was applied.
 * 6. **Press is a state layer**, where `opacity: pressed ? 0.6 : 1` dimmed the
 *    glass into the same band that already meant "empty".
 */
export declare function WaterTrackerV4({ count, goal, mlPerGlass, noGoalLabel, formatAmount, glassLabel, onChange, appearance, style, }: WaterTrackerV4Props): React.ReactElement;
//# sourceMappingURL=WaterTrackerV4.d.ts.map