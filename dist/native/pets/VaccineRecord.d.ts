import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type VaccineStatus = 'current' | 'due-soon' | 'overdue' | 'unknown';
export interface VaccineRecordProps {
    /** Vaccine name, e.g. "Rabies". */
    name: string;
    /** Where the record stands. Drives the status chip + accent. */
    status: VaccineStatus;
    /** Date administered (already formatted). */
    administered?: string;
    /** Next-due date (already formatted). */
    nextDue?: string;
    /** Administering vet / clinic. */
    administeredBy?: string;
    /** Batch / lot number. */
    lotNumber?: string;
    /** Label for the renew action; hidden when no `onRenew`. */
    renewLabel?: string;
    onRenew?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single immunization line item: vaccine name with a status chip
 * (`current`/`due-soon`/`overdue`), the administered + next-due dates, and an
 * optional "Book booster" action for anything not current. Status is conveyed by
 * an icon + text label (never color alone). Token-only colors.
 */
export declare function VaccineRecord({ name, status, administered, nextDue, administeredBy, lotNumber, renewLabel, onRenew, style, }: VaccineRecordProps): React.ReactElement;
//# sourceMappingURL=VaccineRecord.d.ts.map