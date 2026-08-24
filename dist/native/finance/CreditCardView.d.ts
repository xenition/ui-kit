import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Card network — drives only the corner label, never a literal brand color. */
export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'generic';
/** Which token ramp paints the gradient face. */
export type CreditCardVariant = 'primary' | 'accent' | 'dark';
export interface CreditCardViewProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A realistic card face: a two-stop gradient painted from **theme ramp tokens**
 * (never literal brand colors), the masked number in a monospace-tabular row,
 * and holder / expiry / network footer. The gradient uses
 * `expo-linear-gradient` when present and degrades to a solid token fill
 * otherwise. `variant` picks the ramp (`primary` / `accent` / `dark`-neutral);
 * the number is masked to the last four via {@link maskCardNumber}. Foreground
 * text uses the ramp's on-color token so it stays legible on the fill.
 */
export declare function CreditCardView({ holder, number, expiry, brand, variant, style, }: CreditCardViewProps): React.ReactElement;
//# sourceMappingURL=CreditCardView.d.ts.map