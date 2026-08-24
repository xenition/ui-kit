import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface NumberInputProps {
    value: number;
    /** Fires with the clamped value (web `onChange`, renamed for native). */
    onValueChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Number input with −/+ steppers — the native mirror of the web `NumberInput`.
 * A numeric `TextInput` flanked by token-bound `Pressable` steppers; clamps to
 * `[min, max]`. No literal colors.
 */
export declare function NumberInput({ value, onValueChange, min, max, step, disabled, style, }: NumberInputProps): React.ReactElement;
//# sourceMappingURL=NumberInput.d.ts.map