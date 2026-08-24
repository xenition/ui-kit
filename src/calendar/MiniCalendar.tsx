import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  addMonths,
  monthGrid,
  monthLongLabel,
  sameDay,
  weekdayHeader,
  WEEKDAYS_NARROW,
} from './format';

export type MiniCalendarVariant = 'bordered' | 'plain';

export interface MiniCalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Any date within the month to render (required — no import-time clock). */
  month: Date;
  /** The currently selected day (filled). */
  selected?: Date;
  /** "Today" instant — outlined + bolded (never color-alone). */
  today?: Date;
  /** Days to mark with a dot (e.g. days that have events). */
  marks?: Date[];
  /** 0 = week starts Sunday (default), 1 = Monday, … */
  weekStartsOn?: number;
  /** Surface treatment. */
  variant?: MiniCalendarVariant;
  /** Fires when a day cell is tapped. */
  onSelectDate?: (date: Date) => void;
  /** Fires when the prev/next chevrons page the month. */
  onMonthChange?: (month: Date) => void;
}

/**
 * A dense mini month picker for sidebars, popovers and the `EventDetailSheet`.
 * Header chevrons page the month; days are 1:1 tap-target `<button>`s with a
 * selected fill and a marked-day dot. Distinct from `MonthView` (no per-day
 * event stacks) and from the `Calendar` primitive (integrated month paging +
 * marks). Token colors only.
 */
export const MiniCalendar = React.forwardRef<HTMLDivElement, MiniCalendarProps>(
  function MiniCalendar(
    {
      month,
      selected,
      today,
      marks = [],
      weekStartsOn = 0,
      variant = 'bordered',
      onSelectDate,
      onMonthChange,
      className,
      ...rest
    },
    ref
  ) {
    const cells = React.useMemo(() => monthGrid(month, weekStartsOn), [month, weekStartsOn]);
    const headers = weekdayHeader(WEEKDAYS_NARROW, weekStartsOn);
    const isMarked = (d: Date): boolean => marks.some((m) => sameDay(m, d));

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--xen-radius-md)] p-2',
          variant === 'bordered' ? 'border border-border bg-surface' : '',
          className
        )}
        {...rest}
      >
        <div className="mb-1 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => onMonthChange?.(addMonths(month, -1))}
            className="rounded-[var(--xen-radius-sm)] px-1.5 py-0.5 text-base text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            ‹
          </button>
          <span className="text-sm font-bold text-on-surface">
            {`${monthLongLabel(month)} ${month.getFullYear()}`}
          </span>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => onMonthChange?.(addMonths(month, 1))}
            className="rounded-[var(--xen-radius-sm)] px-1.5 py-0.5 text-base text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7">
          {headers.map((w, i) => (
            <div key={i} className="flex items-center justify-center py-0.5">
              <span className="text-xs font-semibold text-muted">{w}</span>
            </div>
          ))}
        </div>

        {Array.from({ length: cells.length / 7 }).map((_, row) => (
          <div key={row} className="grid grid-cols-7">
            {cells.slice(row * 7, row * 7 + 7).map((date, col) => {
              if (date == null) {
                return <div key={col} className="aspect-square" />;
              }
              const isSelected = selected != null && sameDay(selected, date);
              const isToday = today != null && sameDay(today, date);
              const marked = isMarked(date);
              return (
                <button
                  key={col}
                  type="button"
                  aria-label={`${monthLongLabel(month)} ${date.getDate()}${isToday ? ', today' : ''}`}
                  aria-current={isToday ? 'date' : undefined}
                  aria-pressed={isSelected || undefined}
                  onClick={() => onSelectDate?.(date)}
                  className="relative flex aspect-square items-center justify-center rounded-[var(--xen-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full text-xs',
                      isSelected ? 'bg-primary text-on-primary' : 'text-on-surface',
                      isToday && !isSelected ? 'border border-primary' : '',
                      isSelected || isToday ? 'font-extrabold' : 'font-normal'
                    )}
                  >
                    {date.getDate()}
                  </span>
                  {marked ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute bottom-0 h-1 w-1 rounded-full',
                        isSelected ? 'bg-on-primary' : 'bg-accent'
                      )}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);
