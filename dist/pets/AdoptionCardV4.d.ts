import * as React from 'react';
import type { AdoptionCardProps } from './AdoptionCard';
/** V4 layout choices for the "companion" design. */
export type AdoptionCardLayout = 'cover' | 'list' | 'compact';
/** Drop-in for {@link AdoptionCardProps} — same props, the V4 "companion" design. */
export interface AdoptionCardV4Props extends AdoptionCardProps {
    /** V4 layout: `cover` (photo banner on top, default), `list` (horizontal thumbnail row), `compact` (dense, no photo). */
    variant?: AdoptionCardLayout;
}
/**
 * AdoptionCard — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on an adoption listing: an elevated rounded card with a
 * soft shadow, a photo banner (or a big glyph in a soft-primary tinted well), a
 * frosted favorite heart, a labelled status chip, and the fee shown as a
 * soft-primary chip beside a rounded adopt CTA. Same props/behavior as
 * {@link AdoptionCardProps}; availability reads via a labelled chip (never color
 * alone). All colors from `--xen-*` token classes (no literals); the whole card
 * is a keyboard-activatable button when `onClick` is set.
 */
export declare const AdoptionCardV4: React.ForwardRefExoticComponent<AdoptionCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AdoptionCardV4.d.ts.map