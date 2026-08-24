import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import type { EventCardProps } from './EventCard';

/** Drop-in replacement for {@link EventCard} — identical props. */
export type EventCardV2Props = EventCardProps;

/**
 * EventCard — **full-bleed cover hero** alternate design (web / React DOM).
 *
 * Where the base card stacks a cover above a text body, V2 fills the whole card
 * with the image (or a token placeholder), floats a `surface` date chip top-left
 * and the category badge top-right, and rides the title + meta on a bottom
 * gradient scrim reversed out in `surface`. Elevated (shadow, no border),
 * media-forward. Same props as {@link EventCard} — a drop-in swap. Token-pure:
 * the scrim is a `neutral-900` → transparent gradient, every color a `--xen-*`.
 */
export const EventCardV2 = React.forwardRef<HTMLDivElement, EventCardV2Props>(function EventCardV2(
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
  const isCompact = variant === 'compact';
  const clickable = typeof onClick === 'function';
  const heightClass = isFeatured ? 'h-64' : isCompact ? 'h-40' : 'h-52';

  const container = cn(
    'relative flex flex-col justify-end overflow-hidden rounded-lg bg-neutral-100 text-on-surface shadow-md',
    heightClass,
    clickable &&
      'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
    className
  );

  if (loading) {
    return (
      <div ref={ref} aria-label="Loading event" aria-busy="true" className={container} {...rest}>
        <div className="absolute inset-0 animate-pulse bg-neutral-200 motion-reduce:animate-none" />
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
      {imageUrl ? (
        <img src={imageUrl} alt={imageAlt ?? title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon glyph="🎟️" size="3xl" aria-label={imageAlt ?? title} />
        </div>
      )}

      <div aria-hidden className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-neutral-900/85 via-neutral-900/25 to-transparent" />

      {date ? (
        <span className="absolute left-md top-md rounded-md bg-surface px-sm py-xs text-sm font-bold text-on-surface shadow-sm">
          {date}
        </span>
      ) : null}
      {category ? (
        <span className="absolute right-md top-md">
          <Badge tone="primary">{category}</Badge>
        </span>
      ) : null}

      <div className="relative flex flex-col gap-xs p-lg">
        <h3 className={cn('font-heading font-extrabold leading-tight text-surface', isFeatured ? 'text-2xl' : 'text-xl')}>
          {title}
        </h3>
        {metaLine ? <p className="line-clamp-1 text-sm font-semibold text-surface/90">{metaLine}</p> : null}
        {typeof attendeeCount === 'number' ? (
          <p className="flex items-center gap-xs text-sm font-semibold text-surface/90">
            <Icon glyph="👥" size="sm" />
            {`${attendeeCount} going`}
          </p>
        ) : null}
      </div>
    </div>
  );
});
