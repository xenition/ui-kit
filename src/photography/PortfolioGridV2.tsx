import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { PortfolioGridProps } from './PortfolioGrid';

/** Same public contract as {@link PortfolioGrid} — a drop-in alternate design. */
export type PortfolioGridV2Props = PortfolioGridProps;

/**
 * PortfolioGrid, redesigned (v2): a **masonry wall**. Photos flow in CSS columns
 * at their natural aspect ratios, each a tappable tile that reveals its caption
 * on a hover scrim. A gallery-wall feel distinct from v1's uniform grid. Same
 * props, token-only.
 */
export const PortfolioGridV2 = React.forwardRef<HTMLDivElement, PortfolioGridV2Props>(
  function PortfolioGridV2(
    { items, columns = 3, variant, title, onOpen, loading = false, loadingCount = 6, emptyLabel = 'No photos yet', emptyDescription, className, ...rest },
    ref
  ) {
    void variant;
    const colClass = columns === 2 ? 'columns-2' : columns === 4 ? 'columns-4' : 'columns-3';

    if (loading) {
      return (
        <div ref={ref} data-xen-portfolio-grid="" aria-busy="true" className={cn(colClass, 'gap-2', className)} {...rest}>
          {Array.from({ length: loadingCount }).map((_, i) => (
            <div key={i} className="mb-2 h-40 animate-pulse rounded-md bg-neutral-200" />
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">📷</span>} title={emptyLabel} description={emptyDescription} className={className} {...rest} />;
    }

    return (
      <div ref={ref} data-xen-portfolio-grid="" className={cn('flex flex-col gap-2', className)} {...rest}>
        {title ? <p role="heading" aria-level={3} className="text-base font-bold text-on-surface">{title}</p> : null}
        <div className={cn(colClass, 'gap-2')}>
          {items.map((item, i) => (
            <button
              key={`${item.url}-${i}`}
              type="button"
              aria-label={item.alt ?? item.caption ?? `Photo ${i + 1}`}
              onClick={() => onOpen?.(i)}
              className="group mb-2 block w-full overflow-hidden rounded-md bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="relative block">
                <img src={item.url} alt={item.alt ?? ''} loading="lazy" className="w-full object-cover" />
                {item.caption ? (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-900/70 to-transparent p-2 text-left opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:transition-none">
                    <span className="block truncate text-xs text-neutral-50">{item.caption}</span>
                  </span>
                ) : null}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }
);
