import * as React from 'react';
import type { CardBrand, CreditCardViewProps } from './CreditCardView';
export interface CreditCardViewV4Props extends CreditCardViewProps {
    /** Caption over the holder's name. Default `'Card holder'`. */
    holderLabel?: string;
    /** Caption over the expiry. Default `'Expires'`. */
    expiryLabel?: string;
    /** The word for each network. Defaults to {@link CARD_BRAND_LABEL}. */
    brandLabels?: Partial<Record<CardBrand, string>>;
}
/**
 * The network's word — the base's own table, exported so the payment-method
 * row spells a network the same way the card face does. Nothing in this module
 * had a shared home for it, and `PaymentMethodRow` consequently printed no
 * network at all.
 */
export declare const CARD_BRAND_LABEL: Record<CardBrand, string>;
/**
 * **V4 credit-card face** — the web twin of the native `CreditCardViewV4`,
 * same props as {@link CreditCardView} plus `holderLabel`, `expiryLabel` and
 * `brandLabels`.
 *
 * ## Four changes
 *
 * 1. **The face is legible in both schemes** — see {@link FACE}.
 * 2. **The card is not a picture.** `role="img"` is children-presentational,
 *    so it pruned the number, the holder and the expiry from the accessibility
 *    tree and announced only "VISA card ending 4242" — the *fallback* for an
 *    unreadable face was closed at the same time as the face became
 *    unreadable. It is a named group now, and its content is read.
 * 3. **The chip stops being `warn`.** A status colour was spent on a piece of
 *    decoration, next to money whose colours mean something. It is drawn from
 *    the face's own ink instead, so it works on all three variants and means
 *    nothing anywhere.
 * 4. **The caption hierarchy is type, not `opacity: 0.8`.** The captions were
 *    the *same colour* as the values under them, dimmed by an invented alpha —
 *    which is the one gesture M3 reserves for disabled content. They are a
 *    step smaller and a weight lighter, and both sit at full strength.
 */
export declare const CreditCardViewV4: React.ForwardRefExoticComponent<CreditCardViewV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CreditCardViewV4.d.ts.map