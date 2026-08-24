import * as React from 'react';
import { cn } from '../primitives/cn';
import { aspectStyle } from './aspect';
import { MediaItem } from './types';

export interface MediaFigureProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  /** The media item to render. */
  item: MediaItem;
  /** Native image loading hint (default `lazy`). */
  loading?: 'lazy' | 'eager';
  /** Reserve the item's aspect ratio from `width`/`height` (default true). */
  reserveAspect?: boolean;
  /** Click handler on the media (e.g. open a lightbox). */
  onActivate?: () => void;
}

/**
 * A single media item with its caption — an image (or video) inside an
 * aspect-ratio box (from `width`/`height`, so no layout shift) and a
 * `<figcaption>`. Token-only. Lazy-loaded by default.
 */
export const MediaFigure = React.forwardRef<HTMLElement, MediaFigureProps>(function MediaFigure(
  { item, loading = 'lazy', reserveAspect = true, onActivate, className, ...rest },
  ref
) {
  const aspect = reserveAspect ? aspectStyle(item.width, item.height) : undefined;

  const media =
    item.kind === 'video' ? (
      <video
        src={item.url}
        poster={item.poster}
        controls
        preload="metadata"
        className="h-full w-full object-cover"
      />
    ) : (
      <img
        src={item.url}
        alt={item.alt ?? item.caption ?? ''}
        loading={loading}
        width={item.width}
        height={item.height}
        className="h-full w-full object-cover"
      />
    );

  const box = (
    <div
      className="overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100"
      style={aspect}
    >
      {onActivate ? (
        <button
          type="button"
          onClick={onActivate}
          className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          aria-label={item.alt ?? item.caption ?? 'Open media'}
        >
          {media}
        </button>
      ) : (
        media
      )}
    </div>
  );

  return (
    <figure ref={ref} data-xen-media-figure="" className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
      {box}
      {item.caption ? (
        <figcaption className="text-sm leading-relaxed text-muted">{item.caption}</figcaption>
      ) : null}
    </figure>
  );
});
