import * as React from 'react';
import type { PetActivityRingProps } from './PetActivityRing';
/** Same public contract as {@link PetActivityRing} — a drop-in alternate design. */
export type PetActivityRingV3Props = PetActivityRingProps;
/**
 * PetActivityRing, redesigned (v3): a **compact activity bar**. No ring — a glyph,
 * an inline "label · value/goal unit · N%" readout, and a thin fill bar. A dense
 * row for stacking several activities. The opposite of v2's medallion. Same
 * props, token-only. (`size`/`color` are accepted for parity.)
 */
export declare const PetActivityRingV3: React.ForwardRefExoticComponent<PetActivityRingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PetActivityRingV3.d.ts.map