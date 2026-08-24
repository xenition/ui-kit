import * as React from 'react';
export interface CurrencyInputProps {
    /** Controlled numeric amount (major units, e.g. dollars). */
    value?: number | null;
    /** Fires with the parsed number (or `null` when the field is cleared). */
    onChange?: (value: number | null) => void;
    /** Leading currency glyph shown in the badge. */
    symbol?: string;
    /** Fractional digits to allow while typing (default 2). */
    precision?: number;
    placeholder?: string;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    /** Accessible label for the input. */
    accessibilityLabel?: string;
    className?: string;
}
/**
 * Currency field — a token-bound `<input>` with a leading currency badge that
 * accepts digits and a single decimal point (capped to `precision`) and reports
 * the parsed `number` (or `null`) via `onChange`. Web parity of the native
 * `CurrencyInput`; border flips to `danger` when `invalid`. No literal colors
 * (kit lint rule).
 */
export declare function CurrencyInput({ value, onChange, symbol, precision, placeholder, invalid, disabled, accessibilityLabel, className, }: CurrencyInputProps): React.ReactElement;
//# sourceMappingURL=CurrencyInput.d.ts.map