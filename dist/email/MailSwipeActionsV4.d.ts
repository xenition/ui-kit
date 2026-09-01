import * as React from 'react';
import type { MailSwipeActionsProps } from './MailSwipeActions';
export interface MailSwipeActionsV4Props extends MailSwipeActionsProps {
    /**
     * Ids of actions that destroy something. Each needs a second, confirming
     * press before its `onClick` fires.
     */
    destructiveIds?: string[];
    /** How the armed state is named. Default `` (label) => `Confirm ${label}` ``. */
    confirmLabel?: (label: string) => string;
    /** The rail's accessible name. Default `'Message actions'`. */
    toolbarLabel?: string;
}
/**
 * **V4 mail swipe rail** — same props as {@link MailSwipeActions} plus
 * `destructiveIds`, `confirmLabel` and `toolbarLabel`.
 *
 * ## Four changes
 *
 * 1. **Delete asks first.** A single tap on the rail destroyed a message with
 *    no confirmation, no undo, and no prop through which a caller could
 *    express either — on a control that is revealed by a *gesture*, so the tap
 *    that reveals it and the tap that deletes are the same motion a few pixels
 *    apart. An action listed in `destructiveIds` arms on the first press,
 *    renames itself through `confirmLabel` so the change is announced, and
 *    fires on the second.
 * 2. **Tab order follows the eye.** `side="trailing"` reversed the *paint*
 *    with `flex-row-reverse` and left the DOM alone, so on a rail whose last
 *    action is typically Delete, the first thing a keyboard reached was the
 *    rightmost panel. The trailing rail now reverses the list itself and lays
 *    out forwards: same picture, and the order a reader walks is the order a
 *    user sees.
 * 3. **The glyph and its word are the same colour.** A `neutral` panel drew an
 *    `onSurface` glyph over a `text-surface` label on a `muted` fill — three
 *    slots, none of them paired with the fill underneath. Both now take the
 *    tone's guaranteed pair.
 * 4. **The rail has a name, clears 44 and answers with a state layer**, rather
 *    than dimming itself at the band that means disabled.
 */
export declare const MailSwipeActionsV4: React.ForwardRefExoticComponent<MailSwipeActionsV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MailSwipeActionsV4.d.ts.map