import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
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
    /** Surface treatment for visual diversity; defaults to `classic` (the historical look). */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A workout summary card: discipline icon + tag, title, a duration / calories
 * stat strip, and a single dominant "Start" action. Completed workouts swap the
 * CTA for a `success` "Completed" note. The `variant` sets the icon and accent
 * tone. `appearance` selects the surface treatment (classic by default). Token-only colors.
 */
export declare function WorkoutCard({ title, variant, durationMin, calories, description, completed, startLabel, onStart, appearance, style, }: WorkoutCardProps): React.ReactElement;
//# sourceMappingURL=WorkoutCard.d.ts.map