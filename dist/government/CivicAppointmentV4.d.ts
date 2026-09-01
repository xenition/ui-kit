import * as React from 'react';
import type { AppointmentStatus, CivicAppointmentProps } from './CivicAppointment';
export interface CivicAppointmentV4Props extends CivicAppointmentProps {
    /** Why the appointment was recorded as a no-show. Rendered and announced when adverse. */
    reason?: string;
    /** Override the six status words — `'Scheduled'`, `'No-show'`, … */
    statusLabels?: Partial<Record<AppointmentStatus, string>>;
    /** How "Check in" names itself once armed. Default `'Confirm check-in'`. */
    confirmCheckInLabel?: string;
    /** What the queue reference is called. Default `'Reference'`. */
    referenceLabel?: string;
}
/**
 * **V4 civic appointment** — the web twin of the native `CivicAppointmentV4`,
 * same props as {@link CivicAppointment} plus `reason`, `statusLabels`,
 * `confirmCheckInLabel` and `referenceLabel`.
 *
 * ## Five changes
 *
 * 1. **A no-show says why, and announces.** It is one of the module's five
 *    rejection states — the one that costs a claimant their slot and often a
 *    fee — and not one of the five interfaces had a field for the reason, on a
 *    component that had no live region at all. `reason` renders under the
 *    header whenever {@link isAdverse} is true and joins a polite announcement
 *    that arrives one commit after mount, because a live region announces
 *    *changes* and text present at first paint speaks to nobody.
 * 2. **Checking in takes a confirming press.** Checking in early at a DMV
 *    forfeits the slot, and nothing guarded the misfire: one tap on a ~32px
 *    target, no confirm, no pending state, no undo. The control arms first,
 *    renames itself, and disarms on blur.
 * 3. **The queue reference is labelled.** `#A-042` is a glyph and a string; a
 *    reader now hears "Reference A-042" and knows what to say at the counter.
 * 4. **Both actions clear 44.** `size="sm"` is about 32px and neither `Button`
 *    primitive sets a minimum height — and this is a control tapped in a queue,
 *    standing up, holding a folder.
 * 5. **A stage stops wearing the brand colour.** Scheduled and Checked in are
 *    positions, not verdicts; identity takes the neutral chip so Confirmed →
 *    success and No-show → danger remain the only coloured signals, and the
 *    leading disc stops being `bg-primary-50`, a ramp step that mirrors under
 *    `[data-theme="dark"]`.
 */
export declare const CivicAppointmentV4: React.ForwardRefExoticComponent<CivicAppointmentV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CivicAppointmentV4.d.ts.map