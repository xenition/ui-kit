import * as React from 'react';
/** Layout variants for the gallery header. */
export type GalleryHeaderVariant = 'hero' | 'compact';
export interface GalleryHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    /** Gallery / shoot title. */
    title: string;
    /** Supporting subtitle (client, date, or event). */
    subtitle?: string;
    /** Photo count shown as a small meta pill. */
    photoCount?: number;
    /** Full-bleed cover image URL (`hero` variant). */
    coverUrl?: string;
    /** Layout variant (default `hero`). */
    variant?: GalleryHeaderVariant;
    /** Action slot (e.g. a share / download button row). */
    actions?: React.ReactNode;
    /** Word for the count meta (default `photos`). */
    countLabel?: string;
}
/**
 * The masthead for a client gallery — a title with an optional subtitle, a
 * photo-count meta pill, and an `actions` slot. The `hero` variant lays the
 * text over a full-bleed cover image (with a token scrim for legibility); the
 * `compact` variant is a plain titled band. The title is a semantic heading.
 * Token-only — scrim and surfaces trace to `--xen-*` tokens.
 */
export declare const GalleryHeader: React.ForwardRefExoticComponent<GalleryHeaderProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=GalleryHeader.d.ts.map