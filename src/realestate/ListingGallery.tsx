import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';

export interface ListingGalleryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Ordered photo URLs. Empty renders a token-styled empty state. */
  images: string[];
  /** Frame height in px (default 220). */
  height?: number;
  /** Controlled active index; falls back to internal state when omitted. */
  index?: number;
  /** Fires with the new page index after a navigation. */
  onIndexChange?: (index: number) => void;
  /** Empty-state headline. */
  emptyLabel?: string;
}

/**
 * Web parity of the native `ListingGallery`: a single-photo viewer for a listing
 * with prev/next controls, a "n / total" counter, and a dot indicator. Works
 * uncontrolled, or drive it with `index`. Data only: URLs in, an `onIndexChange`
 * callback out; nothing fetches. On an empty `images` array it renders the shared
 * `EmptyState`. All colors come from the `--xen-*` tokens — no literal colors.
 */
export const ListingGallery = React.forwardRef<HTMLDivElement, ListingGalleryProps>(
  function ListingGallery(
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
        role="group"
        aria-roledescription="carousel"
        aria-label={`Listing photo ${current + 1} of ${images.length}`}
        className={cn(
          'relative overflow-hidden bg-border rounded-[var(--xen-radius-lg)]',
          className
        )}
        {...rest}
      >
        <img
          src={images[current]}
          alt={`Photo ${current + 1}`}
          style={{ height }}
          className="w-full object-cover"
        />

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

        <span className="absolute right-2 top-2 rounded-full border border-border bg-surface px-2 py-0.5 text-xs font-semibold text-on-surface">
          {`${current + 1} / ${images.length}`}
        </span>

        <span className="absolute inset-x-0 bottom-2 flex justify-center gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                i === current ? 'bg-on-primary' : 'bg-muted'
              )}
            />
          ))}
        </span>
      </div>
    );
  }
);
