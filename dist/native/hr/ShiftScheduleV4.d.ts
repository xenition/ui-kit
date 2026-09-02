import * as React from 'react';
import type { ShiftScheduleProps } from './ShiftSchedule';
export interface ShiftScheduleV4Props extends ShiftScheduleProps {
    /** Body text for a shift with nobody on it. Default `'Unassigned'`. */
    unassignedLabel?: string;
    /** Next-step sentence under `emptyLabel`. Default `'Shifts you add will appear here.'` */
    emptyDescription?: string;
}
/**
 * **V4 shift schedule** — same props as {@link ShiftSchedule} plus
 * `unassignedLabel` and `emptyDescription`.
 *
 * ## Five changes
 *
 * 1. **A shift has one truth about who is on it.** The base derived the tint
 *    from `!shift.assignee` and the pill from `shift.status`, so
 *    `{ status: 'confirmed', assignee: undefined }` rendered a row tinted as
 *    open, the body text "Unassigned", and a green "✓ Confirmed" pill — three
 *    statements, two of them contradicting each other, on the roster a shift
 *    manager reads to decide whether anyone is coming in. The open flag is now
 *    the assignee and nothing else, and an unassigned shift is `open`
 *    regardless of what status was passed with it.
 * 2. **The open tint is a token, and it never carries the meaning alone.** The
 *    base washed an open row in `withAlpha(tone, 0.08)` — translucent, so the
 *    same row was a different colour on a card than on the page, and a
 *    different colour again from the web twin's own hand-rolled alpha. It is
 *    `toneGround()` now: one composited 10% mix, opaque, identical on both
 *    platforms. The tint is decoration on top of the word "Open", which is what
 *    a colour-blind user actually reads.
 * 3. **Every row is a target.** The rows were `Pressable`s whose height came
 *    from `xs` padding around two lines of `xs` text; they clear `minTap` now.
 * 4. **A press is a state layer**, where the base had no press feedback on the
 *    shift rows at all — a tap on a roster row did nothing visible until the
 *    next screen appeared.
 * 5. **The copy is props and the columns come off the scale.** "Unassigned" was
 *    hard-coded, the time column was a literal `width: 96`, and the row's spoken
 *    name was "Shift 09:00 to 17:00, Confirmed" — no assignee, no role, no
 *    location, which is everything a manager is scanning the roster for.
 */
export declare function ShiftScheduleV4({ shifts, dateLabel, variant, unassignedLabel, emptyLabel, emptyDescription, onSelectShift, testID, style, }: ShiftScheduleV4Props): React.ReactElement;
//# sourceMappingURL=ShiftScheduleV4.d.ts.map