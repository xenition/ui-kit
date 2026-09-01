import * as React from 'react';
import { cn } from '../primitives/cn';
import { sameDay } from './format';
import { EventBlockV4 } from './EventBlockV4';
import type { AllDayRowProps } from './AllDayRow';

export interface AllDayRowV4Props extends AllDayRowProps {
  /** Copy when the day has no all-day events and the row is shown. */
  emptyLabel?: string;
}

/**
 * **V4 all-day row** — the web twin of the native `AllDayRowV4`, same props as
 * {@link AllDayRow} plus `emptyLabel`.
 *
 * ## Three changes
 *
 * 1. **The label is a caption in `muted-text`**, and the row announces how
 *    many events it holds.
 * 2. **The empty case says so** when `hideWhenEmpty` is off — the base
 *    rendered an empty labelled strip, which reads as a loading state.
 * 3. **The scroll variant no longer clips its last chip**, because the blocks
 *    are laid out with the row's own gap rather than a margin on each.
 */
export const AllDayRowV4 = React.forwardRef<HTMLDivElement, AllDayRowV4Props>(
  function AllDayRowV4(
    {
      day,
      events = [],
      label = 'All day',
      layout = 'scroll',
      emptyLabel = 'None',
      onSelectEvent,
      selectedEventId,
      hideWhenEmpty = false,
      className,
      ...rest
    },
    ref
  ) {
    const allDay = React.useMemo(
      () => events.filter((e) => e.allDay && sameDay(e.start, day)),
      [events, day]
    );

    if (allDay.length === 0 && hideWhenEmpty) return null;

    return (
      <div
        ref={ref}
        data-xen-all-day-row={layout}
        aria-label={allDay.length === 0 ? `${label}, ${emptyLabel}` : undefined}
        className={cn('flex items-center gap-sm', className)}
        {...rest}
      >
        <span className="shrink-0 text-xs font-semibold text-muted-text">{label}</span>

        {allDay.length === 0 ? (
          <span className="text-xs text-muted-text">{emptyLabel}</span>
        ) : (
          <div
            className={cn(
              'min-w-0 flex-1 gap-xs',
              layout === 'scroll'
                ? 'flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                : 'flex flex-col'
            )}
          >
            {allDay.map((event) => (
              <EventBlockV4
                key={event.id}
                event={event}
                size="sm"
                variant="soft"
                selected={selectedEventId === event.id}
                onPress={onSelectEvent}
                className={layout === 'scroll' ? 'shrink-0' : undefined}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
