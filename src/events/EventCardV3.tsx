import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import type { EventCardProps } from './EventCard';

/** Drop-in replacement for {@link EventCard} — identical props. */
export type EventCardV3Props = EventCardProps;

/**
 * EventCard — **horizontal media-left row** alternate design (web / React DOM).
 *
 * A dense list row: a square cover thumbnail on the left carries a floating
 * token date block, and a text column on the right holds the category badge,
 * title, and time / location / attendee meta. Far denser and more list-friendly
 * than the base vertical card, and distinct from its cover-less `compact` row
 * (this keeps the media). Same props as {@link EventCard} — a drop-in swap.
 * Token-pure.
 */
export const EventCardV3 = React.forwardRef<HTMLDivElement, EventCardV3Props>(function EventCardV3(
  {
    title,
    date,
    time,
    location,
    imageUrl,
    imageAlt,
    category,
    attendeeCount,
    variant = 'default',
    loading = false,
    onClick,
    onKeyDown,
    className,
    ...rest
  },
  ref
) {
  const isFeatured = variant === 'featured';
  const clickable = typeof onClick === 'function';
  const mediaClass = isFeatured ? 'h-28 w-28' : 'h-24 w-24';

  const container = cn(
    'flex flex-row overflow-hidden rounded-lg border border-border bg-surface text-on-surface',
    clickable &&
      'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
    className
  );

  if (loading) {
    return (
      <div ref={ref} aria-label="Loading event" aria-busy="true" className={container} {...rest}>
        <div className={cn('shrink-0 animate-pulse bg-neutral-200 motion-reduce:animate-none', mediaClass)} />
        <div className="flex flex-1 flex-col justify-center gap-sm p-md">
          <div className="h-4 w-7/12 animate-pulse rounded-sm bg-neutral-200" />
          <div className="h-3 w-5/12 animate-pulse rounded-sm bg-neutral-100" />
        </div>
      </div>
    );
  }

  const metaLine = [time, location].filter(Boolean).join(' · ');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(e);
    if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
      e.preventDefault();
      (e.currentTarget as HTMLDivElement).click();
    }
  };

  return (
    <div
      ref={ref}
      className={container}
      onClick={onClick}
      onKeyDown={clickable ? handleKeyDown : onKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? title : undefined}
      {...rest}
    >
      <div className={cn('relative shrink-0 bg-neutral-100', mediaClass)}>
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt ?? title} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Icon glyph="🎟️" size="xl" aria-label={imageAlt ?? title} />
          </div>
        )}
        {date ? (
          <span className="absolute inset-x-xs bottom-xs truncate rounded-sm bg-surface px-xs py-px text-center text-xs font-extrabold tracking-wide text-primary shadow-sm">
            {date}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-center gap-xs p-md">
        {category ? (
          <span className="self-start">
            <Badge tone="primary" size="sm">{category}</Badge>
          </span>
        ) : null}
        <h3 className="line-clamp-2 font-heading text-base font-bold text-on-surface">{title}</h3>
        {metaLine ? <p className="line-clamp-1 text-sm text-muted">{metaLine}</p> : null}
        {typeof attendeeCount === 'number' ? (
          <p className="flex items-center gap-xs text-xs text-muted">
            <Icon glyph="👥" size="sm" color="muted" />
            {`${attendeeCount} going`}
          </p>
        ) : null}
      </div>
    </div>
  );
});
