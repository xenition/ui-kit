import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { formatMoney } from '../commerce/money';
import { metaLine, TONE_BG, TONE_ON, type ToneV4 } from './internal/fleet-v4';
import type { ParkingSpotProps, ParkingStatus } from './ParkingSpot';

export interface ParkingSpotV4Props extends ParkingSpotProps {
  /** Override the status words — four English phrases lived inside. */
  statusLabels?: Partial<Record<ParkingStatus, string>>;
  /** Build the hourly price. Default `'$4.50/hr'`. */
  formatRate?: (price: string) => string;
  /** Announced for an EV bay. Default `'EV charging'`. */
  evLabel?: string;
}

const STATUS_META: Record<ParkingStatus, { label: string; tone: ToneV4; glyph: string }> = {
  available: { label: 'Available', tone: 'success', glyph: 'P' },
  occupied: { label: 'Occupied', tone: 'danger', glyph: '✕' },
  reserved: { label: 'Reserved', tone: 'warn', glyph: '★' },
  disabled: { label: 'Out of service', tone: 'neutral', glyph: '—' },
};

/**
 * **V4 parking spot** — the web twin of the native `ParkingSpotV4`, same props
 * as {@link ParkingSpot} plus `statusLabels`, `formatRate` and `evLabel`.
 *
 * ## Four changes
 *
 * 1. **The disc's glyph uses its *paired* ink** (`TONE_ON`). The base painted
 *    the disc `bg-[tone]` and its glyph `text-on-primary` regardless, and the
 *    compiler guarantees nothing about that pairing.
 * 2. **An unavailable spot is a `disabled` button**, not a live one. The base
 *    left `occupied` and `disabled` fully clickable.
 * 3. **Status is a word beside the colour.**
 * 4. **The rate is tabular** and the EV marker is announced.
 *
 * **Renders nothing without a `spotId`** (§4.5).
 */
export const ParkingSpotV4 = React.forwardRef<HTMLDivElement, ParkingSpotV4Props>(
  function ParkingSpotV4(
    {
      spotId,
      level,
      status = 'available',
      priceCentsPerHour,
      currency = 'USD',
      distanceLabel,
      evCharging = false,
      variant = 'tile',
      statusLabels,
      formatRate,
      evLabel = 'EV charging',
      onSelect,
      className,
      ...rest
    },
    ref
  ) {
    if (!spotId) return null;

    const meta = STATUS_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const tile = variant === 'tile';
    const unavailable = status === 'occupied' || status === 'disabled';
    const selectable = status === 'available' && Boolean(onSelect);

    const rate =
      typeof priceCentsPerHour === 'number'
        ? (formatRate ?? ((p: string) => `${p}/hr`))(formatMoney(priceCentsPerHour, currency))
        : null;
    const caption = metaLine([level, distanceLabel, evCharging ? evLabel : null]);
    const name = metaLine([spotId, word, caption, rate]);

    const body = (
      <>
        <div className="flex items-center gap-sm">
          <span
            aria-hidden
            className={cn(
              'flex w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-base font-bold',
              MIN_TAP_CLASS,
              TONE_BG[meta.tone],
              // `TONE_ON`, not `text-on-primary`. The compiler guarantees
              // `on-success` against `success` and nothing about the other.
              TONE_ON[meta.tone]
            )}
          >
            {meta.glyph}
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-heading text-base font-bold text-on-card">{spotId}</span>
            {caption ? <span className="truncate text-xs text-muted-text">{caption}</span> : null}
          </span>
          {evCharging ? <IconV4 name="bolt" size="sm" className="text-primary-text" /> : null}
        </div>

        <div className="flex w-full items-center justify-between gap-sm">
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {word}
          </BadgeV4>
          {rate ? (
            <span className="text-sm font-semibold text-on-card [font-variant-numeric:tabular-nums]">
              {rate}
            </span>
          ) : null}
        </div>
      </>
    );

    const shell = cn(
      'flex gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-card p-md text-left',
      tile ? 'flex-col items-start' : 'flex-row items-center',
      unavailable && 'opacity-[0.38]'
    );

    if (!selectable) {
      return (
        <div
          ref={ref}
          data-xen-parking-spot={status}
          aria-label={name}
          aria-disabled={unavailable || undefined}
          className={cn(shell, className)}
          {...rest}
        >
          {body}
        </div>
      );
    }

    return (
      <div ref={ref} data-xen-parking-spot={status} className={className} {...rest}>
        <button
          type="button"
          onClick={onSelect}
          aria-label={name}
          data-xen-v4-chrome="on-surface"
          className={cn(shell, 'w-full')}
        >
          {body}
        </button>
      </div>
    );
  }
);
