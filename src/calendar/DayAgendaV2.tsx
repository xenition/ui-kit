import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { clockLabel, sameDay, toneClasses } from './format';
import type { CalendarEvent } from './types';
import type { DayAgendaProps } from './DayAgenda';

/** Same public contract as {@link DayAgenda} — a drop-in alternate design. */
export type DayAgendaV2Props = DayAgendaProps;

/**
 * DayAgenda, redesigned (v2): a **timeline agenda**. Each event sits to the right of
 * a time gutter with a tone-colored node and a connector rail; the event card shows
 * title + location, and the selected row is ringed. Distinct from v1. Same props,
 * token-only.
 */
export const DayAgendaV2 = React.forwardRef<HTMLDivElement, DayAgendaV2Props>(function DayAgendaV2(
  { day, events, now, onSelectEvent, selectedEventId, loading = false, emptyLabel = 'No events', variant, className, ...rest },
  ref
) {
  void now;
  void variant;
  if (loading) {
    return <div ref={ref} data-xen-day-agenda="" aria-busy="true" className={cn('space-y-2', className)} {...rest}>{[0, 1, 2].map((i) => <div key={i} className="h-12 animate-pulse rounded-md bg-neutral-100" />)}</div>;
  }
  const list = (events ?? []).filter((e) => sameDay(e.start, day)).sort((a, b) => a.start.getTime() - b.start.getTime());
  if (list.length === 0) {
    return <EmptyState ref={ref} icon={<span className="text-3xl">📅</span>} title={emptyLabel} className={className} {...rest} />;
  }

  return (
    <div ref={ref} data-xen-day-agenda="" className={cn('flex flex-col', className)} {...rest}>
      {list.map((e: CalendarEvent, i) => {
        const t = toneClasses(e.tone);
        const selected = selectedEventId === e.id;
        const interactive = typeof onSelectEvent === 'function';
        return (
          <div key={e.id} className="flex gap-3">
            <div className="flex w-14 shrink-0 flex-col items-center pt-1">
              <span className="text-xs font-semibold text-muted">{clockLabel(e.start)}</span>
              <span className={cn('mt-1 h-2.5 w-2.5 rounded-full', t.accentBg)} aria-hidden />
              {i < list.length - 1 ? <span className="mt-1 w-px flex-1 bg-border" aria-hidden /> : null}
            </div>
            <button
              type="button"
              disabled={!interactive}
              aria-pressed={selected}
              aria-label={`${e.title}${selected ? ', selected' : ''}`}
              onClick={interactive ? () => onSelectEvent?.(e) : undefined}
              className={cn('mb-3 flex flex-1 flex-col rounded-lg bg-surface p-3 text-left shadow-sm', selected && 'ring-2 ring-primary', interactive && 'transition-colors hover:bg-neutral-50')}
            >
              <span className="truncate text-sm font-semibold text-on-surface">{e.title}</span>
              {(e.location || e.subtitle) ? <span className="truncate text-xs text-muted">{[e.location, e.subtitle].filter(Boolean).join(' · ')}</span> : null}
            </button>
          </div>
        );
      })}
    </div>
  );
});
