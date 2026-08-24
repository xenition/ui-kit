import * as React from 'react';
import type { PostCardProps } from './PostCard';
/** Drop-in for {@link PostCard} — identical props, a different design. */
export type PostCardV3Props = PostCardProps;
/**
 * PostCard, design V3 — **minimal & borderless** with a colored **left accent
 * rail**. No card fill or shadow: the post reads as a thread entry, header on
 * one line, a tight body, small inline media, and a flat engagement row. Same
 * props as {@link PostCard} (all four `variant`s supported), token-only.
 */
export declare function PostCardV3({ variant, author, timestamp, text, imageUrl, imageAlt, link, video, showEngagement, likeCount, commentCount, shareCount, liked, bookmarked, onLike, onComment, onShare, onBookmark, onPress, onPressAuthor, onPressMenu, onPressMention, onPressHashtag, loading, density, style, }: PostCardV3Props): React.ReactElement;
//# sourceMappingURL=PostCardV3.d.ts.map