import * as React from 'react';
import type { CivicAppointmentProps } from './CivicAppointment';
/** Drop-in replacement for {@link CivicAppointment} — identical props, distinct design. */
export type CivicAppointmentV2Props = CivicAppointmentProps;
/**
 * CivicAppointment, alternate design **V2** — a hero card led by a big tinted
 * **date block** (calendar glyph over the date, with the time beneath). The
 * service, office, and location stack beside it under a status pill (text +
 * glyph + color, never color alone), and non-terminal visits expose full-width
 * Reschedule / Check-in actions. Same `CivicAppointmentProps`; drops in for
 * `CivicAppointment`. Token-pure.
 */
export declare function CivicAppointmentV2({ service, office, date, time, status, location, reference, onCheckIn, onReschedule, style, }: CivicAppointmentV2Props): React.ReactElement;
//# sourceMappingURL=CivicAppointmentV2.d.ts.map