import * as React from 'react';
import type { MessageListRowProps } from './MessageListRow';
/** Same public contract as {@link MessageListRow} — a drop-in alternate design. */
export type MessageListRowV3Props = MessageListRowProps;
/**
 * MessageListRow — design V3. A **dense, Gmail-style line**: a leading unread
 * dot, the sender and subject stacked tight, and the timestamp pinned to the far
 * right. No avatar, minimal padding — built for long, scannable lists. Unread is
 * bold + dot + announced (never color alone). Same props as `MessageListRow`.
 * No literal colors.
 */
export declare function MessageListRowV3({ sender, subject, preview, timestamp, unread, starred, onToggleStar, hasAttachments, threadCount, labels, selected, onPress, onLongPress, style, }: MessageListRowV3Props): React.ReactElement;
//# sourceMappingURL=MessageListRowV3.d.ts.map