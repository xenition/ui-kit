import * as React from 'react';
import { cn } from '../primitives/cn';

/** Aspect-ratio presets for a photo tile. */
export type PhotoTileRatio = 'square' | 'portrait' | 'landscape';

const RATIO_CLASS: Record<PhotoTileRatio, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
};

export interface PhotoTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Photo source URL. When absent a token-tinted placeholder is drawn. */
  url?: string;
  /** Accessible description of the photo. */
  alt?: string;
  /** Caption overlaid at the foot of the tile. */
  caption?: string;
  /** Aspect ratio preset (default `square`). */
  ratio?: PhotoTileRatio;
  /** Selected state — draws a token accent ring + check affordance. */
  selected?: boolean;
  /** Favourited state — shows a star marker (labelled, not color-alone). */
  favorite?: boolean;
  /** Loading placeholder — token-only skeleton, no image. */
  loading?: boolean;
}

/**
 * A single photo tile — the atomic unit of a grid or selection sheet. Draws the
 * image inside an aspect-ratio box (`square`/`portrait`/`landscape`), an
 * optional overlaid `caption`, a `favorite` star marker, and a `selected`
 * accent ring with a check badge. Selection/favourite states carry a glyph +
 * accessibility state, never color alone. Passing `onClick` makes it a
 * keyboard-operable `button`; token-only colors.
 */
export const PhotoTile = React.forwardRef<HTMLDivElement, PhotoTileProps>(function PhotoTile(
  { url, alt, caption, ratio = 'square', selected = false, favorite = false, loading = false, onClick, className, ...rest },
  ref
) {
  const interactive = typeof onClick === 'function';

  const frame = cn(
    'relative overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100',
    RATIO_CLASS[ratio],
    selected && 'ring-2 ring-accent',
    interactive &&
      'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
    className
  );

  if (loading) {
    return (
      <div
        ref={ref}
        data-xen-photo-tile=""
        aria-label="Loading photo"
        aria-busy="true"
        className={cn(frame, 'animate-pulse bg-neutral-200')}
      />
    );
  }

  const overlays = (
    <>
      {url ? (
        <img
          src={url}
          alt={interactive ? '' : alt ?? caption ?? ''}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : null}

      {favorite ? (
        <span
          data-xen-photo-favorite=""
          role="img"
          aria-label="Favourite"
          className="absolute right-[var(--xen-space-xs)] top-[var(--xen-space-xs)] inline-flex items-center rounded-full bg-neutral-900/60 px-[var(--xen-space-xs)] py-0.5 text-sm leading-none text-on-primary"
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

      {caption ? (
        <span className="absolute inset-x-0 bottom-0 truncate bg-neutral-900/50 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-semibold text-on-primary">
          {caption}
        </span>
      ) : null}
    </>
  );

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
      className={frame}
      {...rest}
    >
      {overlays}
    </div>
  );
});
