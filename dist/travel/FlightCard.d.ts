import * as React from 'react';
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
export interface FlightCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Fires when the card is activated (e.g. to open fare details). */
    onClick?: () => void;
    /** Shows a placeholder recap instead of data. */
    loading?: boolean;
}
/**
 * Web parity of the native `FlightCard`: a single bookable flight itinerary —
 * carrier, the origin→destination route with departure/arrival times, duration,
 * stop count, and an optional fare. Data + `onClick` only; nothing fetches. All
 * colors come from the `--xen-*` token classes (no literal colors). Pass
 * `loading` for a placeholder recap and `variant="compact"` for a denser row.
 */
export declare const FlightCard: React.ForwardRefExoticComponent<FlightCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FlightCard.d.ts.map