import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { ListingGalleryProps } from './ListingGallery';

/** Same public contract as {@link ListingGallery} — a drop-in alternate design. */
export type ListingGalleryV2Props = ListingGalleryProps;

/**
 * ListingGallery, redesigned (v2): a **hero + thumbnail strip**. A large frame
 * with prev/next arrows and an "n / total" counter, plus a row of tappable
 * thumbnails beneath that highlight the active image. Distinct from v1's plain
 * pager. Same props, token-only.
 */
export const ListingGalleryV2 = React.forwardRef<HTMLDivElement, ListingGalleryV2Props>(
  function ListingGalleryV2({ images, height = 220, index, onIndexChange, emptyLabel = 'No photos', className, ...rest }, ref) {
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
          <button type="button" aria-label="Previous photo" onClick={() => go(active - 1)} className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-on-surface">‹</button>
          <button type="button" aria-label="Next photo" onClick={() => go(active + 1)} className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-on-surface">›</button>
          <span className="absolute bottom-2 right-2 rounded-full bg-neutral-900/60 px-2 py-0.5 text-xs text-neutral-50">{active + 1} / {images.length}</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === active}
              onClick={() => go(i)}
              className={cn('h-12 w-16 shrink-0 overflow-hidden rounded-md', i === active ? 'ring-2 ring-primary' : 'opacity-70')}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    );
  }
);
