import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface RadioOption {
    label: React.ReactNode;
    value: string;
    disabled?: boolean;
}
export interface RadioGroupProps {
    /** The choices (RN has no `<input type=radio>` children — pass them as data). */
    options: RadioOption[];
    /** Controlled selected value. */
    value: string;
    /** Fires with the chosen option's value (web `onChange`, renamed for native). */
    onValueChange?: (value: string) => void;
    /** Accepted for web parity; native has no form-name semantics (no-op). */
    name?: string;
    orientation?: 'vertical' | 'horizontal';
    style?: StyleProp<ViewStyle>;
}
/**
 * Single-choice radio group — the native mirror of the web `RadioGroup`. A
 * token-bound `Pressable` row per option with a filled dot for the selection.
 * No literal colors.
 */
export declare function RadioGroup({ options, value, onValueChange, orientation, style, }: RadioGroupProps): React.ReactElement;
//# sourceMappingURL=RadioGroup.d.ts.map