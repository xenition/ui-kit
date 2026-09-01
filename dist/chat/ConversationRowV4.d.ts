import * as React from 'react';
import type { ConversationRowProps } from './ConversationRow';
export interface ConversationRowV4Props extends ConversationRowProps {
    /** Build the typing line. Default `'Typing…'`. */
    typingLabel?: string;
    /** Copy for the muted state. Default `'Muted'`. */
    mutedLabel?: string;
    /** Build the unread count's spoken form. Default `'3 unread'`. */
    formatUnread?: (count: number) => string;
    /**
     * The last row in a list. Drops the trailing separator, which otherwise
     * hangs off the bottom of the list with nothing under it.
     */
    last?: boolean;
}
/**
 * **V4 conversation row** — the web twin of the native `ConversationRowV4`,
 * same props as {@link ConversationRow} plus `typingLabel`, `mutedLabel`,
 * `formatUnread` and `last`.
 *
 * ## Five changes
 *
 * 1. **The whole row is one accessible name.** The base left name, preview,
 *    time, presence and unread count as five separate stops, so reaching a
 *    conversation meant five swipes and reassembling it by hand.
 * 2. **Muted is a glyph *and* a word.** It was a lowered opacity — which is
 *    also how the row would look disabled.
 * 3. **The unread count caps at 99+.** Four digits pushed the timestamp out.
 * 4. **It joins the shared row family** — one height, one 44 leading slot,
 *    one state layer, one separator, with `ListRow` and `NotificationItem`.
 * 5. **Presence carries its word into the row's name**, rather than being a
 *    coloured dot in the corner.
 */
export declare const ConversationRowV4: React.ForwardRefExoticComponent<ConversationRowV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ConversationRowV4.d.ts.map