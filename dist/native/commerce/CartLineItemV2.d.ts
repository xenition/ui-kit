import * as React from 'react';
import type { CartLineItemProps } from './CartLineItem';
/** Drop-in alternate of {@link CartLineItemProps} — identical prop contract. */
export type CartLineItemV2Props = CartLineItemProps;
/**
 * CartLineItem — design variant **V2**: a self-contained **elevated card** with
 * a large, prominent thumbnail. Where V1 is a flat row with the stepper on the
 * right, V2 gives the line its own surface: a big cover on the left, the title +
 * variant and a **remove ×** in a header row, and a footer row that pairs the
 * inline {@link QuantityStepper} with a bold line total. Same props as
 * {@link CartLineItemProps}. Token-only; money is integer cents.
 */
export declare function CartLineItemV2({ title, variantTitle, quantity, unitPriceCents, currency, imageUrl, imageAlt, slug, onQuantityChange, onRemove, min, max, removeLabel, formatMoney: format, style, }: CartLineItemV2Props): React.ReactElement;
//# sourceMappingURL=CartLineItemV2.d.ts.map