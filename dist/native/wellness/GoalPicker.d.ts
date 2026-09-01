import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface WellnessGoal {
    id: string;
    label: string;
    glyph?: string;
}
export interface GoalPickerProps {
    goals: WellnessGoal[];
    selected: string[];
    onToggle: (id: string) => void;
    title?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * GoalPicker — a wrap of selectable goal chips. Unselected chips are clean
 * (surface + border, `onSurface` text); color arrives only on the chosen ones,
 * which flip to the primary fill with `onPrimary` text and a `✓`. Selection is
 * announced (`accessibilityState.selected`) and marked with the check, so it
 * never rests on color alone. Token-only colors.
 */
export declare function GoalPicker({ goals, selected, onToggle, title, style }: GoalPickerProps): React.ReactElement;
//# sourceMappingURL=GoalPicker.d.ts.map