import * as React from 'react';
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
    /** Extra classes on the root. */
    className?: string;
}
/**
 * A timeline of pet-health log entries — each a kind icon, text, and timestamp
 * threaded on a connective rail. Handles a `loading` skeleton and an explicit
 * empty state (shared {@link EmptyState}). Kind is conveyed by icon + label text,
 * not color alone. Token-only colors.
 */
export declare const PetHealthLog: React.ForwardRefExoticComponent<PetHealthLogProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PetHealthLog.d.ts.map