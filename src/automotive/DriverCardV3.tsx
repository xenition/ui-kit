import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Rating } from '../primitives';
import type { DriverCardProps } from './DriverCard';

/** Same public contract as {@link DriverCard} — a drop-in alternate design. */
export type DriverCardV3Props = DriverCardProps;

/**
 * DriverCard, redesigned (v3): a **dense driver row**. A small avatar (online dot),
 * the name over a rating·vehicle line, a plate chip, and the ETA + a call glyph on
 * the right — hairline-bordered for a list. The opposite of v2's card. Same props,
 * token-only.
 */
export const DriverCardV3 = React.forwardRef<HTMLDivElement, DriverCardV3Props>(function DriverCardV3(
  { name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online = false, variant, onMessage, onCall, onClick, loading = false, className, ...rest },
  ref
) {
  void variant;
  void tripCount;
  void onMessage;
  if (loading) {
    return <div ref={ref} data-xen-driver-card="" aria-label="Loading driver" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}><div className="h-9 w-9 animate-pulse rounded-full bg-neutral-100" /><div className="h-3 w-1/3 animate-pulse rounded-sm bg-neutral-100" /></div>;
  }
  const interactive = typeof onClick === 'function';
  const sub = [vehicle, plate].filter((s): s is string => !!s).join(' · ');

  return (
    <div ref={ref} data-xen-driver-card="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}>
      <button
        type="button"
        aria-label={interactive ? `${name} profile` : name}
        onClick={interactive ? () => onClick?.() : undefined}
        disabled={!interactive}
        className="relative shrink-0"
      >
        <Avatar src={avatarUrl} name={name} size="sm" />
        {online ? <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-success" aria-label="Online" /> : null}
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        <div className="flex items-center gap-1.5">
          {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
          {sub ? <span className="truncate text-xs text-muted">{sub}</span> : null}
        </div>
      </div>
      {etaLabel ? <span className="text-sm font-bold text-primary">{etaLabel}</span> : null}
      {onCall ? <button type="button" aria-label="Call" onClick={onCall} className="text-lg text-primary">📞</button> : null}
    </div>
  );
});
