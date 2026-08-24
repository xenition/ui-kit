import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type HealthLogKind = 'symptom' | 'observation' | 'medication' | 'diet' | 'incident' | 'note';
export interface HealthLogEntry {
    id?: string | number;
    /** Entry category; drives the icon + accent. */
    kind: HealthLogKind;
    /** What happened. */
    text: string;
    /** When it was logged (already formatted). */
    timestamp?: string;
    /** Who logged it. */
    author?: string;
}
export interface PetHealthLogProps {
    /** Chronological log entries (newest first is conventional). */
    entries: HealthLogEntry[];
    /** Optional section title. */
    title?: string;
    /** Show a skeleton while data loads. */
    loading?: boolean;
    /** Copy shown when there are no entries. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A timeline of pet-health log entries — each a kind icon, text, and timestamp
 * threaded on a connective rail. Handles a `loading` skeleton and an explicit
 * empty state. Kind is conveyed by icon + label text, not color alone.
 * Token-only colors.
 */
export declare function PetHealthLog({ entries, title, loading, emptyLabel, style, }: PetHealthLogProps): React.ReactElement;
//# sourceMappingURL=PetHealthLog.d.ts.map