import * as React from 'react';
import type { ProductCardProps } from './ProductCard';
/** Drop-in alternate of {@link ProductCardProps} — identical prop contract. */
export type ProductCardV2Props = ProductCardProps;
/**
 * ProductCard — design variant **V2**: a horizontal, media-left **list card**
 * with drop-shadow elevation and no border. Where the base is a vertical
 * image-top tile, V2 puts a square thumbnail on the left and stacks title →
 * price + add-button in a right-hand column, so it reads as a row in a scrolling
 * list. Lifts on hover. Same props as {@link ProductCardProps}; only the layout
 * differs. Token-only.
 */
export declare const ProductCardV2: React.ForwardRefExoticComponent<ProductCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProductCardV2.d.ts.map