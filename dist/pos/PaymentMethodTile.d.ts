import * as React from 'react';
import { type PaymentMethod } from './internal';
export type PaymentMethodTileVariant = 'grid' | 'list';
export interface PaymentMethodTileProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** Tender type — drives the glyph, label, and accent tone. */
    method: PaymentMethod;
    /** Override the default label (e.g. "Visa •4242"). */
    label?: string;
    /** Selected state — accent ring + fill (also announced to a11y). */
    selected?: boolean;
    /** Optional amount to charge with this tender, in integer **cents**. */
    amountCents?: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** `grid` (default) is a square tap target; `list` is a full-width row. */
    variant?: PaymentMethodTileVariant;
    /** Parity alias for `data-testid`. */
    testID?: string;
}
/**
 * A selectable tender tile for the payment screen — the DOM parity of the native
 * `PaymentMethodTile`. A real `<button>`: glyph + word (never color alone) with
 * an optional amount. Selection is carried in `aria-pressed` and drawn as an
 * accent ring + token-tinted fill. `grid` is a compact square; `list` is a
 * labelled full-width row. Money is integer **cents**. Token-only: accent from
 * the method tone.
 */
export declare const PaymentMethodTile: React.ForwardRefExoticComponent<PaymentMethodTileProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=PaymentMethodTile.d.ts.map