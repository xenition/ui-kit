import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { ListingGalleryProps } from './ListingGallery';

/** Drop-in for {@link ListingGalleryProps} — same props, the V4 "listing" design. */
export type ListingGalleryV4Props = ListingGalleryProps;

/**
 * ListingGallery — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on a listing gallery: a big rounded hero photo
 * with a bottom gradient scrim, a near-white "n / total" counter overlaid on the
 * scrim, prev/next controls, and a rounded thumbnail strip that also drives the
 * active index. Works uncontrolled, or drive it with `index`. Data only: URLs
 * in, an `onIndexChange` callback out; nothing fetches. On an empty `images`
 * array it renders the shared `EmptyState`. All colors from `--xen-*` token
 * classes (no literals).
 */
export const ListingGalleryV4 = React.forwardRef<HTMLDivElement, ListingGalleryV4Props>(function ListingGalleryV4(
  { images, height = 220, index, onIndexChange, emptyLabel = 'No photos yet', className, ...rest },
  ref
) {
  const [internal, setInternal] = React.useState(0);

  if (images.length === 0) {
    return (
      <EmptyState
        ref={ref}
        title={emptyLabel}
        description="Photos will appear here once uploaded."
        className={className}
      />
    );
  }

  const active = index ?? internal;
  const current = Math.min(Math.max(active, 0), images.length - 1);

  const go = (next: number): void => {
    const clamped = Math.min(Math.max(next, 0), images.length - 1);
    if (clamped === current) return;
    setInternal(clamped);
    onIndexChange?.(clamped);
  };

  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-2', className)}
      {...rest}
    >
      {/* Big rounded hero photo with a bottom gradient scrim. */}
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={`Listing photo ${current + 1} of ${images.length}`}
        className="relative overflow-hidden rounded-[var(--xen-radius-lg)] bg-on-surface/10 shadow-md"
      >
        <img src={images[current]} alt={`Photo ${current + 1}`} style={{ height }} className="w-full object-cover" />

        {/* Scrim for legible near-white overlays. */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-on-surface/70 to-transparent" />

        {images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => go(current - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-surface px-2 py-1 text-on-surface hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => go(current + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-surface px-2 py-1 text-on-surface hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              ›
            </button>
          </>
        ) : null}

        {/* Near-white counter on the scrim. */}
        <span className="absolute bottom-2 left-3 text-sm font-bold text-on-primary">
          {`${current + 1} / ${images.length}`}
        </span>
      </div>

      {/* Rounded thumbnail strip. */}
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === current}
              onClick={() => go(i)}
              className={cn(
                'h-14 w-20 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] border transition-opacity focus:outline-none focus:ring-2 focus:ring-primary',
                i === current ? 'border-primary opacity-100' : 'border-border opacity-70 hover:opacity-100'
              )}
            >
              <img src={src} alt="" aria-hidden="true" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
});
