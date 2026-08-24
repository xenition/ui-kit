import * as React from 'react';
import type { VetAppointmentCardProps } from './VetAppointmentCard';
/** Drop-in alternate design for {@link VetAppointmentCard} — identical props. */
export type VetAppointmentCardV3Props = VetAppointmentCardProps;
/**
 * Minimal single-line appointment row — a dense alternate to
 * {@link VetAppointmentCard}. The reason glyph, vet name, and date/time sit on a
 * hairline-separated line; open visits show an inline link action, closed visits
 * a status chip. Status always reads via glyph + chip, never color alone. Same
 * `VetAppointmentCardProps`. Token-pure.
 */
export declare function VetAppointmentCardV3({ vetName, clinic, reason, date, time, status, petName, actionLabel, onAction, style, }: VetAppointmentCardV3Props): React.ReactElement;
//# sourceMappingURL=VetAppointmentCardV3.d.ts.map