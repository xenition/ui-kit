import * as React from 'react';
import type { ConversationRowProps } from './ConversationRow';
/** Drop-in alternate design for {@link ConversationRow} — identical props. */
export type ConversationRowV2Props = ConversationRowProps;
/**
 * ConversationRow — **card** variant. A rounded, elevated card with a large
 * `xl` avatar, the name and timestamp on the top line, a bold last-message
 * preview, and a filled **unread pill** in the trailing gutter. Reads as a
 * spacious stacked-card inbox rather than the flat v1 list row. Same props as
 * `ConversationRow`, so a generator swaps only the import. No literal colors.
 */
export declare function ConversationRowV2({ name, lastMessage, timestamp, avatarUri, presence, unreadCount, muted, typing, selected, onPress, onLongPress, appearance, style, }: ConversationRowV2Props): React.ReactElement;
//# sourceMappingURL=ConversationRowV2.d.ts.map