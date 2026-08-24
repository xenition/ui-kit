import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface MultiSelectOption {
    label: string;
    value: string;
}
export interface MultiSelectProps {
    /** The choices (pass as data — RN has no `<option>` children). */
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
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Multi-select — like the native `Select` but the sheet lets several options be
 * checked. The trigger shows the picked options as token-bound chips (or the
 * `placeholder`); the `Modal` rows show a check on the selected ones. Same
 * `options` data contract; `onChange` reports the whole next `string[]`. No
 * literal colors.
 */
export declare function MultiSelect({ options, value, onChange, placeholder, invalid, disabled, accessibilityLabel, style, }: MultiSelectProps): React.ReactElement;
//# sourceMappingURL=MultiSelect.d.ts.map