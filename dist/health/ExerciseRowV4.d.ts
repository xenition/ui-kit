import * as React from 'react';
import type { ExerciseRowProps } from './ExerciseRow';
import { type Appearance } from './internal/tone-v4';
export interface ExerciseRowV4Props extends ExerciseRowProps {
    /** Copy for a sets-only prescription. Default `'sets'`. */
    setsLabel?: string;
    /** Copy for a reps-only prescription. Default `'reps'`. */
    repsLabel?: string;
    /** Copy for the completed state. Default `'done'`. */
    doneLabel?: string;
    /** Copy for the incomplete state. Default `'not done'`. */
    notDoneLabel?: string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 exercise row** — same props as {@link ExerciseRow} plus `setsLabel`,
 * `repsLabel`, `doneLabel`, `notDoneLabel` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **The tick was a 24px target** in the middle of a set-logging screen,
 *    which is a control a sweaty thumb hits between reps. The whole row is now
 *    the checkbox and it clears 44 through the shared row height.
 * 2. **It is a real `<button>`.** A `div` with `role="checkbox"`, `tabIndex`
 *    and a hand-written Enter/Space handler is three approximations of a
 *    control the platform already ships — and the hand-written handler fired on
 *    `keydown` for Space, where the platform fires on `keyup`.
 * 3. **It joins the shared row family** — one height, one gutter, one state
 *    layer — so an exercise row, a settings row and a notification row stop
 *    being three components that merely resemble each other. It also replaces
 *    `hover:bg-neutral-100`, a light-oriented ramp step that paints a near-white
 *    slab across a dark page.
 * 4. **Focus is the kit's ring.** `ring-primary-300` is a ramp step, and the
 *    ramp mirrors in dark mode, so the focus ring inverted.
 * 5. **The four English words are props**, where a localised app had to fork
 *    the component to say "hecho".
 */
export declare const ExerciseRowV4: React.ForwardRefExoticComponent<ExerciseRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ExerciseRowV4.d.ts.map