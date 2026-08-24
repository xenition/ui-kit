import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { formatMoney } from '../commerce';

export type AuctionCardVariant = 'card' | 'compact';

export interface AuctionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Auction / lot title. */
  title: string;
  /** Current highest bid in integer minor units (cents). */
  currentBidCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Number of bids placed so far. */
  bidCount?: number;
  /** Epoch-ms timestamp when the auction closes. Drives the countdown. */
  endsAtMs: number;
  /**
   * Reference "now" in epoch-ms. Defaults to `Date.now()`; injectable so the
   * countdown is deterministic in tests (this component does not self-tick).
   */
  nowMs?: number;
  /** Hero image URL. Omit for a token-styled placeholder. */
  imageUrl?: string;
  /** Label for the primary action (default "Place bid"). */
  actionLabel?: string;
  /** Fires when the bid button is clicked. Omit to hide the button. */
  onPlaceBid?: () => void;
  /** Layout variant. Default `card`. */
  variant?: AuctionCardVariant;
}

/** Format a positive ms duration as the two most-significant units. */
function formatRemaining(ms: number): string {
  if (ms <= 0) return 'Ended';
  const totalSec = Math.floor(ms / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

/**
 * An auction lot summary — hero media, title, the live current bid with a bid
 * count, a countdown to close, and a place-bid action. The countdown is derived
 * from `endsAtMs` against an injectable `nowMs` (no internal timer, so it stays
 * deterministic in tests); once past close it reads "Ended", disables bidding,
 * and switches the timer chip to a danger tone (state carried by text + tone,
 * not color alone). Presentational: data + `onPlaceBid` only. Reuses `Badge`,
 * `Button`, and the shared `formatMoney`; token-only colors.
 */
export const AuctionCard = React.forwardRef<HTMLDivElement, AuctionCardProps>(function AuctionCard(
  {
    title,
    currentBidCents,
    currency = 'USD',
    bidCount = 0,
    endsAtMs,
    nowMs,
    imageUrl,
    actionLabel = 'Place bid',
    onPlaceBid,
    variant = 'card',
    className,
    ...rest
  },
  ref
) {
  const now = nowMs ?? Date.now();
  const remaining = endsAtMs - now;
  const ended = remaining <= 0;
  const compact = variant === 'compact';

  const timer = (
    <Badge tone={ended ? 'danger' : 'warn'}>{ended ? 'Ended' : `⏱ ${formatRemaining(remaining)}`}</Badge>
  );

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
        className
      )}
      {...rest}
    >
      {compact ? null : (
        <div className="relative flex h-44 items-center justify-center bg-neutral-100">
          {imageUrl ? (
            <img src={imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <span className="text-sm text-muted">No photo</span>
          )}
          <div className="absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)]">{timer}</div>
        </div>
      )}
      <div className="flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]">
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span className="min-w-0 flex-1 truncate text-base font-bold text-on-surface">{title}</span>
          {compact ? timer : null}
        </div>
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted">Current bid</span>
            <span className="text-2xl font-bold text-on-surface">{formatMoney(currentBidCents, currency)}</span>
          </div>
          <span className="text-sm text-muted">
            {`${bidCount.toLocaleString()} ${bidCount === 1 ? 'bid' : 'bids'}`}
          </span>
        </div>
        {onPlaceBid ? (
          <Button variant="primary" onClick={onPlaceBid} disabled={ended}>
            {ended ? 'Auction ended' : actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
});
