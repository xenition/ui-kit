import * as React from 'react';
import type { GoalCardProps } from './GoalCard';
import { type Appearance } from './internal/tone-v4';
export interface GoalCardV4Props extends GoalCardProps {
    /** Copy when no usable target was given. Default `'No target set'`. */
    noGoalLabel?: string;
    /** Copy on the reached-goal note. Default `'Goal met'`. */
    metLabel?: string;
    /** Render the measurement and the target. Default `'12400 steps'`. */
    formatValue?: (value: number, unit?: string) => string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 goal card** — same props as {@link GoalCard} plus `noGoalLabel`,
 * `metLabel`, `formatValue` and `appearance`.
 *
 * ## Six changes
 *
 * 1. **A walk of 12,400 steps against a 10,000 target no longer reports three
 *    different numbers.** The base showed `12400`, announced "12400 of 10000,
 *    100%" and set `aria-valuenow={10000}` — the measurement, the percentage
 *    and the meter each disagreed with the other two. `goalParts` keeps the
 *    measurement and the drawn fraction apart, so the bar fills to 100%, the
 *    meter reports a consistent 100% of its own range, and the overshoot is
 *    said out loud in `aria-valuetext` and printed on the card.
 * 2. **The meter is reachable.** The whole card was a `role="button"`, and a
 *    `progressbar` inside a button is presentational — its value is dropped
 *    outright. The card is now a plain container, the activation wraps only the
 *    title-and-value region and carries the card's spoken name, and the bar
 *    sits beside it with its own role and its own value.
 * 3. **The activation is a real `<button>`.** A `div` with `role="button"`,
 *    `tabIndex={0}` and a hand-written Enter/Space handler is three
 *    approximations of what a button already does, and it was 40px tall on a
 *    thumb-driven screen.
 * 4. **Press is a state layer.** `hover:opacity-90` fades the card's own
 *    content, which is the signal M3 spends 0.38 on to mean *disabled*.
 * 5. **A goal of nought is "no target", not 0%.** `target={0}` drew an empty
 *    track under a real measurement.
 * 6. **The ink is the corrected slot and the track is not a hairline.** The
 *    "Goal met" note and the value drew in `text-success`, the *fill* token,
 *    measured as low as 1.32:1; the track was `bg-border`, the hairline colour
 *    doing a surface's job.
 */
export declare const GoalCardV4: React.ForwardRefExoticComponent<GoalCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GoalCardV4.d.ts.map