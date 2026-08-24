import * as React from 'react';
export interface EngagementBarProps extends React.HTMLAttributes<HTMLDivElement> {
    likeCount?: number;
    commentCount?: number;
    shareCount?: number;
    /** Whether the viewer has liked / bookmarked this item. */
    liked?: boolean;
    bookmarked?: boolean;
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    /** When provided, a trailing bookmark toggle is rendered. */
    onBookmark?: () => void;
    /** Hide zero counts, showing icon only. Default `true`. */
    hideZero?: boolean;
}
export declare function formatCount(n: number): string;
/**
 * The like / comment / share (+ optional bookmark) action row under a post.
 * Each action is a glyph with an optional count; `liked` turns the heart
 * `danger`, `bookmarked` turns the flag `primary`. Only the handlers you pass
 * become interactive. Web parity of the native `EngagementBar`; token-only.
 * State is announced via `aria-pressed`, not color alone.
 */
export declare const EngagementBar: React.ForwardRefExoticComponent<EngagementBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EngagementBar.d.ts.map