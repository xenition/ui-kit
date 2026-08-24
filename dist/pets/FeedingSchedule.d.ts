import * as React from 'react';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'treat';
export interface FeedingMeal {
    id?: string | number;
    /** Meal slot; drives the icon. */
    type: MealType;
    /** Scheduled time (already formatted), e.g. "7:30 AM". */
    time: string;
    /** Food name / description. */
    food: string;
    /** Portion label, e.g. "1 cup" or "150 g". */
    amount?: string;
    /** Whether this meal has been fed. */
    fed?: boolean;
}
export interface FeedingScheduleProps {
    /** Meals for the day, in order. */
    meals: FeedingMeal[];
    /** Optional section title. */
    title?: string;
    /** Toggle a meal's fed state. */
    onToggle?: (index: number, next: boolean) => void;
    /** Copy shown when there are no meals scheduled. */
    emptyLabel?: string;
    /** Extra classes on the root. */
    className?: string;
}
/**
 * A daily feeding checklist: each row is a meal-time icon, food + portion, and a
 * tappable fed/not-fed control (a real `role="checkbox"` `<button>`). A summary
 * chip counts fed vs. total. Renders a shared empty state. Fed state is conveyed
 * by a check glyph + `aria-checked` (not color alone). Token-only colors.
 */
export declare const FeedingSchedule: React.ForwardRefExoticComponent<FeedingScheduleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FeedingSchedule.d.ts.map