import * as React from 'react';
import type { AppointmentCardProps } from './AppointmentCard';
/** Same public contract as {@link AppointmentCard} — a drop-in alternate design. */
export type AppointmentCardV2Props = AppointmentCardProps;
/**
 * AppointmentCard, redesigned (v2): an **elevated hero card**. A big primary-
 * tinted date block anchors the left, with the time set large; the clinician
 * rides beside it as a ringed avatar + name/specialty. A mode chip (in-person /
 * video / phone) and a status badge sit on the same row, and a dominant CTA
 * ("Join call" for video, else "Book") spans the foot. Lifted with a shadow and
 * mounted with a gentle fade-in — distinct at a glance from v1's flat bordered
 * card. Same props, token-pure.
 */
export declare function AppointmentCardV2({ doctorName, specialty, doctorAvatar, date, time, mode, status, location, loading, onBook, onReschedule, bookLabel, style, }: AppointmentCardV2Props): React.ReactElement;
//# sourceMappingURL=AppointmentCardV2.d.ts.map