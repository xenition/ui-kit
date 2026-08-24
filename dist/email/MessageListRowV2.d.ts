import * as React from 'react';
import type { MessageListRowProps } from './MessageListRow';
/** Same public contract as {@link MessageListRow} — a drop-in alternate design. */
export type MessageListRowV2Props = MessageListRowProps;
/**
 * MessageListRow — design **V2**. A tappable **card row**: a large sender avatar
 * carrying a corner unread dot, a two-line preview, a trailing timestamp, and a
 * "New" pill for the unread state (alongside bold text + the dot, so state is
 * never color-alone). Floats on a soft shadow and lifts / press-scales on
 * interaction. The `selected` state adds a primary ring + tint. Same props as
 * `MessageListRow`. No literal colors.
 */
export declare const MessageListRowV2: React.ForwardRefExoticComponent<MessageListRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageListRowV2.d.ts.map