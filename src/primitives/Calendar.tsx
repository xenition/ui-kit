import * as React from 'react';
import { cn } from './cn';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The month to display (any date within it). Defaults to today. */
  month?: Date;
  /** Currently selected date (highlighted). */
  selected?: Date;
  /** Dates to mark with a dot (e.g. events). */
  marks?: Date[];
  /** Fires when a day cell is clicked. */
  onSelectDate?: (date: Date) => void;
  /** Fires when the prev/next chevrons page the month. */
  onMonthChange?: (month: Date) => void;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Web parity of the native `Calendar`: a static month grid — a display calendar
 * distinct from a date-picker field. Header with prev/next chevrons, a weekday
 * row, and a `grid`-role 6×7 day grid; the selected day fills with the `primary`
 * token and marked days get an accent dot. All colors/spacing come from the
 * `--xen-*` tokens via Tailwind classes — no literal colors.
 */
export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  { className, month, selected, marks = [], onSelectDate, onMonthChange, ...rest },
  ref
) {
  const base = month ?? new Date();
  const year = base.getFullYear();
  const monthIndex = base.getMonth();
  const today = new Date();

  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const goMonth = (delta: number): void => {
    onMonthChange?.(new Date(year, monthIndex + delta, 1));
  };

  const isMarked = (day: number): boolean =>
    marks.some((m) => sameDay(m, new Date(year, monthIndex, day)));

  const rows = Math.ceil(cells.length / 7);

  return (
    <div
      ref={ref}
      className={cn(
        'bg-surface rounded-[var(--xen-radius-md)] border border-border p-3',
        className
      )}
      {...rest}
    >
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => goMonth(-1)}
          className="rounded-[var(--xen-radius-sm)] px-2 py-1 text-lg text-primary hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          ‹
        </button>
        <span className="text-base font-semibold text-on-surface">
          {`${MONTHS[monthIndex] ?? ''} ${year}`}
        </span>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => goMonth(1)}
          className="rounded-[var(--xen-radius-sm)] px-2 py-1 text-lg text-primary hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          ›
        </button>
      </div>

      <div role="grid" aria-label={`${MONTHS[monthIndex] ?? ''} ${year}`}>
        <div role="row" className="flex">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              role="columnheader"
              className="flex flex-1 items-center justify-center py-1 text-xs font-medium text-muted"
            >
              {w}
            </div>
          ))}
        </div>

        {Array.from({ length: rows }).map((_, row) => (
          <div role="row" key={row} className="flex">
            {cells.slice(row * 7, row * 7 + 7).map((day, col) => {
              if (day == null) {
                return <div role="gridcell" key={col} className="aspect-square flex-1" />;
              }
              const cellDate = new Date(year, monthIndex, day);
              const isSelected = selected != null && sameDay(selected, cellDate);
              const isToday = sameDay(today, cellDate);
              return (
                <div role="gridcell" key={col} className="aspect-square flex-1">
                  <button
                    type="button"
                    aria-label={`${MONTHS[monthIndex] ?? ''} ${day}, ${year}`}
                    aria-pressed={isSelected}
                    aria-current={isToday ? 'date' : undefined}
                    onClick={() => onSelectDate?.(cellDate)}
                    className="relative flex h-full w-full items-center justify-center focus-visible:outline-none"
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-sm',
                        isSelected
                          ? 'bg-primary font-bold text-on-primary'
                          : 'text-on-surface hover:bg-neutral-100',
                        isToday && !isSelected && 'border border-border'
                      )}
                    >
                      {day}
                    </span>
                    {isMarked(day) ? (
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute bottom-1 h-1 w-1 rounded-full',
                          isSelected ? 'bg-on-primary' : 'bg-accent'
                        )}
                      />
                    ) : null}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});
