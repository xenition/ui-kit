import * as React from 'react';
import type { SatisfactionRatingProps } from './SatisfactionRating';
/** Same public contract as {@link SatisfactionRating} — a drop-in alternate design. */
export type SatisfactionRatingV2Props = SatisfactionRatingProps;
/**
 * SatisfactionRating, redesigned (v2): a **big face/emoji picker**. Large tappable
 * tiles — expressive faces (or 👍/👎 for `thumbs`, ★ for `stars`) — where the
 * chosen one fills primary. A bolder CSAT prompt than v1. Same props, token-only.
 */
export declare const SatisfactionRatingV2: React.ForwardRefExoticComponent<SatisfactionRatingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SatisfactionRatingV2.d.ts.map