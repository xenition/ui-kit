import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ShippingOptionProps {
    /** Carrier / method name (e.g. "Standard", "Express"). */
    label: string;
    /**
     * Shipping cost in integer minor units (cents). `0` renders as "Free";
     * omit for methods without a price (e.g. local pickup).
     */
    priceCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Delivery estimate line (e.g. "3–5 business days"). */
    eta?: string;
    /** Optional leading glyph. */
    glyph?: string;
    /** Whether this option is currently selected (radio semantics). */
    selected?: boolean;
    /** Disables selection (e.g. unavailable to this address). */
    disabled?: boolean;
    /** Fires when the option is pressed. */
    onSelect?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A selectable shipping/delivery method row — method name, price ("Free" at
 * zero), an ETA line, and a radio indicator. Behaves as one option in a group:
 * `selected` drives an accent ring, a filled radio dot, and the a11y `selected`
 * state (never color alone); `disabled` dims it and blocks selection. Reuses
 * `Icon` and the shared `formatMoney`; token-only colors with a token-derived
 * alpha tint.
 */
export declare function ShippingOption({ label, priceCents, currency, eta, glyph, selected, disabled, onSelect, style, }: ShippingOptionProps): React.ReactElement;
//# sourceMappingURL=ShippingOption.d.ts.map