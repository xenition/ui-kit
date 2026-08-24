import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { tappableProps, FOCUS_RING } from './interactive';

/** One side of a fixture. `score` is omitted for upcoming matches. */
export interface MatchScoreTeam {
  /** Team display name. */
  name: string;
  /** Short code shown on narrow layouts (e.g. `ARS`). Falls back to `name`. */
  short?: string;
  /** Crest/logo glyph or emoji (the kit ships no image fetch). */
  crest?: string;
  /** Goals / points; omit for an upcoming match. */
  score?: number;
}

/** Lifecycle of the fixture — drives the status chip (never color alone). */
export type MatchScoreStatus = 'live' | 'final' | 'upcoming' | 'halftime' | 'postponed';

export interface MatchScoreProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Home side. */
  home: MatchScoreTeam;
  /** Away side. */
  away: MatchScoreTeam;
  /** Match lifecycle. */
  status: MatchScoreStatus;
  /** Live clock label (e.g. `67'`) — shown when `status === 'live'`. */
  minute?: string;
  /** Kickoff label for upcoming fixtures (e.g. `Sat 15:00`). */
  kickoffLabel?: string;
  /** Competition / round caption above the teams. */
  competition?: string;
  /** Emphasise the layout with a larger score (feature/hero variant). */
  variant?: 'row' | 'feature';
  /** Show a skeleton placeholder instead of data. */
  loading?: boolean;
  /** Fires when the card is clicked/activated (web parity of native `onPress`). */
  onClick?: () => void;
}

const STATUS_META: Record<
  MatchScoreStatus,
  { label: string; glyph: string; live: boolean }
> = {
  live: { label: 'LIVE', glyph: '●', live: true },
  halftime: { label: 'HT', glyph: '●', live: true },
  final: { label: 'FT', glyph: '✓', live: false },
  upcoming: { label: 'Upcoming', glyph: '🕑', live: false },
  postponed: { label: 'Postponed', glyph: '⚠', live: false },
};

/**
 * A single fixture's scoreline — the web anchor of the sports module. Renders
 * both teams, their scores, and a status chip that distinguishes live / final /
 * upcoming by **text + glyph**, not color alone (a `danger` dot merely
 * reinforces the "LIVE" label). Presentational only: shaped data plus an
 * optional `onClick`; nothing fetches. `loading` swaps in a token skeleton. All
 * colors come from `--xen-*` token classes — no literals.
 */
export const MatchScore = React.forwardRef<HTMLDivElement, MatchScoreProps>(
  function MatchScore(
    {
      home,
      away,
      status,
      minute,
      kickoffLabel,
      competition,
      variant = 'row',
      loading = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const meta = STATUS_META[status] ?? STATUS_META.upcoming;
    const feature = variant === 'feature';
    const scoreClass = feature ? 'text-3xl' : 'text-xl';

    const shell = cn(
      'flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 text-on-surface',
      className
    );

    if (loading) {
      return (
        <div
          ref={ref}
          aria-label="Loading match"
          aria-busy="true"
          className={shell}
          {...rest}
        >
          {[0, 1].map((i) => (
            <div key={i} className="h-5 rounded-sm bg-neutral-200" />
          ))}
        </div>
      );
    }

    const statusRight =
      status === 'live' && minute
        ? minute
        : status === 'upcoming' && kickoffLabel
          ? kickoffLabel
          : meta.label;

    const a11y =
      `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
      (status === 'live' && minute ? `, ${minute}` : '');

    const homeWins =
      home.score !== undefined && away.score !== undefined && home.score > away.score;
    const awayWins =
      home.score !== undefined && away.score !== undefined && away.score > home.score;

    const renderSide = (team: MatchScoreTeam, isWinner: boolean): React.ReactElement => (
      <div className="flex flex-1 items-center gap-2">
        <span aria-hidden="true" className="text-base leading-none">
          {team.crest ?? '🛡'}
        </span>
        <span
          className={cn(
            'flex-1 truncate text-base text-on-surface',
            isWinner ? 'font-bold' : 'font-medium'
          )}
        >
          {team.name}
        </span>
        <span
          className={cn(
            'text-right font-bold',
            scoreClass,
            team.score === undefined ? 'text-muted' : 'text-on-surface'
          )}
        >
          {team.score === undefined ? '–' : team.score}
        </span>
      </div>
    );

    const interactive = tappableProps(onClick, a11y);

    return (
      <div
        ref={ref}
        className={onClick ? cn(shell, FOCUS_RING) : shell}
        {...(onClick ? {} : { 'aria-label': a11y })}
        {...interactive}
        {...rest}
      >
        <div className="flex items-center justify-between">
          {competition ? (
            <span className="flex-1 truncate text-xs font-semibold text-muted">
              {competition}
            </span>
          ) : (
            <span className="flex-1" />
          )}
          <span className="flex items-center gap-1">
            {meta.live ? (
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-danger" />
            ) : (
              <Icon glyph={meta.glyph} size="xs" color="muted" />
            )}
            <span
              className={cn(
                'text-xs font-bold',
                meta.live ? 'text-danger' : 'text-muted'
              )}
            >
              {statusRight}
            </span>
          </span>
        </div>
        {renderSide(home, homeWins)}
        {renderSide(away, awayWins)}
      </div>
    );
  }
);
