import * as React from 'react';
import { cn } from '../primitives/cn';

/** Kind of match event — drives the glyph + accessible prefix. */
export type MatchEventKind = 'goal' | 'own-goal' | 'penalty' | 'yellow' | 'red' | 'sub' | 'var';

/** A single timeline event, attributed to a side. */
export interface MatchEvent {
  /** Stable key. */
  id: string;
  /** Clock label (e.g. `23'`, `90+4'`). */
  minute: string;
  /** Event kind. */
  kind: MatchEventKind;
  /** Which team the event belongs to. */
  side: 'home' | 'away';
  /** Primary label (e.g. scorer). */
  label: string;
  /** Secondary detail (e.g. assist, sub off). */
  detail?: string;
}

export interface MatchTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Home team name (left rail). */
  homeLabel?: string;
  /** Away team name (right rail). */
  awayLabel?: string;
  /** Events, chronological (earliest first recommended). */
  events: MatchEvent[];
  /** Empty-state label. */
  emptyLabel?: string;
}

const EVENT_META: Record<MatchEventKind, { glyph: string; label: string }> = {
  goal: { glyph: '⚽', label: 'Goal' },
  'own-goal': { glyph: '🥅', label: 'Own goal' },
  penalty: { glyph: '🅿', label: 'Penalty' },
  yellow: { glyph: '🟨', label: 'Yellow card' },
  red: { glyph: '🟥', label: 'Red card' },
  sub: { glyph: '🔁', label: 'Substitution' },
  var: { glyph: '📺', label: 'VAR' },
};

/**
 * A match event timeline — a vertical spine with a minute marker per event and
 * the event pushed to the home (left) or away (right) side. Each event carries
 * a glyph and an accessible kind prefix, so goals, cards, and subs are legible
 * without relying on color. Empty state built in. Presentational; pass shaped
 * `events`. Token-only colors; the marker is a plain `div`.
 */
export const MatchTimeline = React.forwardRef<HTMLDivElement, MatchTimelineProps>(
  function MatchTimeline(
    {
      homeLabel = 'Home',
      awayLabel = 'Away',
      events,
      emptyLabel = 'No events yet',
      className,
      ...rest
    },
    ref
  ) {
    const shell = cn(
      'flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 text-on-surface',
      className
    );

    const header = (
      <div className="flex justify-between">
        <span className="flex-1 truncate text-sm font-bold text-primary">{homeLabel}</span>
        <span className="flex-1 truncate text-right text-sm font-bold text-accent">
          {awayLabel}
        </span>
      </div>
    );

    if (events.length === 0) {
      return (
        <div ref={ref} className={shell} {...rest}>
          {header}
          <p className="py-3 text-center text-sm text-muted">{emptyLabel}</p>
        </div>
      );
    }

    const cell = (e: MatchEvent, mine: boolean): React.ReactElement => {
      const meta = EVENT_META[e.kind] ?? EVENT_META.goal;
      if (!mine) return <div className="flex-1" />;
      const home = e.side === 'home';
      return (
        <div className={cn('flex flex-1', home ? 'justify-end' : 'justify-start')}>
          <div className={cn('flex items-center gap-1', home ? 'flex-row' : 'flex-row-reverse')}>
            <div className={cn('flex min-w-0 flex-col', home ? 'items-end' : 'items-start')}>
              <span className="truncate text-sm font-semibold text-on-surface">{e.label}</span>
              {e.detail ? (
                <span className="truncate text-xs text-muted">{e.detail}</span>
              ) : null}
            </div>
            <span aria-hidden="true" className="text-base leading-none">
              {meta.glyph}
            </span>
          </div>
        </div>
      );
    };

    return (
      <div ref={ref} role="list" className={shell} {...rest}>
        {header}
        {events.map((e) => {
          const meta = EVENT_META[e.kind] ?? EVENT_META.goal;
          return (
            <div
              key={e.id}
              role="listitem"
              aria-label={`${e.minute}, ${meta.label}, ${
                e.side === 'home' ? homeLabel : awayLabel
              }: ${e.label}${e.detail ? `, ${e.detail}` : ''}`}
              className="flex items-center gap-2"
            >
              {cell(e, e.side === 'home')}
              <div className="flex min-w-[44px] justify-center">
                <span className="rounded-full bg-neutral-100 px-1 py-px text-xs font-bold text-on-surface">
                  {e.minute}
                </span>
              </div>
              {cell(e, e.side === 'away')}
            </div>
          );
        })}
      </div>
    );
  }
);
