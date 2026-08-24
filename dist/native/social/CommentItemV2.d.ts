import * as React from 'react';
import type { CommentItemProps } from './CommentItem';
/** Drop-in for {@link CommentItem} — identical props, a different design. */
export type CommentItemV2Props = CommentItemProps;
/**
 * CommentItem, design V2 — a **chat bubble**: the avatar sits outside a filled,
 * speech-bubble surface (one squared corner) that carries the author + body;
 * timestamp and like/reply actions live below the bubble. Threads via `depth`
 * indentation; `pinned` tints the bubble. Same props as {@link CommentItem}.
 */
export declare function CommentItemV2({ author, handle, avatarUrl, text, timestamp, likeCount, liked, depth, pinned, appearance, onLike, onReply, onPressAuthor, onPressMention, onPressHashtag, children, style, }: CommentItemV2Props): React.ReactElement;
//# sourceMappingURL=CommentItemV2.d.ts.map