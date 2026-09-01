import * as React from 'react';
import type { CheckInRowProps } from './CheckInRow';
export interface CheckInRowV4Props extends CheckInRowProps {
    /** Action label while the attendee is not in. Default `'Check in'`. */
    checkInLabel?: string;
    /** State label once the attendee is in. Default `'Checked in'`. */
    checkedInLabel?: string;
    /** Action label that reverses a check-in. Default `'Undo check-in'`. */
    undoLabel?: string;
}
/**
 * **V4 check-in row** — same props as {@link CheckInRow} plus `checkInLabel`,
 * `checkedInLabel` and `undoLabel`.
 *
 * ## Four changes
 *
 * 1. **The only control on the row clears 44.** The toggle was about 34px
 *    tall, and this is a staff surface: someone works a door with one hand,
 *    at arm's length, holding a scanner in the other. It is now a full tap
 *    target.
 * 2. **The attendee region is a sibling of the toggle, not a wrapper round
 *    it.** The row's identity block names itself once — name, ticket type,
 *    state, time — and the button stays its own reachable element beside it,
 *    rather than being flattened into a single leaf.
 * 3. **A press is a state layer and disabled is 0.38.** The base drew press as
 *    `opacity: 0.85` and disabled as `opacity: 0.5`; the two were close enough
 *    that a pressed button read as an unavailable one.
 * 4. **Every word on the row is a prop.** `Check in`, `Checked in` and
 *    `Undo check-in` were hard-coded English on a component whose whole job is
 *    to be operated at speed by venue staff.
 */
export declare function CheckInRowV4({ name, avatarUrl, ticketType, checkedInAt, checkedIn, checkInLabel, checkedInLabel, undoLabel, onToggle, disabled, style, }: CheckInRowV4Props): React.ReactElement | null;
//# sourceMappingURL=CheckInRowV4.d.ts.map