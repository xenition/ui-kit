import * as React from 'react';
import { MediaItem } from './types';
export interface GalleryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Media items to lay out. */
    items: MediaItem[];
    /** Columns at the widest breakpoint (default 3). */
    columns?: 2 | 3 | 4;
    /** `grid` (uniform tiles) or `masonry` (natural aspect ratios). Default `grid`. */
    variant?: 'grid' | 'masonry';
    /** Fired with the item index when a tile is activated. */
    onOpen?: (index: number) => void;
}
/**
 * Responsive media grid with a `masonry` variant. `grid` renders uniform tiles;
 * `masonry` uses CSS columns and each item's natural aspect ratio (from
 * `width`/`height`). Images are `loading="lazy"`. When `onOpen` is provided each
 * tile is a button that reports its index (wire it to a `Lightbox`). Token-only.
 */
export declare const Gallery: React.ForwardRefExoticComponent<GalleryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Gallery.d.ts.map