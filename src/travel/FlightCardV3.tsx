import * as React from 'react';
import { cn } from '../primitives/cn';
import { PriceTag } from '../commerce/PriceTag';
import type { FlightCardProps } from './FlightCard';

/** Same public contract as {@link FlightCard} — a drop-in alternate design. */
export type FlightCardV3Props = FlightCardProps;

/**
 * FlightCard, redesigned (v3): a **dense fare line**. Times and codes read
 * `08:15 SFO → 13:55 JFK` on one row over an airline·duration·stops subtitle, with
 * the fare pinned right — hairline-bordered for a results list. The opposite of
 * v2's boarding card. Same props, token-only.
 */
export const FlightCardV3 = React.forwardRef<HTMLDivElement, FlightCardV3Props>(function FlightCardV3(
  { airline, flightNumber, from, to, duration, stops = 0, priceCents, currency = 'USD', variant, onClick, loading = false, className, ...rest },
  ref
) {
  void variant;
  void flightNumber;
  if (loading) {
    return <div ref={ref} data-xen-flight-card="" aria-label="Loading flight" className={cn('flex items-center gap-3 border-b border-border py-3', className)} {...rest}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
  }

  const interactive = typeof onClick === 'function';
  const stopsLabel = stops === 0 ? 'Nonstop' : `${stops} stop${stops === 1 ? '' : 's'}`;

  return (
    <div
      ref={ref}
      data-xen-flight-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${airline} ${from.code} to ${to.code}`}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex items-center gap-3 border-b border-border py-3', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold tabular-nums text-on-surface">
          {from.time} {from.code} <span className="text-muted">→</span> {to.time} {to.code}
        </p>
        <p className="truncate text-xs text-muted">{airline} · {duration} · {stopsLabel}</p>
      </div>
      {typeof priceCents === 'number' ? <PriceTag cents={priceCents} currency={currency} size="md" /> : null}
    </div>
  );
});
