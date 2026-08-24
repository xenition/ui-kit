import * as React from 'react';
import { cn } from '../primitives/cn';
import { Gallery } from '../media';
import type { MediaItem } from '../media';
import { EmptyState } from '../commerce';

/** Layout variants for the portfolio grid. */
export type PortfolioGridVariant = 'grid' | 'masonry';

export interface PortfolioGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Photos to lay out (shaped media items — nothing is fetched). */
  items: MediaItem[];
  /** Column count (default 3). */
  columns?: 2 | 3 | 4;
  /** `grid` (uniform square tiles) or `masonry` (natural aspect ratios). Default `grid`. */
  variant?: PortfolioGridVariant;
  /** Optional heading above the grid. */
  title?: string;
  /** Fired with the item index when a tile is activated (wire to a lightbox). */
  onOpen?: (index: number) => void;
  /** Loading placeholder — renders a token-tinted skeleton grid, no content. */
  loading?: boolean;
  /** How many skeleton tiles to draw while loading (default 6). */
  loadingCount?: number;
  /** Copy for the empty state when there are no photos. */
  emptyLabel?: string;
  /** Supporting line under the empty label. */
  emptyDescription?: string;
}

const GRID_COLS: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};

/**
 * A photographer's portfolio grid — the entry surface for a body of work.
 * Wraps the media {@link Gallery} for the populated case (`grid` square tiles
 * or `masonry` intrinsic ratios, tappable when `onOpen` is set), and renders a
 * token-only skeleton while `loading` and an {@link EmptyState} when there are
 * no photos. Guarded indexing throughout; all colors trace to `--xen-*` tokens.
 */
export const PortfolioGrid = React.forwardRef<HTMLDivElement, PortfolioGridProps>(
  function PortfolioGrid(
    {
      items,
      columns = 3,
      variant = 'grid',
      title,
      onOpen,
      loading = false,
      loadingCount = 6,
      emptyLabel = 'No photos yet',
      emptyDescription,
      className,
      ...rest
    },
    ref
  ) {
    const heading = title ? (
      <h3
        data-xen-portfolio-title=""
        className="font-heading text-lg font-semibold text-on-surface"
      >
        {title}
      </h3>
    ) : null;

    const wrap = (children: React.ReactNode): React.ReactElement => (
      <div
        ref={ref}
        data-xen-portfolio-grid={variant}
        className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
        {...rest}
      >
        {heading}
        {children}
      </div>
    );

    if (loading) {
      const count = Math.max(1, loadingCount);
      return wrap(
        <div
          aria-label="Loading photos"
          aria-busy="true"
          className={cn('grid gap-[var(--xen-space-md)]', GRID_COLS[columns])}
        >
          {Array.from({ length: count }, (_, i) => i).map((i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200"
            />
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return wrap(<EmptyState title={emptyLabel} description={emptyDescription} />);
    }

    return wrap(<Gallery items={items} columns={columns} variant={variant} onOpen={onOpen} />);
  }
);
