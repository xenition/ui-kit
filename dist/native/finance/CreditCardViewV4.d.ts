import * as React from 'react';
import type { CardBrand, CreditCardViewProps } from './CreditCardView';
export interface CreditCardViewV4Props extends CreditCardViewProps {
    /** Caption over the holder's name. Default `'Card holder'`. */
    holderLabel?: string;
    /** Caption over the expiry. Default `'Expires'`. */
    expiryLabel?: string;
    /** Override the network wording. Defaults to `VISA` / `Mastercard` / `AMEX` / `CARD`. */
    brandLabels?: Partial<Record<CardBrand, string>>;
}
/**
 * **V4 credit card face** — same props as {@link CreditCardView} plus
 * `holderLabel`, `expiryLabel` and `brandLabels`.
 *
 * ## Five changes
 *
 * 1. **The face is legible in every scheme.** `variant="dark"` painted itself
 *    from `tokens.ramps.neutral` — which the theme output copies to native
 *    **without** inverting — and inked it `colors.onSurface`, which *does*
 *    flip. So the fill stayed dark in both schemes while the ink went
 *    near-black in light: the number, the holder and the expiry sat at roughly
 *    1:1 on a light phone. Every face is now a token **pair** that carries a
 *    promise — `primary`/`onPrimary`, `accent`/`onAccent`, and for `dark` the
 *    inverse pair `onSurface`/`surface`, whose contrast is the same ratio read
 *    the other way round and which therefore flips *together*, staying
 *    opposite instead of converging. The second gradient stop is then
 *    re-measured with `ensureContrast`, so the promise is about the colour the
 *    card actually painted rather than about the token it started from.
 * 2. **The card is no longer `role="img"`.** That pruned the number, the
 *    holder and the expiry from the accessibility tree — the fallback for a
 *    face nobody could read was closed at the same time as the face. The card
 *    is one named group whose name *contains* what it shows.
 * 3. **The chip stops being `warn`.** A status colour spent on a decorative
 *    contact plate; it is now the face's own ink at a mix, and hidden from the
 *    reader, which is what a decoration is.
 * 4. **The caption hierarchy is real.** `opacity: 0.8` on an ink that equalled
 *    the value's own colour is a hierarchy of one step invented by hand, and
 *    it eats the contrast the pair guaranteed. Size and weight carry it
 *    instead, at full ink.
 * 5. **The face's proportions come off the scale** — `minHeight: 190`,
 *    `width: 40`, `height: 28` were three literals — and the number is
 *    tabular.
 *
 * **Renders nothing without a card number** (§4.5).
 */
export declare function CreditCardViewV4({ holder, number, expiry, brand, variant, holderLabel, expiryLabel, brandLabels, appearance, style, }: CreditCardViewV4Props): React.ReactElement | null;
//# sourceMappingURL=CreditCardViewV4.d.ts.map