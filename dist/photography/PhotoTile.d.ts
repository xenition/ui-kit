import * as React from 'react';
/** Aspect-ratio presets for a photo tile. */
export type PhotoTileRatio = 'square' | 'portrait' | 'landscape';
export interface PhotoTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Photo source URL. When absent a token-tinted placeholder is drawn. */
    url?: string;
    /** Accessible description of the photo. */
    alt?: string;
    /** Caption overlaid at the foot of the tile. */
    caption?: string;
    /** Aspect ratio preset (default `square`). */
    ratio?: PhotoTileRatio;
    /** Selected state — draws a token accent ring + check affordance. */
    selected?: boolean;
    /** Favourited state — shows a star marker (labelled, not color-alone). */
    favorite?: boolean;
    /** Loading placeholder — token-only skeleton, no image. */
    loading?: boolean;
}
/**
 * A single photo tile — the atomic unit of a grid or selection sheet. Draws the
 * image inside an aspect-ratio box (`square`/`portrait`/`landscape`), an
 * optional overlaid `caption`, a `favorite` star marker, and a `selected`
 * accent ring with a check badge. Selection/favourite states carry a glyph +
 * accessibility state, never color alone. Passing `onClick` makes it a
 * keyboard-operable `button`; token-only colors.
 */
export declare const PhotoTile: React.ForwardRefExoticComponent<PhotoTileProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PhotoTile.d.ts.map