import * as React from 'react';
import type { PostCardProps } from './PostCard';
/** Drop-in for {@link PostCard} — identical props, a different design. */
export type PostCardV3Props = PostCardProps;
/**
 * PostCard, design V3 — **minimal & borderless** with a colored **left accent
 * rail**. No card fill or shadow: the post reads as a thread entry — header on
 * one line, a tight body, small inline media, and a flat engagement row. Link
 * previews collapse to a side-by-side chip. Same props as {@link PostCard} (all
 * four `variant`s), token-only.
 */
export declare const PostCardV3: React.ForwardRefExoticComponent<PostCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PostCardV3.d.ts.map