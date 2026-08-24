import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps, FOCUS_RING } from './interactive';

/** Fixture lifecycle. */
export type FixtureStatus = 'scheduled' | 'live' | 'final' | 'postponed';

export interface FixtureRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Home team name. */
  home: string;
  /** Away team name. */
  away: string;
  /** Home crest glyph/emoji. */
  homeCrest?: string;
  /** Away crest glyph/emoji. */
  awayCrest?: string;
  /** Home score (scheduled → omit). */
  homeScore?: number;
  /** Away score (scheduled → omit). */
  awayScore?: number;
  /** Kickoff / date label for scheduled fixtures (e.g. `Sat 15:00`). */
  kickoffLabel?: string;
  /** Live clock label (e.g. `73'`). */
  minute?: string;
  /** Competition / venue caption. */
  meta?: string;
  /** Lifecycle. Default `scheduled`. */
  status?: FixtureStatus;
  /** Highlight (e.g. favourite team involved). */
  highlighted?: boolean;
  /** Fires on activation (web parity of native `onPress`). */
  onClick?: () => void;
}

const STATUS_META: Record<FixtureStatus, { label: string; live: boolean }> = {
  scheduled: { label: 'vs', live: false },
  live: { label: 'LIVE', live: true },
  final: { label: 'FT', live: false },
  postponed: { label: 'PP', live: false },
};

/**
 * A compact one-line fixture — home vs away with a center column showing either
 * the kickoff time, the live scoreline, or the final result. The status is
 * conveyed by text (a `danger` dot only reinforces "LIVE"), never color alone.
 * Built for tight lists (schedules, results). Activated via `onClick`.
 * Token-only colors.
 */
export const FixtureRow = React.forwardRef<HTMLDivElement, FixtureRowProps>(
  function FixtureRow(
    {
      home,
      away,
      homeCrest,
      awayCrest,
      homeScore,
      awayScore,
      kickoffLabel,
      minute,
      meta,
      status = 'scheduled',
      highlighted = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const sm = STATUS_META[status] ?? STATUS_META.scheduled;
    const hasScore = homeScore !== undefined && awayScore !== undefined;

    const center =
      status === 'scheduled'
        ? (kickoffLabel ?? 'vs')
        : hasScore
          ? `${homeScore} – ${awayScore}`
          : sm.label;

    const subline =
      status === 'live' && minute ? minute : status === 'scheduled' ? (meta ?? '') : sm.label;

    const shell = cn(
      'flex items-center gap-2 rounded-md border px-4 py-2',
      highlighted ? 'border-primary bg-primary-50' : 'border-border bg-surface',
      className
    );

    const team = (nameStr: string, crest: string | undefined, side: 'home' | 'away') => (
      <div
        className={cn(
          'flex flex-1 items-center gap-1',
          side === 'home' ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        <span aria-hidden="true" className="text-sm leading-none">
          {crest ?? '🛡'}
        </span>
        <span
          className={cn(
            'flex-1 truncate text-sm font-semibold text-on-surface',
            side === 'home' ? 'text-right' : 'text-left'
          )}
        >
          {nameStr}
        </span>
      </div>
    );

    const a11y =
      `${home} versus ${away}, ${sm.label}` +
      (hasScore
        ? `, ${homeScore} to ${awayScore}`
        : status === 'scheduled' && kickoffLabel
          ? `, ${kickoffLabel}`
          : '');
    const interactive = tappableProps(onClick, a11y);

    return (
      <div
        ref={ref}
        className={onClick ? cn(shell, FOCUS_RING) : shell}
        {...(onClick ? {} : { 'aria-label': a11y })}
        {...interactive}
        {...rest}
      >
        {team(home, homeCrest, 'home')}
        <div className="flex min-w-[64px] flex-col items-center">
          <span
            className={cn(
              'text-base font-bold',
              status === 'scheduled' ? 'text-muted' : 'text-on-surface'
            )}
          >
            {center}
          </span>
          <span className="flex items-center gap-1">
            {sm.live ? (
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-danger" />
            ) : null}
            <span
              className={cn('text-xs font-semibold', sm.live ? 'text-danger' : 'text-muted')}
            >
              {subline}
            </span>
          </span>
        </div>
        {team(away, awayCrest, 'away')}
      </div>
    );
  }
);
