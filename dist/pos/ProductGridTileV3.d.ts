import * as React from 'react';
import type { ProductGridTileProps } from './ProductGridTile';
/** Same public contract as {@link ProductGridTile} — a drop-in alternate design. */
export type ProductGridTileV3Props = ProductGridTileProps;
/**
 * ProductGridTile, redesigned (v3): a **color-block chip**. A compact tone-filled
 * square with the name and price stacked — no photo — for a dense quick-key grid.
 * Selected draws an accent ring; sold-out dims + flags. The opposite of v2's
 * image tile. Same props, token-only.
 */
export declare const ProductGridTileV3: React.ForwardRefExoticComponent<ProductGridTileProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ProductGridTileV3.d.ts.map