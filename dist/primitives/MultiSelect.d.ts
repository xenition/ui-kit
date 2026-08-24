import * as React from 'react';
export interface MultiSelectOption {
    label: string;
    value: string;
}
export interface MultiSelectProps {
    /** The choices. */
    options: MultiSelectOption[];
    /** Controlled set of selected values. */
    value?: string[];
    /** Fires with the full next selection array. */
    onChange?: (value: string[]) => void;
    /** Shown on the trigger when nothing is selected. */
    placeholder?: string;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    /** Accessible label for the trigger. */
    accessibilityLabel?: string;
    className?: string;
}
/**
 * Multi-select — like the themed `Select` but the popover lets several options
 * be checked. The trigger shows the picked options as token-bound chips (or the
 * `placeholder`). Web parity of the native `MultiSelect`; `onChange` reports the
 * whole next `string[]`. No literal colors (kit lint rule).
 */
export declare function MultiSelect({ options, value, onChange, placeholder, invalid, disabled, accessibilityLabel, className, }: MultiSelectProps): React.ReactElement;
//# sourceMappingURL=MultiSelect.d.ts.map