import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SelectOption {
    label: string;
    value: string;
}
export interface SelectProps {
    /** The choices (RN has no `<option>` children — pass them as data). */
    options: SelectOption[];
    /** Controlled selected value. */
    value?: string;
    /** Fires with the chosen option's value. */
    onValueChange?: (value: string) => void;
    /** Shown when nothing is selected. */
    placeholder?: string;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Themed select — the native mirror of the web `Select`. RN has no `<select>`,
 * so this is a token-bound `Pressable` that opens a `Modal` option sheet. Pass
 * choices as `options` data (not `<option>` children) and drive it with the
 * `value` / `onValueChange` contract. No literal colors.
 */
export declare function Select({ options, value, onValueChange, placeholder, invalid, disabled, accessibilityLabel, style, }: SelectProps): React.ReactElement;
//# sourceMappingURL=Select.d.ts.map