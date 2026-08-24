import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type PostVariant = 'text' | 'image' | 'link' | 'video';
export interface PostAuthor {
    name: string;
    /** @handle without the `@`. */
    handle?: string;
    avatarUrl?: string;
    verified?: boolean;
}
export interface PostLink {
    url: string;
    title?: string;
    description?: string;
    /** Domain shown as the source line (e.g. `nytimes.com`). */
    domain?: string;
    imageUrl?: string;
}
export interface PostVideo {
    thumbnailUrl?: string;
    /** Duration overlay (e.g. `1:24`). */
    duration?: string;
}
export interface PostCardProps {
    /** Media kind. `text` (no media), `image`, `link` preview, or `video`. */
    variant?: PostVariant;
    author: PostAuthor;
    /** Relative timestamp (e.g. `3h`). */
    timestamp?: string;
    /** Post body — `@mentions`/`#hashtags` are highlighted + tappable. */
    text?: string;
    /** `image` variant source. */
    imageUrl?: string;
    imageAlt?: string;
    /** `link` variant preview data. */
    link?: PostLink;
    /** `video` variant data. */
    video?: PostVideo;
    showEngagement?: boolean;
    likeCount?: number;
    commentCount?: number;
    shareCount?: number;
    liked?: boolean;
    bookmarked?: boolean;
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    onBookmark?: () => void;
    onPress?: () => void;
    onPressAuthor?: () => void;
    onPressMenu?: () => void;
    onPressMention?: (handle: string) => void;
    onPressHashtag?: (tag: string) => void;
    /** Skeleton placeholder while the post loads. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * The feed post — one component, four media variants (`text` / `image` /
 * `link` / `video`) sharing an author header, a mention-aware body, and an
 * optional {@link EngagementBar} footer. Has a `loading` skeleton and tappable
 * author/menu/body affordances. Token-only.
 */
export declare function PostCard({ variant, author, timestamp, text, imageUrl, imageAlt, link, video, showEngagement, likeCount, commentCount, shareCount, liked, bookmarked, onLike, onComment, onShare, onBookmark, onPress, onPressAuthor, onPressMenu, onPressMention, onPressHashtag, loading, style, }: PostCardProps): React.ReactElement;
//# sourceMappingURL=PostCard.d.ts.map