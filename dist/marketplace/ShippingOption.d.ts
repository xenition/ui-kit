import * as React from 'react';
export interface ShippingOptionProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect' | 'onClick'> {
    /** Carrier / method name (e.g. "Standard", "Express"). */
    label: string;
    /**
     * Shipping cost in integer minor units (cents). `0` renders as "Free"; omit
     * for methods without a price (e.g. local pickup).
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
    /** Fires when the option is chosen. */
    onSelect?: () => void;
}
/**
 * A selectable shipping/delivery method row — method name, price ("Free" at
 * zero), an ETA line, and a radio indicator. Rendered as a real `<button
 * role="radio">`: `selected` drives an accent ring, a filled radio dot, and
 * `aria-checked` (never color alone); `disabled` dims it and blocks selection.
 * Reuses `Icon` and the shared `formatMoney`; token-only colors.
 */
export declare const ShippingOption: React.ForwardRefExoticComponent<ShippingOptionProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ShippingOption.d.ts.map