import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type RecurrenceFreq = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
export interface RecurrenceOption {
    value: RecurrenceFreq;
    label: string;
}
export interface RecurrenceRowProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * The recurrence editor row for an event form. `inline` renders preset chips
 * (selection announced via `accessibilityState.selected`, not color-alone);
 * `summary` collapses to a single tappable row that shows the current rule and
 * defers to a host-owned picker. Token colors only.
 */
export declare function RecurrenceRow({ value, onChange, label, variant, onPress, options, style, }: RecurrenceRowProps): React.ReactElement;
//# sourceMappingURL=RecurrenceRow.d.ts.map