import * as React from 'react';
export interface ExerciseRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
    /** Exercise name, e.g. "Bench press". */
    name: string;
    /** Number of sets. */
    sets?: number;
    /** Reps per set. */
    reps?: number;
    /** Load, e.g. "60 kg" or a raw number. */
    weight?: React.ReactNode;
    /** Whether the exercise is completed this session. */
    done?: boolean;
    /** Optional muscle group / meta line. */
    meta?: string;
    /** Fires with the next `done` state when toggled. */
    onToggle?: (next: boolean) => void;
}
/**
 * A workout-set row: exercise name, a `sets × reps` prescription, an optional
 * weight, and a completion toggle. Completed rows read muted with a success
 * check. `onToggle` receives the next boolean. Web parity of the native
 * `ExerciseRow`; token-only, `role="checkbox"`.
 */
export declare const ExerciseRow: React.ForwardRefExoticComponent<ExerciseRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ExerciseRow.d.ts.map