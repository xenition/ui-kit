import * as React from 'react';
import type { MoneyFormatter } from '../commerce';
export type CartBarVariant = 'primary' | 'accent';
export interface CartBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Number of items in the cart; drives the count pill and empty state. */
    itemCount: number;
    /** Cart total in integer cents. */
    totalCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Primary action label (default `View cart`). */
    label?: string;
    /** Activation handler for the bar / checkout action (native `onPress`). */
    onClick?: () => void;
    /** Color variant (default `primary`). */
    variant?: CartBarVariant;
    /** Show an "Updating…" busy state and block activation. */
    loading?: boolean;
    /** Copy shown when the cart is empty (default `Your cart is empty`). */
    emptyLabel?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
}
/**
 * A sticky bottom cart summary bar — item count, running total, and a primary
 * action. When `itemCount` is 0 it collapses to a muted, non-interactive empty
 * state; `loading` disables activation and shows a busy label. The filled bar
 * uses the `primary`/`accent` token pair so its text always meets the
 * contrast-guaranteed `on-*` slot. Web parity of the native `CartBar`. When
 * interactive the root is a keyboard-operable `role="button"`. Token-only.
 */
export declare const CartBar: React.ForwardRefExoticComponent<CartBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartBar.d.ts.map