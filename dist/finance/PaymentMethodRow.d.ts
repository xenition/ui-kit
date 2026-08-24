import * as React from 'react';
import type { CardBrand } from './CreditCardView';
/** Payment instrument kind. */
export type PaymentMethodKind = 'card' | 'bank' | 'wallet';
export interface PaymentMethodRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Primary label (e.g. "Visa" or "Chase Checking"). */
    label: string;
    /** Instrument kind — selects the default glyph (default `card`). */
    kind?: PaymentMethodKind;
    /** Card network, when `kind === 'card'` (affects the glyph only). */
    brand?: CardBrand;
    /** Last four digits, shown as `•• 4242`. */
    last4?: string;
    /** Expiry caption (e.g. `"08/28"`). */
    expiry?: string;
    /** Override the leading glyph. */
    icon?: string;
    /** Marks this method as the default (shows a badge). */
    isDefault?: boolean;
    /** Selected state — draws the primary ring + check (for a picker list). */
    selected?: boolean;
    /** Fires on row click (selection) — makes the row a keyboard-operable radio. */
    onClick?: () => void;
}
/**
 * A selectable payment-method row for a wallet / checkout picker: leading glyph,
 * label with a masked `•• last4` and expiry sub-line, an optional "Default"
 * badge, and a trailing selection check. `selected` draws a `border-primary`
 * ring; unselected rows use the `border` token. Becomes a radio-style button
 * when `onClick` is supplied. Token-bound throughout. Web parity of the native
 * `PaymentMethodRow`.
 */
export declare const PaymentMethodRow: React.ForwardRefExoticComponent<PaymentMethodRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaymentMethodRow.d.ts.map