import * as React from 'react';
import { COLUMN_TIERS } from './internal/grid-v4';
import type { ProductGridV4Columns, ProductGridV4Gap } from './internal/grid-v4';
import type { ProductGridProps } from './ProductGrid';
export { COLUMN_TIERS };
export type { ProductGridV4Columns, ProductGridV4Gap };
export interface ProductGridV4Props extends ProductGridProps {
    /**
     * Max columns at the widest breakpoint. Default `4`, and it means the same
     * thing on both twins — see {@link COLUMN_TIERS}.
     */
    columns?: ProductGridV4Columns;
    /** Gutter between tiles. Default `'lg'`. */
    gap?: ProductGridV4Gap;
    /**
     * What to draw when there are no children — an `EmptyStateV4`, usually.
     *
     * §4.5: a component with nothing to show renders nothing or an empty state,
     * never a blank bordered box. With no `empty` and no children this grid
     * renders **nothing at all**, rather than an empty `<div>` still holding its
     * gutters open.
     */
    empty?: React.ReactNode;
    /**
     * Names the grid for a screen reader — "Featured products", "Search
     * results". A page with three grids on it is three unlabelled regions
     * otherwise.
     */
    label?: string;
}
/**
 * **V4 product grid** — the web twin of the native `ProductGridV4`, same props
 * as {@link ProductGrid} plus three, a different design line.
 *
 * **This component is layout and nothing else.** It sets a column count and a
 * gutter and renders its children exactly as handed to it: no wrapper with a
 * ground, no ratio forced onto a tile, no `[&>*]:` reaching into a child's
 * styling. A grid that restyles what it holds is a grid you cannot put a
 * `ProductCardV4` and a promo tile in side by side, and it is why the base
 * line's grids and cards had to be upgraded in lockstep.
 *
 * Three changes:
 *
 * 1. **`columns` finally means the same thing on both twins.** See
 *    {@link COLUMN_TIERS} — this was a real cross-platform layout bug, not a
 *    tidy-up.
 * 2. **The gutter is a prop, on the scale.** The base hard-coded `lg` (24).
 *    That is right for a marketing grid of four and too loose for a dense
 *    search result at three columns, and every app that wanted the tighter one
 *    was passing a `className` full of `!gap-*`.
 * 3. **It survives its empty case.** No children and no `empty` renders
 *    nothing; no children *with* an `empty` renders that. The base drew an
 *    empty grid — a `<div>` with gutters and no content, which occupies space
 *    and says nothing (§4.5).
 */
export declare const ProductGridV4: React.ForwardRefExoticComponent<ProductGridV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProductGridV4.d.ts.map