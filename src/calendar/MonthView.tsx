import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  toneClasses,
  monthGrid,
  sameDay,
  weekdayHeader,
  WEEKDAYS_NARROW,
  WEEKDAYS_SHORT,
} from './format';
import type { CalendarEvent } from './types';

export type MonthViewDensity = 'compact' | 'full';

export interface MonthViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Any date within the month to render (required — no clock read at import). */
  month: Date;
  /** Events; grouped onto their start day as accent dots / counts. */
  events?: CalendarEvent[];
  /** The currently selected day (filled). */
  selected?: Date;
  /** "Today" instant — outlined + labelled (never color-alone). */
  today?: Date;
  /** 0 = week starts Sunday (default), 1 = Monday, … */
  weekStartsOn?: number;
  /** `full` shows up to 3 event dots per cell; `compact` shows one. */
  density?: MonthViewDensity;
  /** Fires when a day cell is tapped. */
  onSelectDate?: (date: Date) => void;
}

const MAX_DOTS = 3;

/**
 * A full month grid for scheduling — distinct from the `Calendar` primitive in
 * that it groups real `CalendarEvent`s onto their day (tone-colored dots, plus
 * an overflow "+n"). The selected day is filled and today carries a ring **and**
 * a bold weight (never color-alone; `aria-current="date"`). Each day cell is a
 * real `<button>` for keyboard navigation. All colors resolve from theme tokens.
 */
export const MonthView = React.forwardRef<HTMLDivElement, MonthViewProps>(function MonthView(
  {
    month,
    events = [],
    selected,
    today,
    weekStartsOn = 0,
    density = 'full',
    onSelectDate,
    className,
    ...rest
  },
  ref
) {
  const cells = React.useMemo(() => monthGrid(month, weekStartsOn), [month, weekStartsOn]);
  const headers = weekdayHeader(
    density === 'compact' ? WEEKDAYS_NARROW : WEEKDAYS_SHORT,
    weekStartsOn
  );

  const eventsFor = (date: Date): CalendarEvent[] => events.filter((e) => sameDay(e.start, date));

  return (
    <div
      ref={ref}
      className={cn(
        'border border-border rounded-[var(--xen-radius-md)] bg-surface p-2',
        className
      )}
      {...rest}
    >
      <div className="grid grid-cols-7">
        {headers.map((w, i) => (
          <div key={i} className="flex items-center justify-center py-1">
            <span className="text-xs font-semibold text-muted">{w}</span>
          </div>
        ))}
      </div>

      {Array.from({ length: cells.length / 7 }).map((_, row) => (
        <div key={row} className="grid grid-cols-7">
          {cells.slice(row * 7, row * 7 + 7).map((date, col) => {
            if (date == null) {
              return <div key={col} className={density === 'compact' ? 'aspect-square' : 'aspect-[1/1.1]'} />;
            }
            const dayEvents = eventsFor(date);
            const isSelected = selected != null && sameDay(selected, date);
            const isToday = today != null && sameDay(today, date);
            const dots = dayEvents.slice(0, density === 'compact' ? 1 : MAX_DOTS);
            const overflow = dayEvents.length - dots.length;
            const label =
              `${date.getDate()}${isToday ? ', today' : ''}` +
              (dayEvents.length
                ? `, ${dayEvents.length} event${dayEvents.length === 1 ? '' : 's'}`
                : '');

            return (
              <button
                key={col}
                type="button"
                aria-label={label}
                aria-current={isToday ? 'date' : undefined}
                aria-pressed={isSelected || undefined}
                onClick={() => onSelectDate?.(date)}
                className={cn(
                  'flex flex-col items-center pt-1',
                  density === 'compact' ? 'aspect-square' : 'aspect-[1/1.1]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary-300 rounded-[var(--xen-radius-sm)]'
                )}
              >
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full text-sm',
                    isSelected ? 'bg-primary text-on-primary' : 'text-on-surface',
                    isToday && !isSelected ? 'border border-primary' : '',
                    isSelected || isToday ? 'font-extrabold' : 'font-normal'
                  )}
                >
                  {date.getDate()}
                </span>
                <span className="mt-0.5 flex items-center gap-0.5">
                  {dots.map((e, i) => (
                    <span
                      key={i}
                      className={cn(
                        'h-1 w-1 rounded-full',
                        isSelected ? 'bg-on-primary' : toneClasses(e.tone).accentBg
                      )}
                    />
                  ))}
                  {overflow > 0 ? <span className="text-xs text-muted">{`+${overflow}`}</span> : null}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
});
