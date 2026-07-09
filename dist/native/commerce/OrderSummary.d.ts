import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type OrderStatus } from './StatusBadge';
import { type MoneyFormatter } from './money';
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
export interface OrderSummaryProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * Read-only recap of a placed (or about-to-be-placed) order — the native
 * mirror of the web `OrderSummary` / `CheckoutSummary`: line items with
 * per-line totals, the subtotal/shipping/tax/total rows, and an optional status
 * badge. No interactivity. Token-only; money is integer cents throughout.
 */
export declare function OrderSummary({ items, subtotalCents, shippingCents, taxCents, totalCents, currency, status, orderNumber, title, formatMoney: format, style, }: OrderSummaryProps): React.ReactElement;
export { OrderSummary as CheckoutSummary };
//# sourceMappingURL=OrderSummary.d.ts.map