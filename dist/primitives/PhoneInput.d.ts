import * as React from 'react';
export interface PhoneInputProps {
    /** Controlled raw digits (no punctuation), e.g. `"5551234567"`. */
    value?: string;
    /** Fires with the raw digit string (mask is presentation-only). */
    onChangeText?: (digits: string) => void;
    /** Dialing prefix shown in the leading badge. */
    countryCode?: string;
    placeholder?: string;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    /** Accessible label for the input. */
    accessibilityLabel?: string;
    className?: string;
}
/**
 * Phone field — a token-bound `<input>` that displays a progressive
 * `(NNN) NNN-NNNN` mask while reporting only the raw digits through
 * `onChangeText`, with a leading country-code badge. Web parity of the native
 * `PhoneInput`; border flips to `danger` when `invalid`. No literal colors (kit
 * lint rule).
 */
export declare const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=PhoneInput.d.ts.map