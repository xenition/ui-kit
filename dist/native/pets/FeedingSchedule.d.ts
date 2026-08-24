import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A daily feeding checklist: each row is a meal-time icon, food + portion, and a
 * tappable fed/not-fed checkbox. A summary chip counts fed vs. total. Renders an
 * explicit empty state. Fed state is conveyed by a check glyph + a11y state
 * (not color alone). Token-only colors.
 */
export declare function FeedingSchedule({ meals, title, onToggle, emptyLabel, style, }: FeedingScheduleProps): React.ReactElement;
//# sourceMappingURL=FeedingSchedule.d.ts.map