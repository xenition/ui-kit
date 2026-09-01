import * as React from 'react';
import type { ReviewCardProps } from './ReviewCard';
export interface ReviewCardV4Props extends ReviewCardProps {
    /** Copy on the verified chip. Default `'Verified visit'`. */
    verifiedLabel?: string;
    /** Label above the salon's reply. Default `'Reply from the salon'`. */
    replyLabel?: string;
}
/**
 * **V4 review card** — same props as {@link ReviewCard} plus `verifiedLabel`
 * and `replyLabel`.
 *
 * ## Four changes
 *
 * 1. **The rating carries its number**, and the whole header is announced as
 *    one string — the base left the author, the stars and the date as three
 *    loose fragments a reader walks through separately.
 * 2. **The reply is attributed.** An indented paragraph under a review does
 *    not say who wrote it; `replyLabel` does, which matters because the reply
 *    is the *business* answering a customer.
 * 3. **`verified` is a chip with a word**, not a bare checkmark glyph.
 * 4. **The reply's ground is a mixed tint on the card**, so it reads as a
 *    nested quote in both schemes rather than a grey box that vanishes on a
 *    dark page.
 *
 * **Renders nothing without an `author`** (§4.5).
 */
export declare function ReviewCardV4({ author, rating, text, date, service, avatarUrl, verified, variant, reply, verifiedLabel, replyLabel, style, }: ReviewCardV4Props): React.ReactElement | null;
//# sourceMappingURL=ReviewCardV4.d.ts.map