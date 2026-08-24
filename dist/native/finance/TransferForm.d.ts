import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** An account the money can move between. */
export interface TransferAccount {
    id: string;
    label: string;
}
/** The controlled value bag emitted by {@link TransferForm}. */
export interface TransferValues {
    fromAccountId: string;
    toAccountId: string;
    /** Amount in integer **cents**. */
    amountCents: number;
    note: string;
}
export interface TransferFormProps {
    /** Selectable accounts for the from/to pickers. */
    accounts: TransferAccount[];
    /** Currently selected source account id. */
    fromAccountId?: string;
    /** Currently selected destination account id. */
    toAccountId?: string;
    /** Amount in integer **cents** (converted to/from major units for the field). */
    amountCents?: number;
    /** Free-text note. */
    note?: string;
    /** Leading currency glyph for the amount field (default `$`). */
    currencySymbol?: string;
    /** Fires on every field change with the merged {@link TransferValues}. */
    onChange?: (values: TransferValues) => void;
    /** Fires on a valid submit with the merged {@link TransferValues}. */
    onSubmit?: (values: TransferValues) => void;
    /** Submit button label (default `Transfer`). */
    submitLabel?: string;
    /** Show the submit button in its loading state. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A controlled money-transfer form: from/to account {@link Select}s, a
 * {@link CurrencyInput} amount (major units on screen, integer **cents** in the
 * value bag — converted with a single round, no float drift), and an optional
 * note. Every edit emits the full {@link TransferValues} via `onChange`; submit
 * is blocked (and the button disabled) until both accounts differ and the
 * amount is positive. A `danger`-toned validation line appears when the same
 * account is picked twice. Token-bound throughout.
 */
export declare function TransferForm({ accounts, fromAccountId, toAccountId, amountCents, note, currencySymbol, onChange, onSubmit, submitLabel, loading, style, }: TransferFormProps): React.ReactElement;
//# sourceMappingURL=TransferForm.d.ts.map