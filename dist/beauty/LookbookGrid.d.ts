import * as React from 'react';
export interface LookbookItem {
    /** Stable id (used as the React key and passed to `onSelect`). */
    id: string;
    /** Image URL; a token-tinted tile shows when absent. */
    imageUrl?: string;
    /** Caption / style name shown over the tile. */
    label?: string;
    /** Optional stylist / category tag. */
    tag?: string;
}
export interface LookbookGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Grid items. When empty, the `emptyLabel` state renders. */
    items: LookbookItem[];
    /** Column count (default 2). Clamped to at least 1. */
    columns?: number;
    /** Tile aspect ratio (width / height, default 0.8 = portrait). */
    aspectRatio?: number;
    /** Empty-state copy. */
    emptyLabel?: string;
    /** Fires with the tapped item's id. */
    onSelect?: (id: string) => void;
}
/**
 * A masonry-style lookbook / gallery grid of style photos. Renders `items` in a
 * flex-wrap grid of `columns`; each tile shows the image with a caption band and
 * optional tag, and calls `onSelect(id)` on activation (keyboard supported). An
 * empty `items` array renders the shared `EmptyState`. Indices are guarded and
 * missing images degrade to a tinted placeholder. Token-only colors.
 */
export declare const LookbookGrid: React.ForwardRefExoticComponent<LookbookGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LookbookGrid.d.ts.map