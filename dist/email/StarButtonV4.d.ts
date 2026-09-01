import * as React from 'react';
import type { StarButtonProps } from './StarButton';
export interface StarButtonV4Props extends StarButtonProps {
    /** The action offered while the message is **not** starred. Default `'Star'`. */
    starLabel?: string;
    /** The action offered while it **is**. Default `'Remove star'`. */
    unstarLabel?: string;
}
/**
 * **V4 star button** — same props as {@link StarButton} plus `starLabel` and
 * `unstarLabel`.
 *
 * ## Five changes
 *
 * 1. **It is big enough to hit.** The base was a glyph in `xs` padding — about
 *    26px square — sitting on the busiest line of a mail row, between a subject
 *    that opens the message and a row that opens the message. A miss did not do
 *    nothing; it opened the mail.
 * 2. **The name is the action, and the state is `aria-pressed`.** "Starred" as
 *    a *name* tells a reader what the message is, not what the button will do,
 *    so nothing announced that pressing it would remove the star. Native said
 *    the same thing a third way. Both twins now name the action and carry the
 *    state in the toggle state.
 * 3. **The star is inked with `warnText`, not the `warn` fill.** The fill slot
 *    carries a contrast promise for things drawn *on* it, not for a mark drawn
 *    *in* it, and an amber star on a white row was the thinnest thing in the
 *    list.
 * 4. **Press is a state layer.** `hover:opacity-70` dims the control's own
 *    content, which is the band M3 spends on *disabled* — a hovered star and a
 *    dead star looked alike.
 * 5. **Disabled is 0.38**, M3's number, not the `opacity-50` that was picked
 *    because fifty is round.
 */
export declare const StarButtonV4: React.ForwardRefExoticComponent<StarButtonV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=StarButtonV4.d.ts.map