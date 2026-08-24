import * as React from 'react';
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
export interface PostCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Media kind. `text` (no media), `image`, `link` preview, or `video`. */
    variant?: PostVariant;
    author: PostAuthor;
    /** Relative timestamp (e.g. `3h`). */
    timestamp?: string;
    /** Post body — `@mentions`/`#hashtags` are highlighted + clickable. */
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
    onClick?: () => void;
    onPressAuthor?: () => void;
    onPressMenu?: () => void;
    onPressMention?: (handle: string) => void;
    onPressHashtag?: (tag: string) => void;
    /** Skeleton placeholder while the post loads. */
    loading?: boolean;
}
/**
 * The feed post — one component, four media variants (`text` / `image` /
 * `link` / `video`) sharing an author header, a mention-aware body, and an
 * optional {@link EngagementBar} footer. Has a `loading` skeleton and clickable
 * author/menu/body affordances. Web parity of the native `PostCard`; token-only.
 * When `onClick` is set the root is a keyboard-operable `role="button"` so the
 * nested action buttons remain independently focusable.
 */
export declare const PostCard: React.ForwardRefExoticComponent<PostCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PostCard.d.ts.map