import * as React from 'react';
import type { PetActivityRingProps } from './PetActivityRing';
/** Same public contract as {@link PetActivityRing} — a drop-in alternate design. */
export type PetActivityRingV2Props = PetActivityRingProps;
/**
 * PetActivityRing, redesigned (v2): a **bold stat medallion**. A large ring with
 * the glyph + value in the center, the label and value/goal beneath, and a "Goal
 * met ✓" pill once complete. Bigger and more celebratory than v1. Same props,
 * token-only.
 */
export declare const PetActivityRingV2: React.ForwardRefExoticComponent<PetActivityRingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PetActivityRingV2.d.ts.map