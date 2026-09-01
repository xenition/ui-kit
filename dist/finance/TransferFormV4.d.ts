import * as React from 'react';
import type { TransferFormProps } from './TransferForm';
export interface TransferFormV4Props extends TransferFormProps {
    /**
     * ISO 4217 code for the amount, replacing the loose `currencySymbol` — so
     * the `amountCents` the form emits carries a currency the caller can
     * reconcile rather than a glyph nobody can parse back. `currencySymbol`
     * still wins when it is given.
     */
    currency?: string;
    /** The four visible field labels. Defaults `'From'`, `'To'`, `'Amount'`, `'Note'`. */
    fieldLabels?: {
        from?: string;
        to?: string;
        amount?: string;
        note?: string;
    };
    /** The validation line. Default `'Choose two different accounts.'`. */
    errorLabel?: string;
}
/**
 * **V4 transfer form** — the web twin of the native `TransferFormV4`, same
 * props as {@link TransferForm} plus `currency`, `fieldLabels` and
 * `errorLabel`.
 *
 * ## Five changes
 *
 * 1. **It works when it is dropped in.** Every value prop is optional with a
 *    default, the component held no state, and `onChange` was optional — so
 *    used the way its own barrel documents, the selects never moved, the
 *    amount field never accepted a digit, and `canSubmit`, which requires
 *    `amountCents > 0`, could never become true. The submit button was
 *    **permanently disabled**. It now holds the four values itself when
 *    `onChange` is absent; the controlled path is unchanged.
 * 2. **Money stops round-tripping through a float** — see
 *    {@link centsFromText}.
 * 3. **A typed `0` is not an empty field.** `value={amountCents === 0 ? null
 *    : amountCents / 100}` fed the zero straight back as "cleared", so typing
 *    the `0` of `0.50` wiped the box under the user's fingers and the amount
 *    could not be entered at all. The text the user typed is what the field
 *    shows.
 * 4. **`currency` replaces the loose `currencySymbol`** — see the prop.
 * 5. **The validation line reaches the control.** It was a `<p role="alert">`
 *    floating between two fields, related to the invalid select by proximity
 *    only. `FieldV4` gives it an id, points the select's `aria-describedby` at
 *    it, marks the select invalid and leads it with a glyph, so the state has
 *    a shape as well as a hue.
 */
export declare const TransferFormV4: React.ForwardRefExoticComponent<TransferFormV4Props & React.RefAttributes<HTMLFormElement>>;
//# sourceMappingURL=TransferFormV4.d.ts.map