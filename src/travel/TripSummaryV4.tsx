import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce/money';
import type { TripSummaryProps } from './TripSummary';

/** Drop-in for {@link TripSummaryProps} — same props, the V4 "journey" design. */
export type TripSummaryV4Props = TripSummaryProps;

/**
 * TripSummary — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass recap: a brand-gradient hero total up top (the grand total in
 * near-white `text-primary-50` ink — the signature V4 lift), then the itemized
 * line items on the clean surface below, split from the hero by a dashed
 * boarding-pass tear line. When `totalCents` is omitted the total is summed from
 * `items`. Money is integer cents formatted through {@link formatMoney}. Same
 * props/behavior as {@link TripSummaryProps}; all colors from `--xen-*` token
 * classes (no literal colors).
 */
export const TripSummaryV4 = React.forwardRef<HTMLDivElement, TripSummaryV4Props>(
  function TripSummaryV4(
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
          'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
          className
        )}
        {...rest}
      >
        {/* Gradient hero total — near-white ink on the journey ground */}
        <div className="flex flex-col gap-[var(--xen-space-sm)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]">
          <div className="flex flex-col gap-[2px]">
            <h3 className="text-xs font-semibold text-primary-100">{title}</h3>
            <span className="text-lg font-bold text-primary-50">{destination}</span>
            {metaLine ? <span className="text-sm text-primary-100">{metaLine}</span> : null}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-primary-100">Total</span>
            <span className="text-2xl font-extrabold text-primary-50">{format(total, currency)}</span>
          </div>
        </div>

        {/* Line items on the clean surface, below the dashed tear line */}
        <div className="flex flex-col gap-[var(--xen-space-md)] border-t border-dashed border-border p-[var(--xen-space-lg)]">
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
          ) : (
            <span className="text-sm text-muted">No items</span>
          )}

          {action ? <div>{action}</div> : null}
        </div>
      </div>
    );
  }
);
