import * as React from 'react';
import { cn } from '../primitives/cn';
import type { PhotoTileProps, PhotoTileRatio } from './PhotoTile';

/** Same public contract as {@link PhotoTile} — a drop-in alternate design. */
export type PhotoTileV2Props = PhotoTileProps;

const RATIO: Record<PhotoTileRatio, string> = { square: 'aspect-square', portrait: 'aspect-[3/4]', landscape: 'aspect-[4/3]' };

/**
 * PhotoTile, redesigned (v2): a **framed polaroid**. The image sits inset in a
 * padded surface frame with a soft shadow and the caption printed on a strip
 * beneath — selected draws an accent ring on the frame, favourite shows a ★.
 * Distinct from v1's flush tile. Same props, token-only.
 */
export const PhotoTileV2 = React.forwardRef<HTMLDivElement, PhotoTileV2Props>(function PhotoTileV2(
  { url, alt, caption, ratio = 'square', selected = false, favorite = false, loading = false, onClick, className, ...rest },
  ref
) {
  const interactive = typeof onClick === 'function';

  if (loading) {
    return <div ref={ref} data-xen-photo-tile="" aria-label="Loading photo" aria-busy="true" className={cn('h-40 animate-pulse rounded-md bg-neutral-200 p-2', className)} {...rest} />;
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
        'flex flex-col gap-1 rounded-md bg-surface p-2 shadow-md transition-transform',
        selected && 'ring-2 ring-accent',
        interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className
      )}
      {...rest}
    >
      <div className={cn('relative overflow-hidden rounded-sm bg-neutral-100', RATIO[ratio])}>
        {url ? <img src={url} alt={interactive ? '' : alt ?? caption ?? ''} loading="lazy" className="h-full w-full object-cover" /> : null}
        {favorite ? (
          <span role="img" aria-label="Favourite" className="absolute right-1 top-1 inline-flex items-center rounded-full bg-neutral-900/60 px-1.5 py-0.5 text-sm leading-none text-on-primary">★</span>
        ) : null}
      </div>
      {caption ? <p className="truncate px-0.5 text-center text-xs text-muted">{caption}</p> : null}
    </div>
  );
});
