import * as React from 'react';
import { OrderStatus } from './StatusBadge';
import { MoneyFormatter } from './money';
export interface OrderLine {
    /** Product title. */
    title: string;
    /** Chosen variant label. */
    variantTitle?: string;
    /** Quantity ordered. */
    quantity: number;
    /** Unit price in integer cents. */
    unitPriceCents: number;
}
export interface OrderSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Line items in the order. */
    items: OrderLine[];
    /** Sum of line totals, in cents. */
    subtotalCents: number;
    /** Shipping cost in cents ("Free" when 0). */
    shippingCents?: number;
    /** Tax in cents. */
    taxCents?: number;
    /** Grand total in cents. */
    totalCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Order lifecycle status → renders a `StatusBadge`. */
    status?: OrderStatus;
    /** Order reference number/id shown in the header. */
    orderNumber?: string;
    /** Heading text (default `Order summary`). */
    title?: React.ReactNode;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
}
/**
 * Read-only recap of a placed (or about-to-be-placed) order: line items with
 * per-line totals, the subtotal/shipping/tax/total rows, and an optional
 * status badge. No interactivity — this is the checkout/confirmation view.
 * Token-only; money is integer cents throughout.
 */
export declare const OrderSummary: React.ForwardRefExoticComponent<OrderSummaryProps & React.RefAttributes<HTMLDivElement>>;
export { OrderSummary as CheckoutSummary };
//# sourceMappingURL=OrderSummary.d.ts.map