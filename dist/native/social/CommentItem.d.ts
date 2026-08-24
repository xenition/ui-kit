import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
export interface CommentItemProps {
    /** Comment author display name. */
    author: string;
    /** @handle without the `@`. */
    handle?: string;
    avatarUrl?: string;
    /** Comment body — `@mentions`/`#hashtags` are auto-highlighted. */
    text: string;
    /** Relative time label (e.g. `2h`). */
    timestamp?: string;
    likeCount?: number;
    liked?: boolean;
    /** Nesting depth for threaded replies (indents the row). Default `0`. */
    depth?: number;
    /** Pinned/highlighted comment (e.g. author's pick) — tints the surface. */
    pinned?: boolean;
    /**
     * Surface treatment applied when `pinned` — fill/border/elevation only;
     * radius/padding are unchanged. Default `'classic'` (the historical look).
     */
    appearance?: Appearance;
    onLike?: () => void;
    onReply?: () => void;
    onPressAuthor?: () => void;
    onPressMention?: (handle: string) => void;
    onPressHashtag?: (tag: string) => void;
    /** Nested reply items rendered beneath, already indented via their `depth`. */
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single comment: avatar, author + timestamp, body (with mention/hashtag
 * highlighting), and a like/reply action row. Supports threaded replies via
 * `depth` indentation and nested `children`, plus a `pinned` highlight. Token-only.
 */
export declare function CommentItem({ author, handle, avatarUrl, text, timestamp, likeCount, liked, depth, pinned, appearance, onLike, onReply, onPressAuthor, onPressMention, onPressHashtag, children, style, }: CommentItemProps): React.ReactElement;
//# sourceMappingURL=CommentItem.d.ts.map