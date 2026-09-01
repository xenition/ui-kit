import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { PropertyStatus } from './PropertyCard';
export interface ListingHeroProps {
    /** Hero photo URI. Omit to fall back to the brand-gradient ground. */
    imageUrl?: string;
    /** Price in integer minor units (cents). For `rent`, this is the monthly rent. */
    priceCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Sale vs. rent — `rent` appends a "/mo" suffix to the price. Default `sale`. */
    variant?: 'sale' | 'rent';
    /** Street address / headline line, overlaid on the scrim. */
    address: string;
    /** Secondary locality line (e.g. "Brooklyn, NY 11201"). */
    locality?: string;
    /** Optional status chip overlaid on the photo. */
    status?: PropertyStatus;
    /** Bedroom count, shown in the facts strip. */
    beds?: number;
    /** Bathroom count, shown in the facts strip. */
    baths?: number;
    /** Interior area in square feet, shown in the facts strip. */
    sqft?: number;
    /** Total photo count, shown as a frosted counter over the media. */
    photoCount?: number;
    /** Whether the listing is currently saved (fills the heart). */
    saved?: boolean;
    /** Fires when the saved/heart control is toggled. Hidden when unset. */
    onSave?: () => void;
    /** Fires when the share control is pressed. Hidden when unset. */
    onShare?: () => void;
    /** Fires on the primary tour CTA. The CTA is hidden when unset. */
    onTour?: () => void;
    /** Primary CTA label (default "Schedule tour"). */
    tourLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * ListingHero — the property-detail **peak** for the real-estate V4 "listing"
 * line. A full-bleed hero photo with a bottom `listingScrim` gradient carries the
 * near-white price + address; a status chip, a frosted photo counter, and
 * saved/share controls float over the media; the beds/baths/sqft facts read as
 * frosted tiles and a near-white Tour pill anchors the bottom. With no `imageUrl`
 * it falls back to the brand gradient ground (`listingGradient`). Presentational
 * — shaped data + callbacks, nothing fetches. Token-only colors via
 * `useXenitionTheme()` + the listing ramp helpers, dark-mode safe. The
 * `sale`/`rent` variant only changes the price suffix.
 */
export declare function ListingHero({ imageUrl, priceCents, currency, variant, address, locality, status, beds, baths, sqft, photoCount, saved, onSave, onShare, onTour, tourLabel, style, }: ListingHeroProps): React.ReactElement;
//# sourceMappingURL=ListingHero.d.ts.map