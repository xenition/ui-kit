import * as React from 'react';
import type { PetProfileCardProps } from './PetProfileCard';
/** Drop-in alternate design for {@link PetProfileCard} — identical props. */
export type PetProfileCardV2Props = PetProfileCardProps;
/**
 * Banner-and-overlapping-avatar profile card — a visually distinct alternate to
 * {@link PetProfileCard}. A soft primary-tinted banner sits behind an avatar
 * that overlaps its lower edge (with a surface ring), the name/breed centered
 * below, and the key stats presented as filled chips rather than a bare strip.
 * Same `PetProfileCardProps`; elevated + enter/press motion. Token-pure.
 */
export declare function PetProfileCardV2({ name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading, onPress, style, }: PetProfileCardV2Props): React.ReactElement;
//# sourceMappingURL=PetProfileCardV2.d.ts.map