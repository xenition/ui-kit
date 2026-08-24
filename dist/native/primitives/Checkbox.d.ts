import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CheckboxProps {
    /** Controlled checked state. */
    checked?: boolean;
    /** Fires with the next checked value on press. */
    onCheckedChange?: (checked: boolean) => void;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    /** Accessible name for the control. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Themed checkbox — the native mirror of the web `Checkbox`. A `Pressable` box
 * that fills with the primary token and shows a check when `checked`. Exposes
 * the `checked` / `onCheckedChange` contract (RN has no DOM input). No literal
 * colors.
 */
export declare function Checkbox({ checked, onCheckedChange, invalid, disabled, accessibilityLabel, style, }: CheckboxProps): React.ReactElement;
//# sourceMappingURL=Checkbox.d.ts.map