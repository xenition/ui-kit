import * as React from 'react';
import { cn } from '../primitives/cn';
import { sameDay } from './format';
import { layoutEvents } from './layout-v4';
import { EventBlockV4 } from './EventBlockV4';
import { SKELETON_CLASS } from './internal/grid-v4';
import type { DayAgendaProps } from './DayAgenda';

export interface DayAgendaV4Props extends DayAgendaProps {
  /** Locale for the time gutter. Default: the browser's. */
  locale?: string;
  /** Label on the "now" divider. Default `'Now'`. */
  nowLabel?: string;
}

/**
 * **V4 day agenda** — the web twin of the native `DayAgendaV4`, same props as
 * {@link DayAgenda} plus `locale` and `nowLabel`.
 *
 * ## Four changes
 *
 * 1. **The list is ordered by the shared layout pass**, so an agenda and a
 *    time grid showing the same day agree.
 * 2. **"Now" is a labelled divider**, not an unnamed rule.
 * 3. **The skeleton is opaque.**
 * 4. **It is a real `<ol>`**, so a reader hears how many events the day holds.
 */
export const DayAgendaV4 = React.forwardRef<HTMLDivElement, DayAgendaV4Props>(
  function DayAgendaV4(
    {
      day,
      events = [],
      now,
      locale,
      nowLabel = 'Now',
      onSelectEvent,
      selectedEventId,
      loading = false,
      emptyLabel = 'Nothing scheduled.',
      variant = 'soft',
      className,
      ...rest
    },
    ref
  ) {
    if (loading) {
      return (
        <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
          {[70, 55, 80].map((w) => (
            <div key={w} className={cn('h-8', SKELETON_CLASS)} style={{ width: `${w}%` }} />
          ))}
        </div>
      );
    }

    const today = React.useMemo(() => events.filter((e) => sameDay(e.start, day)), [events, day]);
    const ordered = React.useMemo(() => layoutEvents(today), [today]);
    const nowMinutes =
      now != null && sameDay(now, day) ? now.getHours() * 60 + now.getMinutes() : null;

    if (ordered.length === 0) {
      return (
        <p ref={ref as React.Ref<HTMLDivElement>} className={cn('p-md text-sm text-muted-text', className)} {...rest}>
          {emptyLabel}
        </p>
      );
    }

    const timeFmt = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' });
    let nowDrawn = false;

    return (
      <div ref={ref} data-xen-day-agenda="" className={className} {...rest}>
        <ol className="flex flex-col gap-sm">
          {ordered.map((p) => {
            const showNow = nowMinutes != null && !nowDrawn && p.startMin >= nowMinutes;
            if (showNow) nowDrawn = true;

            return (
              <React.Fragment key={p.key}>
                {showNow ? (
                  <li aria-label={nowLabel} className="flex items-center gap-sm">
                    <span className="text-xs font-bold text-danger-text">{nowLabel}</span>
                    <span aria-hidden className="h-px flex-1 bg-danger" />
                  </li>
                ) : null}
                <li className="flex gap-sm">
                  <span
                    className="shrink-0 pt-0.5 text-xs text-muted-text [font-variant-numeric:tabular-nums]"
                    style={{ width: 'var(--xen-space-2xl)' }}
                  >
                    {p.event.allDay ? '' : timeFmt.format(p.event.start)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <EventBlockV4
                      event={p.event}
                      variant={variant}
                      selected={selectedEventId === p.event.id}
                      onPress={onSelectEvent}
                    />
                  </span>
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    );
  }
);
