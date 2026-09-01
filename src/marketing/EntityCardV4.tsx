import * as React from 'react';
import { cn } from '../primitives/cn';
import { Eyebrow } from '../primitives/Eyebrow';
import { GenerativeCover } from './GenerativeCover';
import type { EntityCardProps } from './EntityCard';

/** Drop-in for {@link EntityCardProps} — same props, the V4 "showcase" design. */
export type EntityCardV4Props = EntityCardProps;

/**
 * EntityCard — **V4** "showcase" design (web parity of the native V4). The
 * generic content/entity card re-skinned as an image-forward showcase card: a
 * floating rounded media frame (an `<img>` when `media.imageUrl` is set, else a
 * seeded {@link GenerativeCover}; a soft-primary well with a glyph when no media
 * is given at all), the `eyebrow` as a soft-primary chip, a bold tight-tracked
 * `title`, muted `description`, an emphasized `meta` line, a corner `badge`, and
 * a `footer` slot — all on a clean elevated surface (NO brand gradient). The
 * base's `href` still stretches a link across the whole card. Honors every base
 * prop; token-only colors, no literals.
 */
export const EntityCardV4 = React.forwardRef<HTMLDivElement, EntityCardV4Props>(function EntityCardV4(
  { title, eyebrow, description, meta, media, badge, footer, href, className, ...rest },
  ref
) {
  const mediaBox = media ? (
    <div
      className="aspect-[var(--xen-entity-aspect)] overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100"
      style={{ '--xen-entity-aspect': String(media.aspect ?? 1.6) } as React.CSSProperties}
    >
      {media.imageUrl ? (
        <img src={media.imageUrl} alt={title} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <GenerativeCover
          seed={media.seed ?? title}
          label={title}
          form={media.form}
          ink={media.ink}
          paper={media.paper}
          className="h-full w-full"
        />
      )}
    </div>
  ) : (
    // No media descriptor at all — a soft-primary well with a glyph.
    <div className="flex aspect-[1.6] items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-primary/[0.08] text-primary">
      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  );

  const heading = (
    <h3 className="font-heading text-lg font-extrabold leading-snug tracking-tight text-on-surface">
      {href ? (
        <a href={href} className="hover:text-primary after:absolute after:inset-0 after:content-['']">
          {title}
        </a>
      ) : (
        title
      )}
    </h3>
  );

  return (
    <div
      ref={ref}
      data-xen-entity-card=""
      className={cn(
        'relative flex flex-col gap-[var(--xen-space-sm)]',
        'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-sm',
        'transition-shadow duration-300 hover:shadow-md',
        className
      )}
      {...rest}
    >
      {badge ? (
        <div
          data-xen-entity-badge=""
          className="absolute right-[var(--xen-space-md)] top-[var(--xen-space-md)] z-10"
        >
          {badge}
        </div>
      ) : null}
      {href && media ? (
        <a href={href} aria-label={title} className="block">
          {mediaBox}
        </a>
      ) : (
        mediaBox
      )}
      {eyebrow ? (
        <span className="w-fit rounded-[var(--xen-radius-full)] bg-primary/10 px-[var(--xen-space-sm)] py-[2px]">
          <Eyebrow>{eyebrow}</Eyebrow>
        </span>
      ) : null}
      {heading}
      {description ? <p className="text-sm leading-relaxed text-muted">{description}</p> : null}
      {meta ? (
        <p data-xen-entity-meta="" className="text-sm font-medium text-on-surface">
          {meta}
        </p>
      ) : null}
      {footer ? <div className="mt-[var(--xen-space-xs)]">{footer}</div> : null}
    </div>
  );
});
