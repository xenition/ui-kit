import * as React from 'react';
import type { ReadUnreadToggleProps } from './ReadUnreadToggle';
export interface ReadUnreadToggleV4Props extends ReadUnreadToggleProps {
    /** The action offered while the message is unread. Default `'Mark as read'`. */
    readLabel?: string;
    /** The action offered while it is read. Default `'Mark as unread'`. */
    unreadLabel?: string;
}
/**
 * **V4 read / unread toggle** — same props as {@link ReadUnreadToggle} plus
 * `readLabel` and `unreadLabel`.
 *
 * ## Five changes
 *
 * 1. **It announces what state the message is in.** The base named the
 *    *action* and stopped, so a reader tabbing a toolbar heard "Mark as read"
 *    with no way to learn whether the message was already read — and the twin
 *    announced a third thing again. Both twins now name the action and carry
 *    the state as the toggle state.
 * 2. **The zero-size `View` is gone.** It carried a comment claiming an
 *    accessibility guarantee, and the element was empty and explicitly hidden
 *    from assistive tech; it guaranteed nothing. (Native's; the web twin never
 *    had it, and this is the parity note.)
 * 3. **It clears 44.** The base was roughly 24px tall in its icon-only form —
 *    the form a compact toolbar actually uses.
 * 4. **The pill stops being a light-mode ramp step.** `bg-primary-50` is a
 *    ramp step oriented for a light page; on a dark one it painted a near-white
 *    slab. The labelled form wears `selected`/`on-selected`, the pair the
 *    theme ships for exactly this container.
 * 5. **Press is a state layer and disabled is 0.38** — `hover:opacity-70`
 *    dims the control's own content, which is how M3 draws *disabled*.
 */
export declare const ReadUnreadToggleV4: React.ForwardRefExoticComponent<ReadUnreadToggleV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ReadUnreadToggleV4.d.ts.map