import * as React from 'react';
import { cn } from '../primitives/cn';
import { GenerativeCover, type CoverColorRole, type CoverForm } from './GenerativeCover';

export interface CoverGalleryItem {
  /** Stable seed for this plate's generative composition. */
  seed: string | number;
  /** Composition of the seeded cover (arc, bands, orbit, grid, wave, stack). */
  form?: CoverForm;
  /** Ink color role (token role, e.g. `primary-700`). */
  ink?: CoverColorRole;
  /** Paper color role (token role, e.g. `neutral-100`). */
  paper?: CoverColorRole;
  /** Accessible label for the plate (also used as the link aria-label). */
  label?: string;
  /** Caption rendered under the plate (title of the piece / work). */
  caption?: React.ReactNode;
  /** Small secondary line under the caption (medium, year, artist, …). */
  meta?: React.ReactNode;
  /** When set, the whole tile links here (stretched link over the plate). */
  href?: string;
}

export interface CoverGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The plates to render. */
  items: CoverGalleryItem[];
  /** Column count at the largest breakpoint. */
  columns?: 2 | 3 | 4;
  /** width / height aspect ratio of every plate (default 1 — square). */
  aspect?: number;
}

const COLUMN_CLASSES: Record<NonNullable<CoverGalleryProps['columns']>, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * A responsive gallery of seeded {@link GenerativeCover} plates with captions —
 * an IMAGE-FREE wall of generative artwork. Where `TeamGrid`/`EntityCard` assume
 * real image URLs, this renders the deterministic cover plates the templates use
 * for portfolios, exhibitions, work galleries, and lookbooks (the hand-rolled
 * `PortfolioGrid` / `WorkGrid` / `Plate` collapsed into one prop-driven grid).
 * Each tile optionally deep-links to a detail route via a stretched link, and
 * every color is a token role — no literal hex, no external assets.
 */
export const CoverGallery = React.forwardRef<HTMLDivElement, CoverGalleryProps>(function CoverGallery(
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
            className="overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100"
            style={{ '--xen-cover-aspect': String(aspect) } as React.CSSProperties}
          >
            <div className="aspect-[var(--xen-cover-aspect)]">
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
              <figcaption className="flex flex-col gap-[var(--xen-space-xs)]">
                {item.caption !== undefined ? (
                  <span className="font-heading text-base font-semibold leading-snug text-on-surface">
                    {item.caption}
                  </span>
                ) : null}
                {item.meta !== undefined ? (
                  <span data-xen-cover-meta="" className="text-sm text-muted">
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
