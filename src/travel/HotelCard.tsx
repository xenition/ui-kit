import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives/Rating';
import { Badge } from '../primitives/Badge';
import { PriceTag } from '../commerce/PriceTag';

/** Layout for a {@link HotelCard}. */
export type HotelCardVariant = 'stacked' | 'row';

export interface HotelCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Property name. */
  name: string;
  /** Locality line, e.g. `'Shibuya, Tokyo'`. */
  location?: string;
  /** Guest review score, 0–5, drawn as stars. */
  rating?: number;
  /** Number of reviews behind the rating. */
  reviewCount?: number;
  /** Nightly price in integer minor units (cents). */
  priceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Short amenity chips (e.g. `['Free Wi-Fi', 'Pool']`). */
  tags?: readonly string[];
  /** Optional "was" nightly price in cents; struck through when higher. */
  compareAtCents?: number;
  /** Layout variant. */
  variant?: HotelCardVariant;
  /** Fires when the card is activated. */
  onClick?: () => void;
}

/**
 * Web parity of the native `HotelCard`: a hotel search result — name, location,
 * guest rating, nightly price, and a few amenity chips over a token-styled media
 * placeholder (no image dependency; the app can overlay its own `<img>`). Data +
 * `onClick` only. Token-only colors — no literal colors.
 */
export const HotelCard = React.forwardRef<HTMLDivElement, HotelCardProps>(function HotelCard(
  {
    name,
    location,
    rating,
    reviewCount,
    priceCents,
    currency = 'USD',
    tags = [],
    compareAtCents,
    variant = 'stacked',
    onClick,
    className,
    ...rest
  },
  ref
) {
  const row = variant === 'row';
  const interactive = typeof onClick === 'function';
  const a11yLabel = `${name}${location ? `, ${location}` : ''}`;

  return (
    <div
      ref={ref}
      data-xen-hotel-card=""
      className={cn(
        'gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
        row ? 'flex flex-row' : 'flex flex-col',
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            'aria-label': a11yLabel,
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
      <div
        aria-hidden="true"
        className={cn(
          'flex items-center justify-center rounded-[var(--xen-radius-md)] bg-neutral-100',
          row ? 'h-[88px] w-[88px] shrink-0' : 'h-[132px] w-full'
        )}
      >
        <span className="text-2xl text-muted">🏨</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-sm)]">
        <div className="flex flex-col gap-[2px]">
          <span className="truncate text-base font-semibold text-on-surface">{name}</span>
          {location ? <span className="truncate text-xs text-muted">{location}</span> : null}
        </div>

        {typeof rating === 'number' ? (
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <Rating value={rating} size="sm" />
            {typeof reviewCount === 'number' ? (
              <span className="text-xs text-muted">({reviewCount})</span>
            ) : null}
          </div>
        ) : null}

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-[var(--xen-space-xs)]">
            {tags.map((t, i) => (
              <Badge key={`${t}-${i}`} tone="neutral">
                {t}
              </Badge>
            ))}
          </div>
        ) : null}

        {typeof priceCents === 'number' ? (
          <div className="flex items-baseline gap-[var(--xen-space-xs)]">
            <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="md" />
            <span className="text-xs text-muted">/ night</span>
          </div>
        ) : null}
      </div>
    </div>
  );
});
