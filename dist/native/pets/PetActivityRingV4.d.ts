import * as React from 'react';
import type { PetActivityRingProps } from './PetActivityRing';
/** Drop-in for {@link PetActivityRingProps} — same props, the V4 "companion" design. */
export type PetActivityRingV4Props = PetActivityRingProps;
/**
 * PetActivityRing — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a single activity goal ring: an elevated rounded card
 * with a soft shadow wrapping the charts {@link ProgressRing} (kept token-fed and
 * unchanged from the base), a big legible central value, and the label + glyph
 * carried in a soft-primary chip beneath. Same props/behavior as
 * {@link PetActivityRingProps}: honors `variant` (walk / play / exercise / steps /
 * calories) with its glyph/label/unit, the `color` override and the `size` prop,
 * and guards a non-positive goal with a muted "No goal set" note. Token-only
 * colors via `useXenitionTheme()`.
 */
export declare function PetActivityRingV4({ variant, value, goal, size, color, showCaption, style, }: PetActivityRingV4Props): React.ReactElement;
//# sourceMappingURL=PetActivityRingV4.d.ts.map