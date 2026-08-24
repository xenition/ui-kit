import * as React from 'react';
export type PatientStatus = 'stable' | 'observation' | 'critical' | 'discharged';
export interface PatientCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Patient full name. */
    name: string;
    /** Optional avatar image URL. */
    avatar?: string;
    /** Age in years. */
    age?: number;
    /** Sex / gender short label, e.g. "F", "M". */
    sex?: string;
    /** Medical record number. */
    mrn?: string;
    /** Clinical status; drives the badge (glyph + label + tone). */
    status?: PatientStatus;
    /** Optional room / bed or ward line. */
    room?: string;
    /** Fires when the card is activated to open the chart — web mirror of native `onPress`. */
    onClick?: () => void;
}
/**
 * A patient roster / chart-header card — the web mirror of the native
 * `PatientCard`. Shows the avatar, name, an age·sex·MRN demographic line, an
 * optional room, and a clinical status badge whose meaning is carried by a
 * glyph + label as well as tone. When `onClick` is set the card is a
 * keyboard-activatable `role="button"`. Composes `Avatar` + `Badge`; token-only
 * colors. Informational UI only — not a medical device.
 */
export declare const PatientCard: React.ForwardRefExoticComponent<PatientCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PatientCard.d.ts.map