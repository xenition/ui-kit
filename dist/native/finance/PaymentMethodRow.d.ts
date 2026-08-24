import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { CardBrand } from './CreditCardView';
/** Payment instrument kind. */
export type PaymentMethodKind = 'card' | 'bank' | 'wallet';
export interface PaymentMethodRowProps {
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
    /** Fires on row press (selection). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A selectable payment-method row for a wallet / checkout picker: leading
 * glyph, label with a masked `•• last4` and expiry sub-line, an optional
 * "Default" badge, and a trailing selection check. `selected` draws a `primary`
 * ring; unselected rows use the `border` token. Becomes a radio-style button
 * when `onPress` is supplied. Token-bound throughout.
 */
export declare function PaymentMethodRow({ label, kind, brand: _brand, last4, expiry, icon, isDefault, selected, onPress, style, }: PaymentMethodRowProps): React.ReactElement;
//# sourceMappingURL=PaymentMethodRow.d.ts.map