import * as React from 'react';
import type { PropertyStatus } from './PropertyCard';
export interface ListingHeroProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Hero photo URL. Omit to fall back to the brand-gradient ground. */
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
}
/**
 * ListingHero — the property-detail **peak** for the real-estate V4 "listing"
 * line (web parity of the native twin). A full-bleed hero photo with a bottom
 * `listingScrim` gradient carries the near-white price + address; a status chip,
 * a frosted photo counter, and saved/share controls float over the media; the
 * beds/baths/sqft facts read as frosted tiles and a near-white Tour pill anchors
 * the bottom. With no `imageUrl` it falls back to the brand gradient ground
 * (`from-primary-500 to-primary-700`). Presentational — shaped data + callbacks,
 * nothing fetches. Token-only colors (`--xen-*` classes + gradient utilities),
 * dark-mode safe. The `sale`/`rent` variant only changes the price suffix.
 */
export declare const ListingHero: React.ForwardRefExoticComponent<ListingHeroProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ListingHero.d.ts.map