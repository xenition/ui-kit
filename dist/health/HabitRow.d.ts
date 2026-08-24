import * as React from 'react';
export interface HabitRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
    /** Habit name, e.g. "Drink water". */
    name: string;
    /** Whether the habit is done for the current period. */
    done: boolean;
    /** Current streak length; a flame + count is shown when `> 0`. */
    streak?: number;
    /** Secondary line, e.g. "Daily · 8 glasses". */
    meta?: string;
    /** Fires with the next `done` state when the row / checkbox is toggled. */
    onToggle?: (next: boolean) => void;
}
/**
 * A habit-tracker row: a tappable check control, the habit name + meta, and a
 * streak flame. Completing a habit reads in the `success` tone. `onToggle`
 * receives the next boolean state. Web parity of the native `HabitRow`;
 * token-only, `role="checkbox"` announces the done state and streak.
 */
export declare const HabitRow: React.ForwardRefExoticComponent<HabitRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HabitRow.d.ts.map