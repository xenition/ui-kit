import * as React from 'react';
import type { AppointmentStatus, CivicAppointmentProps } from './CivicAppointment';
export interface CivicAppointmentV4Props extends CivicAppointmentProps {
    /** Why the appointment was missed or closed. Rendered when the status is adverse. */
    reason?: string;
    /** Override the six status words (`'Checked in'`, `'No-show'`, …). */
    statusLabels?: Partial<Record<AppointmentStatus, string>>;
    /** What the check-in button says once it is armed. Default `'Confirm check-in'`. */
    confirmCheckInLabel?: string;
    /** What the confirmation number identifies. Default `'Reference'`. */
    referenceLabel?: string;
}
/**
 * **V4 civic appointment** — same props as {@link CivicAppointment} plus
 * `reason`, `statusLabels`, `confirmCheckInLabel` and `referenceLabel`.
 *
 * ## Five changes
 *
 * 1. **"Check in" takes a confirming press.** Checking in early at a DMV
 *    forfeits the slot, and the base put that one tap on a ~34pt button with
 *    nothing guarding the misfire. The first press arms the button and shows
 *    `confirmCheckInLabel`; the second checks in. Both actions clear 44.
 * 2. **A no-show says why.** It is one of the module's five rejection states
 *    and the only field it had was a red pill — nothing to carry "arrived
 *    after the 15-minute grace period". `isAdverse()` gates the `reason`, and
 *    the line is an assertive live region.
 * 3. **The reference is labelled.** It rendered as `` `#${reference}` ``, so a
 *    reader heard "number A dash 042" with no idea it was the queue ticket to
 *    quote at the desk.
 * 4. **The card is one announced object** — service, office, date, time,
 *    location, status and reference — where the base left seven loose text
 *    nodes a reader walked one at a time, and the two action buttons stay
 *    outside that name so they remain focus stops.
 * 5. **Having an appointment is not an outcome.** `scheduled` was `primary`
 *    and `checked-in` `accent`, and the calendar disc was `primary` as well.
 *    They are `IDENTITY_TONE` now, so `confirmed`, `completed` and `no-show`
 *    are the only states on the card wearing a colour that means something.
 *
 * **Renders nothing without a `service`** (§4.5).
 */
export declare function CivicAppointmentV4({ service, office, date, time, status, location, reference, reason, statusLabels, confirmCheckInLabel, referenceLabel, onCheckIn, onReschedule, style, }: CivicAppointmentV4Props): React.ReactElement | null;
//# sourceMappingURL=CivicAppointmentV4.d.ts.map