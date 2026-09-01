import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps, FOCUS_RING } from './interactive';
import type { FixtureRowProps, FixtureStatus } from './FixtureRow';

/** Drop-in for {@link FixtureRowProps} — same props, the V4 "broadcast" design. */
export type FixtureRowV4Props = FixtureRowProps;

const STATUS_META: Record<
  FixtureStatus,
  { label: string; glyph: string; live: boolean; pill: string }
> = {
  scheduled: { label: 'Upcoming', glyph: '🕑', live: false, pill: 'bg-primary/10 text-primary' },
  live: { label: 'LIVE', glyph: '●', live: true, pill: 'bg-danger/10 text-danger' },
  final: { label: 'FT', glyph: '✓', live: false, pill: 'bg-muted/10 text-muted' },
  postponed: { label: 'PP', glyph: '⚠', live: false, pill: 'bg-warn/10 text-warn' },
};

/**
 * FixtureRow — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a fixture line: a clean, elevated row with teams flanking a
 * bold center scoreline / kickoff, and a soft-tint status pill (a pulsing
 * `danger` dot reinforces "LIVE" — never color alone). One accent: `primary`.
 * Same props/behavior as {@link FixtureRowProps} (drop-in); all colors from
 * `--xen-*` token classes (no literals). Activated via `onClick`.
 */
export const FixtureRowV4 = React.forwardRef<HTMLDivElement, FixtureRowV4Props>(
  function FixtureRowV4(
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

    const statusRight =
      status === 'live' && minute ? minute : status === 'scheduled' && meta ? meta : sm.label;

    const shell = cn(
      'flex items-center gap-2 rounded-[var(--xen-radius-lg)] border px-4 py-3 shadow-sm',
      highlighted ? 'border-primary bg-primary-50' : 'border-border bg-surface text-on-surface',
      className
    );

    const team = (nameStr: string, crest: string | undefined, side: 'home' | 'away') => (
      <div
        className={cn(
          'flex flex-1 items-center gap-1.5',
          side === 'home' ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        <span aria-hidden="true" className="text-base leading-none">
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
        <div className="flex min-w-[72px] flex-col items-center gap-1">
          <span
            className={cn(
              'text-xl font-extrabold',
              status === 'scheduled' ? 'text-muted' : 'text-on-surface'
            )}
          >
            {center}
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-extrabold',
              sm.pill
            )}
          >
            {sm.live ? (
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-danger" />
            ) : (
              <span aria-hidden="true">{sm.glyph}</span>
            )}
            {statusRight}
          </span>
        </div>
        {team(away, awayCrest, 'away')}
      </div>
    );
  }
);
