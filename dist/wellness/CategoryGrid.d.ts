import * as React from 'react';
export type WellnessCategoryTone = 'primary' | 'accent' | 'success' | 'warn' | 'danger';
export interface WellnessCategory {
    id: string;
    label: string;
    glyph: string;
    tone?: WellnessCategoryTone;
}
export interface CategoryTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** The category this tile represents. */
    category: WellnessCategory;
    /** Fires with the category when the tile is tapped. */
    onSelect?: (category: WellnessCategory) => void;
}
export interface CategoryGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    categories: WellnessCategory[];
    onSelect?: (category: WellnessCategory) => void;
}
/**
 * CategoryTile — one browse tile: a soft, color-coded card in its category's
 * tone. A glyph sits in a slightly deeper tint circle over a lighter tinted
 * ground, with the label in `on-surface`. This is the one wellness surface where
 * per-card color is the point — the grid reads as a palette of categories. The
 * tints are `SLOT_TINT[tone]`, so every color traces to a token and restyles
 * from the seed, light + dark.
 */
export declare const CategoryTile: React.ForwardRefExoticComponent<CategoryTileProps & React.RefAttributes<HTMLDivElement>>;
/**
 * CategoryGrid — the browse surface: a grid of color-coded {@link CategoryTile}s,
 * two per row. Color lives on the tiles (each in its category tone); the grid
 * itself is a plain layout. Token-only colors.
 */
export declare const CategoryGrid: React.ForwardRefExoticComponent<CategoryGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CategoryGrid.d.ts.map