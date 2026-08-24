import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';

/** Visual density / emphasis of an {@link EventCard}. */
export type EventCardVariant = 'default' | 'compact' | 'featured';

export interface EventCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Event name. */
  title: string;
  /** Pre-formatted date label, e.g. `Sat, Aug 24`. */
  date?: string;
  /** Pre-formatted time label, e.g. `7:00 PM`. */
  time?: string;
  /** Venue / location line. */
  location?: string;
  /** Cover image URL. When absent a token-filled placeholder is drawn. */
  imageUrl?: string;
  /** Alt text for the cover (defaults to the title). */
  imageAlt?: string;
  /** Short category label rendered as a badge (e.g. `Music`). */
  category?: string;
  /** Attendee count shown with a people glyph. */
  attendeeCount?: number;
  /** Density / emphasis. `featured` enlarges the cover and title. */
  variant?: EventCardVariant;
  /** Show a skeleton placeholder instead of content. */
  loading?: boolean;
}

/**
 * Summary tile for a single event — the entry point of the events module.
 * Renders a cover (image or token placeholder), an optional category badge, the
 * title, and a date / time / location meta row. `variant` switches between a
 * full card, a `compact` list row (no cover), and a larger `featured`
 * treatment. Passing `onClick` makes the whole card an accessible button (role
 * + keyboard). All colors come from the `--xen-*` tokens — no literal colors.
 */
export const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(function EventCard(
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
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  const clickable = typeof onClick === 'function';

  const container = cn(
    'overflow-hidden rounded-lg border border-border bg-surface text-on-surface',
    isCompact ? 'flex flex-row' : 'flex flex-col',
    clickable && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
    className
  );

  if (loading) {
    return (
      <div ref={ref} aria-label="Loading event" className={container} {...rest}>
        {!isCompact ? (
          <div className={cn('w-full animate-pulse bg-neutral-200', isFeatured ? 'h-48' : 'h-36')} />
        ) : null}
        <div className="flex flex-col gap-sm p-md">
          <div className="h-5 w-8/12 animate-pulse rounded-sm bg-neutral-200" />
          <div className="h-4 w-5/12 animate-pulse rounded-sm bg-neutral-100" />
        </div>
      </div>
    );
  }

  const metaLine = [date, time].filter(Boolean).join(' · ');

  const cover = !isCompact ? (
    <div className={cn('relative w-full bg-neutral-100', isFeatured ? 'h-48' : 'h-36')}>
      {imageUrl ? (
        <img src={imageUrl} alt={imageAlt ?? title} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Icon glyph="🎟️" size="2xl" aria-label={imageAlt ?? title} />
        </div>
      )}
      {category ? (
        <span className="absolute left-sm top-sm">
          <Badge tone="primary">{category}</Badge>
        </span>
      ) : null}
    </div>
  ) : null;

  const body = (
    <div className="flex flex-1 flex-col gap-xs p-md">
      {isCompact && category ? (
        <span className="self-start">
          <Badge tone="primary">{category}</Badge>
        </span>
      ) : null}
      <h3 className={cn('font-heading font-bold text-on-surface', isFeatured ? 'text-xl' : 'text-base')}>
        {title}
      </h3>
      {metaLine ? (
        <p className="flex items-center gap-xs text-sm text-muted">
          <Icon glyph="🗓️" size="sm" color="muted" />
          {metaLine}
        </p>
      ) : null}
      {location ? (
        <p className="flex items-center gap-xs truncate text-sm text-muted">
          <Icon glyph="📍" size="sm" color="muted" />
          {location}
        </p>
      ) : null}
      {typeof attendeeCount === 'number' ? (
        <p className="flex items-center gap-xs text-sm text-muted">
          <Icon glyph="👥" size="sm" color="muted" />
          {`${attendeeCount} going`}
        </p>
      ) : null}
    </div>
  );

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
      {cover}
      {body}
    </div>
  );
});
