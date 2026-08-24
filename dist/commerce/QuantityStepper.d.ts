import * as React from 'react';
export interface QuantityStepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Current quantity. */
    value: number;
    /** Lower bound (default 1). Decrement is disabled at this value. */
    min?: number;
    /** Upper bound (default none). Increment is disabled at this value. */
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
}
/**
 * A −/n/+ quantity control. Values are clamped to `[min, max]`; the boundary
 * button disables itself at each end so `onChange` never fires an out-of-range
 * value. Token-only, keyboard-native (real `<button>`s), and labelled as a
 * group.
 */
export declare const QuantityStepper: React.ForwardRefExoticComponent<QuantityStepperProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuantityStepper.d.ts.map