import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { aspectStyle } from './aspect';
import type { GalleryProps } from './Gallery';
import type { MediaItem } from './types';

export interface GalleryV4Props extends GalleryProps {
  /**
   * Copy for the empty state. Default `'No media yet.'`.
   *
   * The base mapped over `items` with no guard, so an album with nothing in it
   * was a silent blank region — §4.5's "never a blank bordered box" in its most
   * literal form.
   */
  emptyMessage?: string;
  /** Announced after a video tile's name. Default `'video'`. */
  videoLabel?: string;
  /**
   * Build a tile's accessible name when the item carries neither `alt` nor
   * `caption`. Default `'Open item 3 of 12'` — the base said `'Open item 3'`,
   * which tells a screen-reader user nothing about how far through they are.
   */
  formatItemLabel?: (position: number, total: number) => string;
}

/** Whole class names — Tailwind's scanner cannot follow a composed string. */
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

/**
 * **V4 gallery** — the web twin of the native `GalleryV4`, same props as
 * {@link Gallery} plus `emptyMessage`, `videoLabel` and `formatItemLabel`.
 *
 * ## Four changes
 *
 * 1. **A video tile is a poster with a play badge**, never an autoplaying or
 *    control-bearing `<video>` inside a button. A grid of video elements is a
 *    grid of nested interactive controls; a gallery tile's job is to open the
 *    thing, and the lightbox is where it plays.
 * 2. **An empty album says so.**
 * 3. **The placeholder ground is `muted`**, not the `bg-neutral-100` ramp step
 *    that is near-white on a dark page.
 * 4. **Focus is the shared `--xen-ring`**, and the tile's name carries its
 *    position in the album.
 */
export const GalleryV4 = React.forwardRef<HTMLDivElement, GalleryV4Props>(function GalleryV4(
  {
    items,
    columns = 3,
    variant = 'grid',
    onOpen,
    emptyMessage = 'No media yet.',
    videoLabel = 'video',
    formatItemLabel,
    className,
    ...rest
  },
  ref
) {
  const masonry = variant === 'masonry';
  const total = items?.length ?? 0;
  const label = formatItemLabel ?? ((n: number, of: number) => `Open item ${n} of ${of}`);

  if (total === 0) {
    return (
      <div ref={ref} className={cn('p-lg text-center text-sm text-muted-text', className)} {...rest}>
        {emptyMessage}
      </div>
    );
  }

  const tile = (item: MediaItem, index: number): React.ReactElement => {
    const aspect = masonry ? aspectStyle(item.width, item.height) : undefined;
    const video = item.kind === 'video';
    const src = video ? item.poster : item.url;
    const name = [
      item.alt ?? item.caption ?? label(index + 1, total),
      video ? videoLabel : null,
    ]
      .filter(Boolean)
      .join(', ');

    const inner = (
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-muted',
          !masonry && 'aspect-square'
        )}
        style={aspect}
      >
        {src ? (
          <img
            src={src}
            alt={item.alt ?? item.caption ?? ''}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : null}
        {video ? (
          <span
            aria-hidden
            className="pointer-events-none absolute flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--xen-on-surface)_55%,transparent)] text-surface"
          >
            <IconV4 glyph="▶" size="base" />
          </span>
        ) : null}
      </div>
    );

    return (
      <div
        key={index}
        data-xen-gallery-item=""
        className={cn(masonry && 'mb-md break-inside-avoid')}
      >
        {onOpen ? (
          <button
            type="button"
            onClick={() => onOpen(index)}
            aria-label={name}
            data-xen-v4-chrome="on-surface"
            className="block w-full rounded-[var(--xen-radius-md)]"
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
        masonry ? cn('gap-md', MASONRY_COLS[columns]) : cn('grid gap-md', GRID_COLS[columns]),
        className
      )}
      {...rest}
    >
      {items.map(tile)}
    </div>
  );
});
