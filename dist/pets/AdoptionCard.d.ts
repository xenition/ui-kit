import * as React from 'react';
export type AdoptionStatus = 'available' | 'pending' | 'adopted' | 'fostered';
export interface AdoptionCardProps {
    /** Pet's name. */
    name: string;
    /** Species / breed line, e.g. "Tabby cat". */
    breed?: string;
    /** Age label, e.g. "2 yrs". */
    age?: string;
    /** Sex label. */
    sex?: string;
    /** Shelter / rescue name. */
    shelter?: string;
    /** Photo URL for the banner; a glyph placeholder shows otherwise. */
    photoUrl?: string;
    /** Placeholder glyph when there's no photo. */
    glyph?: string;
    /** Adoption fee label, e.g. "$120". */
    fee?: string;
    /** Availability status; drives the chip. */
    status: AdoptionStatus;
    /** Whether the viewer has favorited this listing. */
    favorited?: boolean;
    /** Apply/adopt action label; hidden once adopted or no `onApply`. */
    applyLabel?: string;
    onApply?: () => void;
    onFavorite?: () => void;
    /** Makes the whole card an activatable `role="button"` (keyboard + click). */
    onClick?: () => void;
    /** Extra classes on the card root. */
    className?: string;
}
/**
 * An adoption listing card: photo banner (or emoji placeholder), name + breed,
 * age/sex meta, shelter, a status chip, an optional fee, and adopt + favorite
 * actions (real `<button>`s that don't bubble to the card). The whole card is
 * activatable when `onClick` is set. Availability reads via a labelled chip (not
 * color alone). Token-only colors; a styled `div` stands in for the pet photo.
 */
export declare const AdoptionCard: React.ForwardRefExoticComponent<AdoptionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AdoptionCard.d.ts.map