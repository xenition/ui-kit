import * as React from 'react';
import type { ShiftScheduleProps } from './ShiftSchedule';
export interface ShiftScheduleV4Props extends ShiftScheduleProps {
    /** Copy in the assignee slot of an open shift. Default `'Unassigned'`. */
    unassignedLabel?: string;
    /** Next-step sentence under `emptyLabel`. Default `'Shifts you add will appear here.'` */
    emptyDescription?: string;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 shift schedule** — the web twin of the native `ShiftScheduleV4`, same
 * props as {@link ShiftSchedule} plus `unassignedLabel`, `emptyDescription`
 * and `testID`.
 *
 * ## Five changes
 *
 * 1. **A row cannot be open and confirmed at once.** See {@link shiftStatus} —
 *    the tint, the body text and the pill now come from one derivation instead
 *    of two that disagreed.
 * 2. **A row's name carries who is on it and what state it is in.** `Shift
 *    09:00 to 17:00, Open` dropped the role, the location and the assignee, so
 *    a manager scanning a roster by ear could not tell two shifts apart.
 * 3. **The open-shift tint is the shared status ground.** Web used
 *    `bg-neutral-100` — a ramp step, which mirrors under `[data-theme="dark"]`
 *    and paints a near-white slab on a dark page — and native mixed its own
 *    tint, so an open shift was two different colours. Both are now the
 *    status's own tone at 10% over the card.
 * 4. **Press is a state layer**, not `hover:brightness-95`, which dims the
 *    row's own content the way M3 signals **disabled**.
 * 5. **The rows clear 44 and the empty state is the V4 one** — the base's
 *    `py-1.5` row was 30 tall on a roster whose rows are the only way to pick
 *    up a shift.
 */
export declare const ShiftScheduleV4: React.ForwardRefExoticComponent<ShiftScheduleV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ShiftScheduleV4.d.ts.map