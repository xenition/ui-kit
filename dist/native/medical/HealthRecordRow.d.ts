import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type HealthRecordType = 'lab' | 'imaging' | 'note' | 'immunization' | 'prescription' | 'document';
export interface HealthRecordRowProps {
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
    /** Fires when the row is pressed to open the record. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A health-record list row for a patient timeline / documents screen: a
 * type-coded icon, the record title, a provider · date meta line, a type tag,
 * and an optional unread dot. Tap to open. The type is labelled in text as well
 * as color-coded. Informational UI only — not a medical device. Token-only
 * colors.
 */
export declare function HealthRecordRow({ type, title, date, provider, unread, onPress, style, }: HealthRecordRowProps): React.ReactElement;
//# sourceMappingURL=HealthRecordRow.d.ts.map