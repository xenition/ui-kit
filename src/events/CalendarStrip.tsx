import * as React from 'react';
import { cn } from '../primitives/cn';
import { monthLabel, sameDay, weekdayLabel } from './format';

export interface CalendarStripProps extends React.HTMLAttributes<HTMLDivElement> {
  /** First day in the strip. Defaults to today. */
  startDate?: Date;
  /** Number of day pills to render (default 14). Clamped to at least 1. */
  days?: number;
  /** Explicit list of dates; overrides `startDate`/`days` when provided. */
  dates?: Date[];
  /** Currently selected day (highlighted). */
  selected?: Date;
  /** Days to mark with a dot (e.g. days that have events). */
  marks?: Date[];
  /** Fires when a day pill is tapped. */
  onSelectDate?: (date: Date) => void;
}

function buildDates(startDate: Date, count: number): Date[] {
  const n = Math.max(1, Math.floor(count));
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });
}

/**
 * A horizontally-scrolling week/day strip — a compact date picker for browsing
 * an event schedule. Each pill shows the weekday, day number and (on month
 * boundaries) the month, with a dot for marked days. The selected day is filled
 * with `primary` and also carries `aria-selected`. `startDate` defaults to a
 * fresh `new Date()` only at render (never at import). Colors come from the
 * `--xen-*` tokens; no literal colors.
 */
export const CalendarStrip = React.forwardRef<HTMLDivElement, CalendarStripProps>(function CalendarStrip(
  { startDate, days = 14, dates, selected, marks = [], onSelectDate, className, ...rest },
  ref
) {
  const list = dates && dates.length > 0 ? dates : buildDates(startDate ?? new Date(), days);
  const isMarked = (d: Date): boolean => marks.some((m) => sameDay(m, d));

  return (
    <div
      ref={ref}
      role="tablist"
      className={cn('flex flex-row gap-sm overflow-x-auto px-xs', className)}
      {...rest}
    >
      {list.map((date, i) => {
        const isSelected = selected != null && sameDay(selected, date);
        const showMonth = i === 0 || date.getDate() === 1;
        return (
          <button
            key={date.toISOString()}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-label={`${weekdayLabel(date)} ${monthLabel(date)} ${date.getDate()}`}
            onClick={() => onSelectDate?.(date)}
            className={cn(
              'flex min-w-[3.5rem] flex-col items-center rounded-md border px-sm py-sm transition-colors',
              isSelected ? 'border-primary bg-primary' : 'border-border bg-surface hover:bg-neutral-50',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            )}
          >
            <span className={cn('text-xs font-semibold', isSelected ? 'text-on-primary' : 'text-muted')}>
              {weekdayLabel(date)}
            </span>
            <span className={cn('text-lg font-extrabold', isSelected ? 'text-on-primary' : 'text-on-surface')}>
              {date.getDate()}
            </span>
            {showMonth ? (
              <span className={cn('text-xs', isSelected ? 'text-on-primary' : 'text-muted')}>{monthLabel(date)}</span>
            ) : (
              <span className="flex h-2 items-center justify-center">
                {isMarked(date) ? (
                  <span className={cn('h-1.5 w-1.5 rounded-full', isSelected ? 'bg-on-primary' : 'bg-accent')} />
                ) : null}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
});
