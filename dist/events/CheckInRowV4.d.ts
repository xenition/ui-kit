import * as React from 'react';
import type { CheckInRowProps } from './CheckInRow';
export interface CheckInRowV4Props extends CheckInRowProps {
    /** The action, while the attendee is not yet in. Default `'Check in'`. */
    checkInLabel?: string;
    /** The state, once they are. Default `'Checked in'`. */
    checkedInLabel?: string;
    /** The action that reverses it. Default `'Undo check-in'`. */
    undoLabel?: string;
}
/**
 * **V4 check-in row** — the web twin of the native `CheckInRowV4`, same props
 * as {@link CheckInRow} plus `checkInLabel`, `checkedInLabel` and `undoLabel`.
 *
 * ## Four changes
 *
 * 1. **The only control on the row clears 44.** It was about 28 points tall —
 *    and this is a staff surface, worked one-handed at a door, at speed, with a
 *    queue behind it. Missing the target costs an attendee, not a scroll.
 * 2. **The button says who it is about.** `Check in Ada` was already right; it
 *    now carries the ticket type and the check-in time as well, so a scanner
 *    hears what they are confirming rather than just a verb and a name.
 * 3. **Press is a state layer and disabled is 0.38.** `hover:opacity-90` fades
 *    the button's own label, which is M3's *disabled* signal, and
 *    `disabled:opacity-50` is a rounder number than the one the theme ships.
 * 4. **The state's word is a prop.** `Check in` / `In` / `Undo check-in` were
 *    three hard-coded English strings on a screen staff read hundreds of times
 *    a night; and the visible word and the spoken one now agree.
 */
export declare const CheckInRowV4: React.ForwardRefExoticComponent<CheckInRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CheckInRowV4.d.ts.map