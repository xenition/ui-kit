import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type VetAppointmentStatus = 'upcoming' | 'today' | 'completed' | 'cancelled';
export type VetVisitReason = 'checkup' | 'vaccination' | 'surgery' | 'dental' | 'emergency' | 'grooming' | 'other';
export interface VetAppointmentCardProps {
    /** Vet or veterinary clinic name. */
    vetName: string;
    /** Clinic / location line. */
    clinic?: string;
    /** Reason for the visit; drives the icon. */
    reason: VetVisitReason;
    /** Appointment date (already formatted). */
    date: string;
    /** Appointment time (already formatted). */
    time?: string;
    /** Lifecycle status; drives the chip + accent. */
    status: VetAppointmentStatus;
    /** Pet name shown as a sub-label. */
    petName?: string;
    /** Optional notes / preparation instructions. */
    notes?: string;
    /** Primary action label (confirm/reschedule) — hidden when the visit is closed. */
    actionLabel?: string;
    onAction?: () => void;
    /** Secondary cancel action for open appointments. */
    onCancel?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A vet-visit card: reason icon, vet + clinic, the scheduled date/time, and a
 * status chip. Open visits (`upcoming`/`today`) expose confirm + cancel actions;
 * `completed`/`cancelled` visits are read-only. Status reads via a labelled chip
 * plus a left accent bar. Token-only colors.
 */
export declare function VetAppointmentCard({ vetName, clinic, reason, date, time, status, petName, notes, actionLabel, onAction, onCancel, style, }: VetAppointmentCardProps): React.ReactElement;
//# sourceMappingURL=VetAppointmentCard.d.ts.map