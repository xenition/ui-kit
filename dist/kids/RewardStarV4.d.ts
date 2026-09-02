import * as React from 'react';
import type { RewardStarProps } from './RewardStar';
export interface RewardStarV4Props extends RewardStarProps {
    /** Build the count's spoken form. Default `'3 of 5 stars'`. */
    formatCount?: (filled: number, max: number) => string;
    /** Verb the per-star buttons are named with. Default `'Award'`. */
    awardLabel?: string;
}
/**
 * **V4 reward star** — same props as {@link RewardStar} plus `formatCount` and
 * `awardLabel`.
 *
 * ## Six changes
 *
 * 1. **Awarding never takes stars away.** `RewardStarV2` fired
 *    `onReward(filled >= total ? 1 : filled + 1)`, so a parent at five of five
 *    who tapped once more silently dropped the child to **one** star, with no
 *    undo and no confirmation. The "one more" gesture is `nextAward` now: at
 *    the maximum it is a disabled control rather than a destructive one.
 * 2. **The stars are targets a child can hit.** They were roughly 20px, with
 *    `hitSlop={6}` on native and nothing at all on web — in the one module of
 *    the kit whose users have small hands and poor aim. Every star clears 44.
 * 3. **One interaction model on both twins.** Native declared
 *    `accessibilityRole="adjustable"` with no `accessibilityActions`, so
 *    VoiceOver's swipe-up and swipe-down did nothing; web was a `role="group"`
 *    of buttons or a `role="img"`, depending on a prop. Both twins are now a
 *    named group of real, individually-named buttons, and a display-only row is
 *    a single `role="img"` carrying the count.
 * 4. **The count is a string a caller owns.** `Reward: 3 of 5 stars` was
 *    assembled inline in English, including the plural. Every award control —
 *    each star, and the "one more" shortcut beside them — is named
 *    `` `${awardLabel}: ${formatCount(n, max)}` ``, the same composition the
 *    native twin uses, so the two twins say the same sentence for the same
 *    props. `awardLabel` is the **verb** in that sentence and is never drawn
 *    as prose on its own; a button reading only "Award" tells a parent
 *    nothing about what it will award.
 * 5. **A star is inked with the corrected slot.** `Icon`'s colour table maps
 *    `warn` to the *fill* token, which measures as low as 1.3:1 drawn as a
 *    glyph — and `warn` is this component's default.
 * 6. **Press is a state layer.** `hover:opacity-70` is inside M3's *disabled*
 *    band, so a hovered star and a dead star looked alike.
 */
export declare const RewardStarV4: React.ForwardRefExoticComponent<RewardStarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RewardStarV4.d.ts.map