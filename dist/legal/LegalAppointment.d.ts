import * as React from 'react';
import { type AppointmentStatus, type AppointmentType } from './internal';
export type LegalAppointmentVariant = 'default' | 'compact';
export interface LegalAppointmentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Click handler for the whole card. */
    onClick?: () => void;
    /** Confirm the appointment (renders "Confirm" when actionable + scheduled). */
    onConfirm?: () => void;
    /** Cancel the appointment. */
    onCancel?: () => void;
    testID?: string;
}
/**
 * A scheduled legal appointment — consultation, deposition, mediation, hearing —
 * with a leading date block, type + status pills (each glyph + word so state
 * never rests on color alone), and optional location / client. When `actionable`
 * and still `scheduled`, a confirm/cancel row of real `<button>`s is shown. When
 * `onClick` is set the card is an accessible `role="button"`. All colors are
 * `--xen-*` token classes — no literals.
 */
export declare const LegalAppointment: React.ForwardRefExoticComponent<LegalAppointmentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LegalAppointment.d.ts.map