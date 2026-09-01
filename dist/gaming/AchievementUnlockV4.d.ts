import * as React from 'react';
import type { AchievementUnlockProps } from './AchievementUnlock';
export interface AchievementUnlockV4Props extends AchievementUnlockProps {
    /** The overline while the achievement is not unlocked. Default `'Locked'`. */
    lockedLabel?: string;
    /** The unit after the point value. Default `'G'`. */
    pointsUnit?: string;
}
/**
 * **V4 achievement unlock** — same props as {@link AchievementUnlock} plus
 * `lockedLabel` and `pointsUnit`.
 *
 * ## Four changes
 *
 * 1. **A locked achievement no longer opens.** Its own JSDoc promised "a real
 *    `<button>`; disabled while locked", and what shipped was
 *    `aria-disabled={!unlocked}` on a fully live button — an attribute that
 *    *describes* a disabled control without being one, so every click and
 *    every Enter still ran `onClick` and pushed the user into a trophy they
 *    have not earned. It is `disabled` now. (The native twin tells the same
 *    lie the other way: it sets `accessibilityState` and not `disabled`.)
 * 2. **A trophy is identity, not a warning.** The medallion, its ring and the
 *    overline were all `warn` — the colour the kit reserves for "something
 *    needs your attention" — spent on the single most celebratory surface in
 *    the module. Unlocked reads in the brand ink, locked in muted, and the
 *    padlock and the `lockedLabel` overline say which it is in words.
 * 3. **The medallion's ground is a token mix.** `bg-neutral-100` is a step on
 *    the web neutral ramp, which mirrors under `[data-theme="dark"]` — so the
 *    disc that was a pale grey in light mode became a near-black in dark and
 *    the glyph on it went with it.
 * 4. **The point value carries a unit that is a prop.** `` `${points} G` ``
 *    hard-coded Xbox's gamerscore suffix into every app that ships this kit;
 *    `pointsUnit` names it, the figure is tabular, and press is a state layer
 *    on a target that clears 44 rather than `hover:opacity-90`.
 */
export declare const AchievementUnlockV4: React.ForwardRefExoticComponent<AchievementUnlockV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AchievementUnlockV4.d.ts.map