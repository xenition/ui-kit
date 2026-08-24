import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives/Rating';
import type { RestaurantCardProps, RestaurantOpenState } from './RestaurantCard';

/** Drop-in for {@link RestaurantCard}: identical props, a distinct design. */
export type RestaurantCardV3Props = RestaurantCardProps;

const OPEN_LABEL: Record<RestaurantOpenState, string> = {
  open: 'Open',
  closed: 'Closed',
  busy: 'Busy',
};

const DOT_CLASS: Record<RestaurantOpenState, string> = {
  open: 'bg-success',
  busy: 'bg-warn',
  closed: 'bg-neutral-400',
};

/**
 * RestaurantCard, alternate design **V3** — a *compact list row*. Borderless
 * and dense: a small rounded thumbnail, then a two-line stack (name with an
 * inline status dot, meta + rating + ETA), meant to be repeated tightly in a
 * search or nearby list. No hero, no card chrome — the inverse of V2's cover.
 * Availability is a coloured dot *and* a word (never colour alone). Same props
 * as the base; token-only.
 */
export const RestaurantCardV3 = React.forwardRef<HTMLDivElement, RestaurantCardV3Props>(
  function RestaurantCardV3(
    {
      name,
      cuisine,
      rating,
      ratingCount,
      priceLevel,
      etaText,
      feeText,
      imageUrl,
      openState = 'open',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const dimmed = openState !== 'open';

    const metaBits: string[] = [];
    if (priceLevel) metaBits.push('$'.repeat(Math.min(4, Math.max(1, priceLevel))));
    if (cuisine) metaBits.push(cuisine);

    const metaLine = [OPEN_LABEL[openState], ...metaBits, etaText, feeText]
      .concat(typeof ratingCount === 'number' ? [`(${ratingCount})`] : [])
      .filter(Boolean)
      .join(' · ');

    const media = (
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className={cn('h-full w-full object-cover', dimmed && 'opacity-70')}
          />
        ) : null}
      </div>
    );

    const body = (
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span className={cn('inline-block h-2 w-2 shrink-0 rounded-full', DOT_CLASS[openState])} aria-hidden="true" />
          <p className="min-w-0 flex-1 truncate font-heading font-bold text-on-surface">{name}</p>
          {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
        </div>
        <p className="truncate text-sm text-muted">{metaLine}</p>
      </div>
    );

    const containerClass = cn(
      'flex flex-row items-center gap-[var(--xen-space-md)] border-b border-border bg-transparent py-[var(--xen-space-sm)]',
      dimmed && 'opacity-75',
      className
    );

    const inner = (
      <>
        {media}
        {body}
      </>
    );

    const interactive = typeof onClick === 'function';
    return (
      <div
        ref={ref}
        className={cn(
          containerClass,
          interactive &&
            'cursor-pointer transition-colors duration-200 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none'
        )}
        {...rest}
        {...(interactive
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': `${name}${cuisine ? `, ${cuisine}` : ''}, ${OPEN_LABEL[openState]}`,
              onClick,
              onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              },
            }
          : {})}
      >
        {inner}
      </div>
    );
  }
);
