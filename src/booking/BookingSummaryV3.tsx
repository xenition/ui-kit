import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatTimeInTz } from './datetime';
import type { BookingSummaryProps } from './BookingSummary';

/** Same public contract as {@link BookingSummary} — a drop-in alternate design. */
export type BookingSummaryV3Props = BookingSummaryProps;

/**
 * BookingSummary, redesigned (v3): a **compact confirmation line**. The resource ·
 * date · time fold onto a dense two-line block with the action pinned right — a
 * tight review row for a checkout footer. The opposite of v2's panel. Same props,
 * token-only.
 */
export const BookingSummaryV3 = React.forwardRef<HTMLDivElement, BookingSummaryV3Props>(
  function BookingSummaryV3({ resource, slot, timeZone, formatDate, formatTime, action, title = 'Your booking', className, ...rest }, ref) {
    const tz = timeZone ?? resource?.timezone;
    const fmtTime = formatTime ?? ((iso: string) => formatTimeInTz(iso, tz));
    const fmtDate = formatDate ?? ((iso: string) => new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', timeZone: tz }).format(new Date(iso)));
    const line = [resource?.name, slot ? fmtDate(slot.startsAt) : null, slot ? `${fmtTime(slot.startsAt)}–${fmtTime(slot.endsAt)}` : null].filter(Boolean).join(' · ');

    return (
      <div ref={ref} data-xen-booking-summary="" className={cn('flex items-center gap-3 rounded-lg border border-border p-3', className)} {...rest}>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wide text-muted">{title}</p>
          <p className="truncate text-sm font-semibold text-on-surface">{line || '—'}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    );
  }
);
