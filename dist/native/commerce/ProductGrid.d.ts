import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ProductGridProps {
    /** Column count (default 2 — a sensible phone default vs. web's 4). */
    columns?: 2 | 3 | 4;
    /**
     * Product cards. Rendered through a `FlatList` (each child becomes an item),
     * so the grid virtualizes on long catalogs while keeping the web
     * children-based API — a template swaps web→native by import path only.
     */
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    /** Passed through to the underlying FlatList (e.g. `scrollEnabled`). */
    scrollEnabled?: boolean;
}
/**
 * Responsive grid of {@link ProductCard}s — the native mirror of the web
 * `ProductGrid`. Backed by a `FlatList` with `numColumns`; row/column gaps come
 * from the theme spacing scale.
 */
export declare function ProductGrid({ columns, children, style, scrollEnabled, }: ProductGridProps): React.ReactElement;
//# sourceMappingURL=ProductGrid.d.ts.map