import * as React from 'react';
/** A token that can sit on either side of the swap. */
export interface SwapToken {
    symbol: string;
    /** Fraction digits used when displaying this token's amount (default 4). */
    decimals?: number;
}
/** The controlled value bag emitted by {@link SwapForm}. */
export interface SwapValues {
    fromSymbol: string;
    toSymbol: string;
    /** Amount of the `from` token, parsed from the input (float). */
    fromAmount: number;
}
export interface SwapFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSubmit'> {
    /** The token being sold. */
    from: SwapToken;
    /** The token being bought. */
    to: SwapToken;
    /** Controlled `from` amount (major token units). */
    fromAmount?: number;
    /** Price: how many `to` per 1 `from`. `toAmount = fromAmount * rate`. */
    rate?: number;
    /** Fires on every amount edit with the merged {@link SwapValues}. */
    onChange?: (values: SwapValues) => void;
    /** Fires when the swap-direction control is pressed. */
    onFlip?: () => void;
    /** Fires on a valid submit with the merged {@link SwapValues}. */
    onSubmit?: (values: SwapValues) => void;
    /** Submit label (default `Swap`). */
    submitLabel?: string;
    /** Submit loading state (disables the submit button — web Button has no spinner). */
    loading?: boolean;
}
/**
 * A controlled token-swap panel: an editable `from` amount, a flip control, a
 * derived (read-only) `to` amount computed as `fromAmount * rate` with stable
 * fixed-precision formatting (no float drift on screen), and the effective rate
 * line. Submit is blocked (button disabled) until the amount is positive and
 * the two tokens differ. Every edit emits the full {@link SwapValues}. Web
 * parity of the native `SwapForm`.
 */
export declare const SwapForm: React.ForwardRefExoticComponent<SwapFormProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SwapForm.d.ts.map