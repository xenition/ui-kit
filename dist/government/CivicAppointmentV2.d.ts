import * as React from 'react';
import type { CivicAppointmentProps } from './CivicAppointment';
/** Same public contract as {@link CivicAppointment} — a drop-in alternate design. */
export type CivicAppointmentV2Props = CivicAppointmentProps;
/**
 * CivicAppointment, redesigned (v2): an **elevated appointment card**. A primary-
 * tinted date/time medallion leads the service/office; a status badge and a
 * reference chip sit on the header, and Check in/Reschedule anchor the card.
 * Distinct from v1. Same props, token-only.
 */
export declare const CivicAppointmentV2: React.ForwardRefExoticComponent<CivicAppointmentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CivicAppointmentV2.d.ts.map