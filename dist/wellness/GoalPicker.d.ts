import * as React from 'react';
export interface WellnessGoal {
    id: string;
    label: string;
    glyph?: string;
}
export interface GoalPickerProps extends React.HTMLAttributes<HTMLDivElement> {
    goals: WellnessGoal[];
    selected: string[];
    onToggle: (id: string) => void;
    title?: string;
}
/**
 * GoalPicker — a wrap of selectable goal chips. Unselected chips are clean
 * (surface + border, on-surface text); color arrives only on the chosen ones,
 * which flip to the primary fill with on-primary text and a `✓`. Selection is
 * announced (`aria-pressed`) and marked with the check, so it never rests on
 * color alone. Token-only colors.
 */
export declare const GoalPicker: React.ForwardRefExoticComponent<GoalPickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GoalPicker.d.ts.map