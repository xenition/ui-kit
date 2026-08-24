import * as React from 'react';
import type { ProductGridTileProps } from './ProductGridTile';
/** Same public contract as {@link ProductGridTile} — a drop-in alternate design. */
export type ProductGridTileV2Props = ProductGridTileProps;
/**
 * ProductGridTile, redesigned (v2): an **image-forward tile**. The photo (or a
 * tone-tinted initials plate) fills the top of a square card; the name + price
 * sit on a surface footer. Selected draws an accent ring; sold-out dims and flags
 * "Sold out" (text, not color). Distinct from v1. Same props, token-only.
 */
export declare const ProductGridTileV2: React.ForwardRefExoticComponent<ProductGridTileProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ProductGridTileV2.d.ts.map