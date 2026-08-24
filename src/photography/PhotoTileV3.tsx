import * as React from 'react';
import { cn } from '../primitives/cn';
import type { PhotoTileProps, PhotoTileRatio } from './PhotoTile';

/** Same public contract as {@link PhotoTile} — a drop-in alternate design. */
export type PhotoTileV3Props = PhotoTileProps;

const RATIO: Record<PhotoTileRatio, string> = { square: 'aspect-square', portrait: 'aspect-[3/4]', landscape: 'aspect-[4/3]' };

/**
 * PhotoTile, redesigned (v3): a **full-bleed minimal tile**. The image fills a
 * borderless rounded frame that zooms slightly on hover; the caption fades in on
 * a bottom scrim only when present, and selected/favourite show a corner check /
 * ★. The opposite of v2's framed polaroid. Same props, token-only.
 */
export const PhotoTileV3 = React.forwardRef<HTMLDivElement, PhotoTileV3Props>(function PhotoTileV3(
  { url, alt, caption, ratio = 'square', selected = false, favorite = false, loading = false, onClick, className, ...rest },
  ref
) {
  const interactive = typeof onClick === 'function';

  if (loading) {
    return <div ref={ref} data-xen-photo-tile="" aria-label="Loading photo" aria-busy="true" className={cn('animate-pulse rounded-lg bg-neutral-200', RATIO[ratio], className)} {...rest} />;
  }

  return (
    <div
      ref={ref}
      data-xen-photo-tile=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? alt ?? caption ?? 'Photo' : undefined}
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-lg bg-neutral-100',
        RATIO[ratio],
        selected && 'ring-2 ring-accent',
        interactive && 'cursor-pointer',
        className
      )}
      {...rest}
    >
      {url ? (
        <img
          src={url}
          alt={interactive ? '' : alt ?? caption ?? ''}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : null}
      {favorite ? (
        <span role="img" aria-label="Favourite" className="absolute left-1 top-1 inline-flex items-center rounded-full bg-neutral-900/60 px-1.5 py-0.5 text-sm leading-none text-on-primary">★</span>
      ) : null}
      {selected ? (
        <span role="img" aria-label="Selected" className="absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-on-accent">✓</span>
      ) : null}
      {caption ? (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-900/70 to-transparent p-2">
          <p className="truncate text-xs text-neutral-50">{caption}</p>
        </div>
      ) : null}
    </div>
  );
});
