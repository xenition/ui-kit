import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A medication dose reminder: form icon, name + dosage, frequency, the next-dose
 * time, and a state chip. Actionable states (`due`/`upcoming`/`missed`) expose a
 * tappable "Mark taken" control. State reads via a labelled chip + left accent
 * (never color alone). Token-only colors.
 */
export declare function MedicationReminder({ name, dosage, form, frequency, nextDose, state, dosesLeft, markLabel, onMarkTaken, style, }: MedicationReminderProps): React.ReactElement;
//# sourceMappingURL=MedicationReminder.d.ts.map