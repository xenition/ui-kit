import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives/Rating';
import { Badge } from '../primitives/Badge';

export type RestaurantCardVariant = 'list' | 'grid' | 'hero';
export type RestaurantOpenState = 'open' | 'closed' | 'busy';

export interface RestaurantCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Restaurant name. */
  name: string;
  /** Cuisine label(s), e.g. "Thai · Noodles". */
  cuisine?: string;
  /** Average rating (0–5). */
  rating?: number;
  /** Number of ratings (shown in parentheses). */
  ratingCount?: number;
  /** Price level 1–4 → `$`…`$$$$`. */
  priceLevel?: 1 | 2 | 3 | 4;
  /** Short delivery-time text (e.g. "25–35 min"). */
  etaText?: string;
  /** Delivery fee text (e.g. "Free delivery"). */
  feeText?: string;
  /** Hero/thumbnail image URL. */
  imageUrl?: string;
  /** Availability state (default `open`); `closed`/`busy` dim the card. */
  openState?: RestaurantOpenState;
  /** Layout variant (default `list`). */
  variant?: RestaurantCardVariant;
  /** Whole-card activation handler (native `onPress`). */
  onClick?: () => void;
}

const OPEN_LABEL: Record<RestaurantOpenState, string> = {
  open: 'Open',
  closed: 'Closed',
  busy: 'Busy',
};

/**
 * A restaurant / vendor tile — image, name, cuisine, star rating with count,
 * price level, and a delivery ETA line, plus an availability `Badge`. `variant`
 * switches a horizontal `list` row, a `grid` tile, and a full-bleed `hero`.
 * `closed`/`busy` states dim the card and are labelled in text (not color
 * alone). Reuses the `Rating` and `Badge` primitives. Web parity of the native
 * `RestaurantCard`; token-only. When `onClick` is set the root is a
 * keyboard-operable `role="button"`.
 */
export const RestaurantCard = React.forwardRef<HTMLDivElement, RestaurantCardProps>(
  function RestaurantCard(
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
      variant = 'list',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const horizontal = variant === 'list';
    const dimmed = openState !== 'open';

    const mediaSize = horizontal ? 'h-24 w-24 shrink-0' : variant === 'hero' ? 'h-[180px] w-full' : 'h-[120px] w-full';
    const media = (
      <div className={cn('overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100', mediaSize)}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} loading="lazy" className={cn('h-full w-full object-cover', dimmed && 'opacity-70')} />
        ) : null}
      </div>
    );

    const metaBits: string[] = [];
    if (priceLevel) metaBits.push('$'.repeat(Math.min(4, Math.max(1, priceLevel))));
    if (cuisine) metaBits.push(cuisine);

    const body = (
      <div
        className={cn('flex flex-1 flex-col gap-[var(--xen-space-xs)]', !horizontal && 'p-[var(--xen-space-md)]')}
      >
        <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
          <p className="min-w-0 flex-1 truncate font-heading font-bold text-on-surface">{name}</p>
          <Badge tone={openState === 'open' ? 'success' : 'neutral'}>{OPEN_LABEL[openState]}</Badge>
        </div>
        {metaBits.length > 0 ? (
          <p className="truncate text-sm text-muted">{metaBits.join(' · ')}</p>
        ) : null}
        {typeof rating === 'number' ? (
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <Rating value={rating} size="sm" showValue />
            {typeof ratingCount === 'number' ? (
              <span className="text-xs text-muted">({ratingCount})</span>
            ) : null}
          </div>
        ) : null}
        {etaText || feeText ? (
          <p className="text-sm text-on-surface">{[etaText, feeText].filter(Boolean).join(' · ')}</p>
        ) : null}
      </div>
    );

    const containerClass = cn(
      'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
      horizontal ? 'flex flex-row gap-[var(--xen-space-md)] p-[var(--xen-space-md)]' : 'flex flex-col',
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
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
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
