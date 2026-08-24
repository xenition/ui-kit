import * as React from 'react';
import type { AppointmentCardProps } from './AppointmentCard';
/** Same public contract as {@link AppointmentCard} — a drop-in alternate design. */
export type AppointmentCardV3Props = AppointmentCardProps;
/**
 * AppointmentCard, redesigned (v3): a **dense agenda line**. A mode glyph leads,
 * the clinician + date·time share a line over a specialty·location subtitle, a
 * status dot + word marks state (never color alone), and a compact CTA hugs the
 * right. Hairline-bordered for schedule lists. Same props, token-only.
 */
export declare const AppointmentCardV3: React.ForwardRefExoticComponent<AppointmentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AppointmentCardV3.d.ts.map