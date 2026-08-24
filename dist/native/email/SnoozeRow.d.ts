import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SnoozeRowProps {
    /** Preset name (e.g. "Later today", "Tomorrow", "Next week"). */
    label: string;
    /** Resolved time shown on the trailing side (e.g. "6:00 PM"). */
    when?: string;
    /** Leading glyph. Default a clock. */
    glyph?: string;
    /** Selected preset — tinted + check. */
    selected?: boolean;
    /** Choose this preset. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single snooze-preset option row — glyph, preset name, and the resolved time
 * it maps to. Used to build the snooze picker sheet. The `selected` state tints
 * the row and shows a check, and reports `selected` to assistive tech (not by
 * color only). No literal colors.
 */
export declare function SnoozeRow({ label, when, glyph, selected, onPress, style, }: SnoozeRowProps): React.ReactElement;
//# sourceMappingURL=SnoozeRow.d.ts.map