import * as React from 'react';
import { cn } from '../primitives/cn';
import { PriceTag } from '../commerce/PriceTag';
import type { FlightCardProps } from './FlightCard';

/** Same public contract as {@link FlightCard} — a drop-in alternate design. */
export type FlightCardV2Props = FlightCardProps;

/**
 * FlightCard, redesigned (v2): a **bold boarding-style card**. The airline heads
 * the card; a large FROM code/time — a duration/stops connector with a plane — TO
 * code/time forms the route, and the fare sits prominent beneath. Elevated.
 * Distinct from v1's row. Same props, token-only.
 */
export const FlightCardV2 = React.forwardRef<HTMLDivElement, FlightCardV2Props>(function FlightCardV2(
  { airline, flightNumber, from, to, duration, stops = 0, priceCents, currency = 'USD', variant, onClick, loading = false, className, ...rest },
  ref
) {
  void variant;
  if (loading) {
    return <div ref={ref} data-xen-flight-card="" aria-label="Loading flight" className={cn('h-32 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
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
      className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <p className="text-xs font-semibold text-muted">{airline}{flightNumber ? ` · ${flightNumber}` : ''}</p>
      <div className="flex items-center gap-3">
        <div className="text-center">
          <p className="text-2xl font-bold text-on-surface">{from.code}</p>
          <p className="text-xs text-muted">{from.time}</p>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <span className="text-xs text-muted">{duration}</span>
          <div className="my-1 flex w-full items-center gap-1">
            <span className="h-px flex-1 bg-border" />
            <span aria-hidden>✈️</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <span className="text-xs text-muted">{stopsLabel}</span>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-on-surface">{to.code}</p>
          <p className="text-xs text-muted">{to.time}</p>
        </div>
      </div>
      {typeof priceCents === 'number' ? (
        <div className="flex items-center justify-end border-t border-border pt-2">
          <PriceTag cents={priceCents} currency={currency} size="lg" />
        </div>
      ) : null}
    </div>
  );
});
