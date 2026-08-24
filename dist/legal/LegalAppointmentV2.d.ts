import * as React from 'react';
import type { LegalAppointmentProps } from './LegalAppointment';
/** Same public contract as {@link LegalAppointment} — a drop-in alternate design. */
export type LegalAppointmentV2Props = LegalAppointmentProps;
/**
 * LegalAppointment, redesigned (v2): an **elevated appointment card**. A tinted
 * date/time medallion leads the type pill, client and location; a status pill sits
 * on the header, and Confirm/Cancel anchor the card when actionable. Distinct from
 * v1. Same props, token-only.
 */
export declare const LegalAppointmentV2: React.ForwardRefExoticComponent<LegalAppointmentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LegalAppointmentV2.d.ts.map