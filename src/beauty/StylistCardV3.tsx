import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Rating, Button } from '../primitives';
import { formatMoney as defaultFormat } from '../commerce';
import type { StylistCardProps } from './StylistCard';

/** Same public contract as {@link StylistCard} — a drop-in alternate design. */
export type StylistCardV3Props = StylistCardProps;

/**
 * StylistCard, redesigned (v3): a **compact directory row**. A small avatar, the
 * name over a role·rating line, the from-price, and a quiet Book button — hairline-
 * bordered for a team list. The opposite of v2's banner. Same props, token-only.
 */
export const StylistCardV3 = React.forwardRef<HTMLDivElement, StylistCardV3Props>(function StylistCardV3(
  { name, role, specialties, avatarUrl, rating, reviewCount, priceFromCents, currency = 'USD', formatMoney, availability, fullyBooked = false, variant, loading = false, bookLabel = 'Book', onBook, onClick, className, ...rest },
  ref
) {
  void variant;
  void specialties;
  void reviewCount;
  void availability;
  const fmt = formatMoney ?? defaultFormat;
  if (loading) {
    return <div ref={ref} data-xen-stylist-card="" aria-label="Loading stylist" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}><div className="h-9 w-9 animate-pulse rounded-full bg-neutral-100" /><div className="h-3 w-1/3 animate-pulse rounded-sm bg-neutral-100" /></div>;
  }
  const interactive = typeof onClick === 'function';

  return (
    <div ref={ref} data-xen-stylist-card="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}>
      <button type="button" aria-label={interactive ? `${name} profile` : name} onClick={interactive ? () => onClick?.() : undefined} disabled={!interactive} className="shrink-0">
        <Avatar src={avatarUrl} name={name} size="sm" />
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        <div className="flex items-center gap-1.5">
          {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
          {role ? <span className="truncate text-xs text-muted">{role}</span> : null}
        </div>
      </div>
      {typeof priceFromCents === 'number' ? <span className="text-xs text-muted">from <span className="font-bold text-on-surface">{fmt(priceFromCents, currency)}</span></span> : null}
      {onBook ? <Button size="sm" variant="outline" disabled={fullyBooked} onClick={onBook}>{fullyBooked ? 'Booked' : bookLabel}</Button> : null}
    </div>
  );
});
