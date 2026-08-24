import * as React from 'react';
/** Card network — drives only the corner label, never a literal brand color. */
export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'generic';
/** Which token ramp paints the gradient face. */
export type CreditCardVariant = 'primary' | 'accent' | 'dark';
export interface CreditCardViewProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Cardholder name (rendered upper-cased). */
    holder: string;
    /** Full or partial card number; displayed masked to the last four. */
    number: string;
    /** Expiry string, already formatted (e.g. `"08/28"`). */
    expiry?: string;
    /** Card network label (default `generic`). */
    brand?: CardBrand;
    /** Gradient ramp for the face (default `primary`). */
    variant?: CreditCardVariant;
}
/**
 * A realistic card face: a token-gradient background (`--xen-*` ramp vars, no
 * literal hex), the masked number in a tabular row, and a holder / expiry /
 * network footer. `variant` picks the ramp (`primary` / `accent` / `dark`); the
 * number is masked to the last four via {@link maskCardNumber}. Foreground text
 * uses the ramp's on-color token so it stays legible on the fill. Web parity of
 * the native `CreditCardView`.
 */
export declare const CreditCardView: React.ForwardRefExoticComponent<CreditCardViewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CreditCardView.d.ts.map