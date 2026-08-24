import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import type { AlbumCardProps } from './AlbumCard';

/** Same public contract as {@link AlbumCard} — a drop-in alternate design. */
export type AlbumCardV2Props = AlbumCardProps;

/**
 * AlbumCard, redesigned (v2): a **full-bleed cover hero**. The cover fills the
 * card; a Private badge floats top-left and the title over a photo-count·date
 * line sits on a gradient scrim at the bottom. Elevated, hover-lift. Same props
 * as {@link AlbumCard}, token-only.
 */
export const AlbumCardV2 = React.forwardRef<HTMLDivElement, AlbumCardV2Props>(function AlbumCardV2(
  { title, photoCount, dateText, coverUrl, isPrivate, variant, loading = false, countLabel = 'photos', className, ...rest },
  ref
) {
  void variant;
  if (loading) {
    return <div ref={ref} data-xen-album-card="" aria-label="Loading album" className={cn('h-48 animate-pulse rounded-lg bg-neutral-200', className)} {...rest} />;
  }

  const meta = [typeof photoCount === 'number' ? `${photoCount} ${countLabel}` : null, dateText].filter((s): s is string => !!s);

  return (
    <div
      ref={ref}
      data-xen-album-card=""
      className={cn(
        'relative flex h-48 flex-col justify-end overflow-hidden rounded-lg bg-neutral-100 shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className
      )}
      {...rest}
    >
      {coverUrl ? (
        <img src={coverUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-4xl">🖼️</div>
      )}
      {isPrivate ? <div className="absolute left-2 top-2"><Badge tone="neutral">🔒 Private</Badge></div> : null}
      <div className="relative bg-gradient-to-t from-neutral-900/75 to-transparent p-3 pt-10">
        <p className="text-base font-bold text-neutral-50">{title}</p>
        {meta.length > 0 ? <p className="text-xs text-neutral-200">{meta.join(' · ')}</p> : null}
      </div>
    </div>
  );
});
