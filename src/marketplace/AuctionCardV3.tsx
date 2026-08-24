import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { formatMoney } from '../commerce';
import type { AuctionCardProps } from './AuctionCard';

/** Same public contract as {@link AuctionCard} — a drop-in alternate design. */
export type AuctionCardV3Props = AuctionCardProps;

function countdown(ms: number): string {
  if (ms <= 0) return 'Ended';
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/**
 * AuctionCard, redesigned (v3): a **dense lot row**. A small thumbnail, the title
 * over a "N bids · ends in …" meta line, the current bid pinned right, and a
 * compact Bid button — hairline-bordered for scannable lists. The opposite of
 * v2's hero card. Same props, token-only.
 */
export const AuctionCardV3 = React.forwardRef<HTMLDivElement, AuctionCardV3Props>(function AuctionCardV3(
  { title, currentBidCents, currency = 'USD', bidCount, endsAtMs, nowMs = Date.now(), imageUrl, actionLabel = 'Bid', onPlaceBid, variant, className, ...rest },
  ref
) {
  void variant;
  const remaining = endsAtMs - nowMs;
  const ended = remaining <= 0;
  const meta = [
    typeof bidCount === 'number' ? `${bidCount} bid${bidCount === 1 ? '' : 's'}` : null,
    ended ? 'Ended' : `ends in ${countdown(remaining)}`,
  ].filter((s): s is string => !!s);

  return (
    <div
      ref={ref}
      data-xen-auction-card=""
      className={cn('flex items-center gap-3 border-b border-border py-3', className)}
      {...rest}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl">
        {imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : '🔨'}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
        {meta.length > 0 ? <p className="truncate text-xs text-muted">{meta.join(' · ')}</p> : null}
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-bold text-on-surface">{formatMoney(currentBidCents, currency)}</span>
        {onPlaceBid ? (
          <Button size="sm" variant="outline" disabled={ended} onClick={onPlaceBid}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
});
