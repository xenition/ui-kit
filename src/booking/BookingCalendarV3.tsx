import * as React from 'react';
import { cn } from '../primitives/cn';
import { BookingSlot } from './types';
import { addDays, dayKeyInTz, toDayKey } from './datetime';
import type { BookingCalendarProps, DayAvailability } from './BookingCalendar';

/** Same public contract as {@link BookingCalendar} — a drop-in alternate design. */
export type BookingCalendarV3Props = BookingCalendarProps;

function availabilityMap(slots?: BookingSlot[], availability?: DayAvailability[], timezone?: string): Map<string, number> {
  const map = new Map<string, number>();
  if (availability) { for (const a of availability) map.set(a.date, a.count); return map; }
  for (const s of slots ?? []) { if (s.spotsLeft <= 0) continue; const k = dayKeyInTz(s.startsAt, timezone); map.set(k, (map.get(k) ?? 0) + 1); }
  return map;
}

/**
 * BookingCalendar, redesigned (v3): a **compact upcoming-days list**. Instead of a
 * month grid it lists the next 30 days as hairline rows — weekday, date, and an
 * availability count (or "Full") — that select on tap. A scannable agenda, the
 * opposite of v1/v2's grid. Same props, token-only.
 */
export const BookingCalendarV3 = React.forwardRef<HTMLDivElement, BookingCalendarV3Props>(
  function BookingCalendarV3({ slots, availability, selectedDate, onSelectDate, timezone, view, weekStartsOn, locale, className, ...rest }, ref) {
    void view;
    void weekStartsOn;
    const map = React.useMemo(() => availabilityMap(slots, availability, timezone), [slots, availability, timezone]);
    const today = new Date();
    const days = Array.from({ length: 30 }, (_, i) => addDays(new Date(today.getFullYear(), today.getMonth(), today.getDate()), i));
    const selectedKey = selectedDate ? toDayKey(selectedDate) : null;
    const wd = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const md = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' });

    return (
      <div ref={ref} data-xen-booking-calendar="list" className={cn('flex max-h-80 flex-col overflow-y-auto', className)} {...rest}>
        {days.map((date) => {
          const key = toDayKey(date);
          const count = map.get(key) ?? 0;
          const selected = selectedKey === key;
          return (
            <button
              key={key}
              type="button"
              data-xen-calendar-day=""
              aria-pressed={selected}
              aria-label={`${date.toDateString()}${count > 0 ? `, ${count} available` : ', no availability'}`}
              disabled={count === 0}
              onClick={() => onSelectDate?.(date)}
              className={cn('flex items-center gap-3 border-b border-border py-2.5 text-left transition-colors', selected ? 'bg-primary/10' : count > 0 ? 'hover:bg-neutral-50' : 'opacity-50')}
            >
              <span className="w-10 text-center">
                <span className="block text-xs text-muted">{wd.format(date)}</span>
              </span>
              <span className="flex-1 text-sm font-medium text-on-surface">{md.format(date)}</span>
              {count > 0 ? <span className="text-xs font-semibold text-primary">{count} open</span> : <span className="text-xs text-muted">Full</span>}
            </button>
          );
        })}
      </div>
    );
  }
);
