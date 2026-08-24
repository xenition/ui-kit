import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Outcome of a past trip. */
export type TripOutcome = 'completed' | 'cancelled' | 'no-show';
/** Presentation for a {@link TripHistoryRow}. */
export type TripHistoryVariant = 'default' | 'compact';
export interface TripHistoryRowProps {
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
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One past trip in a history list — the from→to route, when it happened, the
 * fare, an outcome (completed/cancelled/no-show, shown as a text-labelled badge
 * so meaning never rests on color), and an optional rider rating. Data +
 * `onPress` only; nothing fetches. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors. `variant="compact"` tightens the row.
 * For an empty history list, render {@link TripHistoryEmpty} instead.
 */
export declare function TripHistoryRow({ from, to, dateLabel, fareCents, currency, outcome, rating, variant, onPress, style, }: TripHistoryRowProps): React.ReactElement;
export interface TripHistoryEmptyProps {
    /** Headline for the empty state. */
    title?: string;
    /** Supporting line. */
    message?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * The empty-state companion to {@link TripHistoryRow} — shown when a rider or
 * driver has no past trips. Token-only colors; a plain informative panel.
 */
export declare function TripHistoryEmpty({ title, message, style, }: TripHistoryEmptyProps): React.ReactElement;
//# sourceMappingURL=TripHistoryRow.d.ts.map