import * as React from 'react';
import { cn } from '../primitives/cn';
import type { GalleryHeaderProps } from './GalleryHeader';

/** Drop-in for {@link GalleryHeaderProps} — same props, the V4 "studio" design. */
export type GalleryHeaderV4Props = GalleryHeaderProps;

/**
 * GalleryHeader — **V4** "studio" design (web parity of the native V4). The
 * client-gallery masthead, and the **one reserved gradient moment** in the
 * photography studio line. The `hero` variant is image-forward: with a
 * `coverUrl` it lays near-white ink over a full-bleed cover photo darkened by a
 * bottom scrim (`from-neutral-900/70`); with no cover it falls back to the brand
 * gradient ground (`from-primary-500 to-primary-700`). The `compact` variant is
 * a clean studio band (no gradient) — bordered `bg-surface`, a bold title, muted
 * subtitle, and a neutral count pill. The photo-count reads as a frosted
 * `primary-50` pill on the gradient; the title is a semantic `<h2>` inside a
 * `<header>`. Identical props/behavior to {@link GalleryHeaderProps}; all colors
 * from `--xen-*` token classes / brand-ramp utilities (no literals).
 */
export const GalleryHeaderV4 = React.forwardRef<HTMLElement, GalleryHeaderV4Props>(
  function GalleryHeaderV4(
    { title, subtitle, photoCount, coverUrl, variant = 'hero', actions, countLabel = 'photos', className, ...rest },
    ref
  ) {
    const isHero = variant === 'hero';

    // ── compact: clean studio band, no gradient ──────────────────────────────
    if (!isHero) {
      return (
        <header
          ref={ref}
          data-xen-gallery-header="compact"
          className={cn(
            'flex flex-col gap-[var(--xen-space-sm)] rounded-lg border border-border bg-surface p-[var(--xen-space-lg)]',
            className
          )}
          {...rest}
        >
          <div className="flex flex-col gap-[var(--xen-space-xs)]">
            <h2 className="font-heading text-2xl font-bold text-on-surface">{title}</h2>
            {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
            {typeof photoCount === 'number' ? (
              <span className="mt-[var(--xen-space-xs)] inline-flex w-fit items-center rounded-full bg-neutral-100 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold text-muted">
                {photoCount} {countLabel}
              </span>
            ) : null}
            {actions ? (
              <div className="mt-[var(--xen-space-sm)] flex flex-wrap gap-[var(--xen-space-sm)]">{actions}</div>
            ) : null}
          </div>
        </header>
      );
    }

    // ── hero: the reserved gradient moment ───────────────────────────────────
    const textBlock = (
      <div className="relative flex flex-col gap-[var(--xen-space-xs)]">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-primary-50">{title}</h2>
        {subtitle ? <p className="truncate text-sm text-primary-100">{subtitle}</p> : null}
        {typeof photoCount === 'number' ? (
          <span className="mt-[var(--xen-space-xs)] inline-flex w-fit items-center rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold text-primary-50">
            {photoCount} {countLabel}
          </span>
        ) : null}
        {actions ? (
          <div className="mt-[var(--xen-space-sm)] flex flex-wrap gap-[var(--xen-space-sm)]">{actions}</div>
        ) : null}
      </div>
    );

    return (
      <header
        ref={ref}
        data-xen-gallery-header="hero"
        className={cn(
          'relative isolate flex min-h-[200px] flex-col justify-end overflow-hidden rounded-[var(--xen-radius-lg)]',
          // Cover present → neutral ground under the photo; absent → brand gradient ground.
          coverUrl ? 'bg-neutral-200' : 'bg-gradient-to-br from-primary-500 to-primary-700',
          className
        )}
        {...rest}
      >
        {/* Full-bleed cover photo (falls back to the brand gradient ground when absent). */}
        {coverUrl ? (
          <img src={coverUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        ) : null}
        {/* Bottom scrim for legible near-white text over a cover photo. */}
        {coverUrl ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-neutral-900/70 to-transparent" />
        ) : null}

        <div className="p-[var(--xen-space-lg)]">{textBlock}</div>
      </header>
    );
  }
);
