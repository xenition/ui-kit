import * as React from 'react';
import type { VetAppointmentCardProps } from './VetAppointmentCard';
/** Drop-in alternate design for {@link VetAppointmentCard} — identical props. */
export type VetAppointmentCardV2Props = VetAppointmentCardProps;
/**
 * Elevated appointment card — a bolder alternate to {@link VetAppointmentCard}.
 * A tinted date "block" (date over time) leads the header, the vet appears with
 * an avatar + clinic, and open visits expose a full-width confirm/join primary
 * plus a cancel. Status reads via a labelled chip. Same `VetAppointmentCardProps`;
 * shadow depth instead of a top accent border. Token-pure.
 */
export declare function VetAppointmentCardV2({ vetName, clinic, reason, date, time, status, petName, notes, actionLabel, onAction, onCancel, style, }: VetAppointmentCardV2Props): React.ReactElement;
//# sourceMappingURL=VetAppointmentCardV2.d.ts.map