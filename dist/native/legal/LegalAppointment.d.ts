import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type AppointmentStatus, type AppointmentType } from './internal';
export type LegalAppointmentVariant = 'default' | 'compact';
export interface LegalAppointmentProps {
    /** Appointment type — glyph + word chip. */
    type: AppointmentType;
    /** Pre-formatted date label (e.g. "Mon, Aug 24"). */
    date: string;
    /** Pre-formatted time / range label (e.g. "10:00–11:00 AM"). */
    time?: string;
    /** Location / room / video-link label. */
    location?: string;
    /** Client or counterparty name. */
    client?: string;
    /** Scheduling state — glyph + word pill, never color alone. */
    status?: AppointmentStatus;
    /** Density. */
    variant?: LegalAppointmentVariant;
    /** Whether to render the confirm/cancel action row (when scheduled). */
    actionable?: boolean;
    /** Tap handler for the whole card. */
    onPress?: () => void;
    /** Confirm the appointment (renders "Confirm" when actionable + scheduled). */
    onConfirm?: () => void;
    /** Cancel the appointment. */
    onCancel?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A scheduled legal appointment — consultation, deposition, mediation, hearing —
 * with a leading date block, type + status pills (each glyph + word so state
 * never rests on color alone), and optional location / client. When `actionable`
 * and still `scheduled`, a confirm/cancel row is shown. All colors are theme
 * tokens — no literals.
 */
export declare function LegalAppointment({ type, date, time, location, client, status, variant, actionable, onPress, onConfirm, onCancel, testID, style, }: LegalAppointmentProps): React.ReactElement;
//# sourceMappingURL=LegalAppointment.d.ts.map