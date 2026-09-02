import * as React from 'react';
import type { RewardStarProps } from './RewardStar';
export interface RewardStarV4Props extends RewardStarProps {
    /** The count, spoken and printed. Default `'3 of 5 stars'`. */
    formatCount?: (filled: number, max: number) => string;
    /** Verb the per-star buttons are named with. Default `'Award'`. */
    awardLabel?: string;
}
/**
 * **V4 reward star** — same props as {@link RewardStar} plus `formatCount` and
 * `awardLabel`.
 *
 * ## Four changes
 *
 * 1. **The swipe gestures the control promised now exist — as buttons.** The
 *    base declared `accessibilityRole="adjustable"` and no
 *    `accessibilityActions`, so VoiceOver offered swipe-up and swipe-down and
 *    both did **nothing**: the control announced itself as adjustable and could
 *    not be adjusted. The web twin meanwhile used `role="group"`/`"img"`, so
 *    the same component was two different things on two platforms. Both twins
 *    now use one model — **one real button per star** — because it is the only
 *    one both platforms can express identically, it needs no gesture
 *    vocabulary, and a child using switch control or a keyboard reaches every
 *    value directly instead of stepping through them.
 * 2. **The stars are targets.** They were a ~20px glyph with `hitSlop={6}` — a
 *    32px target with slop that overlaps its neighbours', in a module built for
 *    people whose aim is worse than an adult's. Each star is now a 44 control.
 * 3. **The count is drawn as a number, not only as five pictures of one.**
 *    `starParts` clamps what is **drawn** and leaves the caller's own value
 *    alone, and the numeral beside the glyphs is what a low-vision or
 *    colour-blind user actually reads — five glyphs at `sm` are not a number.
 *    It is `formatCount`, so it translates.
 * 4. **Press is a state layer** rather than `opacity: pressed ? 0.6 : 1`, which
 *    is well inside M3's *disabled* band, and the filled star's ink is held to
 *    3:1 against the ground rather than being whatever `colors[color]` happened
 *    to be.
 *
 * **Renders nothing when there is no scale to draw** (`max <= 0`, §4.5).
 */
export declare function RewardStarV4({ value, max, size, label, color, readOnly, formatCount, awardLabel, onReward, style, }: RewardStarV4Props): React.ReactElement | null;
//# sourceMappingURL=RewardStarV4.d.ts.map