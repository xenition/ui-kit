import * as React from 'react';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { sameDay, weekDates } from './format';
import { hourTitle, layoutEvents, minutesOf, weekdayNames } from './layout-v4';
import { EventBlockV4 } from './EventBlockV4';
import { GRID_GUTTER, GRID_HOUR, GRID_MIN_BLOCK } from './internal/grid-v4';
import type { WeekViewProps } from './WeekView';

export interface WeekViewV4Props extends WeekViewProps {
  /** Locale for the day headers and hour gutter. Default: the browser's. */
  locale?: string;
  /** Accessible name for the current-time rule. Default `'Current time'`. */
  nowLabel?: string;
  /** Appended to today's column header. Default `'today'`. */
  todayLabel?: string;
  /** The instant the "now" rule marks. Omit to hide it. */
  now?: Date;
}

/**
 * **V4 week view** — the web twin of the native `WeekViewV4`, same props as
 * {@link WeekView} plus `locale`, `now`, `nowLabel` and `todayLabel`.
 *
 * ## Four changes
 *
 * 1. **Each day column lays out with the shared clustering pass**, so
 *    overlapping events in one column line up — the base carried the same
 *    inconsistent per-event overlap count `TimeGrid` did.
 * 2. **The day headers are localized and named.**
 * 3. **"Now" is drawn and announced**, and only on today's column — the base
 *    had no now rule in the week view at all.
 * 4. **Column headers clear 44.**
 */
export const WeekViewV4 = React.forwardRef<HTMLDivElement, WeekViewV4Props>(
  function WeekViewV4(
    {
      week,
      events = [],
      selected,
      today,
      weekStartsOn = 0,
      startHour = 6,
      endHour = 22,
      hourHeight,
      locale,
      now,
      nowLabel = 'Current time',
      todayLabel = 'today',
      onSelectDate,
      onSelectEvent,
      selectedEventId,
      className,
      ...rest
    },
    ref
  ) {
    const days = React.useMemo(() => weekDates(week, weekStartsOn), [week, weekStartsOn]);
    const headers = React.useMemo(
      () => weekdayNames(weekStartsOn, { locale, width: 'short' }),
      [weekStartsOn, locale]
    );
    const longDate = React.useMemo(
      () => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }),
      [locale]
    );

    const from = Math.max(0, Math.min(23, startHour));
    const to = Math.max(from + 1, Math.min(24, endHour));
    const hours = Array.from({ length: to - from }, (_, i) => from + i);
    const gridTop = from * 60;
    const hourPx = hourHeight != null ? `${hourHeight}px` : GRID_HOUR;
    const y = (minutes: number): string => `calc(${(minutes - gridTop) / 60} * ${hourPx})`;

    const nowMinutes = now != null ? minutesOf(now) : null;
    const showNow = nowMinutes != null && nowMinutes >= gridTop && nowMinutes <= to * 60;

    return (
      <div ref={ref} data-xen-week-view="" className={className} {...rest}>
        <div className="flex">
          <div className="shrink-0" style={{ width: GRID_GUTTER }} />
          {days.map((date, i) => {
            const isToday = today != null && sameDay(today, date);
            const isSelected = selected != null && sameDay(selected, date);
            return (
              <button
                key={i}
                type="button"
                disabled={!onSelectDate}
                aria-label={[longDate.format(date), isToday ? todayLabel : null]
                  .filter(Boolean)
                  .join(', ')}
                aria-pressed={isSelected}
                onClick={() => onSelectDate?.(date)}
                data-xen-v4-chrome="on-surface"
                className={cn(
                  'flex flex-1 flex-col items-center justify-center gap-0.5 rounded-[var(--xen-radius-md)]',
                  MIN_TAP_CLASS,
                  isSelected && 'bg-selected'
                )}
              >
                <span className="text-xs text-muted-text">{headers[i]}</span>
                <span
                  className={cn(
                    'text-sm [font-variant-numeric:tabular-nums]',
                    isToday ? 'font-bold text-primary-text' : 'text-on-surface'
                  )}
                >
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>

        <div className="overflow-y-auto">
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

            {days.map((date, dayIndex) => {
              const timed = events.filter((e) => !e.allDay && sameDay(e.start, date));
              const positioned = layoutEvents(timed);
              const isToday = today != null && sameDay(today, date);

              return (
                <div key={dayIndex} className="relative flex-1 border-l border-border">
                  {hours.map((h, i) => (
                    <span
                      key={h}
                      aria-hidden
                      className="absolute inset-x-0 h-px bg-border"
                      style={{ top: `calc(${i} * ${hourPx})` }}
                    />
                  ))}

                  {positioned.map((p) => (
                    <div
                      key={p.key}
                      className="absolute pr-px"
                      style={{
                        top: y(p.startMin),
                        height: `max(${GRID_MIN_BLOCK}, calc(${y(p.endMin)} - ${y(p.startMin)}))`,
                        left: `${(100 / p.columns) * p.column}%`,
                        width: `${100 / p.columns}%`,
                      }}
                    >
                      <EventBlockV4
                        event={p.event}
                        size="sm"
                        showTime={false}
                        selected={selectedEventId === p.event.id}
                        onPress={onSelectEvent}
                        className="h-full"
                      />
                    </div>
                  ))}

                  {/* Only today's column carries the now rule. */}
                  {showNow && isToday ? (
                    <span
                      role="separator"
                      aria-label={nowLabel}
                      className="absolute inset-x-0 h-0.5 bg-danger"
                      style={{ top: y(nowMinutes as number) }}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);
