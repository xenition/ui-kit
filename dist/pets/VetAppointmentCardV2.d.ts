import * as React from 'react';
import type { VetAppointmentCardProps } from './VetAppointmentCard';
/** Same public contract as {@link VetAppointmentCard} — a drop-in alternate design. */
export type VetAppointmentCardV2Props = VetAppointmentCardProps;
/**
 * VetAppointmentCard, redesigned (v2): an **elevated visit card**. A reason glyph
 * tile leads; the vet/clinic + pet name head the body next to a date/time block;
 * a status badge sits top-right; notes and confirm/cancel actions anchor the
 * card. Distinct from v1's row. Same props, token-only.
 */
export declare const VetAppointmentCardV2: React.ForwardRefExoticComponent<VetAppointmentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VetAppointmentCardV2.d.ts.map