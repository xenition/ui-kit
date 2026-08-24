import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import type { AlbumCardProps } from './AlbumCard';

/** Same public contract as {@link AlbumCard} — a drop-in alternate design. */
export type AlbumCardV3Props = AlbumCardProps;

/**
 * AlbumCard, redesigned (v3): a **compact album row**. A small square cover
 * thumbnail, the title over a photo-count·date line, and a Private chip on the
 * trailing edge — hairline-bordered for an albums list. The opposite of v2's
 * cover hero. Same props, token-only.
 */
export const AlbumCardV3 = React.forwardRef<HTMLDivElement, AlbumCardV3Props>(function AlbumCardV3(
  { title, photoCount, dateText, coverUrl, isPrivate, variant, loading = false, countLabel = 'photos', className, ...rest },
  ref
) {
  void variant;
  if (loading) {
    return (
      <div ref={ref} data-xen-album-card="" aria-label="Loading album" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}>
        <div className="h-12 w-12 animate-pulse rounded-md bg-neutral-200" />
        <div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-200" />
      </div>
    );
  }

  const meta = [typeof photoCount === 'number' ? `${photoCount} ${countLabel}` : null, dateText].filter((s): s is string => !!s);

  return (
    <div
      ref={ref}
      data-xen-album-card=""
      className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}
      {...rest}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl">
        {coverUrl ? <img src={coverUrl} alt="" className="h-full w-full object-cover" /> : '🖼️'}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
        {meta.length > 0 ? <p className="truncate text-xs text-muted">{meta.join(' · ')}</p> : null}
      </div>
      {isPrivate ? <Badge tone="neutral">🔒 Private</Badge> : null}
    </div>
  );
});
