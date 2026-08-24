import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { clockLabel, sameDay, toneClasses } from './format';
import type { CalendarEvent } from './types';
import type { DayAgendaProps } from './DayAgenda';

/** Same public contract as {@link DayAgenda} — a drop-in alternate design. */
export type DayAgendaV3Props = DayAgendaProps;

/**
 * DayAgenda, redesigned (v3): a **dense schedule list**. Each event is one hairline
 * row — start time, a tone dot, the title, and the location folded in — for a tight
 * day view. The opposite of v2's timeline. Same props, token-only.
 */
export const DayAgendaV3 = React.forwardRef<HTMLDivElement, DayAgendaV3Props>(function DayAgendaV3(
  { day, events, now, onSelectEvent, selectedEventId, loading = false, emptyLabel = 'No events', variant, className, ...rest },
  ref
) {
  void now;
  void variant;
  if (loading) {
    return <div ref={ref} data-xen-day-agenda="" aria-busy="true" className={cn('space-y-1', className)} {...rest}>{[0, 1, 2].map((i) => <div key={i} className="h-7 animate-pulse rounded bg-neutral-100" />)}</div>;
  }
  const list = (events ?? []).filter((e) => sameDay(e.start, day)).sort((a, b) => a.start.getTime() - b.start.getTime());
  if (list.length === 0) {
    return <EmptyState ref={ref} icon={<span className="text-3xl">📅</span>} title={emptyLabel} className={className} {...rest} />;
  }

  return (
    <div ref={ref} data-xen-day-agenda="" className={cn('flex flex-col', className)} {...rest}>
      {list.map((e: CalendarEvent) => {
        const t = toneClasses(e.tone);
        const selected = selectedEventId === e.id;
        const interactive = typeof onSelectEvent === 'function';
        return (
          <button
            key={e.id}
            type="button"
            disabled={!interactive}
            aria-pressed={selected}
            aria-label={`${e.title}${selected ? ', selected' : ''}`}
            onClick={interactive ? () => onSelectEvent?.(e) : undefined}
            className={cn('flex items-center gap-2.5 border-b border-border py-2 text-left', selected && 'bg-primary/5', interactive && 'transition-colors hover:bg-neutral-50')}
          >
            <span className="w-12 shrink-0 text-xs tabular-nums text-muted">{e.allDay ? 'All day' : clockLabel(e.start)}</span>
            <span className={cn('h-2 w-2 shrink-0 rounded-full', t.accentBg)} aria-hidden />
            <span className="min-w-0 flex-1 truncate text-sm text-on-surface">{e.title}</span>
            {e.location ? <span className="shrink-0 truncate text-xs text-muted">{e.location}</span> : null}
          </button>
        );
      })}
    </div>
  );
});
