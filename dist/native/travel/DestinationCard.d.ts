import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
/** Visual size for a {@link DestinationCard}. */
export type DestinationCardVariant = 'default' | 'wide';
export interface DestinationCardProps {
    /** Destination/city name. */
    name: string;
    /** Country or region line. */
    country?: string;
    /** Short evocative tagline. */
    tagline?: string;
    /** Leading emoji/glyph overlaid on the media placeholder (e.g. `'🗼'`). */
    glyph?: string;
    /** "From" price in integer minor units (cents). */
    fromCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Corner ribbon label, e.g. `'Popular'`. */
    badge?: string;
    /** Size variant. */
    variant?: DestinationCardVariant;
    /** Surface treatment (visual diversity). Default `'classic'` — the original look. */
    appearance?: Appearance;
    /** Fires when the card is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A destination discovery tile — a token-styled media placeholder (no image
 * dependency) with an overlaid glyph, the place name/country, an optional
 * tagline, a "from" price, and an optional badge ribbon. Data + `onPress`
 * only. Token-only colors.
 */
export declare function DestinationCard({ name, country, tagline, glyph, fromCents, currency, badge, variant, appearance, onPress, style, }: DestinationCardProps): React.ReactElement;
//# sourceMappingURL=DestinationCard.d.ts.map