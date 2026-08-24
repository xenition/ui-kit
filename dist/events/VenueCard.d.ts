import * as React from 'react';
/** Emphasis of a {@link VenueCard}. */
export type VenueCardVariant = 'default' | 'compact';
export interface VenueCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
    /** Directions handler; renders a small directions affordance when provided. */
    onDirections?: () => void;
}
/**
 * Venue summary — a photo (or token placeholder), name, address, and optional
 * capacity / rating / distance meta. `compact` removes the media for dense
 * lists. Passing `onClick` makes the whole card an accessible button; a separate
 * `onDirections` renders a nested directions button (its clicks don't trigger
 * the card). Colors come from the `--xen-*` tokens; no literal colors.
 */
export declare const VenueCard: React.ForwardRefExoticComponent<VenueCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VenueCard.d.ts.map