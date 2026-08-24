import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface EngagementBarProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * The like / comment / share (+ optional bookmark) action row under a post.
 * Each action is an icon with an optional count; `liked` turns the heart
 * `dangerText`, `bookmarked` turns the flag `primaryText` (the on-surface-
 * readable variants). Only the handlers you pass become interactive. Token-only.
 */
export declare function EngagementBar({ likeCount, commentCount, shareCount, liked, bookmarked, onLike, onComment, onShare, onBookmark, hideZero, style, }: EngagementBarProps): React.ReactElement;
//# sourceMappingURL=EngagementBar.d.ts.map