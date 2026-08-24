import * as React from 'react';
import { cn } from '../primitives/cn';

export interface CarouselPhoto {
  /** Remote image URL. */
  uri: string;
  /** Alt text announced to screen readers. */
  alt?: string;
}

export type PhotoCarouselRatio = 'portrait' | 'square' | 'landscape';

export interface PhotoCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ordered photos. */
  photos?: CarouselPhoto[];
  /** Controlled active index. */
  index?: number;
  /** Fires when the active photo changes. */
  onIndexChange?: (index: number) => void;
  /** Aspect ratio of the frame. Defaults to `portrait`. */
  ratio?: PhotoCarouselRatio;
  /** Rounded corners. Defaults to true. */
  rounded?: boolean;
  /** Loading skeleton. */
  loading?: boolean;
  /** Empty-state copy when there are no photos. */
  emptyLabel?: string;
}

const RATIO: Record<PhotoCarouselRatio, string> = {
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  landscape: 'aspect-[3/2]',
};

/**
 * Photo pager for a profile — the web parity of the native photo carousel.
 * Clicking the left/right half of the frame steps between photos (real
 * `<button>` tap zones) with a segmented progress bar on top. Supports controlled
 * (`index`/`onIndexChange`) and uncontrolled use, plus explicit empty and loading
 * states. Token classes only — array access is guarded.
 */
export const PhotoCarousel = React.forwardRef<HTMLDivElement, PhotoCarouselProps>(
  function PhotoCarousel(
    { photos, index, onIndexChange, ratio = 'portrait', rounded = true, loading = false, emptyLabel = 'No photos yet', className, ...rest },
    ref
  ) {
    const list = photos ?? [];
    const controlled = index != null;
    const [internal, setInternal] = React.useState(0);
    const active = Math.max(0, Math.min(list.length - 1, controlled ? (index as number) : internal));

    const go = (next: number): void => {
      const clamped = Math.max(0, Math.min(list.length - 1, next));
      if (!controlled) setInternal(clamped);
      if (clamped !== active) onIndexChange?.(clamped);
    };

    const frame = cn(
      'relative w-full overflow-hidden bg-neutral-200',
      RATIO[ratio],
      rounded && 'rounded-[var(--xen-radius-lg)]',
      className
    );

    if (loading) {
      return <div ref={ref} aria-label="Loading photos" className={frame} {...rest} />;
    }

    if (list.length === 0) {
      return (
        <div ref={ref} aria-label={emptyLabel} className={cn(frame, 'flex flex-col items-center justify-center')} {...rest}>
          <span aria-hidden="true" className="text-2xl">📷</span>
          <span className="mt-xs text-sm text-muted">{emptyLabel}</span>
        </div>
      );
    }

    const current = list[active] ?? list[0]!;

    return (
      <div ref={ref} className={frame} {...rest}>
        <img src={current.uri} alt={current.alt ?? `Photo ${active + 1} of ${list.length}`} className="h-full w-full object-cover" />

        {/* Tap zones — left half = previous, right half = next. */}
        <div className="absolute inset-0 flex">
          <button
            type="button"
            aria-label="Previous photo"
            disabled={active === 0}
            onClick={() => go(active - 1)}
            className="flex-1 cursor-pointer disabled:cursor-default"
          />
          <button
            type="button"
            aria-label="Next photo"
            disabled={active >= list.length - 1}
            onClick={() => go(active + 1)}
            className="flex-1 cursor-pointer disabled:cursor-default"
          />
        </div>

        {/* Segmented indicators. */}
        <div
          aria-label={`Photo ${active + 1} of ${list.length}${current.alt ? `: ${current.alt}` : ''}`}
          className="absolute inset-x-sm top-sm flex gap-xs"
        >
          {list.map((p, i) => (
            <span
              key={`${p.uri}-${i}`}
              aria-hidden="true"
              className={cn('h-[3px] flex-1 rounded-full', i <= active ? 'bg-surface' : 'bg-neutral-500')}
            />
          ))}
        </div>
      </div>
    );
  }
);
