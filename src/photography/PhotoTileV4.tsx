import * as React from 'react';
import { cn } from '../primitives/cn';
import type { PhotoTileProps, PhotoTileRatio } from './PhotoTile';

/** Drop-in for {@link PhotoTileProps} — same props, the V4 "studio" design. */
export type PhotoTileV4Props = PhotoTileProps;

const RATIO_CLASS: Record<PhotoTileRatio, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
};

/**
 * PhotoTile — **V4** "studio" design (web parity of the native V4). The matted,
 * image-forward take on a photo tile: an elevated card whose photo floats inside
 * a thin neutral **mat** ring, honoring all three `ratio` presets — `square`,
 * `portrait` (3/4), and `landscape` (4/3). `selected` and `favorite` are shown by
 * a glyph + token color (never color alone), the `caption` reads as a small
 * soft-primary chip, and `loading` draws a token-only skeleton. Identical
 * props/behavior to {@link PhotoTileProps}; `onClick` makes the whole tile a
 * keyboard-operable button. All colors from `--xen-*` token classes (no literals).
 */
export const PhotoTileV4 = React.forwardRef<HTMLDivElement, PhotoTileV4Props>(function PhotoTileV4(
  { url, alt, caption, ratio = 'square', selected = false, favorite = false, loading = false, onClick, className, ...rest },
  ref
) {
  const interactive = typeof onClick === 'function';

  const container = cn(
    'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 text-on-surface shadow-md',
    interactive &&
      'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    className
  );

  if (loading) {
    return (
      <div ref={ref} data-xen-photo-tile="" aria-label="Loading photo" aria-busy="true" className={container}>
        <div className={cn('animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200', RATIO_CLASS[ratio])} />
      </div>
    );
  }

  // The matted photo: the image floats inside a thin inset mat ring on a neutral ground.
  const mat = cn(
    'relative overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100 ring-1 ring-inset ring-border',
    RATIO_CLASS[ratio]
  );

  const media = (
    <div className={mat}>
      {url ? (
        <img
          src={url}
          alt={interactive ? '' : alt ?? caption ?? ''}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-2xl text-muted" aria-hidden="true">
          🖼
        </div>
      )}

      {favorite ? (
        <span
          data-xen-photo-favorite=""
          role="img"
          aria-label="Favourite"
          className="absolute right-[var(--xen-space-xs)] top-[var(--xen-space-xs)] inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-xs)] py-0.5 text-sm leading-none text-primary"
        >
          ★
        </span>
      ) : null}

      {selected ? (
        <span
          data-xen-photo-selected=""
          role="img"
          aria-label="Selected"
          className="absolute left-[var(--xen-space-xs)] top-[var(--xen-space-xs)] inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-accent text-sm leading-none text-on-accent"
        >
          ✓
        </span>
      ) : null}
    </div>
  );

  const chip = caption ? (
    <div className="px-1 pb-1 pt-[var(--xen-space-md)]">
      <span className="inline-flex max-w-full items-center gap-1 truncate rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-on-surface">
        {caption}
      </span>
    </div>
  ) : null;

  return (
    <div
      ref={ref}
      data-xen-photo-tile=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? alt ?? caption ?? 'Photo' : undefined}
      aria-pressed={interactive ? selected : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.currentTarget.click();
              }
            }
          : undefined
      }
      className={container}
      {...rest}
    >
      {media}
      {chip}
    </div>
  );
});
