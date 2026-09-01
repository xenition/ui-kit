import * as React from 'react';
import type { TransferFormProps } from './TransferForm';
export interface TransferFormV4Props extends TransferFormProps {
    /**
     * ISO 4217 code for the amount. Supplies the field's symbol and — more to
     * the point — travels with the emitted `amountCents`, which `currencySymbol`
     * never could.
     */
    currency?: string;
    /** The four field labels, which are also the controls' spoken names. */
    fieldLabels?: {
        from?: string;
        to?: string;
        amount?: string;
        note?: string;
    };
    /** Shown when the same account is picked twice. */
    errorLabel?: string;
}
/**
 * **V4 transfer form** — same props as {@link TransferForm} plus `currency`,
 * `fieldLabels` and `errorLabel`.
 *
 * ## Five changes
 *
 * 1. **It works when it is dropped in.** Every value prop is optional with a
 *    default, the component held no state, and `onChange` is optional — so a
 *    form used the way its own barrel documents never moved: the selects did
 *    not change, the amount field did not accept a number, and `canSubmit`,
 *    which needs `amountCents > 0`, could never become true. **The submit
 *    button was permanently disabled.** V4 holds the four values itself when
 *    there is no `onChange`; the controlled path is untouched.
 * 2. **Money stops round-tripping through a float.** See {@link toCents}.
 * 3. **`currency` replaces the loose `currencySymbol`**, so the emitted
 *    `amountCents` carries a currency the caller can reconcile. The symbol is
 *    derived from it; an explicit `currencySymbol` still wins.
 * 4. **An amount of exactly zero is not an empty field.** `value={amountCents
 *    === 0 ? null : …}` erased a typed `0` on the next render, so the field
 *    fought anyone entering an amount that begins with one.
 * 5. **The validation message is announced and attached.** It was a silent
 *    `Text` beside the control, so a reader on the "To" select heard the label
 *    and nothing about what was wrong with it. It is now the field's own
 *    `error`, which announces on arrival and reaches the control as a hint.
 */
export declare function TransferFormV4({ accounts, fromAccountId, toAccountId, amountCents, note, currency, currencySymbol, fieldLabels, errorLabel, onChange, onSubmit, submitLabel, loading, style, }: TransferFormV4Props): React.ReactElement;
//# sourceMappingURL=TransferFormV4.d.ts.map