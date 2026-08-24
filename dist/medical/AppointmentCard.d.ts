import * as React from 'react';
export type AppointmentStatus = 'upcoming' | 'confirmed' | 'completed' | 'cancelled';
export type AppointmentMode = 'in-person' | 'video' | 'phone';
export interface AppointmentCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Clinician name shown as the appointment owner. */
    doctorName: string;
    /** Clinician specialty, e.g. "Cardiology". */
    specialty?: string;
    /** Optional avatar image URL for the clinician. */
    doctorAvatar?: string;
    /** Human-readable date, e.g. "Mon, 24 Aug". */
    date: string;
    /** Human-readable time, e.g. "10:30 AM". */
    time: string;
    /** Delivery mode; drives the icon + label. Defaults to `in-person`. */
    mode?: AppointmentMode;
    /** Lifecycle status; drives the badge tone/label. Defaults to `upcoming`. */
    status?: AppointmentStatus;
    /** Optional location / clinic line. */
    location?: string;
    /** Skeleton placeholder while the appointment loads. */
    loading?: boolean;
    /** Fires when the primary CTA is pressed (book / join) — web mirror of native `onBook`. */
    onBook?: () => void;
    /** Fires when the secondary reschedule action is pressed. */
    onReschedule?: () => void;
    /** Overrides the primary CTA label. */
    bookLabel?: string;
}
/**
 * A single appointment summary card for clinical / telehealth schedules — the
 * web (React DOM) mirror of the native `AppointmentCard`. Shows clinician
 * identity, a date-time strip, a delivery-mode chip (in-person / video /
 * phone), a status badge, and one dominant action. For a `video` appointment
 * the CTA reads "Join call"; otherwise "Book" (a completed / cancelled state
 * hides the actions). Status is carried by text + badge, never color alone.
 * Composes `Card`, `Avatar`, `Badge`, and `Button`; every color is a `--xen-*`
 * token class. Informational UI only — not a medical device.
 */
export declare const AppointmentCard: React.ForwardRefExoticComponent<AppointmentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AppointmentCard.d.ts.map