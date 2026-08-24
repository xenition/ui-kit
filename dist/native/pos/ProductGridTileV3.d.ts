import * as React from 'react';
import type { ProductGridTileProps } from './ProductGridTile';
/** Drop-in alternate of {@link ProductGridTileProps} — identical prop contract. */
export type ProductGridTileV3Props = ProductGridTileProps;
/**
 * ProductGridTile — design variant **V3**: a **compact horizontal list row**.
 * Where V1/V2 are square catalog cards, V3 lays the product out as a dense line
 * — a small square thumbnail, the name, and a right-aligned price — for a
 * scrolling menu or a search-results list rather than a button grid. Missing
 * `imageUrl` falls back to a token-tinted initials plate. `soldOut` dims + flags
 * by word; `selected` tints the row and is announced. Same props as
 * {@link ProductGridTileProps}. Token-only.
 */
export declare function ProductGridTileV3({ name, priceCents, currency, imageUrl, seed, tone, soldOut, selected, onPress, onLongPress, variant, testID, style, }: ProductGridTileV3Props): React.ReactElement;
//# sourceMappingURL=ProductGridTileV3.d.ts.map