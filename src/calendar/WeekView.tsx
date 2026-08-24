import * as React from 'react';
import { cn } from '../primitives/cn';
import { EventBlock } from './EventBlock';
import { hourLabel, minutesSinceMidnight, sameDay, weekDates, weekdayLabel } from './format';
import type { CalendarEvent } from './types';

export interface WeekViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Any date within the week to render (required — no import-time clock). */
  week: Date;
  /** Timed events; each is placed in its day column by minute offset. */
  events?: CalendarEvent[];
  /** The highlighted day column. */
  selected?: Date;
  /** "Today" instant — its column header is ringed + bolded (not color-alone). */
  today?: Date;
  /** 0 = week starts Sunday (default), 1 = Monday, … */
  weekStartsOn?: number;
  /** First hour shown (default 7). */
  startHour?: number;
  /** Last hour shown (default 21). */
  endHour?: number;
  /** Pixels per hour (default 48). */
  hourHeight?: number;
  /** Fires when a day column header is tapped. */
  onSelectDate?: (date: Date) => void;
  /** Fires when an event block is tapped. */
  onSelectEvent?: (event: CalendarEvent) => void;
  /** Currently selected event id. */
  selectedEventId?: string;
}

const GUTTER = 40;

/**
 * A 7-day week view: a weekday header (each column a tappable `<button>` that
 * selects the day) over a shared, scrollable hour grid where timed events sit in
 * their day column. Today's header carries a ring + bold weight and
 * `aria-current` (never color-alone). Colors resolve from theme tokens only.
 */
export const WeekView = React.forwardRef<HTMLDivElement, WeekViewProps>(function WeekView(
  {
    week,
    events = [],
    selected,
    today,
    weekStartsOn = 0,
    startHour = 7,
    endHour = 21,
    hourHeight = 48,
    onSelectDate,
    onSelectEvent,
    selectedEventId,
    className,
    ...rest
  },
  ref
) {
  const days = React.useMemo(() => weekDates(week, weekStartsOn), [week, weekStartsOn]);
  const from = Math.max(0, Math.min(23, startHour));
  const to = Math.max(from + 1, Math.min(24, endHour));
  const hours = Array.from({ length: to - from }, (_, i) => from + i);
  const gridTop = from * 60;
  const totalHeight = (to - from) * hourHeight;
  const yFor = (minutes: number): number => ((minutes - gridTop) / 60) * hourHeight;

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden rounded-[var(--xen-radius-md)] border border-border',
        className
      )}
      {...rest}
    >
      {/* Header row */}
      <div className="flex bg-surface">
        <div style={{ width: GUTTER }} />
        {days.map((date) => {
          const isSelected = selected != null && sameDay(selected, date);
          const isToday = today != null && sameDay(today, date);
          return (
            <button
              key={date.toISOString()}
              type="button"
              aria-label={`${weekdayLabel(date)} ${date.getDate()}${isToday ? ', today' : ''}`}
              aria-current={isToday ? 'date' : undefined}
              aria-pressed={isSelected || undefined}
              onClick={() => onSelectDate?.(date)}
              className={cn(
                'flex flex-1 flex-col items-center py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300',
                isSelected ? 'bg-primary' : ''
              )}
            >
              <span
                className={cn(
                  'text-xs font-semibold',
                  isSelected ? 'text-on-primary' : 'text-muted'
                )}
              >
                {weekdayLabel(date)}
              </span>
              <span
                className={cn(
                  'mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-sm',
                  isSelected ? 'text-on-primary' : 'text-on-surface',
                  isToday && !isSelected ? 'border border-primary' : '',
                  isToday || isSelected ? 'font-extrabold' : 'font-medium'
                )}
              >
                {date.getDate()}
              </span>
            </button>
          );
        })}
      </div>

      <div className="h-px bg-border" />

      {/* Scrollable body */}
      <div className="overflow-y-auto" style={{ maxHeight: totalHeight }}>
        <div className="flex" style={{ height: totalHeight }}>
          <div className="relative" style={{ width: GUTTER }}>
            {hours.map((h, i) => (
              <span
                key={h}
                className="absolute right-1 text-xs text-muted"
                style={{ top: i * hourHeight - 6 }}
              >
                {hourLabel(h)}
              </span>
            ))}
          </div>
          {days.map((date, dIdx) => {
            const dayEvents = events
              .filter((e) => !e.allDay && sameDay(e.start, date))
              .sort((a, b) => a.start.getTime() - b.start.getTime());
            return (
              <div
                key={date.toISOString()}
                className={cn('relative flex-1', dIdx === 0 ? '' : 'border-l border-border')}
              >
                {hours.map((h, i) => (
                  <div
                    key={h}
                    className="absolute left-0 right-0 h-px bg-border"
                    style={{ top: i * hourHeight }}
                  />
                ))}
                {dayEvents.map((event, i) => {
                  const startMin = minutesSinceMidnight(event.start);
                  const endMin = event.end ? minutesSinceMidnight(event.end) : startMin + 30;
                  const top = Math.max(0, yFor(startMin));
                  const height = Math.max(hourHeight / 3, yFor(endMin) - yFor(startMin));
                  return (
                    <div
                      key={event.id || String(i)}
                      className="absolute left-px right-px"
                      style={{ top, height }}
                    >
                      <EventBlock
                        event={event}
                        variant="soft"
                        size="sm"
                        height={height}
                        selected={event.id === selectedEventId}
                        onPress={onSelectEvent}
                        className="h-full"
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
