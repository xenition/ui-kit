import * as React from 'react';
import type { ProductRecommendationProps } from './ProductRecommendation';
export interface ProductRecommendationV4Props extends ProductRecommendationProps {
    /** Copy on the button once the item is in the basket. Default `'Added'`. */
    addedLabel?: string;
    /** Copy when the item cannot be bought. Default `'Sold out'`. */
    soldOutLabel?: string;
    /** Label above the reason. Default `'Why this'`. */
    reasonLabel?: string;
}
/**
 * **V4 product recommendation** — same props as {@link ProductRecommendation}
 * plus `addedLabel`, `soldOutLabel` and `reasonLabel`.
 *
 * ## Four changes
 *
 * 1. **The rating carries its number** — `RatingV4 showValue`. Five glyphs is
 *    not a number, and this is a shelf where a shopper compares two products.
 * 2. **Sold out disables the button rather than only greying it.** The base
 *    dimmed the CTA and left it pressable.
 * 3. **The reason is labelled.** "Because you booked a keratin treatment" read
 *    as a second description; it is the whole point of a recommendation and
 *    now says what it is.
 * 4. **The thumbnail's ground is `colors.muted` at a fixed ratio**, so a shelf
 *    does not reflow as images arrive.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function ProductRecommendationV4({ name, priceCents, currency, brand, rating, imageUrl, reason, added, soldOut, formatMoney, addLabel, addedLabel, soldOutLabel, reasonLabel, onAdd, onPress, style, }: ProductRecommendationV4Props): React.ReactElement | null;
//# sourceMappingURL=ProductRecommendationV4.d.ts.map