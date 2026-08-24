import * as React from 'react';
export type WorkoutVariant = 'strength' | 'cardio' | 'yoga' | 'cycling' | 'running' | 'swimming' | 'hiit' | 'walking';
export interface WorkoutCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
}
/**
 * A workout summary card: discipline icon + tag, title, a duration / calories
 * stat strip, and a single dominant "Start" action. Completed workouts swap the
 * CTA for a `success` "Completed" note. The `variant` sets the icon and accent
 * tone. Web parity of the native `WorkoutCard`; token-only colors, `onStart`
 * fires from a real `<button>`.
 */
export declare const WorkoutCard: React.ForwardRefExoticComponent<WorkoutCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WorkoutCard.d.ts.map