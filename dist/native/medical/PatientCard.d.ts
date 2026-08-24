import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type PatientStatus = 'stable' | 'observation' | 'critical' | 'discharged';
export interface PatientCardProps {
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
    /** Fires when the card is pressed to open the chart. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A patient roster / chart-header card: avatar, name, an age·sex·MRN demographic
 * line, an optional room, and a clinical status badge whose meaning is carried
 * by a glyph + label as well as tone. Tap to open the record. Informational UI
 * only — not a medical device. Token-only colors.
 */
export declare function PatientCard({ name, avatar, age, sex, mrn, status, room, onPress, style, }: PatientCardProps): React.ReactElement;
//# sourceMappingURL=PatientCard.d.ts.map