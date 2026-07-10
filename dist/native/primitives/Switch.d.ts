import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SwitchProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Themed on/off switch — the native mirror of the web `Switch` (`role="switch"`,
 * `checked` / `onCheckedChange` contract). A token-bound track with an animated
 * knob; built from `Pressable` (not RN's `Switch`) to stay fully theme-driven.
 * No literal colors.
 */
export declare function Switch({ checked, onCheckedChange, disabled, accessibilityLabel, style, }: SwitchProps): React.ReactElement;
//# sourceMappingURL=Switch.d.ts.map