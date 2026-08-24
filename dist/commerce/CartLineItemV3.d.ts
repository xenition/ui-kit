import * as React from 'react';
import type { CartLineItemProps } from './CartLineItem';
/** Drop-in alternate of {@link CartLineItemProps} — identical prop contract. */
export type CartLineItemV3Props = CartLineItemProps;
/**
 * CartLineItem — design variant **V3**: a **compact, dense single row**. Where
 * the base stacks each field into its own column and V2 is an elevated card, V3
 * packs a small thumbnail, the title with an inline `·` variant, the stepper (or
 * a `×qty` chip), the line total, and a tiny remove `×` onto one tight line
 * separated only by a hairline underline — built for long, scannable carts.
 * Same props as {@link CartLineItemProps}. Token-only; money is integer cents.
 */
export declare const CartLineItemV3: React.ForwardRefExoticComponent<CartLineItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartLineItemV3.d.ts.map