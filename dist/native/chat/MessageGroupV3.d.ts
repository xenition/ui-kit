import * as React from 'react';
import type { MessageGroupProps } from './MessageGroup';
/** Drop-in alternate design for {@link MessageGroup} — identical props. */
export type MessageGroupV3Props = MessageGroupProps;
/**
 * MessageGroup — **flat channel row** variant (Slack feel). No bubbles and no
 * side-alignment: every group is a left-aligned block with the avatar in a
 * gutter, a bold sender name + time header, and the messages as plain flat text
 * lines. A thin vertical **sender rule** runs down the left edge — primary-tinted
 * for your own messages, a hairline border for others — so authorship reads
 * without color-filled bubbles. Same props as `MessageGroup`. No literal colors.
 */
export declare function MessageGroupV3({ side, messages, authorName, avatarUri, showAvatar, receipt, style, }: MessageGroupV3Props): React.ReactElement;
//# sourceMappingURL=MessageGroupV3.d.ts.map