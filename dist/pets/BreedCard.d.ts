import * as React from 'react';
export type BreedSize = 'toy' | 'small' | 'medium' | 'large' | 'giant';
export type BreedEnergy = 'low' | 'moderate' | 'high';
export interface BreedCardProps {
    /** Breed name, e.g. "Border Collie". */
    name: string;
    /** Species label, e.g. "Dog". */
    species?: string;
    /** Photo URL rendered as a banner; a glyph placeholder shows otherwise. */
    photoUrl?: string;
    /** Emoji placeholder when there's no photo. */
    glyph?: string;
    /** Size class. */
    size?: BreedSize;
    /** Typical energy level; rendered as labelled dots. */
    energy?: BreedEnergy;
    /** Typical lifespan label, e.g. "12–15 yrs". */
    lifespan?: string;
    /** Short list of temperament traits. */
    traits?: string[];
    /** Makes the whole card an activatable `role="button"` (keyboard + click). */
    onClick?: () => void;
    /** Extra classes on the card root. */
    className?: string;
}
/**
 * A breed reference card: banner (photo or emoji placeholder), name + species,
 * a stat row (size class, lifespan), a labelled energy meter, and temperament
 * trait chips. Activatable `role="button"` when `onClick` is set. The energy
 * level is conveyed by both dots and a text label. Token-only colors; a styled
 * `div` placeholder stands in for a real breed photo.
 */
export declare const BreedCard: React.ForwardRefExoticComponent<BreedCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BreedCard.d.ts.map