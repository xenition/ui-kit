import * as React from 'react';
import type { ExerciseRowProps } from './ExerciseRow';
export interface ExerciseRowV4Props extends ExerciseRowProps {
    /** Word for a sets-only prescription. Default `'sets'`. */
    setsLabel?: string;
    /** Word for a reps-only prescription. Default `'reps'`. */
    repsLabel?: string;
    /** Announced for a completed exercise. Default `'done'`. */
    doneLabel?: string;
    /** Announced for one still to do. Default `'not done'`. */
    notDoneLabel?: string;
}
/**
 * **V4 exercise row** — same props as {@link ExerciseRow} plus `setsLabel`,
 * `repsLabel`, `doneLabel` and `notDoneLabel`.
 *
 * ## Five changes
 *
 * 1. **The checkbox clears 44.** It was a 24px square — the second-smallest
 *    control in the module — on a row a lifter taps between sets with one
 *    sweaty thumb. The drawn box keeps its size; the *target* around it does
 *    not.
 * 2. **Press is a state layer.** `opacity: pressed ? 0.7 : 1` fades the row's
 *    own content, which is the signal M3 spends 0.38 on to mean *disabled*, so
 *    a pressed row and a dead row looked alike.
 * 3. **The non-toggling branch is `accessible`.** It set a full computed name
 *    on a plain `Animated.View`, which is never an accessibility element on
 *    iOS, so a read-only exercise list announced nothing at all.
 * 4. **`'sets'`, `'reps'`, `'done'` and `'not done'` are props.** They were
 *    English literals inside a spoken string, which is the one place a
 *    hard-coded word cannot be worked around by the caller.
 * 5. **It is a row from the shared row family**, so an exercise row, a
 *    settings row and a notification row are one height and one rhythm rather
 *    than a hand-typed `minHeight: 52`.
 *
 * **Renders nothing without a `name`.**
 */
export declare function ExerciseRowV4({ name, sets, reps, weight, done, meta, setsLabel, repsLabel, doneLabel, notDoneLabel, onToggle, appearance, style, }: ExerciseRowV4Props): React.ReactElement | null;
//# sourceMappingURL=ExerciseRowV4.d.ts.map