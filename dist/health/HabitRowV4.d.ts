import * as React from 'react';
import type { HabitRowProps } from './HabitRow';
import { type Appearance } from './internal/tone-v4';
export interface HabitRowV4Props extends HabitRowProps {
    /** Copy for the completed state. Default `'done'`. */
    doneLabel?: string;
    /** Copy for the incomplete state. Default `'not done'`. */
    notDoneLabel?: string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 habit row** — same props as {@link HabitRow} plus `doneLabel`,
 * `notDoneLabel` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **The check control was 26px** — and `HabitRowV3`'s was 18. This is the
 *    one thing a habit screen exists to let you tap, once a day, quickly. The
 *    whole row is the checkbox now and it clears 44 through the shared row
 *    height.
 * 2. **It is a real `<button>`.** A `div` with `role="checkbox"`, `tabIndex`
 *    and a hand-written Enter/Space handler is three approximations of a
 *    control the platform already ships, and the hand-written one fired Space
 *    on `keydown` where the platform fires it on `keyup`.
 * 3. **It joins the shared row family** — one height, one 44 leading slot, one
 *    gutter, one state layer — so a habit row and a settings row are one
 *    family rather than two near-misses. `hover:bg-neutral-100` goes with it: a
 *    light-oriented ramp step paints a near-white slab across a dark page.
 * 4. **The streak flame's ink is the corrected slot.** `text-warn` is
 *    `var(--xen-warn)`, a fill token with no contrast promise as text, and the
 *    streak count is the second most important number on the row.
 * 5. **Focus is `ring-ring`, and the state words are props.**
 *    `ring-primary-300` is a ramp step and the ramp mirrors in dark mode, so
 *    the focus ring inverted; "done" and "not done" were untranslatable.
 */
export declare const HabitRowV4: React.ForwardRefExoticComponent<HabitRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HabitRowV4.d.ts.map