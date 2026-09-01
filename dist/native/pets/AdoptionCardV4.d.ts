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
 * AdoptionCard — **V4** "companion" design. The warm, friendly take on an
 * adoption listing: an elevated rounded card with a soft shadow, a photo banner
 * (or a big glyph in a soft-primary tinted well), a frosted favorite heart, a
 * labelled status chip, and the fee shown as a soft-primary chip beside a rounded
 * adopt CTA. Same props/behavior as {@link AdoptionCardProps}; availability reads
 * via a labelled chip (never color alone). Token-only colors via
 * `useXenitionTheme()`; the whole card is pressable when `onPress` is set.
 */
export declare function AdoptionCardV4({ name, breed, age, sex, shelter, photoUrl, glyph, fee, status, favorited, applyLabel, onApply, onFavorite, onPress, style, variant, }: AdoptionCardV4Props): React.ReactElement;
//# sourceMappingURL=AdoptionCardV4.d.ts.map