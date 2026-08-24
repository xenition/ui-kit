import * as React from 'react';
import type { PetActivityRingProps } from './PetActivityRing';
/** Drop-in alternate design for {@link PetActivityRing} — identical props. */
export type PetActivityRingV2Props = PetActivityRingProps;
/**
 * Hero activity ring — a prominent alternate to {@link PetActivityRing}. The
 * ring is enlarged and centered on a soft tinted panel, with the activity label
 * as a headline and the raw value/goal called out beneath. Guards a non-positive
 * goal with a muted "No goal set" note. Same `PetActivityRingProps`; the caption
 * is always shown as the hero copy. Token-pure.
 */
export declare function PetActivityRingV2({ variant, value, goal, size, color, showCaption, style, }: PetActivityRingV2Props): React.ReactElement;
//# sourceMappingURL=PetActivityRingV2.d.ts.map