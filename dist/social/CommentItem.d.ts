import * as React from 'react';
export interface CommentItemProps extends React.HTMLAttributes<HTMLDivElement> {
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
    onLike?: () => void;
    onReply?: () => void;
    onPressAuthor?: () => void;
    onPressMention?: (handle: string) => void;
    onPressHashtag?: (tag: string) => void;
    /** Nested reply items rendered beneath, already indented via their `depth`. */
    children?: React.ReactNode;
}
/**
 * A single comment: avatar, author + timestamp, body (with mention/hashtag
 * highlighting), and a like/reply action row. Supports threaded replies via
 * `depth` indentation and nested `children`, plus a `pinned` highlight. Web
 * parity of the native `CommentItem`; token-only. The indent uses a
 * `--xen-space-xl`-derived `calc()` so it stays token-pure.
 */
export declare const CommentItem: React.ForwardRefExoticComponent<CommentItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CommentItem.d.ts.map