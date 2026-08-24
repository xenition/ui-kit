import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge, Button, Rating } from '../primitives';
import { formatMoney } from '../commerce';
import type { RideRequestCardProps } from './RideRequestCard';

/** Same public contract as {@link RideRequestCard} — a drop-in alternate design. */
export type RideRequestCardV2Props = RideRequestCardProps;

/**
 * RideRequestCard, redesigned (v2): a **bold dispatch card**. The rider + rating and
 * a fare hero head the card; a pickup→dropoff route with node dots and a connector
 * follows, with distance·duration·surge chips and big Accept/Decline actions.
 * Distinct from v1. Same props, token-only.
 */
export const RideRequestCardV2 = React.forwardRef<HTMLDivElement, RideRequestCardV2Props>(
  function RideRequestCardV2(
    { riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency = 'USD', distanceToPickup, tripDuration, scheduledFor, surgeMultiplier, variant, onAccept, onDecline, loading = false, className, ...rest },
    ref
  ) {
    void variant;
    if (loading) {
      return <div ref={ref} data-xen-ride-request-card="" aria-label="Loading request" className={cn('h-48 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
    }
    const chips = [distanceToPickup ? `${distanceToPickup} away` : null, tripDuration, scheduledFor].filter((s): s is string => !!s);

    return (
      <div ref={ref} data-xen-ride-request-card="" className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', className)} {...rest}>
        <div className="flex items-center gap-3">
          <Avatar src={riderAvatarUrl} name={riderName} size="md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-on-surface">{riderName}</p>
            {typeof riderRating === 'number' ? <Rating value={riderRating} size="sm" showValue /> : null}
          </div>
          {typeof fareCents === 'number' ? <span className="text-xl font-bold text-on-surface">{formatMoney(fareCents, currency)}</span> : null}
          {typeof surgeMultiplier === 'number' ? <Badge tone="warn">{surgeMultiplier}x</Badge> : null}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-success" aria-hidden />
            <span className="min-w-0 truncate text-sm text-on-surface"><span className="font-semibold">{pickup.label}</span> · {pickup.address}</span>
          </div>
          <span className="ml-1 h-4 w-px bg-border" aria-hidden />
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-danger" aria-hidden />
            <span className="min-w-0 truncate text-sm text-on-surface"><span className="font-semibold">{dropoff.label}</span> · {dropoff.address}</span>
          </div>
        </div>

        {chips.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {chips.map((c, i) => <span key={i} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">{c}</span>)}
          </div>
        ) : null}

        {(onAccept || onDecline) ? (
          <div className="flex gap-2">
            {onDecline ? <Button size="md" variant="outline" className="flex-1" onClick={onDecline}>Decline</Button> : null}
            {onAccept ? <Button size="md" variant="primary" className="flex-1" onClick={onAccept}>Accept</Button> : null}
          </div>
        ) : null}
      </div>
    );
  }
);
