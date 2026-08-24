import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import type { RestaurantCardProps, RestaurantOpenState } from './RestaurantCard';

/** Drop-in for {@link RestaurantCard}: identical props, a distinct design. */
export type RestaurantCardV2Props = RestaurantCardProps;

const OPEN_LABEL: Record<RestaurantOpenState, string> = {
  open: 'Open',
  closed: 'Closed',
  busy: 'Busy',
};

/**
 * RestaurantCard, alternate design **V2** — a *cover-hero* card. A tall
 * full-bleed cover photo carries two overlaid chips: the open-state badge top-
 * left and a frosted rating badge top-right. The name and details sit on a
 * solid surface footer beneath the image (never over it), so contrast is safe
 * while the card still reads as a big, tappable hero — the opposite of the
 * compact base row. Same props as the base; token-only, elevated with a hover
 * lift.
 */
export const RestaurantCardV2 = React.forwardRef<HTMLDivElement, RestaurantCardV2Props>(
  function RestaurantCardV2(
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

    const hero = (
      <div className="relative h-[176px] w-full overflow-hidden bg-neutral-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className={cn('h-full w-full object-cover', dimmed && 'opacity-70')}
          />
        ) : null}

        <span className="absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)]">
          <Badge tone={openState === 'open' ? 'success' : 'neutral'}>{OPEN_LABEL[openState]}</Badge>
        </span>

        {typeof rating === 'number' ? (
          <span className="absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] inline-flex items-center gap-0.5 rounded-full bg-surface/90 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] shadow-sm backdrop-blur-sm">
            <Icon glyph="★" size="sm" color="warn" />
            <span className="text-sm font-bold text-on-surface tabular-nums">{rating.toFixed(1)}</span>
            {typeof ratingCount === 'number' ? (
              <span className="text-xs text-muted">({ratingCount})</span>
            ) : null}
          </span>
        ) : null}
      </div>
    );

    const footer = (
      <div className="flex flex-col gap-[var(--xen-space-xs)] p-[var(--xen-space-md)]">
        <p className="truncate font-heading text-lg font-bold text-on-surface">{name}</p>
        {metaBits.length > 0 ? <p className="truncate text-sm text-muted">{metaBits.join(' · ')}</p> : null}
        {etaText || feeText ? (
          <p className="truncate text-sm text-on-surface">{[etaText, feeText].filter(Boolean).join(' · ')}</p>
        ) : null}
      </div>
    );

    const containerClass = cn(
      'overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-md',
      dimmed && 'opacity-80',
      className
    );

    const inner = (
      <>
        {hero}
        {footer}
      </>
    );

    const interactive = typeof onClick === 'function';
    return (
      <div
        ref={ref}
        className={cn(
          containerClass,
          interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none'
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
