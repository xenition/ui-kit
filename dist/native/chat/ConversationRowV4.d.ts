import * as React from 'react';
import type { ConversationRowProps } from './ConversationRow';
export interface ConversationRowV4Props extends ConversationRowProps {
    /** Copy shown while the other party types. Default `'typing…'`. */
    typingLabel?: string;
    /** Announced for a muted conversation. Default `'Muted'`. */
    mutedLabel?: string;
    /** Build the unread summary. Default `'3 unread'`. */
    formatUnread?: (count: number) => string;
    /** Draw the separator under the row. Default `false`. */
    last?: boolean;
}
/**
 * **V4 conversation row** — same props as {@link ConversationRow} plus three
 * copy hooks and `last`.
 *
 * ## Four changes
 *
 * 1. **The row announces its whole state** — name, presence, last message,
 *    time, unread count, muted. The base left six fragments a reader walked
 *    one at a time, which is the difference between scanning an inbox and
 *    reading it.
 * 2. **Unread is capped**, so a badge cannot stretch the row.
 * 3. **Muted is a glyph *and* a word**, where the base dimmed the row — an
 *    opacity a colour-blind user reads as "disabled" rather than "muted".
 * 4. **It is a row from the shared row line**, with the shared press fill.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function ConversationRowV4({ name, lastMessage, timestamp, avatarUri, presence, unreadCount, muted, typing, selected, typingLabel, mutedLabel, formatUnread, last, onPress, onLongPress, style, }: ConversationRowV4Props): React.ReactElement | null;
//# sourceMappingURL=ConversationRowV4.d.ts.map