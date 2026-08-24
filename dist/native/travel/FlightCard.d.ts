import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
/** Presentation density for a {@link FlightCard}. */
export type FlightCardVariant = 'default' | 'compact';
/** One leg of a journey (origin → destination). */
export interface FlightLeg {
    /** IATA airport code, e.g. `'SFO'`. */
    code: string;
    /** Human airport / city name. */
    city?: string;
    /** Local departure/arrival clock time, pre-formatted (e.g. `'08:15'`). */
    time: string;
}
export interface FlightCardProps {
    /** Marketing carrier name. */
    airline: string;
    /** Flight designator, e.g. `'XN 482'`. */
    flightNumber?: string;
    /** Departure leg. */
    from: FlightLeg;
    /** Arrival leg. */
    to: FlightLeg;
    /** Total elapsed time, pre-formatted (e.g. `'5h 40m'`). */
    duration: string;
    /** Number of stops; `0` renders "Nonstop". */
    stops?: number;
    /** Price in integer minor units (cents) for the whole fare. */
    priceCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Density variant. */
    variant?: FlightCardVariant;
    /** Surface treatment (visual diversity). Default `'classic'` — the original look. */
    appearance?: Appearance;
    /** Fires when the card is pressed (e.g. to open fare details). */
    onPress?: () => void;
    /** Shows a shimmer-free skeleton recap instead of data. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single bookable flight itinerary — carrier, the origin→destination route
 * with departure/arrival times, duration, stop count, and an optional fare.
 * Data + `onPress` only; nothing fetches. Token-only colors via
 * `useXenitionTheme()`. Pass `loading` for a placeholder recap and
 * `variant="compact"` for a denser list row.
 */
export declare function FlightCard({ airline, flightNumber, from, to, duration, stops, priceCents, currency, variant, appearance, onPress, loading, style, }: FlightCardProps): React.ReactElement;
//# sourceMappingURL=FlightCard.d.ts.map