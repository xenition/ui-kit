import * as React from 'react';
import type { MessageListRowProps } from './MessageListRow';
export interface MessageListRowV4Props extends MessageListRowProps {
    /** How the thread count is spoken. Default `` (n) => `${n} messages` ``. */
    formatThreadCount?: (count: number) => string;
    /** The word for the unread state. Default `'Unread'`. */
    unreadLabel?: string;
}
/**
 * **V4 message list row** — same props as {@link MessageListRow} plus
 * `formatThreadCount` and `unreadLabel`.
 *
 * ## Six changes
 *
 * 1. **The row's content reaches a screen reader again.** `role="button"` on a
 *    `div` makes every child **presentational**: the preview, the thread count
 *    and every label chip were removed from the accessibility tree outright,
 *    and the row's hand-written six-item `aria-label` — which mentioned none of
 *    them — was all a reader ever got. The row is a real `<button>` carrying
 *    one deliberate spoken name built with `spokenLine`, and that name contains
 *    what the row shows.
 * 2. **Selected and hovered are different things.** Both resolved to
 *    `bg-neutral-100`, so in a split-view inbox the mouse repainted every row
 *    it passed over as "the open one" and the actual open one was
 *    indistinguishable from wherever the pointer happened to be. Selected is
 *    the `selected` container; hover is the M3 state layer over it.
 * 3. **The star is reachable.** It sat inside the row's own pressable, which
 *    on the native twin meant the only way to star a message was to open it.
 *    It is now a sibling of the row's button, not a child of it.
 * 4. **The thread count carries a unit and is drawn as the pill its own prop
 *    doc promises.** A bare "4" beside a sender says nothing; a reader now
 *    hears "4 messages".
 * 5. **Long press works with a finger.** `onLongPress` was wired to
 *    `onContextMenu` only, so on touch web — a tablet inbox — the multi-select
 *    gesture the prop exists for did not exist.
 * 6. **`unread` is inked with `primaryText`, not the `primary` fill**, and the
 *    row announces `selected` rather than reporting itself as a pressed toggle.
 */
export declare const MessageListRowV4: React.ForwardRefExoticComponent<MessageListRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageListRowV4.d.ts.map