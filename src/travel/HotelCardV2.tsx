import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives/Rating';
import { PriceTag } from '../commerce/PriceTag';
import type { HotelCardProps } from './HotelCard';

/** Same public contract as {@link HotelCard} — a drop-in alternate design. */
export type HotelCardV2Props = HotelCardProps;

/**
 * HotelCard, redesigned (v2): a **media-hero property card**. A tinted media panel
 * (glyph watermark + a floating rating badge) tops the name/location, amenity
 * chips, and a nightly-price footer with any struck compare-at. Elevated,
 * hover-lift. Distinct from v1. Same props, token-only.
 */
export const HotelCardV2 = React.forwardRef<HTMLDivElement, HotelCardV2Props>(function HotelCardV2(
  { name, location, rating, reviewCount, priceCents, currency = 'USD', tags, compareAtCents, variant, onClick, className, ...rest },
  ref
) {
  void variant;
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
      className={cn('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className)}
      {...rest}
    >
      <div className="relative flex h-28 items-center justify-center bg-primary/10 text-4xl">
        <span aria-hidden>🏨</span>
        {typeof rating === 'number' ? (
          <span className="absolute right-2 top-2 rounded-full bg-surface/90 px-2 py-0.5">
            <Rating value={rating} size="sm" showValue />
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 p-md">
        <div>
          <p className="text-base font-bold text-on-surface">{name}</p>
          {location ? <p className="text-xs text-muted">{location}{typeof reviewCount === 'number' ? ` · ${reviewCount} reviews` : ''}</p> : null}
        </div>
        {tags && tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t, i) => <span key={i} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">{t}</span>)}
          </div>
        ) : null}
        {typeof priceCents === 'number' ? (
          <div className="flex items-baseline gap-2 border-t border-border pt-2">
            <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="lg" />
            <span className="text-xs text-muted">/ night</span>
          </div>
        ) : null}
      </div>
    </div>
  );
});
