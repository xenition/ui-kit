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
 * **V4 product recommendation** — the web twin of the native
 * `ProductRecommendationV4`, same props as {@link ProductRecommendation} plus
 * `addedLabel`, `soldOutLabel` and `reasonLabel`.
 *
 * ## Four changes
 *
 * 1. **The rating carries its number** — this is a shelf where a shopper
 *    compares two products, and five glyphs is not a number.
 * 2. **Sold out `disabled`s the button** rather than only greying a live one.
 * 3. **The reason is labelled.** "Because you booked a keratin treatment" read
 *    as a second description; it is the whole point of a recommendation.
 * 4. **The thumbnail has a fixed ratio and a `muted` ground**, so a shelf does
 *    not reflow as images arrive.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare const ProductRecommendationV4: React.ForwardRefExoticComponent<ProductRecommendationV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProductRecommendationV4.d.ts.map