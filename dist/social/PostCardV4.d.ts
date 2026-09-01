import * as React from 'react';
import type { PostCardProps } from './PostCard';
/** Drop-in for {@link PostCardProps} — same props, the V4 "feed" design. */
export type PostCardV4Props = PostCardProps;
/**
 * PostCard — **V4** "feed" design (web parity of the native V4). The clean, airy
 * take on a feed post: an elevated rounded card with generous whitespace, a
 * larger avatar, a bold name with a primary verified tick, a mention-aware body,
 * rounded media, and the {@link EngagementBar} footer. Same props/behavior as
 * {@link PostCardProps}; all colors from `--xen-*` token classes (no literals).
 * `loading` shows a skeleton.
 */
export declare const PostCardV4: React.ForwardRefExoticComponent<PostCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PostCardV4.d.ts.map