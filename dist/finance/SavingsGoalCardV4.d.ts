import * as React from 'react';
import type { SavingsGoalCardProps } from './SavingsGoalCard';
export interface SavingsGoalCardV4Props extends SavingsGoalCardProps {
    /** The words after an overshoot figure. Default `'saved over goal'`. */
    overLabel?: string;
}
/**
 * **V4 savings goal card** — the web twin of the native `SavingsGoalCardV4`,
 * same props as {@link SavingsGoalCard} plus `overLabel`.
 *
 * ## Four changes
 *
 * 1. **Beating the goal is visible.** `Math.min(saved / target, 1)` and
 *    `Math.max(target - saved, 0)` floored the overshoot twice over, so
 *    $12,000 against a $10,000 goal rendered identically to landing exactly on
 *    target — a full ring, "100%", and "$0.00 to go". The ring still fills
 *    once, because a ring cannot say 120%, but the figure beside it now does.
 * 2. **The ring is a `progressbar` with a value.** It was a `role="img"` on
 *    both twins, so the one number the card exists to report reached a reader
 *    as a picture. `aria-valuenow` is the clamped ratio the ring draws and
 *    `aria-valuetext` is the true percentage.
 * 3. **The ring's own centred readout is off, and the percentage is written
 *    out instead.** `ProgressRing` clamps what it prints, so leaving it on
 *    would have put "100%" inside a card whose text says 120% — the same
 *    disagreement change 1 removes.
 * 4. **The card is on `card` and its captions on `muted-text`**, where it
 *    painted `surface` (the page colour, so it read flat in dark mode) and
 *    inked its captions with `muted`, a ramp step with no contrast promise.
 */
export declare const SavingsGoalCardV4: React.ForwardRefExoticComponent<SavingsGoalCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SavingsGoalCardV4.d.ts.map