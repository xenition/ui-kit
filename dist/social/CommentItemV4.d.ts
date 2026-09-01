import * as React from 'react';
import type { CommentItemProps } from './CommentItem';
/** Drop-in for {@link CommentItemProps} — same props, the V4 "feed" design. */
export type CommentItemV4Props = CommentItemProps;
/**
 * CommentItem — **V4** "feed" design (web parity of the native V4). The clean,
 * airy take on a comment: a larger avatar, a bold name with a primary verified
 * tick space, a muted handle/timestamp, a mention-aware body, and a like +
 * reply action row. Threaded replies keep their `depth` indent and nested
 * `children`; a `pinned` comment gets a soft-primary tinted rounded surface.
 * Same props/behavior as {@link CommentItemProps}; all colors from `--xen-*`
 * token classes (no literals). The indent uses a `--xen-space-xl`-derived
 * `calc()` so it stays token-pure.
 */
export declare const CommentItemV4: React.ForwardRefExoticComponent<CommentItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CommentItemV4.d.ts.map