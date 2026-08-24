import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Layout for a {@link HotelCard}. */
export type HotelCardVariant = 'stacked' | 'row';
export interface HotelCardProps {
    /** Property name. */
    name: string;
    /** Locality line, e.g. `'Shibuya, Tokyo'`. */
    location?: string;
    /** Guest review score, 0–5, drawn as stars. */
    rating?: number;
    /** Number of reviews behind the rating. */
    reviewCount?: number;
    /** Nightly price in integer minor units (cents). */
    priceCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Short amenity chips (e.g. `['Free Wi-Fi', 'Pool']`). */
    tags?: readonly string[];
    /** Optional "was" nightly price in cents; struck through when higher. */
    compareAtCents?: number;
    /** Layout variant. */
    variant?: HotelCardVariant;
    /** Fires when the card is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A hotel search result — name, location, guest rating, nightly price, and a
 * few amenity chips over a token-styled media placeholder (no image
 * dependency; the app can overlay its own `<Image>`). Data + `onPress` only.
 * Token-only colors.
 */
export declare function HotelCard({ name, location, rating, reviewCount, priceCents, currency, tags, compareAtCents, variant, onPress, style, }: HotelCardProps): React.ReactElement;
//# sourceMappingURL=HotelCard.d.ts.map