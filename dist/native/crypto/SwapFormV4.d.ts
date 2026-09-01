import * as React from 'react';
import type { SwapFormProps } from './SwapForm';
export interface SwapFormV4Props extends SwapFormProps {
    /** Fraction digits the pay field will accept. Default `18` — one wei. */
    maxDecimals?: number;
    /** Name of the swap-direction control. Default `'Flip direction'`. */
    flipLabel?: string;
    /** Shown and announced while a quote is in flight. Default `'Fetching quote'`. */
    loadingLabel?: string;
}
/**
 * **V4 swap panel** — same props as {@link SwapForm} plus `maxDecimals`,
 * `flipLabel` and `loadingLabel`.
 *
 * ## Seven changes
 *
 * 1. **A decimal amount can be typed.** This is the whole reason the component
 *    has a V4. The base field was fully controlled off a **number** —
 *    `value={fromAmount === 0 ? '' : String(fromAmount)}` with
 *    `onChangeText={(t) => emit(parseAmount(t))}` — and `parseFloat('1.')` is
 *    `1`, so the instant the user typed the decimal point the parent was
 *    handed `1`, the field re-rendered as `"1"`, and the point vanished from
 *    under the caret. A leading `0` collapsed to `''` and disappeared
 *    outright. Only whole token units could ever be entered, in the one
 *    component in the kit whose submit hands a value to a chain transaction: a
 *    user swapping 0.25 typed `0`, saw nothing, typed `.`, saw nothing, typed
 *    `2`, and submitted **2**. `useAmountField` holds the draft as text, emits
 *    the parsed number, and only overwrites the draft when the parent's value
 *    genuinely disagrees with what is on screen.
 * 2. **The pay field shows focus.** It is the form's only editable control and
 *    the base gave it no focus treatment at all; the panel now takes the
 *    shared field ring and halo while the caret is in it.
 * 3. **Both amounts are tabular.** The receive side was and the pay side was
 *    not, so the two large stacked figures did not line up digit for digit.
 * 4. **The quote is not replaced by its own label.** `accessibilityLabel`
 *    sat on the very `Text` whose content *was* the quote, so a reader heard
 *    "Receive amount" and never the number. The panel is one named element
 *    that contains it.
 * 5. **The flip control is a target.** 32pt became {@link minTap}, and it now
 *    has a disabled state instead of looking identical when there is no
 *    `onFlip` to fire.
 * 6. **`loading` blocks submit** and says so, rather than only spinning.
 * 7. **The same-token hint is announced.** It is a condition present from the
 *    first render, so it is plain text rather than an urgent interruption —
 *    but it is text a reader reaches, which on this twin it was not.
 */
export declare function SwapFormV4({ from, to, fromAmount, rate, maxDecimals, flipLabel, loadingLabel, onChange, onFlip, onSubmit, submitLabel, loading, style, }: SwapFormV4Props): React.ReactElement;
//# sourceMappingURL=SwapFormV4.d.ts.map