import * as React from 'react';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { monthGrid, sameDay } from './format';
import { weekdayNames } from './layout-v4';
import { eventTone, TONE_BG } from './internal/grid-v4';
import type { CalendarEvent } from './types';
import type { MonthViewProps } from './MonthView';

export interface MonthViewV4Props extends MonthViewProps {
  /**
   * Locale for the weekday headers. Default: the browser's.
   *
   * The base built them from a frozen English `WEEKDAYS_SHORT` array. A
   * calendar is the component a non-English product notices first.
   */
  locale?: string;
  /** Appended to today's accessible name. Default `'today'`. */
  todayLabel?: string;
  /** Build a day's event summary. Default `'3 events'` / `'1 event'`. */
  formatEventCount?: (count: number) => string;
}

/** How many event dots a full cell shows before it counts the rest. */
const MAX_DOTS = 3;

/**
 * **V4 month view** — the web twin of the native `MonthViewV4`, same props as
 * {@link MonthView} plus `locale`, `todayLabel` and `formatEventCount`.
 *
 * ## Four changes
 *
 * 1. **The weekday headers are localized.**
 * 2. **Every day cell clears 44** and carries a full name: the date, whether
 *    it is today, and how many events it holds — the base named it with the
 *    day number alone.
 * 3. **The grid is a real `role="grid"`** with rows, column headers and cells,
 *    so a screen reader can navigate it as a table rather than a wall of
 *    buttons.
 * 4. **Today's ring space is always reserved**, so marking it never nudges the
 *    grid, and it is named as well as drawn.
 */
export const MonthViewV4 = React.forwardRef<HTMLDivElement, MonthViewV4Props>(
  function MonthViewV4(
    {
      month,
      events = [],
      selected,
      today,
      weekStartsOn = 0,
      density = 'full',
      locale,
      todayLabel = 'today',
      formatEventCount,
      onSelectDate,
      className,
      ...rest
    },
    ref
  ) {
    const compact = density === 'compact';
    const cells = React.useMemo(() => monthGrid(month, weekStartsOn), [month, weekStartsOn]);
    const headers = React.useMemo(
      () => weekdayNames(weekStartsOn, { locale, width: compact ? 'narrow' : 'short' }),
      [weekStartsOn, locale, compact]
    );
    const longDate = React.useMemo(
      () => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }),
      [locale]
    );
    const countLabel = formatEventCount ?? ((n: number) => `${n} ${n === 1 ? 'event' : 'events'}`);
    const eventsFor = (date: Date): CalendarEvent[] => events.filter((e) => sameDay(e.start, date));

    return (
      <div
        ref={ref}
        role="grid"
        data-xen-month-view={density}
        className={cn(
          'rounded-[var(--xen-radius-md)] border border-border bg-card p-sm',
          className
        )}
        {...rest}
      >
        <div role="row" className="grid grid-cols-7">
          {headers.map((w, i) => (
            <div
              key={i}
              role="columnheader"
              aria-label={w}
              className="py-xs text-center text-xs font-semibold text-muted-text"
            >
              {w}
            </div>
          ))}
        </div>

        {Array.from({ length: cells.length / 7 }).map((_, row) => (
          <div role="row" key={row} className="grid grid-cols-7">
            {cells.slice(row * 7, row * 7 + 7).map((date, col) => {
              if (date == null) return <div role="gridcell" key={col} className={MIN_TAP_CLASS} />;

              const dayEvents = eventsFor(date);
              const isSelected = selected != null && sameDay(selected, date);
              const isToday = today != null && sameDay(today, date);
              const dots = dayEvents.slice(0, compact ? 1 : MAX_DOTS);
              const overflow = dayEvents.length - dots.length;
              const name = [
                longDate.format(date),
                isToday ? todayLabel : null,
                dayEvents.length > 0 ? countLabel(dayEvents.length) : null,
              ]
                .filter(Boolean)
                .join(', ');

              return (
                <div role="gridcell" key={col} className="p-0.5">
                  <button
                    type="button"
                    disabled={!onSelectDate}
                    aria-label={name}
                    aria-pressed={isSelected}
                    aria-current={isToday ? 'date' : undefined}
                    onClick={() => onSelectDate?.(date)}
                    data-xen-v4-chrome={isSelected ? 'filled-primary' : 'on-surface'}
                    className={cn(
                      'flex w-full flex-col items-center justify-center gap-0.5 rounded-full py-xs',
                      MIN_TAP_CLASS,
                      // The ring's space is reserved on every cell.
                      'border-2',
                      isToday && !isSelected ? 'border-primary' : 'border-transparent',
                      isSelected ? 'bg-primary text-on-primary' : 'text-on-card'
                    )}
                  >
                    <span
                      className={cn(
                        'text-sm [font-variant-numeric:tabular-nums]',
                        (isToday || isSelected) && 'font-bold'
                      )}
                    >
                      {date.getDate()}
                    </span>

                    {dots.length > 0 ? (
                      <span aria-hidden className="flex items-center gap-0.5">
                        {dots.map((e) => (
                          <span
                            key={e.id}
                            className={cn(
                              'h-1 w-1 rounded-full',
                              isSelected ? 'bg-on-primary' : TONE_BG[eventTone(e.tone)]
                            )}
                          />
                        ))}
                        {overflow > 0 && !compact ? (
                          <span className="text-xs text-muted-text [font-variant-numeric:tabular-nums]">
                            +{overflow}
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);
