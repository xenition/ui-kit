import * as React from 'react';
import { cn } from '../primitives/cn';
import { BookingSlot } from './types';
import { dayKeyInTz, monthMatrix, startOfMonth, toDayKey } from './datetime';
import type { BookingCalendarProps, DayAvailability } from './BookingCalendar';

/** Same public contract as {@link BookingCalendar} — a drop-in alternate design. */
export type BookingCalendarV2Props = BookingCalendarProps;

function availabilityMap(slots?: BookingSlot[], availability?: DayAvailability[], timezone?: string): Map<string, number> {
  const map = new Map<string, number>();
  if (availability) { for (const a of availability) map.set(a.date, a.count); return map; }
  for (const s of slots ?? []) { if (s.spotsLeft <= 0) continue; const k = dayKeyInTz(s.startsAt, timezone); map.set(k, (map.get(k) ?? 0) + 1); }
  return map;
}
function weekdayLabels(weekStartsOn: number, locale?: string): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const base = Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2023, 0, 1 + i))); // Jan 1 2023 = Sunday
  return [...base.slice(weekStartsOn), ...base.slice(0, weekStartsOn)];
}

/**
 * BookingCalendar, redesigned (v2): a **spacious availability calendar**. Larger
 * rounded day tiles print an "N open" count (not just a dot) beneath the date, the
 * selected day fills primary, and the month nav is chunkier. Distinct from v1's
 * compact grid. Same props, token-only.
 */
export const BookingCalendarV2 = React.forwardRef<HTMLDivElement, BookingCalendarV2Props>(
  function BookingCalendarV2({ slots, availability, selectedDate, onSelectDate, timezone, view, weekStartsOn = 0, locale, className, ...rest }, ref) {
    void view;
    const map = React.useMemo(() => availabilityMap(slots, availability, timezone), [slots, availability, timezone]);
    const anchor = selectedDate ?? new Date();
    const [viewDate, setViewDate] = React.useState<Date>(() => startOfMonth(anchor));
    const weeks = monthMatrix(viewDate, weekStartsOn);
    const labels = weekdayLabels(weekStartsOn, locale);
    const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewDate);
    const selectedKey = selectedDate ? toDayKey(selectedDate) : null;
    const shift = (m: number): void => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + m, 1));

    return (
      <div ref={ref} data-xen-booking-calendar="month" className={cn('inline-flex flex-col gap-2 rounded-lg bg-surface p-md shadow-sm', className)} {...rest}>
        <div className="flex items-center justify-between">
          <button type="button" aria-label="Previous month" onClick={() => shift(-1)} className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface hover:bg-neutral-100">‹</button>
          <span className="text-base font-bold text-on-surface">{monthLabel}</span>
          <button type="button" aria-label="Next month" onClick={() => shift(1)} className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface hover:bg-neutral-100">›</button>
        </div>
        <div role="grid" aria-label={`Choose a date — ${monthLabel}`}>
          <div role="row" className="grid grid-cols-7">
            {labels.map((l) => <div key={l} role="columnheader" className="py-1 text-center text-xs font-medium text-muted">{l}</div>)}
          </div>
          {weeks.map((row, wi) => (
            <div role="row" key={wi} className="grid grid-cols-7 gap-1">
              {row.map((date) => {
                const key = toDayKey(date);
                const inMonth = date.getMonth() === viewDate.getMonth();
                const count = map.get(key) ?? 0;
                const selected = selectedKey === key;
                return (
                  <div role="gridcell" key={key}>
                    <button
                      type="button"
                      data-xen-calendar-day=""
                      aria-pressed={selected}
                      aria-label={`${date.toDateString()}${count > 0 ? ', available' : ', no availability'}`}
                      onClick={() => onSelectDate?.(date)}
                      className={cn('flex h-12 w-full flex-col items-center justify-center rounded-md text-sm transition-colors', !inMonth && 'text-muted', selected ? 'bg-primary text-on-primary' : count > 0 ? 'bg-primary/5 font-semibold text-on-surface hover:bg-primary/10' : 'text-on-surface hover:bg-neutral-100')}
                    >
                      <span>{date.getDate()}</span>
                      {count > 0 ? <span className={cn('text-[9px]', selected ? 'text-on-primary' : 'text-primary')}>{count} open</span> : null}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
