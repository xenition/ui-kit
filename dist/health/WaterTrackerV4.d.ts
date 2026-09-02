import * as React from 'react';
import type { WaterTrackerProps } from './WaterTracker';
import { type Appearance } from './internal/tone-v4';
export interface WaterTrackerV4Props extends WaterTrackerProps {
    /** Copy when no usable goal was given. Default `'No hydration goal set'`. */
    noGoalLabel?: string;
    /** Render the volume total. Default `'2500 ml'`. */
    formatAmount?: (ml: number) => string;
    /** Name one glass. Default `'Glass 3, filled'`. */
    glassLabel?: (index: number, filled: boolean) => string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 water tracker** — same props as {@link WaterTracker} plus `noGoalLabel`,
 * `formatAmount`, `glassLabel` and `appearance`.
 *
 * ## Six changes
 *
 * 1. **Ten glasses against a goal of eight no longer displays "8 / 8".** The
 *    base clamped the *measurement*, so someone who logged 10 glasses and
 *    2,500 ml was shown 8 and 2,000 and told "goal reached" — the overshoot,
 *    which is the one interesting fact on the card, was destroyed rather than
 *    merely not drawn. The readout, the millilitres and the glasses now all
 *    carry it; only the meter's fill is clamped.
 * 2. **Filled and empty are different objects.** `{isFilled ? '🥛' : '🥛'}` was
 *    a dead ternary and the two states were separated by `opacity: 0.3` alone —
 *    which is also, near enough, how a disabled control looks, and is invisible
 *    to anyone who cannot see fine contrast. A full glass is now a filled disc
 *    with a drop in it and an empty one is an open ring.
 * 3. **A glass is a 44px target.** They were about 20px, and they are the most
 *    tapped control on a hydration screen.
 * 4. **The card exposes its progress.** It drew a `filled / goal` readout and
 *    no meter at all.
 * 5. **Press is a state layer**, not `hover:opacity-70` — see change 2 for why
 *    dimming a control cannot mean two things at once.
 * 6. **The no-goal branch keeps `className` and `appearance`**, where the base
 *    returned a bare line of text and dropped both.
 */
export declare const WaterTrackerV4: React.ForwardRefExoticComponent<WaterTrackerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WaterTrackerV4.d.ts.map