import * as React from 'react';
import type { CartLineItemProps } from './CartLineItem';
/** Drop-in alternate of {@link CartLineItemProps} — identical prop contract. */
export type CartLineItemV2Props = CartLineItemProps;
/**
 * CartLineItem — design variant **V2**: a self-contained **elevated card** with
 * a large, prominent thumbnail. Where the base is a flat row with the stepper on
 * the right, V2 gives the line its own floating surface: a big cover on the left,
 * the title + variant paired with a **remove ×** in a header row, and a footer
 * row that couples the inline {@link QuantityStepper} with a bold line total.
 * Same props as {@link CartLineItemProps}. Token-only; money is integer cents.
 */
export declare const CartLineItemV2: React.ForwardRefExoticComponent<CartLineItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartLineItemV2.d.ts.map