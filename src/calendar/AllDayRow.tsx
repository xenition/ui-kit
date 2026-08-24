import * as React from 'react';
import { cn } from '../primitives/cn';
import { EventBlock } from './EventBlock';
import { sameDay } from './format';
import type { CalendarEvent } from './types';

export interface AllDayRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** The day whose all-day events are shown. */
  day: Date;
  /** Events; filtered to `allDay` items that fall on `day`. */
  events?: CalendarEvent[];
  /** Leading label (default "All day"). */
  label?: string;
  /** Layout: wrap chips (`stack`) or scroll horizontally (`scroll`, default). */
  layout?: 'scroll' | 'stack';
  /** Fires when an all-day chip is tapped. */
  onSelectEvent?: (event: CalendarEvent) => void;
  /** Currently selected event id. */
  selectedEventId?: string;
  /**
   * Hide the row entirely when there are no all-day events (default false — an
   * explicit empty hint is shown instead).
   */
  hideWhenEmpty?: boolean;
}

/**
 * The all-day band that sits above a day/week time grid — a labelled strip of
 * full-day event chips. Distinct from the timed `TimeGrid`: these events have no
 * clock position. Renders an empty hint unless `hideWhenEmpty`. Token colors
 * only.
 */
export const AllDayRow = React.forwardRef<HTMLDivElement, AllDayRowProps>(function AllDayRow(
  {
    day,
    events = [],
    label = 'All day',
    layout = 'scroll',
    onSelectEvent,
    selectedEventId,
    hideWhenEmpty = false,
    className,
    ...rest
  },
  ref
) {
  const allDay = events.filter((e) => e.allDay && sameDay(e.start, day));

  if (allDay.length === 0 && hideWhenEmpty) return null;

  const chips = allDay.map((event) => (
    <div key={event.id} className="min-w-[7rem] shrink-0">
      <EventBlock
        event={event}
        variant="solid"
        size="sm"
        selected={event.id === selectedEventId}
        onPress={onSelectEvent}
      />
    </div>
  ));

  return (
    <div
      ref={ref}
      className={cn('flex items-center border-b border-border py-1', className)}
      {...rest}
    >
      <div className="w-14 shrink-0">
        <span className="text-xs font-semibold text-muted">{label}</span>
      </div>
      <div className="min-w-0 flex-1">
        {allDay.length === 0 ? (
          <span className="text-xs text-muted">—</span>
        ) : layout === 'stack' ? (
          <div className="flex flex-wrap gap-1">{chips}</div>
        ) : (
          <div className="flex gap-1 overflow-x-auto">{chips}</div>
        )}
      </div>
    </div>
  );
});
