import * as React from 'react';
import type { CardBrand } from './CreditCardView';
import type { PaymentMethodRowProps } from './PaymentMethodRow';
export interface PaymentMethodRowV4Props extends PaymentMethodRowProps {
    /** Wording for the "this is the default method" chip. Default `'Default'`. */
    defaultLabel?: string;
    /** Override the network wording. Defaults to `Visa` / `Mastercard` / `Amex` / `Card`. */
    brandLabels?: Partial<Record<CardBrand, string>>;
}
/**
 * **V4 payment method row** — same props as {@link PaymentMethodRow} plus
 * `defaultLabel` and `brandLabels`.
 *
 * ## Five changes
 *
 * 1. **`brand` is rendered.** It was accepted, documented as driving the
 *    glyph, and destructured into `_brand` — read by nothing — so a Visa row
 *    and an Amex row were the same 💳 and the only way to tell them apart was
 *    whatever the caller happened to put in `label`. The network is now a word
 *    on the supporting line and in the row's spoken name.
 * 2. **It masks with the module's own masker.** `` `•• ${last4}` `` was string
 *    concatenation two files away from `maskAccountNumber`, which also has an
 *    answer for a `last4` that is not four digits — the concatenation printed
 *    `•• 42` for one.
 * 3. **The radio reports `checked`, not `selected`.** A radio's state *is*
 *    checkedness; `selected` on `accessibilityRole="radio"` announces the
 *    wrong thing, and the check glyph beside it was the only other cue.
 * 4. **"Default" stops being `success`.** Being the default payment method is
 *    identity, not health, and the green sat beside amounts whose green means
 *    income.
 * 5. **Press is a state layer** rather than `opacity: 0.85`, the row clears
 *    44, and the supporting line takes `mutedText`.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
export declare function PaymentMethodRowV4({ label, kind, brand, last4, expiry, icon, isDefault, selected, defaultLabel, brandLabels, onPress, appearance, style, }: PaymentMethodRowV4Props): React.ReactElement | null;
//# sourceMappingURL=PaymentMethodRowV4.d.ts.map