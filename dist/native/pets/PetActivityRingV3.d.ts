import * as React from 'react';
import type { PetActivityRingProps } from './PetActivityRing';
/** Drop-in alternate design for {@link PetActivityRing} — identical props. */
export type PetActivityRingV3Props = PetActivityRingProps;
/**
 * Compact ring row — a list-friendly alternate to {@link PetActivityRing}. A
 * small ring sits at the leading edge with the label and inline value/goal on
 * its right and the percentage trailing; the ring `size` prop drives the small
 * diameter. Guards a non-positive goal with a muted "No goal set" note. Same
 * `PetActivityRingProps`. Token-pure.
 */
export declare function PetActivityRingV3({ variant, value, goal, size, color, showCaption, style, }: PetActivityRingV3Props): React.ReactElement;
//# sourceMappingURL=PetActivityRingV3.d.ts.map