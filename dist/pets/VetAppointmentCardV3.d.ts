import * as React from 'react';
import type { VetAppointmentCardProps } from './VetAppointmentCard';
/** Same public contract as {@link VetAppointmentCard} — a drop-in alternate design. */
export type VetAppointmentCardV3Props = VetAppointmentCardProps;
/**
 * VetAppointmentCard, redesigned (v3): a **dense visit line**. A reason glyph
 * leads, the vet + date·time share a line over a status dot + word · pet
 * subtitle, and a compact action hugs the right — hairline-bordered for a
 * schedule. The opposite of v2's card. Status is dot + word, never color alone.
 * Same props, token-only.
 */
export declare const VetAppointmentCardV3: React.ForwardRefExoticComponent<VetAppointmentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VetAppointmentCardV3.d.ts.map