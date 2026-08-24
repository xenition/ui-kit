import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button, Rating } from '../primitives';
import type { DriverCardProps } from './DriverCard';

/** Same public contract as {@link DriverCard} — a drop-in alternate design. */
export type DriverCardV2Props = DriverCardProps;

/**
 * DriverCard, redesigned (v2): an **elevated driver card**. A large avatar (with an
 * online dot) heads the name, rating·trips, vehicle and a plate chip, with the ETA
 * prominent and Message/Call actions anchoring the card. Distinct from v1. Same
 * props, token-only.
 */
export const DriverCardV2 = React.forwardRef<HTMLDivElement, DriverCardV2Props>(function DriverCardV2(
  { name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online = false, variant, onMessage, onCall, onClick, loading = false, className, ...rest },
  ref
) {
  void variant;
  if (loading) {
    return <div ref={ref} data-xen-driver-card="" aria-label="Loading driver" className={cn('h-32 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
  }
  const interactive = typeof onClick === 'function';

  return (
    <div ref={ref} data-xen-driver-card="" className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', className)} {...rest}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={interactive ? `${name} profile` : name}
          onClick={interactive ? () => onClick?.() : undefined}
          disabled={!interactive}
          className="relative shrink-0"
        >
          <Avatar src={avatarUrl} name={name} size="lg" />
          {online ? <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-success" aria-label="Online" /> : null}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-on-surface">{name}</p>
          <div className="flex items-center gap-1.5">
            {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
            {typeof tripCount === 'number' ? <span className="text-xs text-muted">· {tripCount} trips</span> : null}
          </div>
          {vehicle ? <p className="truncate text-xs text-muted">{vehicle}</p> : null}
        </div>
        <div className="flex flex-col items-end gap-1">
          {etaLabel ? <span className="text-lg font-bold text-primary">{etaLabel}</span> : null}
          {plate ? <span className="rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-xs text-on-surface">{plate}</span> : null}
        </div>
      </div>
      {(onMessage || onCall) ? (
        <div className="flex gap-2">
          {onMessage ? <Button size="md" variant="outline" className="flex-1" onClick={onMessage}>Message</Button> : null}
          {onCall ? <Button size="md" variant="primary" className="flex-1" onClick={onCall}>Call</Button> : null}
        </div>
      ) : null}
    </div>
  );
});
