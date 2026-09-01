import * as React from 'react';
import type { BreedCardProps } from './BreedCard';
/** V4 layout choices for the "companion" design. */
export type BreedCardLayout = 'card' | 'compact';
/** Drop-in for {@link BreedCardProps} — same props, the V4 "companion" design. */
export interface BreedCardV4Props extends BreedCardProps {
    /** V4 layout: `card` (default) or `compact` (dense single row). */
    variant?: BreedCardLayout;
}
/**
 * BreedCard — **V4** "companion" design (web parity of the native V4). The warm,
 * friendly take on a breed reference card: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the breed photo/glyph in a soft-primary
 * tinted well, a bold breed name, a muted species line, size + energy shown as
 * labelled glyph Badges (never color alone), lifespan as a soft-primary chip, and
 * temperament traits as soft-primary chips. Same props/behavior as
 * {@link BreedCardProps}; activatable `role="button"` when `onClick` is set. All
 * colors from `--xen-*` token classes (no literals).
 */
export declare const BreedCardV4: React.ForwardRefExoticComponent<BreedCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BreedCardV4.d.ts.map