import * as React from 'react';
import type { SwapFormProps } from './SwapForm';
export interface SwapFormV4Props extends SwapFormProps {
    /**
     * How many fraction digits the pay field accepts. Default `18` — the ERC-20
     * maximum, so the field never silently truncates a legal amount.
     */
    maxDecimals?: number;
    /** Name for the direction control. Default `'Flip direction'`. */
    flipLabel?: string;
    /** Announced while a quote is in flight. Default `'Fetching quote'`. */
    loadingLabel?: string;
}
/**
 * **V4 swap form** — the web twin of the native `SwapFormV4`, same props as
 * {@link SwapForm} plus `maxDecimals`, `flipLabel` and `loadingLabel`.
 *
 * ## Seven changes
 *
 * 1. **A decimal amount can finally be typed.** The field was fully controlled
 *    off a *number*: `value={String(fromAmount)}` with
 *    `onChange={(e) => emit(parseAmount(e.target.value))}`. `parseFloat('1.')`
 *    is `1`, so the instant the user typed the decimal point the parent was
 *    handed `1`, the field re-rendered as `"1"`, and the point vanished from
 *    under the caret; a leading `0` collapsed to `''` and disappeared outright.
 *    Only whole token units could ever be entered — in the one component whose
 *    submit hands a value to a chain transaction. Someone swapping 0.25 typed
 *    `0`, saw nothing, typed `.`, saw nothing, typed `2`, and submitted **2**.
 *    The field now binds to `useAmountField`, which holds the draft as text and
 *    emits the parsed number.
 * 2. **The pay field has a visible focus indicator.** The base set `border-0`
 *    *and* `focus:ring-0` on the form's only editable control, so a keyboard
 *    user tabbing into the amount got no indication of where they were.
 * 3. **Both money figures are tabular.** Only the receive side was, so the two
 *    large stacked numbers did not line up digit for digit.
 * 4. **The receive amount is not replaced by its own label.** `aria-label`
 *    sat on the very element whose text *was* the quote, so a reader heard
 *    "Receive amount" and never the number.
 * 5. **The flip control clears 44** — it was a 32px disc — and its disabled
 *    state is M3's 0.38, not a guessed 0.5.
 * 6. **`loading` says so.** It disabled the button and nothing else, so a
 *    quote in flight was indistinguishable from an invalid form.
 * 7. **The same-token hint is not `role="alert"`.** It is present from first
 *    render rather than arriving as an urgent update, and interrupting a
 *    reader with a condition that was already true teaches them to ignore the
 *    channel.
 */
export declare const SwapFormV4: React.ForwardRefExoticComponent<SwapFormV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SwapFormV4.d.ts.map