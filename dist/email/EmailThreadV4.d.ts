import * as React from 'react';
import type { EmailThreadProps } from './EmailThread';
export interface EmailThreadV4Props extends EmailThreadProps {
    /**
     * Which message starts open when the thread is **uncontrolled**. Defaults to
     * the last one, which is what the base opened.
     */
    defaultExpandedId?: string;
    /** The loading state's accessible name. Default `'Loading messages'`. */
    loadingLabel?: string;
    /**
     * A sentence for a conversation that failed to load. Supplying it puts the
     * thread into its error state; there was no error state at all before.
     */
    errorLabel?: string;
}
/**
 * **V4 email thread** — same props as {@link EmailThread} plus
 * `defaultExpandedId`, `loadingLabel` and `errorLabel`.
 *
 * ## Five changes
 *
 * 1. **Expansion works when nobody is driving it.** The base computed
 *    `new Set(expandedIds ?? [lastId])` fresh on every render and held **no
 *    state at all**, while `expandedIds` is an *optional* prop. Mounted the way
 *    the module's own barrel doc shows it — `<EmailThread subject messages />`
 *    — every header click fired `onToggleMessage` into a callback nobody was
 *    listening to: the newest message stayed open, every earlier one stayed a
 *    clipped one-line snippet, and `aria-expanded` never flipped. A user tapped
 *    the third reply, saw nothing happen, tapped again, and concluded the app
 *    was broken; a screen-reader user heard "Expand message from Priya,
 *    collapsed" every single time they activated it. `useThreadExpansion` —
 *    shared with the native twin — leaves the controlled path exactly as it
 *    was and gives the uncontrolled path somewhere to put its state.
 * 2. **The header toggle is a real `<button>`**, not a `div` with
 *    `role="button"`, a `tabIndex` and a hand-written Enter/Space handler —
 *    three approximations of what a button already does. The timestamp and the
 *    star stay outside it, so neither collapses the message.
 * 3. **Loading draws the messages it is about to show** and announces itself.
 *    A centred spinner collapsed the thread to a dot and then jumped to full
 *    height.
 * 4. **The empty state is `EmptyStateV4`**, not the base primitive re-exported
 *    through the deprecated `../commerce` shim the base imported it from.
 * 5. **A failed fetch has a representation.** `errorLabel` gives one; there
 *    was none, so a thread that failed to load and a thread with no messages
 *    were the same screen.
 */
export declare const EmailThreadV4: React.ForwardRefExoticComponent<EmailThreadV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmailThreadV4.d.ts.map