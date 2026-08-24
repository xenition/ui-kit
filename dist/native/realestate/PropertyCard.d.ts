import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Whether the listing is for sale or for rent (drives the price suffix). */
export type PropertyCardVariant = 'sale' | 'rent';
/** Listing status chip shown over the media. */
export type PropertyStatus = 'active' | 'pending' | 'sold' | 'new';
export interface PropertyCardProps {
    /** Street address / headline line. */
    address: string;
    /** Secondary locality line (e.g. "Brooklyn, NY 11201"). */
    locality?: string;
    /** Price in integer minor units (cents). For `rent`, this is the monthly rent. */
    priceCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Sale vs. rent — `rent` appends a "/mo" suffix to the price. */
    variant?: PropertyCardVariant;
    /** Bedroom count. */
    beds?: number;
    /** Bathroom count. */
    baths?: number;
    /** Interior area in square feet. */
    sqft?: number;
    /** Hero image URI. Omit for a token-styled placeholder. */
    imageUrl?: string;
    /** Optional status chip rendered on the media. */
    status?: PropertyStatus;
    /** Fires when the card is pressed (e.g. open the detail screen). */
    onPress?: () => void;
    /** Renders a lightweight placeholder recap instead of data. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single real-estate listing summary — hero media, price, address, and the
 * beds/baths/sqft fact row. Data + `onPress` only; nothing fetches. The `sale`
 * vs. `rent` variant only changes the price suffix ("/mo" for rentals). Colors
 * come exclusively from the compiled theme via `useXenitionTheme()`; the media
 * placeholder and status chip are token-styled. Pass `loading` for a recap.
 */
export declare function PropertyCard({ address, locality, priceCents, currency, variant, beds, baths, sqft, imageUrl, status, onPress, loading, style, }: PropertyCardProps): React.ReactElement;
//# sourceMappingURL=PropertyCard.d.ts.map