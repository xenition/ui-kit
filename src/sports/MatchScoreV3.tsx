import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps } from './interactive';
import type { MatchScoreProps, MatchScoreStatus } from './MatchScore';

/** Same public contract as {@link MatchScore} — a drop-in alternate design. */
export type MatchScoreV3Props = MatchScoreProps;

const STATUS_LABEL: Record<MatchScoreStatus, string> = {
  live: 'LIVE', final: 'FT', upcoming: '', halftime: 'HT', postponed: 'PP',
};
const STATUS_TEXT: Record<MatchScoreStatus, string> = {
  live: 'text-danger', final: 'text-muted', upcoming: 'text-muted', halftime: 'text-warn', postponed: 'text-muted',
};

/**
 * MatchScore, redesigned (v3): a **dense fixture line**. Home code · score ·
 * away code on one row with the status/minute pinned right (LIVE in danger) —
 * hairline-bordered for a results ticker. The opposite of v2's board. Same props,
 * token-only.
 */
export const MatchScoreV3 = React.forwardRef<HTMLDivElement, MatchScoreV3Props>(function MatchScoreV3(
  { home, away, status, minute, kickoffLabel, competition, variant, loading = false, onClick, className, ...rest },
  ref
) {
  void variant;
  void competition;
  if (loading) {
    return <div ref={ref} data-xen-match-score="" aria-label="Loading match" className={cn('flex items-center gap-3 border-b border-border py-2', className)} {...rest}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
  }

  const tap = tappableProps(onClick, `${home.name} versus ${away.name}`);
  const right = status === 'upcoming' ? (kickoffLabel ?? '') : status === 'live' && minute ? `${STATUS_LABEL[status]} ${minute}` : STATUS_LABEL[status];

  return (
    <div
      ref={ref}
      data-xen-match-score=""
      className={cn('flex items-center gap-2 border-b border-border py-2', onClick && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...tap}
      {...rest}
    >
      <span className="truncate text-sm text-on-surface">{home.short ?? home.name}</span>
      <span className="text-sm font-bold tabular-nums text-on-surface">
        {status === 'upcoming' ? 'v' : `${home.score ?? 0}-${away.score ?? 0}`}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm text-on-surface">{away.short ?? away.name}</span>
      {right ? <span className={cn('shrink-0 text-xs font-semibold', STATUS_TEXT[status])}>{right}</span> : null}
    </div>
  );
});
