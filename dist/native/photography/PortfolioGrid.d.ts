import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { MediaItem } from '../../media/types';
/** Layout variants for the portfolio grid. */
export type PortfolioGridVariant = 'grid' | 'masonry';
export interface PortfolioGridProps {
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
    /** Passed through to the underlying list (e.g. `scrollEnabled`). */
    scrollEnabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A photographer's portfolio grid — the entry surface for a body of work.
 * Wraps the media {@link Gallery} for the populated case (`grid` square tiles
 * or `masonry` intrinsic ratios, tappable when `onOpen` is set), and renders a
 * token-only skeleton while `loading` and an {@link EmptyState} when there are
 * no photos. Guarded indexing throughout; all colors trace to theme tokens.
 */
export declare function PortfolioGrid({ items, columns, variant, title, onOpen, loading, loadingCount, emptyLabel, emptyDescription, scrollEnabled, style, }: PortfolioGridProps): React.ReactElement;
//# sourceMappingURL=PortfolioGrid.d.ts.map