import * as React from 'react';
export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
    /** Controlled secret text. */
    value?: string;
    /** Fires with the new secret text. */
    onChangeText?: (text: string) => void;
    /** Optional field label rendered above the input. */
    label?: string;
    placeholder?: string;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    /** Accessible label for the input. */
    accessibilityLabel?: string;
    /** Wrapper className override. */
    className?: string;
}
/**
 * Password field — a token-bound `<input type="password">` with a show/hide
 * toggle that flips the masking. Web parity of the native `PasswordInput`;
 * `invalid` swaps the border to `danger`. No literal colors (kit lint rule).
 */
export declare const PasswordInput: React.ForwardRefExoticComponent<PasswordInputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=PasswordInput.d.ts.map