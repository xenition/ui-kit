import * as React from 'react';
import type { PetProfileCardProps } from './PetProfileCard';
/** Same public contract as {@link PetProfileCard} — a drop-in alternate design. */
export type PetProfileCardV2Props = PetProfileCardProps;
/**
 * PetProfileCard, redesigned (v2): a **banner profile card**. A primary-tinted
 * cover carries a large avatar straddling its edge; the name (+ species glyph),
 * breed·age·sex·weight chips, a spayed/neutered success chip, and the microchip
 * id center beneath. Elevated. Distinct from v1's compact row. Same props,
 * token-only.
 */
export declare const PetProfileCardV2: React.ForwardRefExoticComponent<PetProfileCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PetProfileCardV2.d.ts.map