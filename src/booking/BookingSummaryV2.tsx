import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatTimeInTz } from './datetime';
import type { BookingSummaryProps } from './BookingSummary';

/** Same public contract as {@link BookingSummary} — a drop-in alternate design. */
export type BookingSummaryV2Props = BookingSummaryProps;

/**
 * BookingSummary, redesigned (v2): an **elevated confirmation card**. The title
 * heads a stack of labelled rows — resource, date, and time range — over the
 * trailing action. A prominent review panel. Distinct from v1. Same props,
 * token-only.
 */
export const BookingSummaryV2 = React.forwardRef<HTMLDivElement, BookingSummaryV2Props>(
  function BookingSummaryV2({ resource, slot, timeZone, formatDate, formatTime, action, title = 'Your booking', className, ...rest }, ref) {
    const tz = timeZone ?? resource?.timezone;
    const fmtTime = formatTime ?? ((iso: string) => formatTimeInTz(iso, tz));
    const fmtDate = formatDate ?? ((iso: string) => new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric', timeZone: tz }).format(new Date(iso)));

    const Row = ({ label, value }: { label: string; value: React.ReactNode }): React.ReactElement => (
      <div className="flex items-center justify-between gap-3 border-t border-border py-2">
        <span className="text-xs uppercase tracking-wide text-muted">{label}</span>
        <span className="text-sm font-semibold text-on-surface">{value}</span>
      </div>
    );

    return (
      <div ref={ref} data-xen-booking-summary="" className={cn('flex flex-col gap-1 rounded-lg bg-surface p-md shadow-md', className)} {...rest}>
        <p className="mb-1 text-base font-bold text-on-surface">{title}</p>
        {resource ? <Row label="With" value={resource.name} /> : null}
        {slot ? <Row label="Date" value={fmtDate(slot.startsAt)} /> : null}
        {slot ? <Row label="Time" value={`${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}`} /> : null}
        {action ? <div className="mt-2">{action}</div> : null}
      </div>
    );
  }
);
