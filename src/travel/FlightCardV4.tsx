import * as React from 'react';
import { cn } from '../primitives/cn';
import { PriceTag } from '../commerce/PriceTag';
import type { FlightCardProps } from './FlightCard';

/** Drop-in for {@link FlightCardProps} — same props, the V4 "journey" design. */
export type FlightCardV4Props = FlightCardProps;

/**
 * FlightCard — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a bookable flight: an elevated clean card, the
 * origin→destination route drawn as a rail with a small brand-gradient plane
 * disc at its midpoint (the signature V4 touch), and the fare sitting below a
 * dashed boarding-pass tear line. Same props/behavior as {@link FlightCardProps};
 * all colors from `--xen-*` token classes (no literal colors). Pass `loading`
 * for a placeholder recap and `variant="compact"` for a denser row.
 */
export const FlightCardV4 = React.forwardRef<HTMLDivElement, FlightCardV4Props>(function FlightCardV4(
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
        'flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-lg',
        compact ? 'gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]' : 'gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]',
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
      <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
        <span className="min-w-0 truncate text-sm font-bold text-on-surface">{airline}</span>
        {flightNumber ? <span className="text-xs text-muted">{flightNumber}</span> : null}
      </div>

      {loading ? (
        <span className="text-sm text-muted">Loading flight…</span>
      ) : (
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <div className="flex flex-col items-start">
            <span className="text-2xl font-extrabold text-on-surface">{from.code}</span>
            <span className="text-xs text-muted">{from.time}</span>
          </div>

          {/* Route rail: line — gradient plane disc — line */}
          <div className="flex flex-1 flex-col items-center gap-1">
            <span className="text-xs text-muted">{duration}</span>
            <div className="flex w-full items-center">
              <div className="h-0.5 flex-1 rounded-full bg-border" />
              <span className="mx-1.5 flex h-[26px] w-[26px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm leading-none text-primary-50">
                ✈
              </span>
              <div className="h-0.5 flex-1 rounded-full bg-border" />
            </div>
            <span className="text-xs text-muted">{stopLabel}</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-2xl font-extrabold text-on-surface">{to.code}</span>
            <span className="text-xs text-muted">{to.time}</span>
          </div>
        </div>
      )}

      {typeof priceCents === 'number' && !loading ? (
        <div className="mt-[var(--xen-space-xs)] flex items-center justify-between border-t border-dashed border-border pt-[var(--xen-space-md)]">
          <span className="text-xs text-muted">Fare from</span>
          <PriceTag cents={priceCents} currency={currency} size={compact ? 'sm' : 'md'} />
        </div>
      ) : null}
    </div>
  );
});
