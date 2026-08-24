import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
export interface MedicationScheduleProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A daily medication schedule: a timeline of doses each with its time, drug,
 * dose text, and a taken checkbox. A missed/overdue dose is flagged with a
 * glyph + label + warn color (never color alone). Renders loading and empty
 * states. Informational UI only — not a medical device. Token-only colors.
 */
export declare function MedicationSchedule({ doses, title, onToggleTaken, loading, emptyLabel, style, }: MedicationScheduleProps): React.ReactElement;
//# sourceMappingURL=MedicationSchedule.d.ts.map