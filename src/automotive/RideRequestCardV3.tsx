import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button } from '../primitives';
import { formatMoney } from '../commerce';
import type { RideRequestCardProps } from './RideRequestCard';

/** Same public contract as {@link RideRequestCard} — a drop-in alternate design. */
export type RideRequestCardV3Props = RideRequestCardProps;

/**
 * RideRequestCard, redesigned (v3): a **compact dispatch row**. The rider + a
 * one-line pickup→dropoff route, the fare pinned right, and small Accept/Decline
 * controls — hairline-bordered for a queue. The opposite of v2's card. Same props,
 * token-only.
 */
export const RideRequestCardV3 = React.forwardRef<HTMLDivElement, RideRequestCardV3Props>(
  function RideRequestCardV3(
    { riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency = 'USD', distanceToPickup, tripDuration, scheduledFor, surgeMultiplier, variant, onAccept, onDecline, loading = false, className, ...rest },
    ref
  ) {
    void variant;
    void riderRating;
    void scheduledFor;
    void surgeMultiplier;
    if (loading) {
      return <div ref={ref} data-xen-ride-request-card="" aria-label="Loading request" className={cn('flex items-center gap-3 border-b border-border py-3', className)} {...rest}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
    }
    const meta = [distanceToPickup ? `${distanceToPickup} away` : null, tripDuration].filter((s): s is string => !!s).join(' · ');

    return (
      <div ref={ref} data-xen-ride-request-card="" className={cn('flex items-center gap-3 border-b border-border py-3', className)} {...rest}>
        <Avatar src={riderAvatarUrl} name={riderName} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">{riderName}</p>
          <p className="truncate text-xs text-muted">{pickup.label} <span aria-hidden>→</span> {dropoff.label}{meta ? ` · ${meta}` : ''}</p>
        </div>
        {typeof fareCents === 'number' ? <span className="text-sm font-bold text-on-surface">{formatMoney(fareCents, currency)}</span> : null}
        <div className="flex gap-1">
          {onDecline ? <Button size="sm" variant="ghost" onClick={onDecline}>✕</Button> : null}
          {onAccept ? <Button size="sm" variant="primary" onClick={onAccept}>Accept</Button> : null}
        </div>
      </div>
    );
  }
);
