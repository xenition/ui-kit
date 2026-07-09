import * as React from 'react';
import { cn } from '../primitives/cn';

export interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max columns on the widest breakpoint (default 4). Responsive down to 1–2. */
  columns?: 2 | 3 | 4;
}

/** Static class strings so Tailwind's purge can see every variant. */
const COLUMN_CLASSES: Record<NonNullable<ProductGridProps['columns']>, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};

/**
 * Responsive grid of {@link ProductCard}s. Column count steps up across
 * breakpoints; gap comes from the theme spacing scale.
 */
export const ProductGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  function ProductGrid({ columns = 4, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-xen-product-grid=""
        className={cn(
          'grid gap-[var(--xen-space-lg)]',
          COLUMN_CLASSES[columns],
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
