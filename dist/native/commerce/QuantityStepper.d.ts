import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface QuantityStepperProps {
    /** Current quantity. */
    value: number;
    /** Lower bound (default 1). Decrement disabled at this value. */
    min?: number;
    /** Upper bound (default none). Increment disabled at this value. */
    max?: number;
    /** Increment/decrement amount (default 1). */
    step?: number;
    /** Called with the clamped next value. */
    onChange?: (value: number) => void;
    /** Disable the whole control. */
    disabled?: boolean;
    /** Accessible label for the group (default `Quantity`). */
    label?: string;
    /** Accessible label for the − button (default `Decrease quantity`). */
    decrementLabel?: string;
    /** Accessible label for the + button (default `Increase quantity`). */
    incrementLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A −/n/+ quantity control — the native mirror of the web `QuantityStepper`.
 * Values are clamped to `[min, max]`; the boundary button disables itself at
 * each end so `onChange` never fires an out-of-range value. Token-only.
 */
export declare function QuantityStepper({ value, min, max, step, onChange, disabled, label, decrementLabel, incrementLabel, style, }: QuantityStepperProps): React.ReactElement;
//# sourceMappingURL=QuantityStepper.d.ts.map