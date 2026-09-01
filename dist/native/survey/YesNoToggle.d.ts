import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface YesNoToggleProps {
    /** Current answer. `null`/`undefined` → nothing selected. */
    value?: boolean | null;
    /** Fires with the chosen answer. */
    onChange: (value: boolean) => void;
    /** Label for the affirmative side. Default `'Yes'`. */
    yesLabel?: string;
    /** Label for the negative side. Default `'No'`. */
    noLabel?: string;
    /** Accessible name for the group. Default `'Yes or no'`. */
    accessibilityLabel?: string;
    /** Non-interactive + dimmed when `true`. Default `false`. */
    disabled?: boolean;
    /** Extra style on the root. */
    style?: StyleProp<ViewStyle>;
}
/**
 * YesNoToggle — **V4** "clean form / focus" binary segmented control. Two big
 * side-by-side buttons on a calm neutral surface: the selected side fills with
 * the single signature accent — solid `primary` with `onPrimary` text — while
 * the other stays `surface` + `border`. No gradients. Exposed as a `radiogroup`
 * of two `radio`s so the choice is announced. Controlled via `value` +
 * `onChange`; token-only colors via `useXenitionTheme()`.
 */
export declare function YesNoToggle({ value, onChange, yesLabel, noLabel, accessibilityLabel, disabled, style, }: YesNoToggleProps): React.ReactElement;
//# sourceMappingURL=YesNoToggle.d.ts.map