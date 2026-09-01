import * as React from 'react';
import type { CardBrand } from './CreditCardView';
import type { PaymentMethodRowProps } from './PaymentMethodRow';
export interface PaymentMethodRowV4Props extends PaymentMethodRowProps {
    /** The badge on the preferred method. Default `'Default'`. */
    defaultLabel?: string;
    /** The word for each network. Defaults to the card face's own table. */
    brandLabels?: Partial<Record<CardBrand, string>>;
}
/**
 * **V4 payment-method row** — the web twin of the native
 * `PaymentMethodRowV4`, same props as {@link PaymentMethodRow} plus
 * `defaultLabel` and `brandLabels`.
 *
 * ## Five changes
 *
 * 1. **`brand` is rendered.** It is accepted, documented as affecting the
 *    glyph, and destructured into a dead binding — so a Visa row and an Amex
 *    row were the same 💳 and the only way to tell a wallet's two cards apart
 *    was the last four. The network is printed, from the same table the card
 *    face uses.
 * 2. **The last four are masked by the module's own masker.** It built
 *    `` `•• ${last4}` `` by concatenation, two files away from
 *    `maskAccountNumber`, so a caller who passed the full number got the full
 *    number on screen.
 * 3. **"Default" stops being `success`.** A preferred payment method is an
 *    identity, not a healthy state, and the green badge sat in a module where
 *    green means income. It is the neutral identity chip.
 * 4. **It is a real `<button>` with a radio role and a name that carries the
 *    row.** The base put `role="radio"` and a hand-written Enter/Space handler
 *    on a `div` and named it `label` alone — so the masked number, the expiry
 *    and the "Default" badge were all pruned, and the selected ✓ reached
 *    nobody.
 * 5. **Press is a state layer, focus is `ring-ring`, and the row clears 44.**
 */
export declare const PaymentMethodRowV4: React.ForwardRefExoticComponent<PaymentMethodRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaymentMethodRowV4.d.ts.map