import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';
import { formatMoney } from '../commerce';
import { clickableProps } from './internal';

/** Sale state of a comparable ("comp"). */
export type ComparableStatus = 'active' | 'pending' | 'sold';

export interface ComparableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Comp address / headline. */
  address: string;
  /** Sale or list price in integer minor units (cents). */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Interior area in square feet; drives the $/sqft figure. */
  sqft?: number;
  /** Bedroom count. */
  beds?: number;
  /** Bathroom count. */
  baths?: number;
  /** Distance label (e.g. "0.3 mi"). */
  distance?: string;
  /** Sale/list state chip. */
  status?: ComparableStatus;
}

const STATUS_TONE: Record<ComparableStatus, BadgeTone> = {
  active: 'success',
  pending: 'warn',
  sold: 'neutral',
};

/**
 * Web parity of the native `ComparableRow`: a comparable-sale ("comp") row for a
 * valuation table — address, price, the beds/baths/sqft facts, a derived $/sqft
 * figure, distance, and a status chip. The $/sqft is guarded against a missing or
 * zero `sqft`. Data + `onClick` only; nothing fetches. Reuses `Badge` and the
 * shared `formatMoney`; all colors come from the `--xen-*` tokens — no literal
 * colors. Pass `onClick` to make the row an activatable button.
 */
export const ComparableRow = React.forwardRef<HTMLDivElement, ComparableRowProps>(
  function ComparableRow(
    {
      address,
      priceCents,
      currency = 'USD',
      sqft,
      beds,
      baths,
      distance,
      status,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const perSqft = typeof sqft === 'number' && sqft > 0 ? Math.round(priceCents / sqft) : null;
    const facts: string[] = [];
    if (typeof beds === 'number') facts.push(`${beds} bd`);
    if (typeof baths === 'number') facts.push(`${baths} ba`);
    if (typeof sqft === 'number') facts.push(`${sqft.toLocaleString()} sqft`);
    const meta = [facts.join(' · '), distance].filter(Boolean).join(' · ');

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'flex items-center gap-3 border border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)]',
          'rounded-[var(--xen-radius-md)]',
          onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...clickableProps(
          onClick as React.MouseEventHandler | undefined,
          `${address}, ${formatMoney(priceCents, currency)}${facts.length ? `, ${facts.join(', ')}` : ''}`
        )}
        {...rest}
      >
        <div className="flex flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="min-w-0 shrink truncate text-sm font-semibold text-on-surface">{address}</span>
            {status ? <Badge tone={STATUS_TONE[status]}>{status}</Badge> : null}
          </div>
          {meta ? <span className="text-xs text-muted">{meta}</span> : null}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-base font-bold text-on-surface">{formatMoney(priceCents, currency)}</span>
          {perSqft != null ? (
            <span className="text-xs text-muted">{`${formatMoney(perSqft, currency)}/sqft`}</span>
          ) : null}
        </div>
      </div>
    );
  }
);
