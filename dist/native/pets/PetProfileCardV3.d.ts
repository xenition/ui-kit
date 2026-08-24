import * as React from 'react';
import type { PetProfileCardProps } from './PetProfileCard';
/** Drop-in alternate design for {@link PetProfileCard} — identical props. */
export type PetProfileCardV3Props = PetProfileCardProps;
/**
 * Compact single-row profile — a dense list-friendly alternate to
 * {@link PetProfileCard}. A small avatar, a two-line name/breed block, and a
 * trailing meta value (age / weight) sit on one hairline-separated row; the
 * spay/neuter state reads as a trailing check glyph + label, never color alone.
 * Same `PetProfileCardProps`. Token-pure.
 */
export declare function PetProfileCardV3({ name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading, onPress, style, }: PetProfileCardV3Props): React.ReactElement;
//# sourceMappingURL=PetProfileCardV3.d.ts.map