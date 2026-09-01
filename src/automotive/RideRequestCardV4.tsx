import * as React from 'react';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { RatingV4 } from '../primitives/RatingV4';
import { formatMoney } from '../commerce/money';
import { metaLine, SKELETON_CLASS } from './internal/fleet-v4';
import type { RideRequestCardProps, RideStop } from './RideRequestCard';

export interface RideRequestCardV4Props extends RideRequestCardProps {
  /** CTA copy. Defaults `'Accept'` / `'Decline'`. */
  acceptLabel?: string;
  declineLabel?: string;
  /** Build the surge chip. Default `'1.8× surge'`. */
  formatSurge?: (multiplier: number) => string;
  /** Labels on the two stops. Defaults `'Pickup'` / `'Dropoff'`. */
  pickupLabel?: string;
  dropoffLabel?: string;
}

/**
 * **V4 ride request card** — the web twin of the native `RideRequestCardV4`,
 * same props as {@link RideRequestCard} plus five copy hooks.
 *
 * ## Five changes
 *
 * 1. **The two stops are joined by a rail.** The base stacked pickup and
 *    dropoff as two independent rows, so nothing said they were one journey —
 *    the single fact a driver reads first.
 * 2. **Accept and decline are not the same weight.** §5 is explicit that a
 *    declined choice never competes with the primary one; the base drew two
 *    equal buttons side by side.
 * 3. **The fare is tabular and in the display face.**
 * 4. **Surge is a labelled chip**, not a tinted fare.
 * 5. **The rider's rating carries its number.**
 *
 * **Renders nothing without a `riderName`** (§4.5).
 */
export const RideRequestCardV4 = React.forwardRef<HTMLDivElement, RideRequestCardV4Props>(
  function RideRequestCardV4(
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
      acceptLabel = 'Accept',
      declineLabel = 'Decline',
      formatSurge,
      pickupLabel = 'Pickup',
      dropoffLabel = 'Dropoff',
      onAccept,
      onDecline,
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    if (loading) {
      return (
        <CardV4 ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
          {[50, 80, 65].map((w) => (
            <div key={w} className={cn('h-3', SKELETON_CLASS)} style={{ width: `${w}%` }} />
          ))}
        </CardV4>
      );
    }

    if (!riderName) return null;

    const compact = variant === 'compact';
    const surging = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
    const caption = metaLine([distanceToPickup, tripDuration, scheduledFor]);

    /* One rail joining the two stops — the base drew them as unrelated rows. */
    const stop = (label: string, value: RideStop, last: boolean): React.ReactElement => (
      <li key={label} className="flex gap-sm">
        <span aria-hidden className="flex shrink-0 flex-col items-center">
          <span
            className={cn(
              'h-3 w-3',
              last ? 'rounded-[var(--xen-radius-sm)] bg-primary' : 'rounded-full bg-success'
            )}
          />
          {!last ? <span className="my-xs w-px flex-1 bg-border" /> : null}
        </span>
        <span className={cn('flex min-w-0 flex-1 flex-col', !last && 'pb-sm')}>
          <span className="text-xs text-muted-text">{label}</span>
          <span className="text-sm font-semibold text-on-card">{value.address}</span>
        </span>
      </li>
    );

    return (
      <CardV4
        ref={ref}
        data-xen-ride-request={variant}
        className={cn('flex flex-col gap-md', className)}
        {...rest}
      >
        <div className="flex items-center gap-sm">
          <AvatarV4 src={riderAvatarUrl} name={riderName} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-base font-bold text-on-card">{riderName}</p>
            {typeof riderRating === 'number' ? (
              <RatingV4 value={riderRating} size="sm" showValue />
            ) : null}
          </div>
          {surging ? (
            <BadgeV4 tone="warn" variant="soft" size="sm">
              {(formatSurge ?? ((m: number) => `${m}× surge`))(surgeMultiplier as number)}
            </BadgeV4>
          ) : null}
        </div>

        {!compact ? (
          <ul className="flex flex-col">
            {stop(pickup.label || pickupLabel, pickup, false)}
            {stop(dropoff.label || dropoffLabel, dropoff, true)}
          </ul>
        ) : null}

        <div className="flex items-baseline justify-between gap-sm">
          <span className="min-w-0 flex-1 text-xs text-muted-text">{caption}</span>
          {typeof fareCents === 'number' ? (
            <span className="font-heading text-xl font-bold text-on-card [font-variant-numeric:tabular-nums]">
              {formatMoney(fareCents, currency)}
            </span>
          ) : null}
        </div>

        {onAccept || onDecline ? (
          <div className="flex flex-col gap-sm">
            {onAccept ? (
              <ButtonV4 variant="primary" size="md" onClick={onAccept} aria-label={acceptLabel}>
                {acceptLabel}
              </ButtonV4>
            ) : null}
            {/* §5: the declined choice goes BELOW and never competes. */}
            {onDecline ? (
              <ButtonV4 variant="ghost" size="md" onClick={onDecline} aria-label={declineLabel}>
                {declineLabel}
              </ButtonV4>
            ) : null}
          </div>
        ) : null}
      </CardV4>
    );
  }
);
