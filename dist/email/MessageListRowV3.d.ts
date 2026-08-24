import * as React from 'react';
import type { MessageListRowProps } from './MessageListRow';
/** Same public contract as {@link MessageListRow} — a drop-in alternate design. */
export type MessageListRowV3Props = MessageListRowProps;
/**
 * MessageListRow — design **V3**. A **dense, Gmail-style line**: a leading unread
 * dot, the sender and subject stacked tight with the subject and preview joined
 * on one line, and the timestamp pinned to the far right. No avatar, minimal
 * padding, hairline-divided — built for long, scannable lists. Unread is bold +
 * dot + announced (never color-alone). The row is a keyboard-operable
 * `role="button"`. Same props as `MessageListRow`. No literal colors.
 */
export declare const MessageListRowV3: React.ForwardRefExoticComponent<MessageListRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageListRowV3.d.ts.map