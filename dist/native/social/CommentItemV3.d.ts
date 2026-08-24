import * as React from 'react';
import type { CommentItemProps } from './CommentItem';
/** Drop-in for {@link CommentItem} — identical props, a different design. */
export type CommentItemV3Props = CommentItemProps;
/**
 * CommentItem, design V3 — **flat & threaded** with a thin **indent rail**.
 * No bubble: a tiny inline avatar, a single author line, a tight body, and a
 * compact action row. Nested replies (`depth` > 0) draw a hairline vertical
 * rail on the left to show the thread. Same props as {@link CommentItem}.
 */
export declare function CommentItemV3({ author, handle, avatarUrl, text, timestamp, likeCount, liked, depth, pinned, appearance, onLike, onReply, onPressAuthor, onPressMention, onPressHashtag, children, style, }: CommentItemV3Props): React.ReactElement;
//# sourceMappingURL=CommentItemV3.d.ts.map