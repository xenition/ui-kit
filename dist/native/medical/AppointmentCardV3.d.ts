import * as React from 'react';
import type { AppointmentCardProps } from './AppointmentCard';
/** Same public contract as {@link AppointmentCard} — a drop-in alternate design. */
export type AppointmentCardV3Props = AppointmentCardProps;
/**
 * AppointmentCard, redesigned (v3): a **minimal dense line**. A small colored
 * status dot leads (paired with a text status word, so status never rides on
 * color alone), the clinician + date·time·mode share one flexible line, and the
 * status label hugs the right edge. No card, no avatar disc, no CTA cluster —
 * tuned for long agenda lists. Distinct at a glance from v1's card and v2's
 * hero. Same props, token-pure.
 */
export declare function AppointmentCardV3({ doctorName, specialty, date, time, mode, status, loading, onBook, style, }: AppointmentCardV3Props): React.ReactElement;
//# sourceMappingURL=AppointmentCardV3.d.ts.map