import * as React from 'react';
import type { MessageGroupProps } from './MessageGroup';
/** Drop-in alternate design for {@link MessageGroup} — identical props. */
export type MessageGroupV2Props = MessageGroupProps;
/**
 * MessageGroup — **tailed bubbles** variant (iMessage feel). Rather than the v1
 * stack of uniform rounded `ChatBubble`s, this draws its own bubbles where the
 * *last* bubble in the run grows a directional tail (a squared-off bottom
 * corner) toward the author's side, and the group's avatar sits inline beside
 * the run. Outgoing bubbles use the primary fill; incoming use the surface fill.
 * Same props as `MessageGroup`. No literal colors.
 */
export declare function MessageGroupV2({ side, messages, authorName, avatarUri, showAvatar, receipt, style, }: MessageGroupV2Props): React.ReactElement;
//# sourceMappingURL=MessageGroupV2.d.ts.map