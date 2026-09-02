import * as React from 'react';
import type { WorkoutCardProps } from './WorkoutCard';
import { type Appearance } from './internal/tone-v4';
export interface WorkoutCardV4Props extends WorkoutCardProps {
    /** Override the two stat captions. Default `'Duration'` and `'Calories'`. */
    statLabels?: {
        duration?: string;
        calories?: string;
    };
    /** Copy on the completed note. Default `'Completed'`. */
    completedLabel?: string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 workout card** — same props as {@link WorkoutCard} plus `statLabels`,
 * `completedLabel` and `appearance`.
 *
 * ## Four changes
 *
 * 1. **A walk stopped reading as good news and a cardio session as an alarm.**
 *    The discipline tag was tinted by `variant` — `cardio: 'danger'`,
 *    `running: 'warn'`, `walking: 'success'` — so the kit's status vocabulary
 *    was spent saying which *kind* of exercise this is. A run is not a warning.
 *    The glyph carries the discipline; the tag is neutral ink.
 * 2. **The card's whole summary was on a bare `<div>`.** Role `generic` cannot
 *    be named, so browsers drop `aria-label` from it outright and the sentence
 *    reached nobody. It is a named `group` now — and "Completed" is inside that
 *    name, where before it was a green tick only a sighted user could see.
 * 3. **The two stat captions and the completed word are props.** A localised
 *    app had to fork the component to translate "Duration".
 * 4. **The tag's ink is the corrected slot**, not the fill token: `text-warn`
 *    is `var(--xen-warn)`, which has no contrast promise as text and was being
 *    used at `text-xs` — the smallest type on the card in the weakest colour.
 */
export declare const WorkoutCardV4: React.ForwardRefExoticComponent<WorkoutCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WorkoutCardV4.d.ts.map