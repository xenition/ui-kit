import * as React from 'react';
/** Whether the listing is for sale or for rent (drives the price suffix). */
export type PropertyCardVariant = 'sale' | 'rent';
/** Listing status chip shown over the media. */
export type PropertyStatus = 'active' | 'pending' | 'sold' | 'new';
export interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
    /** Hero image URL. Omit for a token-styled placeholder. */
    imageUrl?: string;
    /** Optional status chip rendered on the media. */
    status?: PropertyStatus;
    /** Renders a lightweight placeholder recap instead of data. */
    loading?: boolean;
}
/**
 * Web parity of the native `PropertyCard`: a single real-estate listing summary
 * — hero media, price, address, and the beds/baths/sqft fact row. Data +
 * `onClick` only; nothing fetches. The `sale` vs. `rent` variant only changes
 * the price suffix ("/mo" for rentals). All colors come from the `--xen-*`
 * tokens via Tailwind classes — no literal colors; the media placeholder and
 * status chip are token-styled. Pass `loading` for a recap. When `onClick` is
 * set the card becomes a keyboard-activatable button.
 */
export declare const PropertyCard: React.ForwardRefExoticComponent<PropertyCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PropertyCard.d.ts.map