import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SettingsRowProps {
    label: string;
    /** Optional current-value readout shown on the right (before `rightSlot`). */
    value?: string;
    /** Optional description under the label. */
    description?: string;
    /** Custom trailing control (switch, badge, …). Overrides the chevron. */
    rightSlot?: React.ReactNode;
    /** When set (and no `rightSlot`), shows a chevron and makes the row pressable. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single settings/preferences row: label (+ optional description) on the left,
 * a value and/or trailing control on the right. Shows a chevron and becomes
 * pressable when `onPress` is provided. Token-only.
 */
export declare function SettingsRow({ label, value, description, rightSlot, onPress, style, }: SettingsRowProps): React.ReactElement;
//# sourceMappingURL=SettingsRow.d.ts.map