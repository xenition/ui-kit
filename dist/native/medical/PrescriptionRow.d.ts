import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type PrescriptionStatus = 'active' | 'refill-due' | 'paused' | 'expired';
export interface PrescriptionRowProps {
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
    /** Fires when the row itself is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A medication list row for a prescription / pharmacy screen: drug name, dose,
 * directions, refills remaining, and a status marker (active / refill-due /
 * paused / expired) drawn as a glyph + label so it never relies on color alone.
 * A "Refill" action surfaces when a refill is due. Informational UI only — not
 * a medical device. Token-only colors.
 */
export declare function PrescriptionRow({ name, dose, frequency, refillsLeft, status, onRefill, onPress, style, }: PrescriptionRowProps): React.ReactElement;
//# sourceMappingURL=PrescriptionRow.d.ts.map