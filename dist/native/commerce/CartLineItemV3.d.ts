import * as React from 'react';
import type { CartLineItemProps } from './CartLineItem';
/** Drop-in alternate of {@link CartLineItemProps} — identical prop contract. */
export type CartLineItemV3Props = CartLineItemProps;
/**
 * CartLineItem — design variant **V3**: a **compact, dense single line**. Where
 * V1 gives each field its own stacked column and V2 is a card, V3 packs a small
 * thumbnail, the title with an inline · variant, the stepper (or a `×qty` chip),
 * and the line total onto one tight row separated only by a hairline underline.
 * Built for long, scannable carts. Same props as {@link CartLineItemProps}.
 * Token-only; money is integer cents.
 */
export declare function CartLineItemV3({ title, variantTitle, quantity, unitPriceCents, currency, imageUrl, imageAlt, slug, onQuantityChange, onRemove, min, max, removeLabel, formatMoney: format, style, }: CartLineItemV3Props): React.ReactElement;
//# sourceMappingURL=CartLineItemV3.d.ts.map