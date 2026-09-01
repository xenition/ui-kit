import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** A place on the journey — a city name plus an optional short code (IATA / airport). */
export interface TripPlace {
    /** City / place name (e.g. "San Francisco"). */
    city: string;
    /** Optional short code shown beneath the city (e.g. "SFO"). */
    code?: string;
}
export interface TripHeaderProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * TripHeader — a **V4** "journey" hero. The trip cover for an itinerary screen: a
 * saturated brand-gradient ground carrying the origin→destination route drawn as
 * a rail with a small brand-gradient plane disc at its midpoint (the signature
 * FlightCardV4 motif) in near-white ink, an optional subtitle, then the dates /
 * travelers / nights as frosted glass tiles and an optional manage CTA (a
 * near-white pill). Token-only colors via `useXenitionTheme()` and the `journey*`
 * helpers; dark-mode safe.
 */
export declare function TripHeader({ origin, destination, startDate, endDate, travelers, nights, subtitle, manageLabel, onManage, style, }: TripHeaderProps): React.ReactElement;
//# sourceMappingURL=TripHeader.d.ts.map