import * as React from 'react';
import type { ConversationRowProps } from './ConversationRow';
/** Drop-in alternate design for {@link ConversationRow} — identical props. */
export type ConversationRowV3Props = ConversationRowProps;
/**
 * ConversationRow — **dense minimal** variant. A single tight line: a tiny `xs`
 * avatar, the name and message preview flowing inline (name bold, preview
 * muted), an unread state shown as a small leading dot, and the timestamp
 * pinned far-right. Built for high-density inboxes (many rows on screen) — the
 * opposite of the spacious v2 card. Same props as `ConversationRow`. No literal
 * colors.
 */
export declare function ConversationRowV3({ name, lastMessage, timestamp, avatarUri, presence, unreadCount, muted, typing, selected, onPress, onLongPress, appearance, style, }: ConversationRowV3Props): React.ReactElement;
//# sourceMappingURL=ConversationRowV3.d.ts.map