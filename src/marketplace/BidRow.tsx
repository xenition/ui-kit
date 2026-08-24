import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge } from '../primitives';
import { formatMoney } from '../commerce';

export interface BidRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Bidder display name (or masked handle, e.g. "b***7"). */
  bidder: string;
  /** Bid amount in integer minor units (cents). */
  amountCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Optional avatar image URL. */
  avatarUrl?: string;
  /** Relative time label (e.g. "1m ago"). */
  timeLabel?: string;
  /** Highlights the row as the current highest bid. */
  leading?: boolean;
  /** Marks the bid as placed by the current user ("You"). */
  isYou?: boolean;
  /** Optional 1-based rank shown at the start of the row. */
  rank?: number;
}

/**
 * A single bid in an auction's bid history — optional rank, bidder, amount, and
 * time, with a `leading` highlight for the current top bid and a "You" marker.
 * Presentational: shaped data only, no callbacks. The leading state is conveyed
 * by a badge and a token-tinted surface (never color alone), and announced via
 * the row's `aria-label`. Reuses `Avatar`, `Badge`, and the shared
 * `formatMoney`; token-only colors.
 */
export const BidRow = React.forwardRef<HTMLDivElement, BidRowProps>(function BidRow(
  { bidder, amountCents, currency = 'USD', avatarUrl, timeLabel, leading = false, isYou = false, rank, className, ...rest },
  ref
) {
  const name = isYou ? 'You' : bidder;

  return (
    <div
      ref={ref}
      aria-label={`${leading ? 'Leading bid, ' : ''}${name}, ${formatMoney(amountCents, currency)}`}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        leading ? 'border-success bg-success/10' : 'border-border bg-surface',
        className
      )}
      {...rest}
    >
      {typeof rank === 'number' ? (
        <span className="w-5 text-sm font-semibold text-muted">{rank}</span>
      ) : null}
      <Avatar src={avatarUrl} name={name} size="sm" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span className="min-w-0 truncate text-sm font-semibold text-on-surface">{name}</span>
          {leading ? <Badge tone="success">Leading</Badge> : null}
        </div>
        {timeLabel ? <span className="text-xs text-muted">{timeLabel}</span> : null}
      </div>
      <span className={cn('text-base font-bold', leading ? 'text-success' : 'text-on-surface')}>
        {formatMoney(amountCents, currency)}
      </span>
    </div>
  );
});
