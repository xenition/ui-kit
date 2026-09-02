import * as React from 'react';
import type { RoutineRowProps } from './RoutineRow';
export interface RoutineRowV4Props extends RoutineRowProps {
    /** Open the step — separate from {@link RoutineRowV4Props.onToggle}. */
    onPress?: () => void;
    /** The word a completed step is announced with. Default `'done'`. */
    doneLabel?: string;
    /** The word an outstanding step is announced with. Default `'not done'`. */
    notDoneLabel?: string;
}
/**
 * **V4 routine row** — same props as {@link RoutineRow} plus `onPress`,
 * `doneLabel` and `notDoneLabel`.
 *
 * ## Four changes
 *
 * 1. **A routine step can be opened.** The base made the *whole row* one
 *    `role="checkbox"`, which is the mirror image of `ChoreCard`'s defect: there
 *    was nowhere left to put "open this step", so a routine step could never be
 *    tapped into. The tick is now its own control — a real `checkbox` with its
 *    own name and a 44 target — and the label region is a `button` when
 *    `onPress` is supplied. Without `onPress` the label region stays inert and
 *    carries the row's spoken name, so the row still reads as one object.
 * 2. **The tick is a target, not a decoration.** It was a 24px circle with no
 *    floor under it; children aim worse than adults and it is the one thing on
 *    this row they touch every morning.
 * 3. **Disabled is 0.38, M3's band, not a hand-picked 0.5** — and it dims the
 *    *content* rather than the row's ground, so the row does not change colour
 *    when a step becomes unavailable.
 * 4. **Press is a state layer**, not `opacity: pressed ? 0.7 : 1`. An opacity
 *    that deep is what M3 spends on *disabled*, so a pressed row and a dead one
 *    looked alike. The row also paints `card`/`onCard` rather than the page's
 *    `surface`, so it reads as raised in dark mode.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
export declare function RoutineRowV4({ label, slot, icon, time, done, disabled, doneLabel, notDoneLabel, onToggle, onPress, style, }: RoutineRowV4Props): React.ReactElement | null;
//# sourceMappingURL=RoutineRowV4.d.ts.map