import * as React from 'react';
import type { ReviewCardProps } from './ReviewCard';
export interface ReviewCardV4Props extends ReviewCardProps {
    /** Copy on the verified chip. Default `'Verified visit'`. */
    verifiedLabel?: string;
    /** Label above the salon's reply. Default `'Reply from the salon'`. */
    replyLabel?: string;
}
/**
 * **V4 review card** — the web twin of the native `ReviewCardV4`, same props
 * as {@link ReviewCard} plus `verifiedLabel` and `replyLabel`.
 *
 * ## Four changes
 *
 * 1. **The rating carries its number**, and the card is one announced object
 *    rather than three loose fragments.
 * 2. **The reply is attributed.** An indented paragraph under a review does
 *    not say who wrote it, and the reply is the *business* answering a
 *    customer.
 * 3. **`verified` is a chip with a word**, not a bare checkmark glyph.
 * 4. **The review is a real `<blockquote>` with a `<cite>`**, which is what a
 *    quoted opinion with an attributed author actually is.
 *
 * **Renders nothing without an `author`** (§4.5).
 */
export declare const ReviewCardV4: React.ForwardRefExoticComponent<ReviewCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReviewCardV4.d.ts.map