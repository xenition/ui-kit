import * as React from 'react';
import type { ProfilePromptProps } from './ProfilePrompt';
export interface ProfilePromptV4Props extends ProfilePromptProps {
    /** Name for the heart control. Default `'Like this answer'`. */
    likeLabel?: string;
}
/**
 * **V4 profile prompt** — same props as {@link ProfilePrompt} plus
 * `likeLabel`.
 *
 * ## Four changes
 *
 * 1. **The heart is a sibling of the prompt, not a child of it.** With
 *    `onPress` set, the base wrapped the whole block — heart included — in a
 *    `Pressable`. A button inside a button is one target on iOS: tapping the
 *    heart fired `onPress`, and a reader was offered the outer control only.
 *    The press now lives on the text block, and the heart sits beside it.
 * 2. **The heart is a real target.** It was a bare glyph with `hitSlop={8}`,
 *    which is roughly 18px of drawn control — `hitSlop` widens where a touch
 *    counts and changes nothing about what a switch-control or a low-vision
 *    user can see or aim at. It clears 44 now, and announces with one name
 *    plus `selected`, which is how the web twin announces it too.
 * 3. **A like is not an error.** The liked heart was `danger` — the slot that
 *    means something has gone wrong, on the most positive gesture in the
 *    product. It is the brand's corrected ink, and filled-vs-hollow carries
 *    the state so it is not colour alone.
 * 4. **Press is a state layer** over the block's own ground, not an `opacity`
 *    that makes a pressed prompt read as an unavailable one.
 */
export declare function ProfilePromptV4({ prompt, answer, variant, glyph, liked, onPress, onLike, emptyLabel, likeLabel, style, }: ProfilePromptV4Props): React.ReactElement;
//# sourceMappingURL=ProfilePromptV4.d.ts.map