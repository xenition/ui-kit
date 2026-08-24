import * as React from 'react';
import type { AppointmentCardProps } from './AppointmentCard';
/** Same public contract as {@link AppointmentCard} — a drop-in alternate design. */
export type AppointmentCardV2Props = AppointmentCardProps;
/**
 * AppointmentCard, redesigned (v2): an **elevated card with a date medallion**. A
 * primary-tinted date/time block leads on the left; the clinician avatar, name,
 * specialty, mode chip, and status badge sit to the right, with Book/Reschedule
 * anchoring the card. Distinct from v1's stacked row. Same props, token-only.
 */
export declare const AppointmentCardV2: React.ForwardRefExoticComponent<AppointmentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AppointmentCardV2.d.ts.map