import * as React from 'react';
import { cn } from '../primitives/cn';
import { EventBlock } from './EventBlock';
import { hourLabel, minutesSinceMidnight, sameDay } from './format';
import type { CalendarEvent } from './types';

export interface TimeGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** The day being laid out (used to filter events + place the `now` line). */
  day: Date;
  /** Timed events for the day (all-day events are ignored — use `AllDayRow`). */
  events?: CalendarEvent[];
  /** First hour shown (0–23, default 6). */
  startHour?: number;
  /** Last hour shown (exclusive-ish, default 22). Clamped above `startHour`. */
  endHour?: number;
  /** Pixels per hour (default 56). */
  hourHeight?: number;
  /** "Now" instant; draws a marker line when it falls on `day`. */
  now?: Date;
  /** Fires when an event block is tapped. */
  onSelectEvent?: (event: CalendarEvent) => void;
  /** Currently selected event id. */
  selectedEventId?: string;
  /** Wrap the grid in its own vertical scroll (default true). */
  scroll?: boolean;
}

const GUTTER = 48;

/**
 * A vertical time grid — hour rules with timed events positioned by their
 * minute offset and sized by duration. Overlapping events split the available
 * width evenly so neither is hidden. A `now` marker (danger-toned line + dot)
 * lands only when `now` is on `day`. Every color is a theme token.
 */
export const TimeGrid = React.forwardRef<HTMLDivElement, TimeGridProps>(function TimeGrid(
  {
    day,
    events = [],
    startHour = 6,
    endHour = 22,
    hourHeight = 56,
    now,
    onSelectEvent,
    selectedEventId,
    scroll = true,
    className,
    ...rest
  },
  ref
) {
  const from = Math.max(0, Math.min(23, startHour));
  const to = Math.max(from + 1, Math.min(24, endHour));
  const hours = Array.from({ length: to - from }, (_, i) => from + i);
  const gridTop = from * 60;
  const totalHeight = (to - from) * hourHeight;
  const yFor = (minutes: number): number => ((minutes - gridTop) / 60) * hourHeight;

  const timed = React.useMemo(
    () =>
      events
        .filter((e) => !e.allDay && sameDay(e.start, day))
        .sort((a, b) => a.start.getTime() - b.start.getTime()),
    [events, day]
  );

  // Naive overlap grouping: events sharing any minute go in the same column set.
  const positioned = timed.map((event, index) => {
    const startMin = minutesSinceMidnight(event.start);
    const endMin = event.end ? minutesSinceMidnight(event.end) : startMin + 30;
    const overlaps = timed.filter((o) => {
      const oStart = minutesSinceMidnight(o.start);
      const oEnd = o.end ? minutesSinceMidnight(o.end) : oStart + 30;
      return oStart < endMin && startMin < oEnd;
    });
    const col = overlaps.findIndex((o) => o.id === event.id);
    return {
      event,
      key: event.id || String(index),
      top: Math.max(0, yFor(startMin)),
      height: Math.max(hourHeight / 3, yFor(endMin) - yFor(startMin)),
      widthPct: 100 / Math.max(1, overlaps.length),
      leftPct: (100 / Math.max(1, overlaps.length)) * Math.max(0, col),
    };
  });

  const nowMinutes = now != null && sameDay(now, day) ? minutesSinceMidnight(now) : null;
  const showNow = nowMinutes != null && nowMinutes >= gridTop && nowMinutes <= to * 60;

  const body = (
    <div className="flex" style={{ height: totalHeight }}>
      {/* Hour gutter + labels. */}
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
      <div className="relative flex-1">
        {hours.map((h, i) => (
          <div
            key={h}
            className="absolute left-0 right-0 h-px bg-border"
            style={{ top: i * hourHeight }}
          />
        ))}

        {positioned.map((p) => (
          <div
            key={p.key}
            className="absolute pl-1 pr-0.5"
            style={{ top: p.top, height: p.height, left: `${p.leftPct}%`, width: `${p.widthPct}%` }}
          >
            <EventBlock
              event={p.event}
              variant="soft"
              size="sm"
              height={p.height}
              selected={p.event.id === selectedEventId}
              onPress={onSelectEvent}
              className="h-full"
            />
          </div>
        ))}

        {showNow ? (
          <div
            role="img"
            aria-label="Current time"
            className="absolute left-0 right-0 flex items-center"
            style={{ top: yFor(nowMinutes as number) }}
          >
            <span className="h-2 w-2 rounded-full bg-danger" />
            <span className="h-0.5 flex-1 bg-danger" />
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn(scroll ? 'overflow-y-auto' : '', className)}
      {...rest}
    >
      {body}
    </div>
  );
});
