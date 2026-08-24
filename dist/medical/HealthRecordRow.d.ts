import * as React from 'react';
export type HealthRecordType = 'lab' | 'imaging' | 'note' | 'immunization' | 'prescription' | 'document';
export interface HealthRecordRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Record type; drives the leading icon + type tag. */
    type: HealthRecordType;
    /** Record title, e.g. "CBC panel". */
    title: string;
    /** Date line, e.g. "24 Aug 2026". */
    date?: string;
    /** Ordering provider / facility. */
    provider?: string;
    /** Marks the record as unread/new. */
    unread?: boolean;
    /** Fires when the row is activated to open the record — web mirror of native `onPress`. */
    onClick?: () => void;
}
/**
 * A health-record list row for a patient timeline / documents screen — the web
 * mirror of the native `HealthRecordRow`. Shows a type-coded icon, the record
 * title, a provider · date meta line, a type tag, and an optional unread dot.
 * The type is labelled in text as well as token color-coded. When `onClick` is
 * set the row is a keyboard-activatable `role="button"`. Token-only colors.
 * Informational UI only — not a medical device.
 */
export declare const HealthRecordRow: React.ForwardRefExoticComponent<HealthRecordRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HealthRecordRow.d.ts.map