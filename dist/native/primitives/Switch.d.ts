import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SwitchProps {
    checked?: boolean;
    /**
     * Fires with the requested checked state. Prefer `onChange` — that is the
     * kit's one canonical name for "the value changed". `onCheckedChange` is this
     * component's original spelling, kept so existing callers keep working; if
     * both are passed this one wins.
     */
    onCheckedChange?: (checked: boolean) => void;
    /** Canonical spelling of `onCheckedChange` (see it for the precedence rule). */
    onChange?: (checked: boolean) => void;
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
export declare function Switch({ checked, onCheckedChange, onChange, disabled, accessibilityLabel, style, }: SwitchProps): React.ReactElement;
//# sourceMappingURL=Switch.d.ts.map