import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { EventBlock, type EventBlockVariant } from './EventBlock';
import { clockLabel, sameDay } from './format';
import type { CalendarEvent } from './types';

export interface DayAgendaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** The day being shown (used to filter and to compare against `now`). */
  day: Date;
  /** Events for the day; the component sorts + filters to `day` defensively. */
  events?: CalendarEvent[];
  /** Optional "now" instant — draws a subtle current-time marker on the day. */
  now?: Date;
  /** Fires when an event row is tapped. */
  onSelectEvent?: (event: CalendarEvent) => void;
  /** Currently selected event id (announced via a11y). */
  selectedEventId?: string;
  /** Renders skeleton rows instead of content. */
  loading?: boolean;
  /** Message shown when there are no events. */
  emptyLabel?: string;
  /** Block variant forwarded to each row. */
  variant?: EventBlockVariant;
}

/**
 * A single-day agenda — a vertical, time-labelled list of the day's events.
 * Events are filtered to `day` and sorted by start; all-day items float to the
 * top. Renders an explicit `EmptyState` and a loading skeleton, and (when `now`
 * falls on `day`) a "Now" divider. Colors come from theme tokens only.
 */
export const DayAgenda = React.forwardRef<HTMLDivElement, DayAgendaProps>(function DayAgenda(
  {
    day,
    events = [],
    now,
    onSelectEvent,
    selectedEventId,
    loading = false,
    emptyLabel = 'No events scheduled',
    variant = 'soft',
    className,
    ...rest
  },
  ref
) {
  const dayEvents = React.useMemo(
    () =>
      events
        .filter((e) => sameDay(e.start, day))
        .sort((a, b) => {
          if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
          return a.start.getTime() - b.start.getTime();
        }),
    [events, day]
  );

  const showNow = now != null && sameDay(now, day);

  if (loading) {
    return (
      <div ref={ref} aria-busy="true" aria-label="Loading agenda" className={className} {...rest}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="mb-2 h-10 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100"
          />
        ))}
      </div>
    );
  }

  if (dayEvents.length === 0) {
    return (
      <div ref={ref} className={className} {...rest}>
        <EmptyState title={emptyLabel} />
      </div>
    );
  }

  return (
    <div ref={ref} role="list" className={className} {...rest}>
      {showNow ? (
        <div className="mb-2 flex items-center">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-danger" />
          <span className="ml-1 text-xs font-bold text-danger">
            {`Now · ${clockLabel(now as Date)}`}
          </span>
        </div>
      ) : null}

      {dayEvents.map((event) => (
        <div key={event.id} role="listitem" className="mb-2 flex">
          <div className="w-12 shrink-0 pt-1">
            <span className="text-xs font-semibold text-muted">
              {event.allDay ? 'All day' : clockLabel(event.start)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <EventBlock
              event={event}
              variant={variant}
              selected={event.id === selectedEventId}
              onPress={onSelectEvent}
            />
          </div>
        </div>
      ))}
    </div>
  );
});
