import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { COLUMN_TIERS } from '../../commerce/internal/grid-v4';
import type { ProductGridV4Columns, ProductGridV4Gap } from '../../commerce/internal/grid-v4';
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
     * renders **nothing at all**, rather than a `FlatList` still holding its
     * content padding open.
     */
    empty?: React.ReactNode;
    /**
     * Names the grid for a screen reader — "Featured products", "Search
     * results". A screen with three grids on it is three unlabelled regions
     * otherwise.
     */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Tailwind's `sm` and `lg`, in dp.
 *
 * They are here so that "the width at which a product grid gains a column" is
 * one decision rather than two, and they are the web preset's values rather
 * than numbers picked for this file — a native tile stepping to three columns
 * at a different width than the web one is the same class of bug as `columns`
 * meaning two things. Not spacings, colours, radii or type sizes, which is why
 * they are allowed to be numbers at all.
 */
export declare const BREAK_SM = 640;
export declare const BREAK_LG = 1024;
/** Which tier of {@link COLUMN_TIERS} a viewport of `width` dp sits in. */
export declare function tierFor(width: number): 0 | 1 | 2;
/**
 * **V4 product grid (native)** — same props as the web `ProductGridV4`,
 * including defaults.
 *
 * **This component is layout and nothing else.** It sets a column count and a
 * gutter and renders its children as handed to it. The one wrapper it does add
 * is the `flex: 1` cell every `FlatList` row needs to divide its width — pure
 * layout, no ground, no padding, nothing that changes how a tile looks.
 *
 * Three changes:
 *
 * 1. **`columns` finally means the same thing as it does on web.** The web
 *    base documented it as "max columns at the widest breakpoint" and
 *    defaulted to 4; this base treated it as a literal count and defaulted to
 *    2. One prop, one name, two meanings — a template that swapped web for
 *    native by import path silently changed its layout. V4 makes it the
 *    ceiling on both twins, defaults both to 4, and steps *down* here through
 *    the same tier table the web class map encodes. A phone renders two
 *    columns because it is a phone, not because it imported a different file.
 * 2. **The gutter is a prop, on the scale.** The base hard-coded `lg` (24),
 *    which is right for a grid of four and too loose for a dense list of two.
 * 3. **It survives its empty case.** No children and no `empty` renders
 *    nothing; no children with an `empty` renders that, through
 *    `ListEmptyComponent` so the list still owns its own scroll (§4.5).
 *
 * Still a `FlatList`, still virtualized, still children-based: a long catalog
 * is the case this component exists for, and the web API is what lets a
 * template swap platforms by import path.
 */
export declare function ProductGridV4({ columns, gap, empty, label, children, style, scrollEnabled, }: ProductGridV4Props): React.ReactElement | null;
//# sourceMappingURL=ProductGridV4.d.ts.map