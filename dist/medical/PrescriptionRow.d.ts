import * as React from 'react';
export type PrescriptionStatus = 'active' | 'refill-due' | 'paused' | 'expired';
export interface PrescriptionRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Medication name, e.g. "Atorvastatin". */
    name: string;
    /** Strength / dose, e.g. "20 mg". */
    dose?: string;
    /** Directions, e.g. "1 tablet, once daily". */
    frequency?: string;
    /** Refills remaining. */
    refillsLeft?: number;
    /** Dispensing status. Shown by glyph + text, never color alone. Defaults `active`. */
    status?: PrescriptionStatus;
    /** Fires when the refill action is pressed (shown for `refill-due`). */
    onRefill?: () => void;
    /** Fires when the row is activated — web mirror of native `onPress`. */
    onClick?: () => void;
}
/**
 * A medication list row for a prescription / pharmacy screen — the web mirror
 * of the native `PrescriptionRow`. Shows the drug name, dose, directions,
 * refills remaining, and a status marker (active / refill-due / paused /
 * expired) drawn as a glyph + label + token color so it never relies on color
 * alone. A "Refill" action surfaces when a refill is due. When `onClick` is set
 * the row is a keyboard-activatable `role="button"`. Token-only colors.
 * Informational UI only — not a medical device.
 */
export declare const PrescriptionRow: React.ForwardRefExoticComponent<PrescriptionRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PrescriptionRow.d.ts.map