import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives/Rating';
import { Badge } from '../primitives/Badge';
import { PriceTag } from '../commerce/PriceTag';
import type { HotelCardProps } from './HotelCard';

/** Drop-in for {@link HotelCardProps} — same props, the V4 "journey" design. */
export type HotelCardV4Props = HotelCardProps;

/**
 * HotelCard — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a hotel result: an elevated clean card with a small
 * brand-gradient disc behind the leading hotel glyph (the signature V4 touch),
 * the property name/location, guest star rating, amenity chips, and the nightly
 * fare sitting below a dashed boarding-pass tear line. Same props/behavior as
 * {@link HotelCardProps}; all colors from `--xen-*` token classes (no literal
 * colors). `variant="row"` tightens the layout into a horizontal row.
 */
export const HotelCardV4 = React.forwardRef<HTMLDivElement, HotelCardV4Props>(function HotelCardV4(
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
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] shadow-lg',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
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
      <div className="flex items-center gap-[var(--xen-space-md)]">
        {/* Signature V4 touch: gradient disc behind the leading glyph */}
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700 text-2xl leading-none text-primary-50"
        >
          🏨
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <span className="truncate text-base font-bold text-on-surface">{name}</span>
          {location ? <span className="truncate text-xs text-muted">{location}</span> : null}
        </div>
        {typeof rating === 'number' ? (
          <div className="flex shrink-0 items-center gap-[var(--xen-space-xs)]">
            <Rating value={rating} size="sm" />
            {typeof reviewCount === 'number' ? (
              <span className="text-xs text-muted">({reviewCount})</span>
            ) : null}
          </div>
        ) : null}
      </div>

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
        <div
          className={cn(
            'flex items-baseline justify-between gap-[var(--xen-space-sm)] border-t border-dashed border-border pt-[var(--xen-space-md)]',
            row && 'mt-0'
          )}
        >
          <span className="text-xs text-muted">Nightly from</span>
          <div className="flex items-baseline gap-[var(--xen-space-xs)]">
            <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="md" />
            <span className="text-xs text-muted">/ night</span>
          </div>
        </div>
      ) : null}
    </div>
  );
});
