import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CheckboxProps {
    /** Controlled checked state. */
    checked?: boolean;
    /**
     * Fires with the next checked value on press.
     *
     * This is one of the two controls in the kit that does NOT also accept the
     * canonical `onChange` (the other is `Select`). The web twin is a real
     * `<input type="checkbox">`, so `onChange` there is the DOM handler and takes
     * an event, not a boolean; teaching the two twins the same name for two
     * different signatures would trade a spelling mistake for a runtime one.
     * `onCheckedChange` is the name on both platforms for the boolean form.
     */
    onCheckedChange?: (checked: boolean) => void;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    /** Accessible name for the control. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Themed checkbox — the native mirror of the web `Checkbox`. A `Pressable` box
 * that fills with the primary token and shows a check when `checked`. Exposes
 * the `checked` / `onCheckedChange` contract (RN has no DOM input). No literal
 * colors.
 */
export declare function Checkbox({ checked, onCheckedChange, invalid, disabled, accessibilityLabel, style, }: CheckboxProps): React.ReactElement;
//# sourceMappingURL=Checkbox.d.ts.map