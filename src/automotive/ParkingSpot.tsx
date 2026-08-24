import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import { formatMoney } from '../commerce';

/** Availability state of a parking spot. */
export type ParkingStatus = 'available' | 'occupied' | 'reserved' | 'disabled';
/** Presentation for a {@link ParkingSpot}. */
export type ParkingSpotVariant = 'tile' | 'row';

/** Status → text/border tone class + spelled-out word + glyph (never color alone). */
const STATUS: Record<ParkingStatus, { textClass: string; borderClass: string; word: string; glyph: string }> = {
  available: { textClass: 'text-success', borderClass: 'border-success', word: 'Available', glyph: 'P' },
  occupied: { textClass: 'text-danger', borderClass: 'border-danger', word: 'Occupied', glyph: '✕' },
  reserved: { textClass: 'text-warn', borderClass: 'border-warn', word: 'Reserved', glyph: '★' },
  disabled: { textClass: 'text-muted', borderClass: 'border-border', word: 'Out of service', glyph: '—' },
};

export interface ParkingSpotProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Spot identifier, e.g. `'B-12'`. */
  spotId: string;
  /** Level / zone label, e.g. `'Level 2'`. */
  level?: string;
  /** Availability status. */
  status?: ParkingStatus;
  /** Price per hour in integer minor units (cents). */
  priceCentsPerHour?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Distance to the spot, pre-formatted (e.g. `'80 m'`). */
  distanceLabel?: string;
  /** Marks EV-charging capable. */
  evCharging?: boolean;
  /** Presentation variant. */
  variant?: ParkingSpotVariant;
  /** Fires when the spot is pressed (only for `available` spots). */
  onSelect?: () => void;
}

/**
 * A single parking spot — its id, level, availability status, hourly price, and
 * an optional EV-charging marker. The status carries a glyph plus a spelled-out
 * word and an a11y label, so meaning never rests on color; only `available`
 * spots are selectable and non-selectable spots expose a disabled a11y state.
 * Data + `onSelect` only; nothing fetches. Colors come from `--xen-*` token
 * classes — no literal colors. `variant="row"` renders a list line. Web parity
 * of the native `ParkingSpot`.
 */
export const ParkingSpot = React.forwardRef<HTMLDivElement, ParkingSpotProps>(function ParkingSpot(
  {
    spotId,
    level,
    status = 'available',
    priceCentsPerHour,
    currency = 'USD',
    distanceLabel,
    evCharging = false,
    variant = 'tile',
    onSelect,
    className,
    ...rest
  },
  ref
) {
  const s = STATUS[status] ?? STATUS.available;
  const selectable = status === 'available' && Boolean(onSelect);
  const row = variant === 'row';

  const a11y = `Spot ${spotId}${level ? `, ${level}` : ''}, ${s.word}${
    typeof priceCentsPerHour === 'number' ? `, ${formatMoney(priceCentsPerHour, currency)} per hour` : ''
  }${evCharging ? ', EV charging' : ''}`;

  const body = (
    <div className="flex items-center gap-[var(--xen-space-sm)]">
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border bg-neutral-100 text-lg font-extrabold',
          row ? 'h-10 w-10' : 'h-11 w-11',
          s.textClass,
          s.borderClass
        )}
      >
        {s.glyph}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
          <span className="text-base font-bold text-on-surface">{spotId}</span>
          {evCharging ? <Badge tone="primary">⚡ EV</Badge> : null}
        </div>
        <span className="block text-xs text-muted">
          {[level, s.word, distanceLabel].filter(Boolean).join(' · ')}
        </span>
      </div>
      {typeof priceCentsPerHour === 'number' ? (
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-on-surface">{formatMoney(priceCentsPerHour, currency)}</span>
          <span className="text-xs text-muted">/ hr</span>
        </div>
      ) : null}
    </div>
  );

  const rootClass = cn(
    'rounded-[var(--xen-radius-lg)] border bg-surface p-[var(--xen-space-md)]',
    selectable ? 'border-success' : 'border-border',
    className
  );

  if (!onSelect) {
    return (
      <div ref={ref} data-xen-parking-spot="" aria-label={a11y} className={rootClass} {...rest}>
        {body}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-parking-spot=""
      role="button"
      tabIndex={selectable ? 0 : -1}
      aria-label={a11y}
      aria-disabled={!selectable}
      onClick={selectable ? onSelect : undefined}
      onKeyDown={(e) => {
        if (selectable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        rootClass,
        selectable
          ? 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          : 'opacity-60'
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
