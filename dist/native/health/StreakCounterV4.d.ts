import * as React from 'react';
import type { StreakCounterProps, StreakCounterTone } from './StreakCounter';
export type { StreakCounterTone };
export interface StreakCounterV4Props extends StreakCounterProps {
    /** Plural form of `unit`. Default `unit + 's'` — pass it for any other language. */
    unitPlural?: string;
    /** Shown when there is no streak yet. Default `'Start your streak'`. */
    emptyLabel?: string;
    /** Caption for the record value. Default `'Best'`. */
    bestLabel?: string;
    /** Format the count. Default the number itself. */
    formatCount?: (count: number) => string;
}
/**
 * **V4 streak counter** — same props as {@link StreakCounter} plus
 * `unitPlural`, `emptyLabel`, `bestLabel` and `formatCount`.
 *
 * ## Four changes
 *
 * 1. **`unit="día"` no longer renders "díass".** The base appended `'s'`
 *    unconditionally, so every non-English unit this component was handed came
 *    out wrong. It goes through the shared `pluralizeUnit`, and `unitPlural`
 *    lets the caller's language be the caller's business.
 * 2. **The whole readout is `accessible`.** `accessibilityRole="summary"` and
 *    a computed label sat on a plain `Animated.View`, which is never an
 *    accessibility element on iOS — so the one component in the module whose
 *    entire content is a number announced nothing.
 * 3. **The record reaches the spoken name.** "Best: 42" was drawn and then
 *    left out of the label, which is the number a user checks the screen for.
 * 4. **Every English string is a prop**, and the flame is marked decorative so
 *    a reader hears "12 day streak" rather than "fire, 12".
 */
export declare function StreakCounterV4({ count, unit, label, tone, best, unitPlural, emptyLabel, bestLabel, formatCount, appearance, style, }: StreakCounterV4Props): React.ReactElement;
//# sourceMappingURL=StreakCounterV4.d.ts.map