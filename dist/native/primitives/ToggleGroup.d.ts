import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ToggleGroupOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface ToggleGroupProps {
    /** The toggles (pass as data). */
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
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Segmented toggle group — a row of connected pressables that toggle on/off.
 * Unlike the display-only `Segmented`, single mode is deselectable and a
 * `multiple` mode lets several be active at once (value becomes a `string[]`).
 * Active options fill with `primary`/`onPrimary`; the shared border and radius
 * come from `useXenitionTheme()`. No literal colors.
 */
export declare function ToggleGroup({ options, value, onChange, multiple, disabled, accessibilityLabel, style, }: ToggleGroupProps): React.ReactElement;
//# sourceMappingURL=ToggleGroup.d.ts.map