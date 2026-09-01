import * as React from 'react';
import type { PostCardProps } from './PostCard';
/** Drop-in for {@link PostCardProps} — same props, the V4 "feed" design. */
export type PostCardV4Props = PostCardProps;
/**
 * PostCard — **V4** "feed" design. The clean, airy take on a feed post: an
 * elevated rounded card with generous whitespace, a larger avatar, a bold name
 * with a primary verified tick, a mention-aware body, rounded media, and the
 * {@link EngagementBar} footer. Same props/behavior as {@link PostCardProps};
 * token-only colors via `useXenitionTheme()`. `loading` shows a skeleton;
 * `density="compact"` tightens the spacing.
 */
export declare function PostCardV4({ variant, author, timestamp, text, imageUrl, imageAlt, link, video, showEngagement, likeCount, commentCount, shareCount, liked, bookmarked, onLike, onComment, onShare, onBookmark, onPress, onPressAuthor, onPressMenu, onPressMention, onPressHashtag, loading, density, style, }: PostCardV4Props): React.ReactElement;
//# sourceMappingURL=PostCardV4.d.ts.map