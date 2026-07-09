import * as React from 'react';
export interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Max columns on the widest breakpoint (default 4). Responsive down to 1–2. */
    columns?: 2 | 3 | 4;
}
/**
 * Responsive grid of {@link ProductCard}s. Column count steps up across
 * breakpoints; gap comes from the theme spacing scale.
 */
export declare const ProductGrid: React.ForwardRefExoticComponent<ProductGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProductGrid.d.ts.map