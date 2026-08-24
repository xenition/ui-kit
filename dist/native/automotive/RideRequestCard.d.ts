import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Presentation density / intent for a {@link RideRequestCard}. */
export type RideRequestVariant = 'incoming' | 'scheduled' | 'compact';
/** A single endpoint on the requested trip. */
export interface RideStop {
    /** Short label, e.g. `'Pickup'` or a place name. */
    label: string;
    /** Full address line. */
    address: string;
}
export interface RideRequestCardProps {
    /** Rider display name. */
    riderName: string;
    /** Optional rider avatar URL. */
    riderAvatarUrl?: string;
    /** Rider's historical star rating (0–5). */
    riderRating?: number;
    /** Pickup endpoint. */
    pickup: RideStop;
    /** Drop-off endpoint. */
    dropoff: RideStop;
    /** Estimated fare in integer minor units (cents). */
    fareCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Estimated distance to pickup, pre-formatted (e.g. `'1.2 mi'`). */
    distanceToPickup?: string;
    /** Estimated trip duration, pre-formatted (e.g. `'18 min'`). */
    tripDuration?: string;
    /** Scheduled time label (shown for `scheduled` variant). */
    scheduledFor?: string;
    /** Surge multiplier badge (e.g. `1.5` → "1.5x"). */
    surgeMultiplier?: number;
    /** Presentation variant. */
    variant?: RideRequestVariant;
    /** Fires when the driver accepts the request. */
    onAccept?: () => void;
    /** Fires when the driver declines the request. */
    onDecline?: () => void;
    /** Placeholder skeleton while the request loads. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * An inbound ride request for a driver to accept or decline — rider identity and
 * rating, the pickup→drop-off route, an optional fare estimate, plus trip
 * distance/duration and an optional surge badge. Data + `onAccept`/`onDecline`
 * only; nothing fetches. Endpoints are marked with text-labelled glyphs (not
 * color alone) and the surge state is spelled out. Colors come from semantic
 * tokens and `withAlpha` tints — no literal colors. `variant="scheduled"` swaps
 * the header for a scheduled-time line; `variant="compact"` tightens spacing.
 */
export declare function RideRequestCard({ riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency, distanceToPickup, tripDuration, scheduledFor, surgeMultiplier, variant, onAccept, onDecline, loading, style, }: RideRequestCardProps): React.ReactElement;
//# sourceMappingURL=RideRequestCard.d.ts.map