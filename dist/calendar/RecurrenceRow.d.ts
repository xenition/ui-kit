import * as React from 'react';
export type RecurrenceFreq = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
export interface RecurrenceOption {
    value: RecurrenceFreq;
    label: string;
}
export interface RecurrenceRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** The selected recurrence frequency. */
    value: RecurrenceFreq;
    /** Fires when a different frequency is chosen. */
    onChange?: (value: RecurrenceFreq) => void;
    /** Leading label (default "Repeat"). */
    label?: string;
    /**
     * `inline` (default) shows selectable preset chips; `summary` collapses to a
     * single tappable row (host opens its own picker via `onPress`).
     */
    variant?: 'inline' | 'summary';
    /** For `summary` variant — fires when the row is tapped. */
    onPress?: () => void;
    /** Override the preset list. */
    options?: RecurrenceOption[];
}
/**
 * The recurrence editor row for an event form. `inline` renders preset chips
 * (selection announced via `aria-checked`, not color-alone); `summary`
 * collapses to a single tappable row that shows the current rule and defers to a
 * host-owned picker. Token colors only.
 */
export declare const RecurrenceRow: React.ForwardRefExoticComponent<RecurrenceRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RecurrenceRow.d.ts.map