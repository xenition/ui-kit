import * as React from 'react';
import type { PostCardProps } from './PostCard';
/** Drop-in for {@link PostCard} — identical props, a different design. */
export type PostCardV2Props = PostCardProps;
/**
 * PostCard, design V2 — an **elevated, media-forward** post. The media leads
 * (big imagery, no border), the engagement bar **floats** in a shadowed pill
 * bridging the media and the body, and the author sits beneath. Text-only posts
 * get a tinted hero block. Same props as {@link PostCard} (all four `variant`s),
 * token-only.
 */
export declare const PostCardV2: React.ForwardRefExoticComponent<PostCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PostCardV2.d.ts.map