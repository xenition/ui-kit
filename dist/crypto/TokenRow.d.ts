import * as React from 'react';
import { type IconColor } from '../primitives/Icon';
export interface TokenRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Token ticker (e.g. `ETH`). */
    symbol: string;
    /** Token long name (e.g. `Ethereum`). */
    name?: string;
    /** Held quantity in token units. */
    amount: number;
    /** Fraction digits for the held quantity (default `4`). */
    decimals?: number;
    /** Fiat value of the holding, in integer **cents** (funnelled through MoneyAmount). */
    valueCents?: number;
    /** ISO 4217 currency for the fiat value (default `USD`). */
    currency?: string;
    /** 24h price change as a percentage (gain = `success`, loss = `danger`). */
    changePct?: number;
    /** Leading glyph/emoji for the token disc. */
    icon?: string;
    /** Accent slot for the token disc (default `primary`). */
    iconColor?: IconColor;
    /** Fires on row click — makes the row a keyboard-operable button. */
    onClick?: () => void;
}
/**
 * One holding in a token list: a tinted token disc, symbol/name, the held
 * quantity (fixed-precision — no float drift), and a right-aligned fiat value
 * over a token-toned 24h change (gain = `success`, loss = `danger`, each with a
 * ▲/▼ glyph so it is not color-only). Becomes a keyboard-operable button when
 * `onClick` is set. Web parity of the native `TokenRow`.
 */
export declare const TokenRow: React.ForwardRefExoticComponent<TokenRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TokenRow.d.ts.map