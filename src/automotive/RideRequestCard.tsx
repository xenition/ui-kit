import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge, Button, Rating } from '../primitives';
import { formatMoney } from '../commerce';

/** Presentation density / intent for a {@link RideRequestCard}. */
export type RideRequestVariant = 'incoming' | 'scheduled' | 'compact';

/** A single endpoint on the requested trip. */
export interface RideStop {
  /** Short label, e.g. `'Pickup'` or a place name. */
  label: string;
  /** Full address line. */
  address: string;
}

export interface RideRequestCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Rider display name. */
  riderName: string;
  /** Optional rider avatar URL. */
  riderAvatarUrl?: string;
  /** Rider's historical star rating (0–5). */
  riderRating?: number;
  /** Pickup endpoint. */
  pickup: RideStop;
  /** Drop-off endpoint. */
  dropoff: RideStop;
  /** Estimated fare in integer minor units (cents). */
  fareCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Estimated distance to pickup, pre-formatted (e.g. `'1.2 mi'`). */
  distanceToPickup?: string;
  /** Estimated trip duration, pre-formatted (e.g. `'18 min'`). */
  tripDuration?: string;
  /** Scheduled time label (shown for `scheduled` variant). */
  scheduledFor?: string;
  /** Surge multiplier badge (e.g. `1.5` → "1.5x"). */
  surgeMultiplier?: number;
  /** Presentation variant. */
  variant?: RideRequestVariant;
  /** Fires when the driver accepts the request. */
  onAccept?: () => void;
  /** Fires when the driver declines the request. */
  onDecline?: () => void;
  /** Placeholder skeleton while the request loads. */
  loading?: boolean;
}

/**
 * An inbound ride request for a driver to accept or decline — rider identity and
 * rating, the pickup→drop-off route, an optional fare estimate, plus trip
 * distance/duration and an optional surge badge. Data + `onAccept`/`onDecline`
 * only; nothing fetches. Endpoints are marked with text-labelled glyphs (not
 * color alone) and the surge state is spelled out. Colors come from `--xen-*`
 * token classes — no literal colors. `variant="scheduled"` swaps the header for
 * a scheduled-time line; `variant="compact"` tightens spacing. Web parity of the
 * native `RideRequestCard`.
 */
export const RideRequestCard = React.forwardRef<HTMLDivElement, RideRequestCardProps>(
  function RideRequestCard(
    {
      riderName,
      riderAvatarUrl,
      riderRating,
      pickup,
      dropoff,
      fareCents,
      currency = 'USD',
      distanceToPickup,
      tripDuration,
      scheduledFor,
      surgeMultiplier,
      variant = 'incoming',
      onAccept,
      onDecline,
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';
    const scheduled = variant === 'scheduled';
    const pad = compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]';

    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-ride-request=""
          aria-busy="true"
          aria-label="Loading ride request"
          className={cn(
            'rounded-[var(--xen-radius-lg)] border border-border bg-surface',
            pad,
            'flex flex-col gap-[var(--xen-space-sm)]',
            className
          )}
          {...rest}
        >
          <div className="h-4 w-[55%] animate-pulse rounded bg-neutral-200" />
          <div className="h-3.5 w-[80%] animate-pulse rounded bg-neutral-100" />
          <div className="h-3.5 w-[70%] animate-pulse rounded bg-neutral-100" />
        </div>
      );
    }

    const hasSurge = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;

    const stopRow = (glyph: string, tone: 'text-primary' | 'text-success', stop: RideStop) => (
      <div className="flex items-start gap-[var(--xen-space-sm)]">
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold',
            tone
          )}
        >
          {glyph}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold text-muted">{stop.label}</span>
          <span className="block truncate text-sm text-on-surface">{stop.address}</span>
        </span>
      </div>
    );

    const a11y = `Ride request from ${riderName}, pickup ${pickup.address}, drop off ${dropoff.address}${
      hasSurge ? `, ${surgeMultiplier}x surge` : ''
    }`;

    return (
      <div
        ref={ref}
        data-xen-ride-request=""
        aria-label={a11y}
        className={cn(
          'rounded-[var(--xen-radius-lg)] border border-border bg-surface',
          pad,
          'flex flex-col',
          compact ? 'gap-[var(--xen-space-sm)]' : 'gap-[var(--xen-space-md)]',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <Avatar src={riderAvatarUrl} name={riderName} size={compact ? 'sm' : 'md'} />
          <div className="min-w-0 flex-1">
            <span className="block truncate text-base font-bold text-on-surface">{riderName}</span>
            {typeof riderRating === 'number' ? (
              <Rating value={riderRating} size="sm" showValue />
            ) : null}
          </div>
          {hasSurge ? <Badge tone="warn">{`${surgeMultiplier}x surge`}</Badge> : null}
        </div>

        {scheduled && scheduledFor ? (
          <div className="flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-sm)] bg-primary-50 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
            <span aria-hidden="true">🗓️</span>
            <span className="text-sm font-semibold text-on-surface">Scheduled for {scheduledFor}</span>
          </div>
        ) : null}

        <div className="flex flex-col gap-[var(--xen-space-sm)]">
          {stopRow('A', 'text-primary', pickup)}
          <span className="ml-[10px] block h-[var(--xen-space-sm)] w-px bg-border" aria-hidden="true" />
          {stopRow('B', 'text-success', dropoff)}
        </div>

        <div className="flex flex-wrap items-center gap-[var(--xen-space-md)]">
          {typeof fareCents === 'number' ? (
            <span data-xen-fare="" className="text-lg font-bold text-on-surface">
              {formatMoney(fareCents, currency)}
            </span>
          ) : null}
          {distanceToPickup ? (
            <span className="text-xs text-muted">📍 {distanceToPickup} away</span>
          ) : null}
          {tripDuration ? <span className="text-xs text-muted">⏱ {tripDuration} trip</span> : null}
        </div>

        {onAccept || onDecline ? (
          <div className="flex gap-[var(--xen-space-sm)]">
            {onDecline ? (
              <Button
                variant="danger"
                onClick={onDecline}
                aria-label={`Decline ride from ${riderName}`}
                className="flex-1"
              >
                Decline
              </Button>
            ) : null}
            {onAccept ? (
              <Button
                variant="primary"
                onClick={onAccept}
                aria-label={`Accept ride from ${riderName}`}
                className="flex-[2]"
              >
                Accept
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
