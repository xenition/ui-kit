import * as React from 'react';
import type { OrderSummaryProps } from './OrderSummary';
/** Drop-in alternate of {@link OrderSummaryProps} — identical prop contract. */
export type OrderSummaryV3Props = OrderSummaryProps;
/**
 * OrderSummary — design variant **V3**: **minimal and total-first**. Where the
 * base and V2 lead with a header and itemized rows, V3 opens with the grand
 * total set large (status badge + order number tucked alongside as metadata),
 * then lists the line items and subtotal/shipping/tax beneath as muted fine
 * print. No box, no shadow. Same props as {@link OrderSummaryProps}. Read-only;
 * token-only; integer cents.
 */
export declare const OrderSummaryV3: React.ForwardRefExoticComponent<OrderSummaryProps & React.RefAttributes<HTMLDivElement>>;
export { OrderSummaryV3 as CheckoutSummaryV3 };
//# sourceMappingURL=OrderSummaryV3.d.ts.map