import * as React from 'react';
import type { PostCardProps } from './PostCard';
/** Drop-in for {@link PostCard} — identical props, a different design. */
export type PostCardV2Props = PostCardProps;
/**
 * PostCard, design V2 — an **elevated, media-forward** post. The media leads
 * (big imagery, no border), the engagement bar **floats** in a shadowed pill
 * bridging the media and the body, and the author sits beneath. Same props as
 * {@link PostCard} (all four `variant`s supported), token-only.
 */
export declare function PostCardV2({ variant, author, timestamp, text, imageUrl, imageAlt, link, video, showEngagement, likeCount, commentCount, shareCount, liked, bookmarked, onLike, onComment, onShare, onBookmark, onPress, onPressAuthor, onPressMenu, onPressMention, onPressHashtag, loading, density, style, }: PostCardV2Props): React.ReactElement;
//# sourceMappingURL=PostCardV2.d.ts.map