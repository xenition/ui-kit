import * as React from 'react';
import { type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';
export interface SearchInputProps extends Omit<TextInputProps, 'style' | 'editable' | 'value' | 'onChangeText'> {
    /** Controlled query text. */
    value?: string;
    /** Fires with the new query text. */
    onChangeText?: (text: string) => void;
    /** Fires when the clear (✕) affordance is pressed. */
    onClear?: () => void;
    placeholder?: string;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    accessibilityLabel?: string;
    /** Wrapper style override. */
    containerStyle?: StyleProp<ViewStyle>;
}
/**
 * Search field — a token-bound `TextInput` with a leading search glyph and a
 * trailing clear (✕) button that appears once there is text. Colors, border,
 * radius, and spacing all come from `useXenitionTheme()`; `invalid` swaps the
 * border to the `danger` token and the placeholder uses `muted`. No literal
 * colors.
 */
export declare function SearchInput({ value, onChangeText, onClear, placeholder, invalid, disabled, accessibilityLabel, containerStyle, ...rest }: SearchInputProps): React.ReactElement;
//# sourceMappingURL=SearchInput.d.ts.map