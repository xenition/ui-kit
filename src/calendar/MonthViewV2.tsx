import * as React from 'react';
import { cn } from '../primitives/cn';
import { monthGrid, sameDay, toneClasses, WEEKDAYS_SHORT } from './format';
import type { CalendarEvent } from './types';
import type { MonthViewProps } from './MonthView';

/** Same public contract as {@link MonthView} — a drop-in alternate design. */
export type MonthViewV2Props = MonthViewProps;

/**
 * MonthView, redesigned (v2): a **spacious month grid**. Larger day cells show up
 * to three tone-colored event dots (or a "+N" overflow); today is outlined and the
 * selected day fills primary. Bolder than v1. Same props, token-only.
 */
export const MonthViewV2 = React.forwardRef<HTMLDivElement, MonthViewV2Props>(function MonthViewV2(
  { month, events, selected, today, weekStartsOn = 0, density = 'full', onSelectDate, className, ...rest },
  ref
) {
  const cells = monthGrid(month, weekStartsOn);
  const labels = [...WEEKDAYS_SHORT.slice(weekStartsOn), ...WEEKDAYS_SHORT.slice(0, weekStartsOn)];
  const evs = events ?? [];
  const dotsFor = (d: Date): CalendarEvent[] => evs.filter((e) => sameDay(e.start, d));
  const maxDots = density === 'compact' ? 1 : 3;

  return (
    <div ref={ref} data-xen-month-view="" className={cn('flex flex-col gap-1', className)} {...rest}>
      <div role="row" className="grid grid-cols-7">
        {labels.map((l) => <div key={l} role="columnheader" className="py-1 text-center text-xs font-medium text-muted">{l}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`e-${i}`} />;
          const dayEvents = dotsFor(date);
          const isToday = today ? sameDay(date, today) : false;
          const isSelected = selected ? sameDay(date, selected) : false;
          return (
            <button
              key={date.getTime()}
              type="button"
              data-xen-day-cell=""
              aria-pressed={isSelected}
              aria-label={`${date.toDateString()}${isToday ? ', today' : ''}${dayEvents.length ? `, ${dayEvents.length} events` : ''}`}
              onClick={() => onSelectDate?.(date)}
              className={cn('flex h-14 flex-col items-center gap-1 rounded-md p-1 text-sm transition-colors', isSelected ? 'bg-primary text-on-primary' : isToday ? 'border border-primary text-on-surface hover:bg-neutral-50' : 'text-on-surface hover:bg-neutral-100')}
            >
              <span>{date.getDate()}</span>
              {dayEvents.length > 0 ? (
                <span className="flex items-center gap-0.5">
                  {dayEvents.slice(0, maxDots).map((e, j) => <span key={j} className={cn('h-1.5 w-1.5 rounded-full', isSelected ? 'bg-on-primary' : toneClasses(e.tone).accentBg)} aria-hidden />)}
                  {dayEvents.length > maxDots ? <span className={cn('text-[9px]', isSelected ? 'text-on-primary' : 'text-muted')}>+{dayEvents.length - maxDots}</span> : null}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
});
