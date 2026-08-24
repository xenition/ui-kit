import * as React from 'react';
import type { ProductCardProps } from './ProductCard';
/** Drop-in alternate of {@link ProductCardProps} — identical prop contract. */
export type ProductCardV2Props = ProductCardProps;
/**
 * ProductCard — design variant **V2**: a horizontal, media-left **list card**
 * with drop-shadow elevation and no border. Where V1 is a vertical image-top
 * tile, V2 puts a square thumbnail on the left and stacks title → price →
 * add-button in a right-hand column, so it reads as a row in a scrolling list.
 * Same props as {@link ProductCardProps}; only the layout differs. Token-only.
 */
export declare function ProductCardV2({ title, priceCents, currency, compareAtCents, imageUrl, imageAlt, slug, onPress, onAdd, addLabel, formatMoney, style, }: ProductCardV2Props): React.ReactElement;
//# sourceMappingURL=ProductCardV2.d.ts.map