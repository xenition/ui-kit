import * as React from 'react';
export interface ToggleGroupOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface ToggleGroupProps {
    /** The toggles. */
    options: ToggleGroupOption[];
    /**
     * Controlled value: a single `string` in single mode, or a `string[]` in
     * `multiple` mode.
     */
    value?: string | string[];
    /** Fires with the next value (string in single mode, string[] in multiple). */
    onChange?: (value: string | string[]) => void;
    /** Allow more than one active option at a time. */
    multiple?: boolean;
    disabled?: boolean;
    /** Accessible label for the group. */
    accessibilityLabel?: string;
    className?: string;
}
/**
 * Segmented toggle group — a row of connected buttons that toggle on/off. Single
 * mode is deselectable; `multiple` mode lets several be active at once (value
 * becomes a `string[]`). Web parity of the native `ToggleGroup`; active options
 * fill with `primary`/`on-primary`. No literal colors (kit lint rule).
 */
export declare function ToggleGroup({ options, value, onChange, multiple, disabled, accessibilityLabel, className, }: ToggleGroupProps): React.ReactElement;
//# sourceMappingURL=ToggleGroup.d.ts.map