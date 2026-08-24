import * as React from 'react';
export type LabStatus = 'normal' | 'low' | 'high' | 'critical';
export interface LabResultRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Analyte / test name, e.g. "Hemoglobin". */
    name: string;
    /** Measured value (number or preformatted string). */
    value: React.ReactNode;
    /** Unit, e.g. "g/dL". */
    unit?: string;
    /** Reference range text, e.g. "13.5–17.5". */
    referenceRange?: string;
    /** Flag relative to the reference range. Shown by glyph + label + color. Defaults `normal`. */
    status?: LabStatus;
    /** Collection date/time line. */
    collectedAt?: string;
    /** Fires when the row is activated (e.g. open full result) — web mirror of native `onPress`. */
    onClick?: () => void;
}
/**
 * A single lab-result row — the web mirror of the native `LabResultRow`. Shows
 * the analyte name, measured value + unit, reference range, and a normal / low
 * / high / critical flag. The flag is rendered as a glyph (`✓ ▼ ▲ ⚠`) plus a
 * text label plus a warn/danger token color, so an abnormal result is never
 * signalled by color alone (accessibility + the token contract). When `onClick`
 * is set the row is a keyboard-activatable `role="button"`. Token-only colors.
 * Informational UI only — not a medical device.
 */
export declare const LabResultRow: React.ForwardRefExoticComponent<LabResultRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LabResultRow.d.ts.map