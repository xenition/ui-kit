import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { ListingGalleryProps } from './ListingGallery';

/** Same public contract as {@link ListingGallery} — a drop-in alternate design. */
export type ListingGalleryV3Props = ListingGalleryProps;

/**
 * ListingGallery, redesigned (v3): a **minimal dot pager**. A single framed image
 * with tap zones on the left/right halves and a row of position dots beneath — no
 * thumbnails, no arrows. The compact counterpart to v2's hero strip. Same props,
 * token-only.
 */
export const ListingGalleryV3 = React.forwardRef<HTMLDivElement, ListingGalleryV3Props>(
  function ListingGalleryV3({ images, height = 220, index, onIndexChange, emptyLabel = 'No photos', className, ...rest }, ref) {
    const [internal, setInternal] = React.useState(0);
    const active = Math.max(0, Math.min(images.length - 1, index ?? internal));

    if (images.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">🏠</span>} title={emptyLabel} className={className} {...rest} />;
    }

    const go = (next: number): void => {
      const clamped = (next + images.length) % images.length;
      if (index === undefined) setInternal(clamped);
      onIndexChange?.(clamped);
    };

    return (
      <div ref={ref} data-xen-listing-gallery="" className={cn('flex flex-col gap-2', className)} {...rest}>
        <div className="relative overflow-hidden rounded-lg bg-neutral-100" style={{ height }}>
          <img src={images[active]} alt={`Photo ${active + 1} of ${images.length}`} className="h-full w-full object-cover" />
          <button type="button" aria-label="Previous photo" onClick={() => go(active - 1)} className="absolute inset-y-0 left-0 w-1/3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" />
          <button type="button" aria-label="Next photo" onClick={() => go(active + 1)} className="absolute inset-y-0 right-0 w-1/3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" />
        </div>
        <div className="flex justify-center gap-1.5">
          {images.map((_, i) => (
            <span key={i} className={cn('h-1.5 rounded-full transition-all', i === active ? 'w-4 bg-primary' : 'w-1.5 bg-neutral-300')} aria-hidden />
          ))}
        </div>
      </div>
    );
  }
);
