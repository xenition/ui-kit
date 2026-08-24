import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Lifecycle of a booked civic appointment (DMV visit, city-hall meeting…). */
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'checked-in' | 'completed' | 'cancelled' | 'no-show';
export interface CivicAppointmentProps {
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
    /** Fires "Check in" (shown only when supplied and status is upcoming). */
    onCheckIn?: () => void;
    /** Fires "Reschedule" (shown only when supplied and not terminal). */
    onReschedule?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A booked civic appointment card: service, office, date/time, and a status pill
 * conveyed by **text + glyph + color** (never color alone). Optional
 * `onCheckIn` / `onReschedule` actions appear only for non-terminal
 * appointments. Every color traces to a `SemanticColors` slot or a token-derived
 * tint — no literals.
 */
export declare function CivicAppointment({ service, office, date, time, status, location, reference, onCheckIn, onReschedule, style, }: CivicAppointmentProps): React.ReactElement;
//# sourceMappingURL=CivicAppointment.d.ts.map