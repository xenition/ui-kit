import * as React from 'react';
/** A place on the journey — a city name plus an optional short code (IATA / airport). */
export interface TripPlace {
    /** City / place name (e.g. "San Francisco"). */
    city: string;
    /** Optional short code shown beneath the city (e.g. "SFO"). */
    code?: string;
}
export interface TripHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Where the trip starts (city + optional code). */
    origin: TripPlace;
    /** Where the trip ends (city + optional code). */
    destination: TripPlace;
    /** Localized trip start date string (e.g. "Sep 3"). */
    startDate: string;
    /** Localized trip end date string (e.g. "Sep 10"). */
    endDate?: string;
    /** Number of travelers on the trip (shows a frosted "travelers" tile when set). */
    travelers?: number;
    /** Number of nights (shows a frosted "nights" tile when set). */
    nights?: number;
    /** Optional short line under the route (e.g. "Business trip"). */
    subtitle?: string;
    /** Manage-trip CTA label (default "Manage trip"). Hidden when no `onManage`. */
    manageLabel?: string;
    /** Fires on the manage-trip action. */
    onManage?: () => void;
}
/**
 * TripHeader — a **V4** "journey" hero (web parity of the native twin). The trip
 * cover for an itinerary screen: a saturated brand-gradient ground carrying the
 * origin→destination route drawn as a rail with a small brand-gradient plane disc
 * at its midpoint (the signature FlightCardV4 motif) in near-white ink, an
 * optional subtitle, then the dates / travelers / nights as frosted glass tiles
 * and an optional manage CTA (a near-white pill). All colors from `--xen-*` token
 * classes and gradient utilities — no literal colors; dark-mode safe.
 */
export declare const TripHeader: React.ForwardRefExoticComponent<TripHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TripHeader.d.ts.map