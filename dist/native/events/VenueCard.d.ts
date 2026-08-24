import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Emphasis of a {@link VenueCard}. */
export type VenueCardVariant = 'default' | 'compact';
export interface VenueCardProps {
    /** Venue name. */
    name: string;
    /** Street / address line. */
    address?: string;
    /** Distance label, e.g. `1.2 mi`. */
    distance?: string;
    /** Seating / attendee capacity. */
    capacity?: number;
    /** Optional 0–5 rating. */
    rating?: number;
    /** Photo URL. When absent a token map placeholder is drawn. */
    imageUrl?: string;
    /** Alt text for the photo (defaults to the name). */
    imageAlt?: string;
    /** Density. `compact` drops the media band. */
    variant?: VenueCardVariant;
    /** Press handler, e.g. open in maps. */
    onPress?: () => void;
    /** Directions handler; renders a small directions affordance when provided. */
    onDirections?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Venue summary — a photo (or token placeholder), name, address, and optional
 * capacity / rating / distance meta. `compact` removes the media for dense
 * lists. Colors come from the compiled theme tokens; no literal colors.
 */
export declare function VenueCard({ name, address, distance, capacity, rating, imageUrl, imageAlt, variant, onPress, onDirections, style, }: VenueCardProps): React.ReactElement;
//# sourceMappingURL=VenueCard.d.ts.map