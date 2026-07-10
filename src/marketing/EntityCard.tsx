import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Eyebrow } from '../primitives/Eyebrow';
import { GenerativeCover } from './GenerativeCover';

export interface EntityCardMedia {
  /** Image URL; when present an `<img>` is drawn. */
  imageUrl?: string;
  /** Stable seed for the {@link GenerativeCover} fallback (defaults to the title). */
  seed?: string;
  /** width / height aspect ratio of the media box (default 1.6). */
  aspect?: number;
}

export interface EntityCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Primary heading. */
  title: string;
  /** Small kicker above the title (category, company, …). */
  eyebrow?: string;
  /** Body copy under the title. */
  description?: string;
  /** Compact trailing detail line (date, price · duration, talk, …). */
  meta?: string;
  /** Media descriptor; an image or a seeded generative cover. Omit for no media. */
  media?: EntityCardMedia;
  /** Corner overlay content (a `StatusDot`, a "Featured" pill, …). */
  badge?: React.ReactNode;
  /** Footer slot (actions, tags, author row, …). */
  footer?: React.ReactNode;
  /** If given, the media and title link here. */
  href?: string;
}

/**
 * A generic content/entity card — the single component that collapses the
 * templates' bespoke `PostCard` / `ServiceCard` / `SpeakerCard` /
 * `ListingCard` / `ProgramCard` into props. Composes the kit `Card` with an
 * inset media frame (an `<img>` when `media.imageUrl` is set, else a seeded
 * {@link GenerativeCover}), an optional `Eyebrow`, the `title` heading, an
 * optional `description`, a `meta` line, an optional corner `badge`, and a
 * `footer` slot. Token-only; the same card expresses a blog post, a service, a
 * speaker, a listing, or a program by props alone.
 */
export const EntityCard = React.forwardRef<HTMLDivElement, EntityCardProps>(function EntityCard(
  { title, eyebrow, description, meta, media, badge, footer, href, className, ...rest },
  ref
) {
  const mediaBox = media ? (
    <div
      className="aspect-[var(--xen-entity-aspect)] overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100"
      style={{ '--xen-entity-aspect': String(media.aspect ?? 1.6) } as React.CSSProperties}
    >
      {media.imageUrl ? (
        <img
          src={media.imageUrl}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <GenerativeCover seed={media.seed ?? title} label={title} className="h-full w-full" />
      )}
    </div>
  ) : null;

  const heading = (
    <h3 className="font-heading text-lg font-semibold leading-snug text-on-surface">
      {href ? (
        <a href={href} className="hover:text-primary">
          {title}
        </a>
      ) : (
        title
      )}
    </h3>
  );

  return (
    <Card
      ref={ref}
      data-xen-entity-card=""
      className={cn('relative flex flex-col gap-[var(--xen-space-sm)]', className)}
      {...rest}
    >
      {badge ? (
        <div data-xen-entity-badge="" className="absolute right-[var(--xen-space-md)] top-[var(--xen-space-md)] z-10">
          {badge}
        </div>
      ) : null}
      {mediaBox ? (
        href ? (
          <a href={href} aria-label={title} className="block">
            {mediaBox}
          </a>
        ) : (
          mediaBox
        )
      ) : null}
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {heading}
      {description ? (
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      ) : null}
      {meta ? (
        <p data-xen-entity-meta="" className="text-sm font-medium text-on-surface">
          {meta}
        </p>
      ) : null}
      {footer ? <div className="mt-[var(--xen-space-xs)]">{footer}</div> : null}
    </Card>
  );
});
