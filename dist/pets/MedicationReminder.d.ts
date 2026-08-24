import * as React from 'react';
export type MedicationForm = 'pill' | 'liquid' | 'injection' | 'topical' | 'drops' | 'chew';
export type MedicationState = 'due' | 'upcoming' | 'taken' | 'missed';
export interface MedicationReminderProps {
    /** Medication name, e.g. "Apoquel". */
    name: string;
    /** Dosage, e.g. "5 mg". */
    dosage?: string;
    /** Form; drives the icon. */
    form?: MedicationForm;
    /** Frequency label, e.g. "Twice daily". */
    frequency?: string;
    /** Next dose time (already formatted). */
    nextDose?: string;
    /** Reminder state; drives the chip + accent. */
    state: MedicationState;
    /** Doses remaining in the course. */
    dosesLeft?: number;
    /** Label for the mark-taken action; hidden once taken or no handler. */
    markLabel?: string;
    onMarkTaken?: () => void;
    /** Extra classes on the root. */
    className?: string;
}
/**
 * A medication dose reminder: form icon, name + dosage, frequency, the next-dose
 * time, and a state chip. Actionable states (`due`/`upcoming`/`missed`) expose a
 * real "Mark taken" `<button>`. State reads via a labelled chip + left accent
 * (never color alone). Token-only colors.
 */
export declare const MedicationReminder: React.ForwardRefExoticComponent<MedicationReminderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MedicationReminder.d.ts.map