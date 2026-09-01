import * as React from 'react';
import { cn } from '../primitives/cn';
import { GenerativeCover } from './GenerativeCover';
import type { CoverGalleryProps } from './CoverGallery';

/** Drop-in for {@link CoverGalleryProps} — same props, the V4 "showcase" design. */
export type CoverGalleryV4Props = CoverGalleryProps;

const COLUMN_CLASSES: Record<NonNullable<CoverGalleryProps['columns']>, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * CoverGallery — **V4** "showcase" design (web parity of the native V4). An
 * elevated wall of floating rounded {@link GenerativeCover} plates (composing the
 * same seeded artwork the base does — `form`/`ink`/`paper` per plate still apply)
 * on a clean surface (NO brand gradient): each plate lifts on a soft shadow with
 * a hover bloom, captions read as bold tight-tracked headings, and `meta` becomes
 * a soft-primary chip. The base's per-tile `href` still stretches a link across
 * the plate. Honors every base prop (`items`/`columns`/`aspect`); token-only
 * colors, no literals.
 */
export const CoverGalleryV4 = React.forwardRef<HTMLDivElement, CoverGalleryV4Props>(function CoverGalleryV4(
  { items, columns = 3, aspect = 1, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-xen-cover-gallery=""
      className={cn('grid grid-cols-1 gap-[var(--xen-space-lg)]', COLUMN_CLASSES[columns], className)}
      {...rest}
    >
      {items.map((item, index) => {
        const plate = (
          <div
            className={cn(
              'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm',
              'transition-shadow duration-300 hover:shadow-md'
            )}
            style={{ '--xen-cover-aspect': String(aspect) } as React.CSSProperties}
          >
            <div className="aspect-[var(--xen-cover-aspect)] bg-primary/[0.06]">
              <GenerativeCover
                seed={item.seed}
                form={item.form}
                ink={item.ink}
                paper={item.paper}
                label={item.label ?? (typeof item.caption === 'string' ? item.caption : undefined)}
                className="h-full w-full"
              />
            </div>
          </div>
        );
        return (
          <figure
            key={index}
            data-xen-cover-tile=""
            className="relative flex flex-col gap-[var(--xen-space-sm)]"
          >
            {item.href ? (
              <a
                href={item.href}
                aria-label={item.label ?? (typeof item.caption === 'string' ? item.caption : 'View')}
                className="block after:absolute after:inset-0 after:content-['']"
              >
                {plate}
              </a>
            ) : (
              plate
            )}
            {item.caption !== undefined || item.meta !== undefined ? (
              <figcaption className="flex flex-col items-start gap-[var(--xen-space-xs)]">
                {item.caption !== undefined ? (
                  <span className="font-heading text-lg font-extrabold leading-snug tracking-tight text-on-surface">
                    {item.caption}
                  </span>
                ) : null}
                {item.meta !== undefined ? (
                  <span
                    data-xen-cover-meta=""
                    className="w-fit rounded-[var(--xen-radius-full)] bg-primary/10 px-[var(--xen-space-sm)] py-[2px] text-xs font-medium text-primary"
                  >
                    {item.meta}
                  </span>
                ) : null}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
});
