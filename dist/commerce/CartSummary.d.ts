import * as React from 'react';
import { MoneyFormatter } from './money';
export interface CartSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Sum of line totals, in integer cents. */
    subtotalCents: number;
    /** Shipping cost in cents. Rendered as "Free" when exactly 0. */
    shippingCents?: number;
    /** Tax in cents. */
    taxCents?: number;
    /** Discount in cents (shown negative). */
    discountCents?: number;
    /** Grand total in cents. */
    totalCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Checkout handler; renders a checkout button when provided. */
    onCheckout?: () => void;
    /** Checkout button label (default `Checkout`). */
    checkoutLabel?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
}
/**
 * Cart totals block: subtotal / shipping / tax / (discount) / total rows plus
 * an optional checkout button. Every amount is integer cents formatted through
 * {@link formatMoney}. Token-only.
 */
export declare const CartSummary: React.ForwardRefExoticComponent<CartSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartSummary.d.ts.map