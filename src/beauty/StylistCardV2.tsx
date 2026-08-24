import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Rating, Button } from '../primitives';
import { formatMoney as defaultFormat } from '../commerce';
import type { StylistCardProps } from './StylistCard';

/** Same public contract as {@link StylistCard} — a drop-in alternate design. */
export type StylistCardV2Props = StylistCardProps;

/**
 * StylistCard, redesigned (v2): a **banner profile card**. An accent-tinted cover
 * carries a large avatar straddling its edge; the name/role, rating, specialty
 * chips, from-price, availability and a Book CTA center beneath. Elevated. Distinct
 * from v1. Same props, token-only.
 */
export const StylistCardV2 = React.forwardRef<HTMLDivElement, StylistCardV2Props>(function StylistCardV2(
  { name, role, specialties, avatarUrl, rating, reviewCount, priceFromCents, currency = 'USD', formatMoney, availability, fullyBooked = false, variant, loading = false, bookLabel = 'Book', onBook, onClick, className, ...rest },
  ref
) {
  void variant;
  const fmt = formatMoney ?? defaultFormat;
  if (loading) {
    return <div ref={ref} data-xen-stylist-card="" aria-label="Loading stylist" className={cn('h-48 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
  }
  const interactive = typeof onClick === 'function';

  return (
    <div ref={ref} data-xen-stylist-card="" className={cn('overflow-hidden rounded-lg bg-surface text-center shadow-md', className)} {...rest}>
      <div className="h-12 bg-accent/20" />
      <div className="flex flex-col items-center gap-1 px-md pb-md">
        <button type="button" aria-label={interactive ? `${name} profile` : name} onClick={interactive ? () => onClick?.() : undefined} disabled={!interactive} className="-mt-9 rounded-full border-4 border-surface">
          <Avatar src={avatarUrl} name={name} size="xl" />
        </button>
        <p className="text-lg font-bold text-on-surface">{name}</p>
        {role ? <p className="text-xs text-muted">{role}</p> : null}
        {typeof rating === 'number' ? (
          <div className="flex items-center gap-1.5"><Rating value={rating} size="sm" showValue />{typeof reviewCount === 'number' ? <span className="text-xs text-muted">({reviewCount})</span> : null}</div>
        ) : null}
        {specialties && specialties.length > 0 ? (
          <div className="mt-1 flex flex-wrap justify-center gap-1.5">
            {specialties.map((s, i) => <span key={i} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">{s}</span>)}
          </div>
        ) : null}
        {typeof priceFromCents === 'number' ? <p className="mt-1 text-sm text-muted">from <span className="font-bold text-on-surface">{fmt(priceFromCents, currency)}</span></p> : null}
        {availability ? <p className="text-xs text-success">{availability}</p> : null}
        {onBook ? <Button size="md" variant="primary" className="mt-1 w-full" disabled={fullyBooked} onClick={onBook}>{fullyBooked ? 'Fully booked' : bookLabel}</Button> : null}
      </div>
    </div>
  );
});
