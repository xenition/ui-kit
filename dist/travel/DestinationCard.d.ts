import * as React from 'react';
/** Visual size for a {@link DestinationCard}. */
export type DestinationCardVariant = 'default' | 'wide';
export interface DestinationCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Fires when the card is activated. */
    onClick?: () => void;
}
/**
 * Web parity of the native `DestinationCard`: a destination discovery tile — a
 * token-styled media placeholder (no image dependency) with an overlaid glyph,
 * the place name/country, an optional tagline, a "from" price, and an optional
 * badge ribbon. Data + `onClick` only. Token-only colors.
 */
export declare const DestinationCard: React.ForwardRefExoticComponent<DestinationCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DestinationCard.d.ts.map