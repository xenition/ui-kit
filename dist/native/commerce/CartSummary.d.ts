import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './money';
export interface CartSummaryProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * Cart totals block — the native mirror of the web `CartSummary`: subtotal /
 * shipping / tax / (discount) / total rows plus an optional checkout button.
 * Every amount is integer cents formatted through {@link formatMoney}. Token-only.
 */
export declare function CartSummary({ subtotalCents, shippingCents, taxCents, discountCents, totalCents, currency, onCheckout, checkoutLabel, formatMoney: format, style, }: CartSummaryProps): React.ReactElement;
//# sourceMappingURL=CartSummary.d.ts.map