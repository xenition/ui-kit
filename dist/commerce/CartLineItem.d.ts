import * as React from 'react';
import { MoneyFormatter } from './money';
export interface CartLineItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Product title. */
    title: string;
    /** Chosen variant label (e.g. "Large / Black"). */
    variantTitle?: string;
    /** Quantity in the cart. */
    quantity: number;
    /** Unit price in integer cents. */
    unitPriceCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Thumbnail image URL. When absent a seeded `GenerativeCover` is drawn. */
    imageUrl?: string;
    /** Alt text for the thumbnail (defaults to the title). */
    imageAlt?: string;
    /** Stable id seeding the cover fallback (defaults to the title). */
    slug?: string;
    /** Quantity-change handler. When absent the stepper is hidden (read-only). */
    onQuantityChange?: (quantity: number) => void;
    /** Remove handler; renders a remove button when provided. */
    onRemove?: () => void;
    /** Minimum quantity (default 1). */
    min?: number;
    /** Maximum quantity. */
    max?: number;
    /** Remove button accessible label (default `Remove {title}`). */
    removeLabel?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
}
/**
 * One line in a cart: thumbnail (image or seeded cover), title + variant, a
 * {@link QuantityStepper}, the line total (`unitPrice × quantity`), and a
 * remove control. Token-only. Money is integer cents throughout.
 */
export declare const CartLineItem: React.ForwardRefExoticComponent<CartLineItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartLineItem.d.ts.map