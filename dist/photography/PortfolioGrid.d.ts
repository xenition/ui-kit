import * as React from 'react';
import type { MediaItem } from '../media';
/** Layout variants for the portfolio grid. */
export type PortfolioGridVariant = 'grid' | 'masonry';
export interface PortfolioGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Photos to lay out (shaped media items — nothing is fetched). */
    items: MediaItem[];
    /** Column count (default 3). */
    columns?: 2 | 3 | 4;
    /** `grid` (uniform square tiles) or `masonry` (natural aspect ratios). Default `grid`. */
    variant?: PortfolioGridVariant;
    /** Optional heading above the grid. */
    title?: string;
    /** Fired with the item index when a tile is activated (wire to a lightbox). */
    onOpen?: (index: number) => void;
    /** Loading placeholder — renders a token-tinted skeleton grid, no content. */
    loading?: boolean;
    /** How many skeleton tiles to draw while loading (default 6). */
    loadingCount?: number;
    /** Copy for the empty state when there are no photos. */
    emptyLabel?: string;
    /** Supporting line under the empty label. */
    emptyDescription?: string;
}
/**
 * A photographer's portfolio grid — the entry surface for a body of work.
 * Wraps the media {@link Gallery} for the populated case (`grid` square tiles
 * or `masonry` intrinsic ratios, tappable when `onOpen` is set), and renders a
 * token-only skeleton while `loading` and an {@link EmptyState} when there are
 * no photos. Guarded indexing throughout; all colors trace to `--xen-*` tokens.
 */
export declare const PortfolioGrid: React.ForwardRefExoticComponent<PortfolioGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PortfolioGrid.d.ts.map