import * as React from 'react';
import { cn } from '../primitives/cn';
import { PriceTag } from '../commerce/PriceTag';

/** Presentation density for a {@link FlightCard}. */
export type FlightCardVariant = 'default' | 'compact';

/** One leg of a journey (origin → destination). */
export interface FlightLeg {
  /** IATA airport code, e.g. `'SFO'`. */
  code: string;
  /** Human airport / city name. */
  city?: string;
  /** Local departure/arrival clock time, pre-formatted (e.g. `'08:15'`). */
  time: string;
}

export interface FlightCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Marketing carrier name. */
  airline: string;
  /** Flight designator, e.g. `'XN 482'`. */
  flightNumber?: string;
  /** Departure leg. */
  from: FlightLeg;
  /** Arrival leg. */
  to: FlightLeg;
  /** Total elapsed time, pre-formatted (e.g. `'5h 40m'`). */
  duration: string;
  /** Number of stops; `0` renders "Nonstop". */
  stops?: number;
  /** Price in integer minor units (cents) for the whole fare. */
  priceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Density variant. */
  variant?: FlightCardVariant;
  /** Fires when the card is activated (e.g. to open fare details). */
  onClick?: () => void;
  /** Shows a placeholder recap instead of data. */
  loading?: boolean;
}

/**
 * Web parity of the native `FlightCard`: a single bookable flight itinerary —
 * carrier, the origin→destination route with departure/arrival times, duration,
 * stop count, and an optional fare. Data + `onClick` only; nothing fetches. All
 * colors come from the `--xen-*` token classes (no literal colors). Pass
 * `loading` for a placeholder recap and `variant="compact"` for a denser row.
 */
export const FlightCard = React.forwardRef<HTMLDivElement, FlightCardProps>(function FlightCard(
  {
    airline,
    flightNumber,
    from,
    to,
    duration,
    stops = 0,
    priceCents,
    currency = 'USD',
    variant = 'default',
    onClick,
    loading = false,
    className,
    ...rest
  },
  ref
) {
  const compact = variant === 'compact';
  const stopLabel = stops <= 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`;
  const interactive = typeof onClick === 'function';
  const a11yLabel = `${airline} ${from.code} to ${to.code}, ${duration}, ${stopLabel}`;

  return (
    <div
      ref={ref}
      data-xen-flight-card=""
      className={cn(
        'flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-surface',
        compact
          ? 'gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]'
          : 'gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]',
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
      <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
        <span className="min-w-0 truncate text-sm font-semibold text-on-surface">{airline}</span>
        {flightNumber ? <span className="text-xs text-muted">{flightNumber}</span> : null}
      </div>

      {loading ? (
        <span className="text-sm text-muted">Loading flight…</span>
      ) : (
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold text-on-surface">{from.code}</span>
            <span className="text-xs text-muted">{from.time}</span>
          </div>

          <div className="flex flex-1 flex-col items-center gap-[2px]">
            <span className="text-xs text-muted">{duration}</span>
            <div className="h-px w-full bg-border" />
            <span className="text-xs text-muted">{stopLabel}</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xl font-bold text-on-surface">{to.code}</span>
            <span className="text-xs text-muted">{to.time}</span>
          </div>
        </div>
      )}

      {typeof priceCents === 'number' && !loading ? (
        <div className="flex justify-end">
          <PriceTag cents={priceCents} currency={currency} size={compact ? 'sm' : 'md'} />
        </div>
      ) : null}
    </div>
  );
});
