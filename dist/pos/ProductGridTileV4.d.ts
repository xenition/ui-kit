import * as React from 'react';
import type { ProductGridTileProps } from './ProductGridTile';
/** Drop-in for {@link ProductGridTileProps} — same props, the V4 "register" design. */
export type ProductGridTileV4Props = ProductGridTileProps;
/**
 * ProductGridTile — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a catalog tile: a larger plate/thumbnail, a **bold,
 * prominent price** (the number that matters at the counter), and a satisfying
 * press/selected state — a `selected` tile lifts with an accent ring, soft tint,
 * and shadow. `soldOut` dims and flags by word (not color alone). Same
 * props/behavior as {@link ProductGridTileProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export declare const ProductGridTileV4: React.ForwardRefExoticComponent<ProductGridTileProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ProductGridTileV4.d.ts.map