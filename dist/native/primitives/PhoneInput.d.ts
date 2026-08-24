import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    accessibilityLabel?: string;
    containerStyle?: StyleProp<ViewStyle>;
}
/**
 * Phone field — a token-bound `TextInput` that displays a progressive
 * `(NNN) NNN-NNNN` mask while reporting only the raw digits through
 * `onChangeText`, with a leading country-code badge. Border flips to `danger`
 * when `invalid`; uses the `phone-pad` keyboard. No literal colors.
 */
export declare function PhoneInput({ value, onChangeText, countryCode, placeholder, invalid, disabled, accessibilityLabel, containerStyle, }: PhoneInputProps): React.ReactElement;
//# sourceMappingURL=PhoneInput.d.ts.map