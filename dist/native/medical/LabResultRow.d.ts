import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type LabStatus = 'normal' | 'low' | 'high' | 'critical';
export interface LabResultRowProps {
    /** Analyte / test name, e.g. "Hemoglobin". */
    name: string;
    /** Measured value (number or preformatted string). */
    value: React.ReactNode;
    /** Unit, e.g. "g/dL". */
    unit?: string;
    /** Reference range text, e.g. "13.5–17.5". */
    referenceRange?: string;
    /** Flag relative to the reference range. Shown by glyph + label + color. */
    status?: LabStatus;
    /** Collection date/time line. */
    collectedAt?: string;
    /** Fires when the row is pressed (e.g. open full result). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single lab-result row: analyte name, measured value + unit, reference
 * range, and a normal / low / high / critical flag. The flag is rendered as a
 * glyph (`✓ ▼ ▲ ⚠`) plus a text label plus a warn/danger token color, so an
 * abnormal result is never signalled by color alone (accessibility + the
 * project token contract). Informational UI only — not a medical device.
 * Token-only colors.
 */
export declare function LabResultRow({ name, value, unit, referenceRange, status, collectedAt, onPress, style, }: LabResultRowProps): React.ReactElement;
//# sourceMappingURL=LabResultRow.d.ts.map