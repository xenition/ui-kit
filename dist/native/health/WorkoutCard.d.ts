import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type WorkoutVariant = 'strength' | 'cardio' | 'yoga' | 'cycling' | 'running' | 'swimming' | 'hiit' | 'walking';
export interface WorkoutCardProps {
    /** Workout name, e.g. "Upper body push". */
    title: string;
    /** Discipline; drives the icon, tag label, and accent tone. */
    variant: WorkoutVariant;
    /** Duration in minutes. */
    durationMin?: number;
    /** Calories burned / estimated. */
    calories?: number;
    /** Optional short description or focus. */
    description?: string;
    /** Whether the workout is already completed. */
    completed?: boolean;
    /** CTA label; defaults to "Start". Hidden when `completed` or no `onStart`. */
    startLabel?: string;
    onStart?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A workout summary card: discipline icon + tag, title, a duration / calories
 * stat strip, and a single dominant "Start" action. Completed workouts swap the
 * CTA for a `success` "Completed" note. The `variant` sets the icon and accent
 * tone. Token-only colors.
 */
export declare function WorkoutCard({ title, variant, durationMin, calories, description, completed, startLabel, onStart, style, }: WorkoutCardProps): React.ReactElement;
//# sourceMappingURL=WorkoutCard.d.ts.map