import * as React from 'react';
import type { WorkoutCardProps, WorkoutVariant } from './WorkoutCard';
export type { WorkoutVariant };
export interface WorkoutCardV4Props extends WorkoutCardProps {
    /** Captions above the two stats. Default `'Duration'` and `'Calories'`. */
    statLabels?: {
        duration?: string;
        calories?: string;
    };
    /** The note shown for a finished workout. Default `'Completed'`. */
    completedLabel?: string;
}
/**
 * **V4 workout card** — same props as {@link WorkoutCard} plus `statLabels`
 * and `completedLabel`.
 *
 * ## Five changes
 *
 * 1. **A discipline is not a status.** The base tinted the eyebrow by
 *    variant — `cardio: 'danger'`, `running: 'warn'`, `walking: 'success'` —
 *    so a card announcing a gentle walk was green with approval and one
 *    announcing a cardio session was in the same red the kit uses for an
 *    error. Identity keeps the glyph and the word and takes ordinary ink;
 *    `success` is then free to mean "you finished this".
 * 2. **The stat strip is guarded.** Native laid it out unconditionally, so a
 *    workout with neither a duration nor a calorie figure drew an empty
 *    `xl`-wide gap where the numbers would have been. The web twin already
 *    guarded it — this is the two halves disagreeing.
 * 3. **The card's name is `accessible` and complete.** It sat on a plain
 *    `View` (dead on iOS) and named only the discipline and the title, leaving
 *    out the description, the duration and the calories.
 * 4. **The name sits beside the "Start" button, not around it.** An
 *    `accessible` container would flatten the one control on the card, so the
 *    spoken region wraps the media and text and the button is its sibling.
 * 5. **`Duration`, `Calories` and `Completed` are props**, and the card uses
 *    the V4 button and the `*Text` ink slots throughout.
 *
 * **Renders nothing without a `title`.**
 */
export declare function WorkoutCardV4({ title, variant, durationMin, calories, description, completed, startLabel, statLabels, completedLabel, onStart, appearance, style, }: WorkoutCardV4Props): React.ReactElement | null;
//# sourceMappingURL=WorkoutCardV4.d.ts.map