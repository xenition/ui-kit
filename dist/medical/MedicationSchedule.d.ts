import * as React from 'react';
export interface MedicationDose {
    /** Stable identifier returned through `onToggleTaken`. */
    id: string;
    /** Medication name, e.g. "Metformin". */
    name: string;
    /** Dose text, e.g. "500 mg". */
    dose?: string;
    /** Scheduled time label, e.g. "08:00". */
    time: string;
    /** Whether this dose has been taken. */
    taken?: boolean;
    /** Marks the dose as missed/overdue (past its time, not taken). */
    missed?: boolean;
}
export interface MedicationScheduleProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Doses to render, in display order. */
    doses: MedicationDose[];
    /** Optional list heading. */
    title?: string;
    /** Fires with the dose id and its next taken state. */
    onToggleTaken?: (id: string, nextTaken: boolean) => void;
    /** Skeleton placeholder while the schedule loads. */
    loading?: boolean;
    /** Message shown when there are no doses. */
    emptyLabel?: string;
}
/**
 * A daily medication schedule — the web mirror of the native
 * `MedicationSchedule`. A timeline of doses, each with its time, drug, dose
 * text, and a taken checkbox (`role="checkbox"`, keyboard-activatable). A
 * missed/overdue dose is flagged with a glyph + label + warn color, never color
 * alone. Renders loading and empty (`EmptyState`) states. Token-only colors.
 * Informational UI only — not a medical device.
 */
export declare const MedicationSchedule: React.ForwardRefExoticComponent<MedicationScheduleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MedicationSchedule.d.ts.map