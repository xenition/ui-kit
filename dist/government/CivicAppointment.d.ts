import * as React from 'react';
/** Lifecycle of a booked civic appointment (DMV visit, city-hall meeting…). */
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'checked-in' | 'completed' | 'cancelled' | 'no-show';
export interface CivicAppointmentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Service the appointment is for (e.g. "License renewal"). */
    service: string;
    /** Office / department name (e.g. "DMV — Downtown"). */
    office: string;
    /** Localized date (already formatted, e.g. "Mon, Aug 24"). */
    date: string;
    /** Localized time (already formatted, e.g. "10:30 AM"). */
    time: string;
    /** Appointment lifecycle status (default `scheduled`). */
    status?: AppointmentStatus;
    /** Physical address / room shown as a secondary location line. */
    location?: string;
    /** Confirmation / queue reference (e.g. "A-042"). */
    reference?: string;
    /** Fires "Check in" (shown only when supplied and status is non-terminal). */
    onCheckIn?: () => void;
    /** Fires "Reschedule" (shown only when supplied and status is non-terminal). */
    onReschedule?: () => void;
}
/**
 * A booked civic appointment card: service, office, date/time, and a status pill
 * conveyed by **text + glyph + color** (never color alone). Optional `onCheckIn`
 * / `onReschedule` actions (real `<button>`s) appear only for non-terminal
 * appointments. Token-bound throughout — no literal colors. Web parity of the
 * native `CivicAppointment`.
 */
export declare const CivicAppointment: React.ForwardRefExoticComponent<CivicAppointmentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CivicAppointment.d.ts.map