import * as React from 'react';
import { type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';
export interface PasswordInputProps extends Omit<TextInputProps, 'style' | 'editable' | 'secureTextEntry' | 'value' | 'onChangeText'> {
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
    accessibilityLabel?: string;
    /** Wrapper style override. */
    containerStyle?: StyleProp<ViewStyle>;
}
/**
 * Password field — a token-bound `TextInput` with `secureTextEntry` and a
 * show/hide toggle that flips the masking. Background, border, radius, and text
 * come from `useXenitionTheme()`; `invalid` swaps the border to `danger` and the
 * placeholder uses `muted`. No literal colors.
 */
export declare function PasswordInput({ value, onChangeText, label, placeholder, invalid, disabled, accessibilityLabel, containerStyle, ...rest }: PasswordInputProps): React.ReactElement;
//# sourceMappingURL=PasswordInput.d.ts.map