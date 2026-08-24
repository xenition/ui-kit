import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { PortfolioGridProps } from './PortfolioGrid';

/** Same public contract as {@link PortfolioGrid} — a drop-in alternate design. */
export type PortfolioGridV3Props = PortfolioGridProps;

/**
 * PortfolioGrid, redesigned (v3): a **dense contact sheet**. Uniform square
 * thumbnails pack tight in a fixed grid with a thin gap and no captions — a
 * scan-everything proof-sheet. The opposite of v2's masonry wall. Same props,
 * token-only.
 */
export const PortfolioGridV3 = React.forwardRef<HTMLDivElement, PortfolioGridV3Props>(
  function PortfolioGridV3(
    { items, columns = 3, variant, title, onOpen, loading = false, loadingCount = 6, emptyLabel = 'No photos yet', emptyDescription, className, ...rest },
    ref
  ) {
    void variant;
    const colClass = columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-4' : 'grid-cols-3';

    if (loading) {
      return (
        <div ref={ref} data-xen-portfolio-grid="" aria-busy="true" className={cn('grid gap-1', colClass, className)} {...rest}>
          {Array.from({ length: loadingCount }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-sm bg-neutral-200" />
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">📷</span>} title={emptyLabel} description={emptyDescription} className={className} {...rest} />;
    }

    return (
      <div ref={ref} data-xen-portfolio-grid="" className={cn('flex flex-col gap-2', className)} {...rest}>
        {title ? <p role="heading" aria-level={3} className="text-sm font-bold text-on-surface">{title}</p> : null}
        <div className={cn('grid gap-1', colClass)}>
          {items.map((item, i) => (
            <button
              key={`${item.url}-${i}`}
              type="button"
              aria-label={item.alt ?? item.caption ?? `Photo ${i + 1}`}
              onClick={() => onOpen?.(i)}
              className="aspect-square overflow-hidden rounded-sm bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img src={item.url} alt={item.alt ?? ''} loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    );
  }
);
