import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives/Rating';
import { PriceTag } from '../commerce/PriceTag';
import type { HotelCardProps } from './HotelCard';

/** Same public contract as {@link HotelCard} — a drop-in alternate design. */
export type HotelCardV3Props = HotelCardProps;

/**
 * HotelCard, redesigned (v3): a **dense property row**. A glyph tile, the name over
 * a location + inline rating line, and the nightly price pinned right — hairline-
 * bordered for a results list. The opposite of v2's media hero. Same props,
 * token-only.
 */
export const HotelCardV3 = React.forwardRef<HTMLDivElement, HotelCardV3Props>(function HotelCardV3(
  { name, location, rating, reviewCount, priceCents, currency = 'USD', tags, compareAtCents, variant, onClick, className, ...rest },
  ref
) {
  void variant;
  void tags;
  void reviewCount;
  const interactive = typeof onClick === 'function';
  return (
    <div
      ref={ref}
      data-xen-hotel-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={name}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex items-center gap-3 border-b border-border py-3', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xl" aria-hidden>🏨</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        <div className="flex items-center gap-1.5">
          {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
          {location ? <span className="truncate text-xs text-muted">{location}</span> : null}
        </div>
      </div>
      {typeof priceCents === 'number' ? (
        <div className="text-right">
          <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="md" />
          <p className="text-[10px] text-muted">/ night</p>
        </div>
      ) : null}
    </div>
  );
});
