import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface NumberInputProps {
    value: number;
    /**
     * Fires with the clamped value. Prefer `onChange` — that is the kit's one
     * canonical name for "the value changed", and what the web twin has always
     * called this. `onValueChange` is the original native spelling, kept so
     * existing callers keep working; if both are passed this one wins.
     */
    onValueChange?: (value: number) => void;
    /** Canonical spelling of `onValueChange` (see it for the precedence rule). */
    onChange?: (value: number) => void;
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
export declare function NumberInput({ value, onValueChange, onChange, min, max, step, disabled, style, }: NumberInputProps): React.ReactElement;
//# sourceMappingURL=NumberInput.d.ts.map