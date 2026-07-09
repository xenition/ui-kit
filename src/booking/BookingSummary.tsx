import * as React from 'react';
import { cn } from '../primitives/cn';
import { BookingResource, BookingSlot } from './types';
import { formatTimeInTz } from './datetime';

export interface BookingSummaryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'slot' | 'title' | 'resource'> {
  /** The chosen resource (staff member, room, …). */
  resource?: BookingResource;
  /** The chosen time slot. */
  slot?: BookingSlot | null;
  /** IANA timezone for rendering (falls back to `resource.timezone`). */
  timeZone?: string;
  /** Render the date line. Defaults to a localized long date. */
  formatDate?: (iso: string) => string;
  /** Render a time. Defaults to timezone-aware `h:mm a`. */
  formatTime?: (iso: string) => string;
  /** Trailing action slot (e.g. a confirm button). */
  action?: React.ReactNode;
  /** Heading text (default `Your booking`). */
  title?: React.ReactNode;
}

const defaultFormatDate = (iso: string, timeZone?: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
};

/**
 * Read-only recap of a chosen resource + slot: who/what, the date, the time
 * range, and the timezone. Token-only. Pairs with a `BookingCalendar` +
 * `SlotPicker` flow as the confirmation step.
 */
export const BookingSummary = React.forwardRef<HTMLDivElement, BookingSummaryProps>(
  function BookingSummary(
    { resource, slot, timeZone, formatDate, formatTime, action, title = 'Your booking', className, ...rest },
    ref
  ) {
    const tz = timeZone ?? resource?.timezone;
    const fmtDate = formatDate ?? ((iso: string) => defaultFormatDate(iso, tz));
    const fmtTime = formatTime ?? ((iso: string) => formatTimeInTz(iso, tz));

    const line = (label: string, value: React.ReactNode, key: string): React.ReactElement => (
      <div key={key} className="flex items-baseline justify-between gap-[var(--xen-space-md)] text-sm">
        <span className="text-muted">{label}</span>
        <span className="text-right text-on-surface">{value}</span>
      </div>
    );

    return (
      <div
        ref={ref}
        data-xen-booking-summary=""
        className={cn(
          'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
          className
        )}
        {...rest}
      >
        <h3 className="font-heading text-base font-semibold text-on-surface">{title}</h3>
        <div className="flex flex-col gap-[var(--xen-space-sm)]">
          {resource ? line('With', resource.name, 'resource') : null}
          {slot ? line('Date', fmtDate(slot.startsAt), 'date') : null}
          {slot
            ? line('Time', `${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}`, 'time')
            : null}
          {resource?.slotMinutes
            ? line('Duration', `${resource.slotMinutes} min`, 'duration')
            : null}
          {tz ? line('Timezone', tz, 'tz') : null}
          {!slot && !resource ? (
            <p data-xen-booking-empty="" className="text-sm text-muted">
              Nothing selected yet.
            </p>
          ) : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
    );
  }
);
