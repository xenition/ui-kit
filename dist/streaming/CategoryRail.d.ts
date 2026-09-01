import * as React from 'react';
/** One browse category — a genre or mood tile in a {@link CategoryRail}. */
export interface CategoryRailItem {
    /** Stable unique id (used as the list key and passed to `onSelect`). */
    id: string;
    /** Human label rendered on the tile, e.g. `'Chill'`. */
    label: string;
    /** Optional decorative glyph shown when there's no artwork. */
    glyph?: string;
    /** Optional cover artwork URL; replaces the gradient glow when present. */
    artworkUrl?: string;
}
export interface CategoryRailProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect' | 'title'> {
    /** The browse categories, rendered left→right in a horizontally-scrolling rail. */
    categories: readonly CategoryRailItem[];
    /** Optional header label above the rail. */
    title?: string;
    /** Called with a category `id` when its tile is tapped. */
    onSelect?: (id: string) => void;
}
/**
 * CategoryRail — **V4** "spotlight" design (web parity of the native V4). A
 * horizontally-scrolling rail of rounded browse tiles (genres / moods). Each
 * tile is a gradient-glow cover — the V4 accent→primary wash — or the category
 * artwork when supplied, with the label set in near-white `onPrimary` ink over a
 * legibility scrim. Tiles are ≥44px tap targets. Presentational only; all colors
 * from `--xen-*` token classes and gradient utilities (no literal hex).
 * Dark-mode safe.
 */
export declare const CategoryRail: React.ForwardRefExoticComponent<CategoryRailProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CategoryRail.d.ts.map