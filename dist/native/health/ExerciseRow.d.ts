import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
export interface ExerciseRowProps {
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
    /**
     * Surface treatment for visual diversity; defaults to `classic`. For rows
     * `classic` stays transparent (the historical look).
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A workout-set row: exercise name, a `sets × reps` prescription, an optional
 * weight, and a completion toggle. Completed rows read muted with a success
 * check. `onToggle` receives the next boolean. `appearance` selects an optional
 * surface treatment. Token-only.
 */
export declare function ExerciseRow({ name, sets, reps, weight, done, meta, onToggle, appearance, style, }: ExerciseRowProps): React.ReactElement;
//# sourceMappingURL=ExerciseRow.d.ts.map