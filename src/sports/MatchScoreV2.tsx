import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps } from './interactive';
import type { MatchScoreProps, MatchScoreStatus } from './MatchScore';

/** Same public contract as {@link MatchScore} — a drop-in alternate design. */
export type MatchScoreV2Props = MatchScoreProps;

const STATUS: Record<MatchScoreStatus, { label: string; cls: string }> = {
  live: { label: 'LIVE', cls: 'bg-danger text-on-danger' },
  final: { label: 'FT', cls: 'bg-neutral-200 text-on-surface' },
  upcoming: { label: 'Upcoming', cls: 'bg-primary/10 text-primary' },
  halftime: { label: 'HT', cls: 'bg-warn/20 text-warn' },
  postponed: { label: 'Postponed', cls: 'bg-neutral-200 text-muted' },
};

/**
 * MatchScore, redesigned (v2): a **feature scoreboard**. The competition caption
 * tops a big centered board — home crest/name, an oversized score with the away
 * side mirrored, and a status/minute pill beneath (LIVE fills danger). Bolder
 * than v1's row. Same props, token-only.
 */
export const MatchScoreV2 = React.forwardRef<HTMLDivElement, MatchScoreV2Props>(function MatchScoreV2(
  { home, away, status, minute, kickoffLabel, competition, variant, loading = false, onClick, className, ...rest },
  ref
) {
  void variant;
  if (loading) {
    return <div ref={ref} data-xen-match-score="" aria-label="Loading match" className={cn('h-28 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
  }

  const st = STATUS[status];
  const tap = tappableProps(onClick, `${home.name} versus ${away.name}`);
  const Side = ({ team, align }: { team: typeof home; align: 'left' | 'right' }): React.ReactElement => (
    <div className={cn('flex min-w-0 flex-1 flex-col items-center gap-1', align === 'left' ? 'items-start' : 'items-end')}>
      <span className="text-2xl" aria-hidden>{team.crest ?? '⚽'}</span>
      <span className="truncate text-sm font-semibold text-on-surface">{team.name}</span>
    </div>
  );

  return (
    <div
      ref={ref}
      data-xen-match-score=""
      className={cn('flex flex-col items-center gap-2 rounded-lg bg-surface p-md shadow-sm', onClick && 'cursor-pointer transition-opacity hover:opacity-90', className)}
      {...tap}
      {...rest}
    >
      {competition ? <span className="text-xs uppercase tracking-wide text-muted">{competition}</span> : null}
      <div className="flex w-full items-center gap-3">
        <Side team={home} align="left" />
        <div className="flex flex-col items-center">
          {status === 'upcoming' ? (
            <span className="text-sm font-semibold text-muted">{kickoffLabel ?? 'vs'}</span>
          ) : (
            <span className="text-3xl font-bold tabular-nums text-on-surface">
              {home.score ?? 0}<span className="mx-1 text-muted">-</span>{away.score ?? 0}
            </span>
          )}
        </div>
        <Side team={away} align="right" />
      </div>
      <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', st.cls)}>
        {status === 'live' && minute ? `${st.label} ${minute}` : st.label}
      </span>
    </div>
  );
});
