import * as React from 'react';
import type { AppointmentCardProps } from './AppointmentCard';
/** V4 layout choices for the "clinic" design. */
export type AppointmentCardLayout = 'full' | 'compact';
/** Drop-in for {@link AppointmentCardProps} — same props, the V4 "clinic" design. */
export interface AppointmentCardV4Props extends AppointmentCardProps {
    /** V4 layout: `full` (card, default) or `compact` (dense single row). */
    variant?: AppointmentCardLayout;
}
/**
 * AppointmentCard — **V4** "clinic" design. The calm, clinical take on an
 * appointment: an elevated rounded card with a soft shadow, clinician identity,
 * a date-time strip with a delivery-mode glyph, a labelled status badge (never
 * color alone), and one dominant action. Honors the V4 `variant` — `full`
 * (card, default) and `compact` (a dense single row) — identical props/behavior
 * to {@link AppointmentCardProps}. Token-only colors via `useXenitionTheme()`.
 * Informational UI only — not a medical device.
 */
export declare function AppointmentCardV4({ doctorName, specialty, doctorAvatar, date, time, mode, status, location, loading, onBook, onReschedule, bookLabel, variant, style, }: AppointmentCardV4Props): React.ReactElement;
//# sourceMappingURL=AppointmentCardV4.d.ts.map