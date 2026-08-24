import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

/** A priced line in the trip cost breakdown. */
export interface TripLineItem {
  /** Label, e.g. `'Flights'`. */
  label: string;
  /** Amount in integer minor units (cents). Negative renders as a discount. */
  cents: number;
}

export interface TripSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Trip/destination headline. */
  destination: string;
  /** Pre-formatted date range, e.g. `'Sep 3 – Sep 10'`. */
  dates?: string;
  /** Number of travelers. */
  travelers?: number;
  /** Itemized costs; summed into the total when `totalCents` is omitted. */
  items?: readonly TripLineItem[];
  /** Explicit grand total in cents (overrides the derived sum). */
  totalCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Heading text (default `Trip summary`). */
  title?: React.ReactNode;
  /** Trailing action slot (e.g. a checkout button). */
  action?: React.ReactNode;
}

/**
 * Web parity of the native `TripSummary`: a read-only recap of a trip —
 * destination, dates, traveler count, an itemized cost breakdown, and a grand
 * total. When `totalCents` is omitted the total is summed from `items` (guarded
 * against an empty list). Money is integer cents formatted through
 * {@link formatMoney}. Token-only colors.
 */
export const TripSummary = React.forwardRef<HTMLDivElement, TripSummaryProps>(function TripSummary(
  {
    destination,
    dates,
    travelers,
    items = [],
    totalCents,
    currency = 'USD',
    formatMoney: format = formatMoney,
    title = 'Trip summary',
    action,
    className,
    ...rest
  },
  ref
) {
  const derived = items.reduce((sum, it) => sum + (it.cents || 0), 0);
  const total = typeof totalCents === 'number' ? totalCents : derived;

  const metaLine = [
    dates,
    typeof travelers === 'number' ? `${travelers} traveler${travelers === 1 ? '' : 's'}` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div
      ref={ref}
      data-xen-trip-summary=""
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      <div className="flex flex-col gap-[2px]">
        <h3 className="text-xs font-semibold text-muted">{title}</h3>
        <span className="text-lg font-bold text-on-surface">{destination}</span>
        {metaLine ? <span className="text-sm text-muted">{metaLine}</span> : null}
      </div>

      {items.length > 0 ? (
        <div className="flex flex-col gap-[var(--xen-space-sm)]">
          {items.map((it, i) => (
            <div
              key={`${it.label}-${i}`}
              className="flex items-baseline justify-between gap-[var(--xen-space-md)]"
            >
              <span className="text-sm text-muted">{it.label}</span>
              <span className={cn('text-sm', it.cents < 0 ? 'text-success' : 'text-on-surface')}>
                {format(it.cents, currency)}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="h-px bg-border" />

      <div className="flex items-baseline justify-between">
        <span className="text-base font-bold text-on-surface">Total</span>
        <span className="text-lg font-bold text-on-surface">{format(total, currency)}</span>
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
});
