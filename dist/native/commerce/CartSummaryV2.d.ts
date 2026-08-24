import * as React from 'react';
import type { CartSummaryProps } from './CartSummary';
/** Drop-in alternate of {@link CartSummaryProps} — identical prop contract. */
export type CartSummaryV2Props = CartSummaryProps;
/**
 * CartSummary — design variant **V2**: an **elevated receipt** with a
 * highlighted total band. Where V1 is a flat bordered list, V2 floats on a
 * drop-shadow, separates the running lines from the total with a **dashed
 * perforation**, and drops the grand total into a primary-tinted band so the
 * amount owed is unmistakable. Same props as {@link CartSummaryProps}.
 * Token-only; money is integer cents.
 */
export declare function CartSummaryV2({ subtotalCents, shippingCents, taxCents, discountCents, totalCents, currency, onCheckout, checkoutLabel, formatMoney: format, style, }: CartSummaryV2Props): React.ReactElement;
//# sourceMappingURL=CartSummaryV2.d.ts.map