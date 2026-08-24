import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps } from './interactive';

/** Lifecycle of a ticker item. */
export type TickerStatus = 'live' | 'final' | 'upcoming';

/** One match tile in the ticker. */
export interface TickerMatch {
  /** Stable key. */
  id: string;
  /** Home short name / code. */
  home: string;
  /** Away short name / code. */
  away: string;
  /** Home score (upcoming → omit). */
  homeScore?: number;
  /** Away score (upcoming → omit). */
  awayScore?: number;
  /** Lifecycle. Default `upcoming`. */
  status?: TickerStatus;
  /** Clock / kickoff label. */
  clock?: string;
}

export interface ScoreTickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Match tiles rendered in a horizontal strip. */
  matches: TickerMatch[];
  /** Fires with the tapped match (web parity of native `onSelect`; the DOM
   * `onSelect` handler is intentionally `Omit`ted so it never collides). */
  onSelect?: (match: TickerMatch) => void;
  /** Loading skeleton tile count; when set, matches are ignored. */
  loadingTiles?: number;
  /** Empty-state label. */
  emptyLabel?: string;
}

const STATUS_META: Record<TickerStatus, { label: string; live: boolean }> = {
  live: { label: 'LIVE', live: true },
  final: { label: 'FT', live: false },
  upcoming: { label: 'SOON', live: false },
};

/**
 * A horizontally-scrolling scoreboard strip — compact per-match tiles for a
 * top-of-screen ticker. Each tile shows both codes, the scoreline, and a status
 * marked by text (plus a `danger` dot for live, never color alone). Handles
 * empty and loading states. Activated via `onSelect`. Token-only colors.
 */
export const ScoreTicker = React.forwardRef<HTMLDivElement, ScoreTickerProps>(
  function ScoreTicker(
    { matches, onSelect, loadingTiles, emptyLabel = 'No matches', className, ...rest },
    ref
  ) {
    const strip = 'flex gap-2 overflow-x-auto px-1 py-1';

    if (loadingTiles && loadingTiles > 0) {
      return (
        <div ref={ref} aria-busy="true" className={cn(strip, className)} {...rest}>
          {Array.from({ length: loadingTiles }).map((_, i) => (
            <div key={i} className="h-16 w-32 shrink-0 rounded-md bg-neutral-100" />
          ))}
        </div>
      );
    }

    if (matches.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            'rounded-md border border-border bg-surface px-4 py-3 text-center text-sm text-muted',
            className
          )}
          {...rest}
        >
          {emptyLabel}
        </div>
      );
    }

    const line = (name: string, score: number | undefined) => (
      <div className="flex justify-between gap-2">
        <span className="truncate text-sm font-semibold text-on-surface">{name}</span>
        <span
          className={cn(
            'text-sm font-bold',
            score === undefined ? 'text-muted' : 'text-on-surface'
          )}
        >
          {score === undefined ? '–' : score}
        </span>
      </div>
    );

    return (
      <div ref={ref} className={cn(strip, className)} {...rest}>
        {matches.map((m) => {
          const status = m.status ?? 'upcoming';
          const sm = STATUS_META[status] ?? STATUS_META.upcoming;
          const hasScore = m.homeScore !== undefined && m.awayScore !== undefined;
          const a11y = `${m.home} versus ${m.away}, ${sm.label}${
            hasScore ? `, ${m.homeScore} ${m.awayScore}` : ''
          }`;
          const interactive = tappableProps(
            onSelect ? () => onSelect(m) : undefined,
            a11y
          );
          return (
            <div
              key={m.id}
              className={cn(
                'w-32 shrink-0 rounded-md border border-border bg-surface p-2',
                onSelect &&
                  'cursor-pointer outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary-300'
              )}
              {...(onSelect ? {} : { 'aria-label': a11y })}
              {...interactive}
            >
              <div className="flex items-center gap-1">
                {sm.live ? (
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-danger" />
                ) : null}
                <span
                  className={cn(
                    'flex-1 text-xs font-bold',
                    sm.live ? 'text-danger' : 'text-muted'
                  )}
                >
                  {sm.label}
                </span>
                {m.clock ? <span className="text-xs text-muted">{m.clock}</span> : null}
              </div>
              {line(m.home, m.homeScore)}
              {line(m.away, m.awayScore)}
            </div>
          );
        })}
      </div>
    );
  }
);
