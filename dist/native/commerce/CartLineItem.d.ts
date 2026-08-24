import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './money';
export interface CartLineItemProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * One line in a cart — the native mirror of the web `CartLineItem`: thumbnail
 * (image or seeded cover), title + variant, a {@link QuantityStepper}, the line
 * total (`unitPrice × quantity`), and a remove control. Token-only; money is
 * integer cents throughout.
 */
export declare function CartLineItem({ title, variantTitle, quantity, unitPriceCents, currency, imageUrl, imageAlt, slug, onQuantityChange, onRemove, min, max, removeLabel, formatMoney: format, style, }: CartLineItemProps): React.ReactElement;
//# sourceMappingURL=CartLineItem.d.ts.map