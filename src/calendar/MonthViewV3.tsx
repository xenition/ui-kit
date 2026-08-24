import * as React from 'react';
import { cn } from '../primitives/cn';
import { monthGrid, sameDay, toneClasses, WEEKDAYS_NARROW } from './format';
import type { MonthViewProps } from './MonthView';

/** Same public contract as {@link MonthView} — a drop-in alternate design. */
export type MonthViewV3Props = MonthViewProps;

/**
 * MonthView, redesigned (v3): a **mini month**. Tiny square cells with a single
 * event dot, narrow weekday initials, an outlined today and a filled selected day —
 * a compact date picker for a sidebar. The opposite of v2's spacious grid. Same
 * props, token-only.
 */
export const MonthViewV3 = React.forwardRef<HTMLDivElement, MonthViewV3Props>(function MonthViewV3(
  { month, events, selected, today, weekStartsOn = 0, density, onSelectDate, className, ...rest },
  ref
) {
  void density;
  const cells = monthGrid(month, weekStartsOn);
  const labels = [...WEEKDAYS_NARROW.slice(weekStartsOn), ...WEEKDAYS_NARROW.slice(0, weekStartsOn)];
  const evs = events ?? [];
  const firstEvent = (d: Date) => evs.find((e) => sameDay(e.start, d));

  return (
    <div ref={ref} data-xen-month-view="" className={cn('inline-flex flex-col gap-0.5', className)} {...rest}>
      <div role="row" className="grid grid-cols-7">
        {labels.map((l, i) => <div key={`${l}-${i}`} role="columnheader" className="text-center text-[10px] font-medium text-muted">{l}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((date, i) => {
          if (!date) return <div key={`e-${i}`} className="h-8 w-8" />;
          const ev = firstEvent(date);
          const isToday = today ? sameDay(date, today) : false;
          const isSelected = selected ? sameDay(date, selected) : false;
          return (
            <button
              key={date.getTime()}
              type="button"
              data-xen-day-cell=""
              aria-pressed={isSelected}
              aria-label={`${date.toDateString()}${isToday ? ', today' : ''}${ev ? ', has events' : ''}`}
              onClick={() => onSelectDate?.(date)}
              className={cn('relative flex h-8 w-8 items-center justify-center rounded-full text-xs transition-colors', isSelected ? 'bg-primary text-on-primary' : isToday ? 'ring-1 ring-primary text-on-surface hover:bg-neutral-100' : 'text-on-surface hover:bg-neutral-100')}
            >
              {date.getDate()}
              {ev ? <span className={cn('absolute bottom-1 h-1 w-1 rounded-full', isSelected ? 'bg-on-primary' : toneClasses(ev.tone).accentBg)} aria-hidden /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
});
