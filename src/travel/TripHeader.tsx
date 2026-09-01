import * as React from 'react';
import { cn } from '../primitives/cn';

/** A place on the journey — a city name plus an optional short code (IATA / airport). */
export interface TripPlace {
  /** City / place name (e.g. "San Francisco"). */
  city: string;
  /** Optional short code shown beneath the city (e.g. "SFO"). */
  code?: string;
}

export interface TripHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Where the trip starts (city + optional code). */
  origin: TripPlace;
  /** Where the trip ends (city + optional code). */
  destination: TripPlace;
  /** Localized trip start date string (e.g. "Sep 3"). */
  startDate: string;
  /** Localized trip end date string (e.g. "Sep 10"). */
  endDate?: string;
  /** Number of travelers on the trip (shows a frosted "travelers" tile when set). */
  travelers?: number;
  /** Number of nights (shows a frosted "nights" tile when set). */
  nights?: number;
  /** Optional short line under the route (e.g. "Business trip"). */
  subtitle?: string;
  /** Manage-trip CTA label (default "Manage trip"). Hidden when no `onManage`. */
  manageLabel?: string;
  /** Fires on the manage-trip action. */
  onManage?: () => void;
}

/**
 * TripHeader — a **V4** "journey" hero (web parity of the native twin). The trip
 * cover for an itinerary screen: a saturated brand-gradient ground carrying the
 * origin→destination route drawn as a rail with a small brand-gradient plane disc
 * at its midpoint (the signature FlightCardV4 motif) in near-white ink, an
 * optional subtitle, then the dates / travelers / nights as frosted glass tiles
 * and an optional manage CTA (a near-white pill). All colors from `--xen-*` token
 * classes and gradient utilities — no literal colors; dark-mode safe.
 */
export const TripHeader = React.forwardRef<HTMLDivElement, TripHeaderProps>(function TripHeader(
  {
    origin,
    destination,
    startDate,
    endDate,
    travelers,
    nights,
    subtitle,
    manageLabel = 'Manage trip',
    onManage,
    className,
    ...rest
  },
  ref
) {
  const dateRange = endDate ? `${startDate} – ${endDate}` : startDate;
  const a11yLabel = `Trip from ${origin.city} to ${destination.city}, ${dateRange}`;

  const Endpoint = ({ place, align }: { place: TripPlace; align: 'start' | 'end' }) => (
    <div className={cn('flex min-w-0 flex-col', align === 'end' ? 'items-end text-right' : 'items-start')}>
      <span className="max-w-[8rem] truncate text-lg font-extrabold text-primary-50">{place.city}</span>
      {place.code ? <span className="text-xs font-semibold tracking-wide text-primary-100">{place.code}</span> : null}
    </div>
  );

  const Tile = ({ label, value }: { label: string; value: string }) => (
    <div className="flex min-w-[72px] flex-1 flex-col gap-[2px] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
      <span className="text-xs text-primary-100">{label}</span>
      <span className="truncate text-sm font-bold text-primary-50">{value}</span>
    </div>
  );

  return (
    <div
      ref={ref}
      data-xen-trip-header=""
      aria-label={a11yLabel}
      className={cn(
        'flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      {/* Route rail: origin — line — gradient plane disc — line — destination */}
      <div className="flex flex-col gap-[var(--xen-space-xs)]">
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <Endpoint place={origin} align="start" />
          <div className="flex flex-1 items-center">
            <div className="h-0.5 flex-1 rounded-full bg-primary-50/40" />
            <span className="mx-1.5 flex h-[26px] w-[26px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm leading-none text-primary-50">
              ✈
            </span>
            <div className="h-0.5 flex-1 rounded-full bg-primary-50/40" />
          </div>
          <Endpoint place={destination} align="end" />
        </div>
        {subtitle ? <span className="truncate text-sm text-primary-100">{subtitle}</span> : null}
      </div>

      <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
        <Tile label="Dates" value={dateRange} />
        {typeof travelers === 'number' ? (
          <Tile label="Travelers" value={`${travelers} ${travelers === 1 ? 'traveler' : 'travelers'}`} />
        ) : null}
        {typeof nights === 'number' ? (
          <Tile label="Nights" value={`${nights} ${nights === 1 ? 'night' : 'nights'}`} />
        ) : null}
      </div>

      {onManage ? (
        <button
          type="button"
          aria-label={manageLabel}
          onClick={onManage}
          className="flex w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-on-primary py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          {manageLabel}
        </button>
      ) : null}
    </div>
  );
});
