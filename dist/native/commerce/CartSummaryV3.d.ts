import * as React from 'react';
import type { CartSummaryProps } from './CartSummary';
/** Drop-in alternate of {@link CartSummaryProps} — identical prop contract. */
export type CartSummaryV3Props = CartSummaryProps;
/**
 * CartSummary — design variant **V3**: **minimal and total-first**. Where V1/V2
 * build up subtotal → … → total, V3 leads with the grand total set large under
 * a small caption, then lists the muted breakdown lines beneath it as fine
 * print. No box, no shadow — just type hierarchy and a full-width checkout.
 * Same props as {@link CartSummaryProps}. Token-only; money is integer cents.
 */
export declare function CartSummaryV3({ subtotalCents, shippingCents, taxCents, discountCents, totalCents, currency, onCheckout, checkoutLabel, formatMoney: format, style, }: CartSummaryV3Props): React.ReactElement;
//# sourceMappingURL=CartSummaryV3.d.ts.map