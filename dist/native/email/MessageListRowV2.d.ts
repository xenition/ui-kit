import * as React from 'react';
import type { MessageListRowProps } from './MessageListRow';
/** Same public contract as {@link MessageListRow} — a drop-in alternate design. */
export type MessageListRowV2Props = MessageListRowProps;
/**
 * MessageListRow — design V2. A tappable **card row**: a large sender avatar on
 * the left, a two-line body preview, a trailing timestamp, and an "Unread" pill
 * for the unread state (in addition to bold text + a dot, so state is never
 * signalled by color alone). Press-scales on tap and floats on a soft shadow.
 * Same props as `MessageListRow`. No literal colors.
 */
export declare function MessageListRowV2({ sender, subject, preview, timestamp, avatarUri, unread, starred, onToggleStar, hasAttachments, threadCount, labels, selected, onPress, onLongPress, style, }: MessageListRowV2Props): React.ReactElement;
//# sourceMappingURL=MessageListRowV2.d.ts.map