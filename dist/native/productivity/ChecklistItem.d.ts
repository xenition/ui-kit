import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ChecklistItemProps {
    /** Item text. */
    label: string;
    /** Controlled checked state. */
    checked?: boolean;
    /** Fires with the next checked value on press. */
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single checklist line — a round toggle + label. Unlike the square primitive
 * `Checkbox`, a checked item fills with the **success** token (done = success)
 * and strikes through its label. Exposes the `checkbox` a11y role/state. No
 * literal colors.
 */
export declare function ChecklistItem({ label, checked, onCheckedChange, disabled, style, }: ChecklistItemProps): React.ReactElement;
//# sourceMappingURL=ChecklistItem.d.ts.map