import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { formatMoney } from '../commerce';
import type { AuctionCardProps } from './AuctionCard';

/** Same public contract as {@link AuctionCard} — a drop-in alternate design. */
export type AuctionCardV2Props = AuctionCardProps;

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
 * AuctionCard, redesigned (v2): a **hero-image lot card**. The photo fills a tall
 * banner with the countdown floating as a danger pill over a scrim; the current
 * bid + bid count sit large on the surface below with a full-width Place bid CTA.
 * Elevated, hover-lift. Same props as {@link AuctionCard}, token-only.
 */
export const AuctionCardV2 = React.forwardRef<HTMLDivElement, AuctionCardV2Props>(function AuctionCardV2(
  { title, currentBidCents, currency = 'USD', bidCount, endsAtMs, nowMs = Date.now(), imageUrl, actionLabel = 'Place bid', onPlaceBid, variant, className, ...rest },
  ref
) {
  void variant;
  const remaining = endsAtMs - nowMs;
  const ended = remaining <= 0;

  return (
    <div
      ref={ref}
      data-xen-auction-card=""
      className={cn(
        'flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className
      )}
      {...rest}
    >
      <div className="relative h-40 bg-neutral-100">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">🔨</div>
        )}
        <span
          className={cn(
            'absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-bold',
            ended ? 'bg-neutral-200 text-on-surface' : 'bg-danger text-on-danger'
          )}
        >
          {ended ? 'Ended' : `⏱ ${countdown(remaining)}`}
        </span>
      </div>

      <div className="flex flex-col gap-2 p-md">
        <p className="text-sm font-semibold text-on-surface">{title}</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted">Current bid</p>
            <p className="text-2xl font-bold text-on-surface">{formatMoney(currentBidCents, currency)}</p>
          </div>
          {typeof bidCount === 'number' ? (
            <span className="text-xs text-muted">
              {bidCount} bid{bidCount === 1 ? '' : 's'}
            </span>
          ) : null}
        </div>
        {onPlaceBid ? (
          <Button size="md" variant="primary" className="w-full" disabled={ended} onClick={onPlaceBid}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
});
