import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps, FOCUS_RING } from './interactive';
import type { MatchScoreProps, MatchScoreTeam, MatchScoreStatus } from './MatchScore';

/** Drop-in for {@link MatchScoreProps} — same props, the V4 "broadcast" design. */
export type MatchScoreV4Props = MatchScoreProps;

const STATUS_META: Record<
  MatchScoreStatus,
  { label: string; glyph: string; live: boolean; pill: string }
> = {
  live: { label: 'LIVE', glyph: '●', live: true, pill: 'bg-danger/10 text-danger' },
  halftime: { label: 'HT', glyph: '●', live: true, pill: 'bg-danger/10 text-danger' },
  final: { label: 'FT', glyph: '✓', live: false, pill: 'bg-muted/10 text-muted' },
  upcoming: { label: 'Upcoming', glyph: '🕑', live: false, pill: 'bg-primary/10 text-primary' },
  postponed: { label: 'Postponed', glyph: '⚠', live: false, pill: 'bg-warn/10 text-warn' },
};

/**
 * MatchScore — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a scoreline: an elevated card with a soft-tint status pill (a
 * pulsing danger dot reinforces "LIVE" — never color alone) and bold score
 * numerals; the `feature` variant becomes a full brand-gradient hero with
 * near-white ink. Same props/behavior as {@link MatchScoreProps}; all colors
 * from `--xen-*` token classes (no literals). `loading` swaps in a token skeleton.
 */
export const MatchScoreV4 = React.forwardRef<HTMLDivElement, MatchScoreV4Props>(function MatchScoreV4(
  { home, away, status, minute, kickoffLabel, competition, variant = 'row', loading = false, onClick, className, ...rest },
  ref
) {
  const meta = STATUS_META[status] ?? STATUS_META.upcoming;
  const feature = variant === 'feature';
  const scoreClass = feature ? 'text-3xl' : 'text-2xl';

  const shell = cn(
    'flex flex-col gap-2 overflow-hidden rounded-[var(--xen-radius-lg)] p-4 shadow-sm',
    feature
      ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-primary-50'
      : 'border border-border bg-surface text-on-surface',
    className
  );

  if (loading) {
    return (
      <div ref={ref} aria-label="Loading match" aria-busy="true" className={cn(shell, 'border border-border bg-surface')} {...rest}>
        {[0, 1].map((i) => (
          <div key={i} className="h-6 rounded-sm bg-on-surface/10" />
        ))}
      </div>
    );
  }

  const statusRight =
    status === 'live' && minute ? minute : status === 'upcoming' && kickoffLabel ? kickoffLabel : meta.label;

  const a11y =
    `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
    (status === 'live' && minute ? `, ${minute}` : '');

  const homeWins = home.score !== undefined && away.score !== undefined && home.score > away.score;
  const awayWins = home.score !== undefined && away.score !== undefined && away.score > home.score;

  const captionCls = feature ? 'text-primary-100' : 'text-muted';
  const pillCls = feature ? 'bg-primary-50/15 text-primary-50' : meta.pill;

  const renderSide = (team: MatchScoreTeam, isWinner: boolean): React.ReactElement => (
    <div className="flex flex-1 items-center gap-2">
      <span aria-hidden="true" className="text-base leading-none">
        {team.crest ?? '🛡'}
      </span>
      <span className={cn('flex-1 truncate text-base', feature ? 'text-primary-50' : 'text-on-surface', isWinner ? 'font-extrabold' : 'font-medium')}>
        {team.name}
      </span>
      <span
        className={cn(
          'text-right font-extrabold',
          scoreClass,
          team.score === undefined ? (feature ? 'text-primary-100' : 'text-muted') : feature ? 'text-primary-50' : 'text-on-surface'
        )}
      >
        {team.score === undefined ? '–' : team.score}
      </span>
    </div>
  );

  const interactive = tappableProps(onClick, a11y);

  return (
    <div ref={ref} className={onClick ? cn(shell, FOCUS_RING) : shell} {...(onClick ? {} : { 'aria-label': a11y })} {...interactive} {...rest}>
      <div className="flex items-center justify-between">
        {competition ? <span className={cn('flex-1 truncate text-xs font-bold', captionCls)}>{competition}</span> : <span className="flex-1" />}
        <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-extrabold', pillCls)}>
          {meta.live ? (
            <span aria-hidden="true" className={cn('h-2 w-2 rounded-full', feature ? 'bg-primary-50' : 'bg-danger')} />
          ) : (
            <span aria-hidden="true">{meta.glyph}</span>
          )}
          {statusRight}
        </span>
      </div>
      {renderSide(home, homeWins)}
      {renderSide(away, awayWins)}
    </div>
  );
});
