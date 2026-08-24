import * as React from 'react';
import type { CivicAppointmentProps } from './CivicAppointment';
/** Same public contract as {@link CivicAppointment} — a drop-in alternate design. */
export type CivicAppointmentV3Props = CivicAppointmentProps;
/**
 * CivicAppointment, redesigned (v3): a **dense appointment line**. A status dot,
 * the service + date·time over an office·status subtitle, and a compact Check in —
 * hairline-bordered for a list. The opposite of v2's card. Status is dot + word,
 * never color alone. Same props, token-only.
 */
export declare const CivicAppointmentV3: React.ForwardRefExoticComponent<CivicAppointmentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CivicAppointmentV3.d.ts.map