import * as React from 'react';
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
    /** Extra classes on the root. */
    className?: string;
}
/**
 * A single immunization line item: vaccine name with a status chip
 * (`current`/`due-soon`/`overdue`), the administered + next-due dates, and an
 * optional "Book booster" action for anything not current. Status is conveyed by
 * a glyph + text label (never color alone). Token-only colors.
 */
export declare const VaccineRecord: React.ForwardRefExoticComponent<VaccineRecordProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VaccineRecord.d.ts.map