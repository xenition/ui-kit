import * as React from 'react';
import type { CommentItemProps } from './CommentItem';
/** Drop-in for {@link CommentItem} — identical props, a different design. */
export type CommentItemV2Props = CommentItemProps;
/**
 * CommentItem, design V2 — a **chat bubble**: the avatar sits outside a filled,
 * speech-bubble surface (one squared bottom-left corner) that carries the author
 * + body; timestamp and like/reply actions live below the bubble. Threads via
 * `depth` indentation; `pinned` tints the bubble. Same props as
 * {@link CommentItem}; token-only, media-forward bubble idiom.
 */
export declare const CommentItemV2: React.ForwardRefExoticComponent<CommentItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CommentItemV2.d.ts.map