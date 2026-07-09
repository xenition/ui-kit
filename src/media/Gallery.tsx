import * as React from 'react';
import { cn } from '../primitives/cn';
import { aspectStyle } from './aspect';
import { MediaItem } from './types';

export interface GalleryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Media items to lay out. */
  items: MediaItem[];
  /** Columns at the widest breakpoint (default 3). */
  columns?: 2 | 3 | 4;
  /** `grid` (uniform tiles) or `masonry` (natural aspect ratios). Default `grid`. */
  variant?: 'grid' | 'masonry';
  /** Fired with the item index when a tile is activated. */
  onOpen?: (index: number) => void;
}

const GRID_COLS: Record<NonNullable<GalleryProps['columns']>, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};

const MASONRY_COLS: Record<NonNullable<GalleryProps['columns']>, string> = {
  2: 'columns-2',
  3: 'columns-2 sm:columns-3',
  4: 'columns-2 sm:columns-3 lg:columns-4',
};

function Media({ item }: { item: MediaItem }): React.ReactElement {
  if (item.kind === 'video') {
    return (
      <video
        src={item.url}
        poster={item.poster}
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <img
      src={item.url}
      alt={item.alt ?? item.caption ?? ''}
      loading="lazy"
      width={item.width}
      height={item.height}
      className="h-full w-full object-cover"
    />
  );
}

/**
 * Responsive media grid with a `masonry` variant. `grid` renders uniform tiles;
 * `masonry` uses CSS columns and each item's natural aspect ratio (from
 * `width`/`height`). Images are `loading="lazy"`. When `onOpen` is provided each
 * tile is a button that reports its index (wire it to a `Lightbox`). Token-only.
 */
export const Gallery = React.forwardRef<HTMLDivElement, GalleryProps>(function Gallery(
  { items, columns = 3, variant = 'grid', onOpen, className, ...rest },
  ref
) {
  const masonry = variant === 'masonry';

  const tile = (item: MediaItem, index: number): React.ReactElement => {
    const aspect = masonry ? aspectStyle(item.width, item.height) : undefined;
    const inner = (
      <div
        className={cn(
          'overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100',
          !masonry && 'aspect-square'
        )}
        style={aspect}
      >
        <Media item={item} />
      </div>
    );

    return (
      <div
        key={index}
        data-xen-gallery-item=""
        className={cn(masonry && 'mb-[var(--xen-space-md)] break-inside-avoid')}
      >
        {onOpen ? (
          <button
            type="button"
            onClick={() => onOpen(index)}
            aria-label={item.alt ?? item.caption ?? `Open item ${index + 1}`}
            className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            {inner}
          </button>
        ) : (
          inner
        )}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      data-xen-gallery={variant}
      className={cn(
        masonry
          ? cn('gap-[var(--xen-space-md)]', MASONRY_COLS[columns])
          : cn('grid gap-[var(--xen-space-md)]', GRID_COLS[columns]),
        className
      )}
      {...rest}
    >
      {items.map(tile)}
    </div>
  );
});
