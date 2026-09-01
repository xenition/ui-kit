import * as React from 'react';
import { cn } from '../primitives/cn';
import { sameDay } from './format';
import { hourTitle, layoutEvents, minutesOf } from './layout-v4';
import { EventBlockV4 } from './EventBlockV4';
import { GRID_GUTTER, GRID_HOUR, GRID_MIN_BLOCK } from './internal/grid-v4';
import type { TimeGridProps } from './TimeGrid';

export interface TimeGridV4Props extends TimeGridProps {
  /** Locale for the hour gutter. Default: the browser's. */
  locale?: string;
  /** Accessible name for the current-time rule. Default `'Current time'`. */
  nowLabel?: string;
  /** Copy when the day has no timed events. Default `'Nothing scheduled.'`. */
  emptyLabel?: string;
}

/**
 * **V4 time grid** — the web twin of the native `TimeGridV4`, same props as
 * {@link TimeGrid} plus `locale`, `nowLabel` and `emptyLabel`.
 *
 * ## The change this component exists for
 *
 * **The overlap layout was inconsistent.** The base computed, per event, the
 * events overlapping *that* event and used the count as the column total — so
 * three events in one morning were laid out on three different column grids,
 * colliding and leaving gaps at the same time. `layoutEvents()` in
 * `calendar/layout-v4.ts` replaces it with cluster-then-pack; the worked
 * example is in that file.
 *
 * ## Three more
 *
 * 1. **The hour gutter is localized.**
 * 2. **"Now" is announced**, not just drawn.
 * 3. **The metrics are CSS expressions off the spacing scale**, so the hour
 *    rules and the blocks agree on a re-scaled seed.
 */
export const TimeGridV4 = React.forwardRef<HTMLDivElement, TimeGridV4Props>(
  function TimeGridV4(
    {
      day,
      events = [],
      startHour = 6,
      endHour = 22,
      hourHeight,
      now,
      locale,
      nowLabel = 'Current time',
      emptyLabel = 'Nothing scheduled.',
      onSelectEvent,
      selectedEventId,
      scroll = true,
      className,
      style,
      ...rest
    },
    ref
  ) {
    const from = Math.max(0, Math.min(23, startHour));
    const to = Math.max(from + 1, Math.min(24, endHour));
    const hours = Array.from({ length: to - from }, (_, i) => from + i);
    const gridTop = from * 60;
    const hourPx = hourHeight != null ? `${hourHeight}px` : GRID_HOUR;
    const y = (minutes: number): string => `calc(${(minutes - gridTop) / 60} * ${hourPx})`;

    const timed = React.useMemo(
      () => events.filter((e) => !e.allDay && sameDay(e.start, day)),
      [events, day]
    );
    const positioned = React.useMemo(() => layoutEvents(timed), [timed]);

    const nowMinutes = now != null && sameDay(now, day) ? minutesOf(now) : null;
    const showNow = nowMinutes != null && nowMinutes >= gridTop && nowMinutes <= to * 60;

    return (
      <div
        ref={ref}
        data-xen-time-grid=""
        className={cn(scroll && 'overflow-y-auto', className)}
        style={style}
        {...rest}
      >
        <div className="flex" style={{ height: `calc(${to - from} * ${hourPx})` }}>
          <div className="relative shrink-0" style={{ width: GRID_GUTTER }}>
            {hours.map((h, i) => (
              <span
                key={h}
                className="absolute right-xs -translate-y-1/2 text-xs text-muted-text [font-variant-numeric:tabular-nums]"
                style={{ top: `calc(${i} * ${hourPx})` }}
              >
                {hourTitle(h, locale)}
              </span>
            ))}
          </div>

          <div className="relative flex-1">
            {hours.map((h, i) => (
              <span
                key={h}
                aria-hidden
                className="absolute inset-x-0 h-px bg-border"
                style={{ top: `calc(${i} * ${hourPx})` }}
              />
            ))}

            {positioned.length === 0 ? (
              <p className="p-md text-sm text-muted-text">{emptyLabel}</p>
            ) : null}

            {positioned.map((p) => (
              <div
                key={p.key}
                className="absolute pr-0.5"
                style={{
                  top: y(p.startMin),
                  height: `max(${GRID_MIN_BLOCK}, calc(${y(p.endMin)} - ${y(p.startMin)}))`,
                  // Every member of a cluster shares its column count, so the
                  // blocks in one overlap group finally line up.
                  left: `${(100 / p.columns) * p.column}%`,
                  width: `${100 / p.columns}%`,
                }}
              >
                <EventBlockV4
                  event={p.event}
                  size="sm"
                  selected={selectedEventId === p.event.id}
                  onPress={onSelectEvent}
                  className="h-full"
                />
              </div>
            ))}

            {showNow ? (
              <span
                role="separator"
                aria-label={nowLabel}
                className="absolute inset-x-0 h-0.5 bg-danger"
                style={{ top: y(nowMinutes as number) }}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
