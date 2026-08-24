import * as React from 'react';
import type { PetProfileCardProps } from './PetProfileCard';
/** Same public contract as {@link PetProfileCard} — a drop-in alternate design. */
export type PetProfileCardV3Props = PetProfileCardProps;
/**
 * PetProfileCard, redesigned (v3): a **compact profile row**. A small avatar, the
 * name (+ species glyph) over a breed·age·sex·weight summary, and a fixed chip on
 * the trailing edge — hairline-bordered for a pets list. The opposite of v2's
 * banner. Same props, token-only.
 */
export declare const PetProfileCardV3: React.ForwardRefExoticComponent<PetProfileCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PetProfileCardV3.d.ts.map