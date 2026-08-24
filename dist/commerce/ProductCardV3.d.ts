import * as React from 'react';
import type { ProductCardProps } from './ProductCard';
/** Drop-in alternate of {@link ProductCardProps} — identical prop contract. */
export type ProductCardV3Props = ProductCardProps;
/**
 * ProductCard — design variant **V3**: a **minimal, borderless** editorial
 * treatment. No card chrome at all: a tiny round thumbnail sits beside a small
 * muted, letter-spaced title, and the **price is the hero** (large PriceTag).
 * Separation comes from spacing, not a box. Same props as
 * {@link ProductCardProps}. Token-only.
 */
export declare const ProductCardV3: React.ForwardRefExoticComponent<ProductCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProductCardV3.d.ts.map