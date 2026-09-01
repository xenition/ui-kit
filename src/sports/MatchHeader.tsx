import * as React from 'react';
import { cn } from '../primitives/cn';
import type { MatchScoreTeam, MatchScoreStatus } from './MatchScore';

/** One crest·score·score·crest hero for a live/near-live fixture. Presentational only. */
export interface MatchHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Home side (crest glyph, name, score). */
  home: MatchScoreTeam;
  /** Away side (crest glyph, name, score). */
  away: MatchScoreTeam;
  /** Match lifecycle — drives the live pulse + status label (never color alone). */
  status: MatchScoreStatus;
  /** Live clock label (e.g. `67'`) — surfaced in the frosted pill when `status === 'live'`. */
  minute?: string;
  /** Competition / round caption above the scoreline (e.g. `Premier League · MD 12`). */
  competition?: string;
  /** Stadium / venue line under the competition. */
  venue?: string;
  /** Fires on the optional back affordance; the chevron only renders when set. */
  onBack?: () => void;
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
 * MatchHeader — the sports module's **live-match peak** (web parity of the native
 * twin). A full brand-gradient hero: the competition + venue read in near-white /
 * frosted ink at the top, a big crest·score·score·crest line dominates the middle,
 * and a live pulse + minute sit in a frosted pill (`bg-primary-50/15`) — the "LIVE"
 * state is announced via an `aria-live` region and reinforced by a pulsing dot
 * plus text, never color alone. Presentational only: shaped `home`/`away` teams,
 * a `status`, and an optional `onBack`; nothing fetches. Every color derives from
 * the brand ramp (`--xen-*` classes + gradient utilities) — no literals, dark-safe.
 */
export const MatchHeader = React.forwardRef<HTMLDivElement, MatchHeaderProps>(
  function MatchHeader(
    { home, away, status, minute, competition, venue, onBack, className, ...rest },
    ref
  ) {
    const meta = STATUS_META[status] ?? STATUS_META.upcoming;
    const statusRight = status === 'live' && minute ? minute : meta.label;

    const a11y =
      `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
      (status === 'live' && minute ? `, ${minute}` : '');

    const homeWins =
      home.score !== undefined && away.score !== undefined && home.score > away.score;
    const awayWins =
      home.score !== undefined && away.score !== undefined && away.score > home.score;

    const renderCrest = (team: MatchScoreTeam, isWinner: boolean): React.ReactElement => (
      <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
        <span aria-hidden="true" className="text-4xl leading-none">
          {team.crest ?? '🛡'}
        </span>
        <span
          className={cn(
            'w-full truncate text-center text-sm text-primary-50',
            isWinner ? 'font-extrabold' : 'font-medium'
          )}
        >
          {team.name}
        </span>
      </div>
    );

    return (
      <div
        ref={ref}
        aria-label={a11y}
        className={cn(
          'relative flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-primary-50 shadow-sm',
          className
        )}
        {...rest}
      >
        <div className="flex items-start gap-3">
          {onBack ? (
            <button
              type="button"
              aria-label="Go back"
              onClick={onBack}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-lg text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              <span aria-hidden="true">‹</span>
            </button>
          ) : null}
          <div className="min-w-0 flex-1">
            {competition ? (
              <p className="truncate text-xs font-extrabold uppercase tracking-wide text-primary-50">
                {competition}
              </p>
            ) : null}
            {venue ? (
              <p className="mt-0.5 truncate text-xs text-primary-100">{venue}</p>
            ) : null}
          </div>
          <span
            className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-primary-50/30 bg-primary-50/15 px-3 py-1 text-xs font-extrabold text-primary-50"
            role="status"
            aria-live={meta.live ? 'polite' : 'off'}
          >
            {meta.live ? (
              <span
                aria-hidden="true"
                className="h-2 w-2 animate-pulse rounded-full bg-primary-50"
              />
            ) : (
              <span aria-hidden="true">{meta.glyph}</span>
            )}
            {statusRight}
          </span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          {renderCrest(home, homeWins)}
          <div className="flex flex-shrink-0 items-center gap-2 text-5xl font-extrabold tracking-tight text-primary-50">
            <span className={cn(home.score === undefined && 'text-primary-100')}>
              {home.score === undefined ? '–' : home.score}
            </span>
            <span aria-hidden="true" className="text-primary-100">
              :
            </span>
            <span className={cn(away.score === undefined && 'text-primary-100')}>
              {away.score === undefined ? '–' : away.score}
            </span>
          </div>
          {renderCrest(away, awayWins)}
        </div>
      </div>
    );
  }
);
