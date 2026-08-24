import * as React from 'react';
import { type CoverColorRole, type CoverForm } from './GenerativeCover';
export interface CoverGalleryItem {
    /** Stable seed for this plate's generative composition. */
    seed: string | number;
    /** Composition of the seeded cover (arc, bands, orbit, grid, wave, stack). */
    form?: CoverForm;
    /** Ink color role (token role, e.g. `primary-700`). */
    ink?: CoverColorRole;
    /** Paper color role (token role, e.g. `neutral-100`). */
    paper?: CoverColorRole;
    /** Accessible label for the plate (also used as the link aria-label). */
    label?: string;
    /** Caption rendered under the plate (title of the piece / work). */
    caption?: React.ReactNode;
    /** Small secondary line under the caption (medium, year, artist, …). */
    meta?: React.ReactNode;
    /** When set, the whole tile links here (stretched link over the plate). */
    href?: string;
}
export interface CoverGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The plates to render. */
    items: CoverGalleryItem[];
    /** Column count at the largest breakpoint. */
    columns?: 2 | 3 | 4;
    /** width / height aspect ratio of every plate (default 1 — square). */
    aspect?: number;
}
/**
 * A responsive gallery of seeded {@link GenerativeCover} plates with captions —
 * an IMAGE-FREE wall of generative artwork. Where `TeamGrid`/`EntityCard` assume
 * real image URLs, this renders the deterministic cover plates the templates use
 * for portfolios, exhibitions, work galleries, and lookbooks (the hand-rolled
 * `PortfolioGrid` / `WorkGrid` / `Plate` collapsed into one prop-driven grid).
 * Each tile optionally deep-links to a detail route via a stretched link, and
 * every color is a token role — no literal hex, no external assets.
 */
export declare const CoverGallery: React.ForwardRefExoticComponent<CoverGalleryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CoverGallery.d.ts.map