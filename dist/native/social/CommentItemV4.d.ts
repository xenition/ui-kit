import * as React from 'react';
import type { CommentItemProps } from './CommentItem';
/** Drop-in for {@link CommentItemProps} — same props, the V4 "feed" design. */
export type CommentItemV4Props = CommentItemProps;
/**
 * CommentItem — **V4** "feed" design. The clean, airy take on a comment: a
 * larger avatar, a bold name, a muted handle/timestamp, a mention-aware body,
 * and a like + reply action row. Threaded replies keep their `depth` indent
 * and nested `children`; a `pinned` comment gets a soft-primary tinted rounded
 * surface. Same props/behavior as {@link CommentItemProps}; token-only colors
 * via `useXenitionTheme()` (+ `withAlpha`).
 */
export declare function CommentItemV4({ author, handle, avatarUrl, text, timestamp, likeCount, liked, depth, pinned, onLike, onReply, onPressAuthor, onPressMention, onPressHashtag, children, style, }: CommentItemV4Props): React.ReactElement;
//# sourceMappingURL=CommentItemV4.d.ts.map