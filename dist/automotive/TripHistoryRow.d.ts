import * as React from 'react';
/** Outcome of a past trip. */
export type TripOutcome = 'completed' | 'cancelled' | 'no-show';
/** Presentation for a {@link TripHistoryRow}. */
export type TripHistoryVariant = 'default' | 'compact';
export interface TripHistoryRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Pickup label / address (short). */
    from: string;
    /** Drop-off label / address (short). */
    to: string;
    /** When the trip happened, pre-formatted (e.g. `'Sep 3, 8:14 AM'`). */
    dateLabel?: string;
    /** Fare charged in integer minor units (cents). */
    fareCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Trip outcome. */
    outcome?: TripOutcome;
    /** Star rating the rider gave (0–5); hidden when omitted. */
    rating?: number;
    /** Presentation variant. */
    variant?: TripHistoryVariant;
    /** Fires when the row is pressed (receipt / detail). */
    onClick?: () => void;
}
/**
 * One past trip in a history list — the from→to route, when it happened, the
 * fare, an outcome (completed/cancelled/no-show, shown as a text-labelled badge
 * so meaning never rests on color), and an optional rider rating. Data +
 * `onClick` only; nothing fetches. Colors come from `--xen-*` token classes — no
 * literal colors. When `onClick` is set the row is a keyboard-operable
 * `role="button"`. `variant="compact"` tightens the row. For an empty history
 * list, render {@link TripHistoryEmpty} instead. Web parity of the native
 * `TripHistoryRow`.
 */
export declare const TripHistoryRow: React.ForwardRefExoticComponent<TripHistoryRowProps & React.RefAttributes<HTMLDivElement>>;
export interface TripHistoryEmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Headline for the empty state. */
    title?: string;
    /** Supporting line. */
    message?: string;
}
/**
 * The empty-state companion to {@link TripHistoryRow} — shown when a rider or
 * driver has no past trips. Wraps the shared {@link EmptyState}; token-only.
 */
export declare const TripHistoryEmpty: React.ForwardRefExoticComponent<TripHistoryEmptyProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TripHistoryRow.d.ts.map