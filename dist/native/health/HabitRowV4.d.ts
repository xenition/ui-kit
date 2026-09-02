import * as React from 'react';
import type { HabitRowProps } from './HabitRow';
export interface HabitRowV4Props extends HabitRowProps {
    /** Announced for a habit completed this period. Default `'done'`. */
    doneLabel?: string;
    /** Announced for one still outstanding. Default `'not done'`. */
    notDoneLabel?: string;
}
/**
 * **V4 habit row** — same props as {@link HabitRow} plus `doneLabel` and
 * `notDoneLabel`.
 *
 * ## Five changes
 *
 * 1. **The check clears 44.** It was a 26px disc, and ticking a habit off is
 *    the single thing this row exists for.
 * 2. **The streak is a sibling of the toggle, not a descendant.** A
 *    `Pressable` is `accessible` by default and flattens everything under it,
 *    so the streak count was folded into the checkbox and could not be reached
 *    on its own. The row is a plain `View` now, the checkbox wraps the check
 *    and the habit's text, and the streak sits beside it with its own name.
 * 3. **The non-toggling branch is `accessible`**, so its label is no longer
 *    dead on iOS.
 * 4. **Press is a state layer**, where `opacity: pressed ? 0.7 : 1` dimmed the
 *    row's content into M3's disabled band.
 * 5. **The streak count is pluralised properly**, through the shared
 *    `pluralizeUnit`, rather than by appending `'s'` — and the flame is marked
 *    decorative so a reader hears "5 day streak" instead of "fire, 5".
 *
 * **Renders nothing without a `name`.**
 */
export declare function HabitRowV4({ name, done, streak, meta, doneLabel, notDoneLabel, onToggle, appearance, style, }: HabitRowV4Props): React.ReactElement | null;
//# sourceMappingURL=HabitRowV4.d.ts.map