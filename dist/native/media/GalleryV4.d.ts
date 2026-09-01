import * as React from 'react';
import type { GalleryProps } from './Gallery';
export interface GalleryV4Props extends GalleryProps {
    /**
     * Copy for the empty state. Default `'No media yet.'`.
     *
     * The base rendered a `FlatList` with no `ListEmptyComponent`, so an album
     * with nothing in it was a silent blank region — §4.5's "never a blank
     * bordered box", in its most literal form.
     */
    emptyMessage?: string;
    /** Announced after a video tile's name. Default `'video'`. */
    videoLabel?: string;
    /**
     * Build a tile's accessible name when the item carries neither `alt` nor
     * `caption`. Default `'Open item 3 of 12'` — the base said `'Open item 3'`,
     * which tells a screen-reader user nothing about how far through they are.
     */
    formatItemLabel?: (position: number, total: number) => string;
}
/**
 * **V4 gallery** — same props as {@link Gallery} plus `emptyMessage`,
 * `videoLabel` and `formatItemLabel`.
 *
 * ## Four changes
 *
 * 1. **Video tiles show their poster and a play badge.** The base handed every
 *    item's `url` to `<Image>`, so a clip rendered as a broken tile.
 * 2. **An empty album says so.**
 * 3. **Press is a state layer**, not `opacity: 0.85` on the tile's content.
 * 4. **The tile's name carries its position** in the album.
 *
 * `masonry` still keeps each item's intrinsic ratio and `grid` still squares
 * them — that decision is the base's and it is right.
 */
export declare function GalleryV4({ items, columns, variant, onOpen, emptyMessage, videoLabel, formatItemLabel, style, scrollEnabled, }: GalleryV4Props): React.ReactElement;
//# sourceMappingURL=GalleryV4.d.ts.map