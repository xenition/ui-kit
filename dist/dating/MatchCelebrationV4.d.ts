import * as React from 'react';
import type { MatchCelebrationProps } from './MatchCelebration';
export interface MatchCelebrationV4Props extends MatchCelebrationProps {
    /** Name for the close control. Default `'Close'`. */
    closeLabel?: string;
}
/**
 * **V4 match celebration** — the web twin of the native `MatchCelebrationV4`,
 * same props as {@link MatchCelebration} plus `closeLabel`.
 *
 * ## Five changes
 *
 * 1. **It can be dismissed.** The Escape handler sat on the backdrop `<div>` —
 *    a `<div>` with no `tabIndex`, which therefore never held focus, in a
 *    modal that autofocused nothing. A React `onKeyDown` only fires for keys
 *    pressed inside the subtree, so Escape reached the handler on exactly zero
 *    presses. The listener is on the document, focus moves into the dialog when
 *    it opens and back to whatever opened it when it closes, and Tab is
 *    trapped — a full-screen overlay that leaves focus behind it lets a
 *    keyboard user tab silently through a page they cannot see.
 * 2. **There is a close control.** The two buttons were "send a message" and
 *    "keep swiping", so a user with neither intention had only the backdrop —
 *    and the native twin's backdrop is not pressable at all, which is why this
 *    prop exists on both twins.
 * 3. **The backdrop stops inverting.** `bg-neutral-900` is a ramp step, and the
 *    web ramp *mirrors* under `[data-theme="dark"]`: the scrim over a dark page
 *    was drawn in the near-white step. A scrim is dark in both schemes by
 *    definition, so it is `PHOTO_SCRIM_STRONG`, which is fixed.
 * 4. **The headline is a heading**, and it names the dialog — the base labelled
 *    the dialog with the headline and the sentence glued together and left the
 *    headline itself a `<p>`, so the copy was read twice and the overlay had no
 *    structure to navigate by.
 * 5. **`superlike` looks like something.** See {@link VARIANT}. The heart
 *    between the avatars also stops being `danger`: a match is the best thing
 *    that happens in the product, drawn in the error slot.
 */
export declare const MatchCelebrationV4: React.ForwardRefExoticComponent<MatchCelebrationV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatchCelebrationV4.d.ts.map