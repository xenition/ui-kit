import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from '../commerce';
export type CartBarVariant = 'primary' | 'accent';
export interface CartBarProps {
    /** Number of items in the cart; drives the count pill and empty state. */
    itemCount: number;
    /** Cart total in integer cents. */
    totalCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Primary action label (default `View cart`). */
    label?: string;
    /** Press handler for the bar / checkout action. */
    onPress?: () => void;
    /** Color variant (default `primary`). */
    variant?: CartBarVariant;
    /** Show a spinner-less "Updating…" busy state and block presses. */
    loading?: boolean;
    /** Copy shown when the cart is empty (default `Your cart is empty`). */
    emptyLabel?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    style?: StyleProp<ViewStyle>;
}
/**
 * A sticky bottom cart summary bar — item count, running total, and a primary
 * action. When `itemCount` is 0 it collapses to a muted, non-interactive empty
 * state; `loading` disables the press and shows a busy label. The bar uses the
 * `primary`/`accent` token pair for the filled action, so its text always meets
 * the contrast-guaranteed `on-*` slot. Token-only.
 */
export declare function CartBar({ itemCount, totalCents, currency, label, onPress, variant, loading, emptyLabel, formatMoney, style, }: CartBarProps): React.ReactElement;
//# sourceMappingURL=CartBar.d.ts.map