import * as React from 'react';
import { cn } from '../primitives/cn';

/** Layout variants for the gallery header. */
export type GalleryHeaderVariant = 'hero' | 'compact';

export interface GalleryHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Gallery / shoot title. */
  title: string;
  /** Supporting subtitle (client, date, or event). */
  subtitle?: string;
  /** Photo count shown as a small meta pill. */
  photoCount?: number;
  /** Full-bleed cover image URL (`hero` variant). */
  coverUrl?: string;
  /** Layout variant (default `hero`). */
  variant?: GalleryHeaderVariant;
  /** Action slot (e.g. a share / download button row). */
  actions?: React.ReactNode;
  /** Word for the count meta (default `photos`). */
  countLabel?: string;
}

/**
 * The masthead for a client gallery — a title with an optional subtitle, a
 * photo-count meta pill, and an `actions` slot. The `hero` variant lays the
 * text over a full-bleed cover image (with a token scrim for legibility); the
 * `compact` variant is a plain titled band. The title is a semantic heading.
 * Token-only — scrim and surfaces trace to `--xen-*` tokens.
 */
export const GalleryHeader = React.forwardRef<HTMLElement, GalleryHeaderProps>(
  function GalleryHeader(
    { title, subtitle, photoCount, coverUrl, variant = 'hero', actions, countLabel = 'photos', className, ...rest },
    ref
  ) {
    const isHero = variant === 'hero' && Boolean(coverUrl);

    const textBlock = (
      <div className="flex flex-col gap-[var(--xen-space-xs)]">
        <h2 className={cn('font-heading text-2xl font-bold', isHero ? 'text-neutral-50' : 'text-on-surface')}>
          {title}
        </h2>
        {subtitle ? (
          <p className={cn('text-sm', isHero ? 'text-neutral-50' : 'text-muted')}>{subtitle}</p>
        ) : null}
        {typeof photoCount === 'number' ? (
          <span
            className={cn(
              'mt-[var(--xen-space-xs)] inline-flex w-fit items-center rounded-full px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold',
              isHero ? 'bg-neutral-900/40 text-neutral-50' : 'bg-neutral-100 text-muted'
            )}
          >
            {photoCount} {countLabel}
          </span>
        ) : null}
        {actions ? (
          <div className="mt-[var(--xen-space-sm)] flex flex-wrap gap-[var(--xen-space-sm)]">{actions}</div>
        ) : null}
      </div>
    );

    if (isHero) {
      return (
        <header
          ref={ref}
          data-xen-gallery-header="hero"
          className={cn(
            'relative flex h-[200px] flex-col justify-end overflow-hidden rounded-[var(--xen-radius-lg)] bg-neutral-200',
            className
          )}
          {...rest}
        >
          <img src={coverUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative bg-neutral-900/40 p-[var(--xen-space-lg)]">{textBlock}</div>
        </header>
      );
    }

    return (
      <header
        ref={ref}
        data-xen-gallery-header="compact"
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
          className
        )}
        {...rest}
      >
        {textBlock}
      </header>
    );
  }
);
