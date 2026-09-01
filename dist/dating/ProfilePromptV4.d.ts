import * as React from 'react';
import type { ProfilePromptProps } from './ProfilePrompt';
export interface ProfilePromptV4Props extends ProfilePromptProps {
    /** Name for the like affordance. Default `'Like this answer'`. */
    likeLabel?: string;
}
/**
 * **V4 profile prompt** — the web twin of the native `ProfilePromptV4`, same
 * props as {@link ProfilePrompt} plus `likeLabel`.
 *
 * ## Four changes
 *
 * 1. **The like button is a sibling, not a child of a button.** Setting
 *    `onClick` wrapped the whole block in a `<div role="button" tabIndex={0}>`
 *    with the heart *inside* it — a control nested in a control, which is
 *    invalid, which is why the heart needed `stopPropagation` to work at all,
 *    and which leaves a screen reader announcing a button whose name already
 *    contains the answer and whose only child is another button. The two are
 *    now siblings inside a plain container: the answer is a real `<button>`,
 *    the heart is a real `<button>`, and neither has to defend itself from the
 *    other.
 * 2. **The heart is hittable.** It was a bare glyph at roughly 18px, with no
 *    focus ring, on the one affordance the component is named for.
 * 3. **Liking something is not `danger`.** The filled heart wore the error slot.
 * 4. **Press is a state layer.** `hover:opacity-90` on the outer container
 *    faded the answer itself, which is the signal M3 spends on *disabled*.
 *
 * `liked` keeps carrying its state through `aria-pressed` — one name plus a
 * pressed state, rather than a label that changes out from under the user.
 */
export declare const ProfilePromptV4: React.ForwardRefExoticComponent<ProfilePromptV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProfilePromptV4.d.ts.map