import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { EmptyState } from '../commerce/EmptyState';
import type { LeaderboardPodiumProps } from './LeaderboardPodium';

/** Same public contract as {@link LeaderboardPodium} — a drop-in alternate design. */
export type LeaderboardPodiumV2Props = LeaderboardPodiumProps;

const MEDAL = ['🥇', '🥈', '🥉'];
const PILLARS = [1, 0, 2]; // render order: 2nd, 1st, 3rd
const HEIGHT = ['h-16', 'h-24', 'h-12'];

/**
 * LeaderboardPodium, redesigned (v2): a **classic 3-pillar podium**. The top three
 * stand on tiered blocks (2nd · 1st · 3rd) with medals, avatars, names and scores;
 * the winner's pillar is tallest and primary-filled. Bolder than v1. Same props,
 * token-only.
 */
export const LeaderboardPodiumV2 = React.forwardRef<HTMLDivElement, LeaderboardPodiumV2Props>(
  function LeaderboardPodiumV2({ entries, emptyLabel = 'No rankings yet', onClick, className }, ref) {
    if (entries.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">🏆</span>} title={emptyLabel} className={className} />;
    }
    const top = entries.slice(0, 3);
    const interactive = typeof onClick === 'function';

    return (
      <div ref={ref} data-xen-leaderboard-podium="" className={cn('flex items-end justify-center gap-2', className)}>
        {PILLARS.map((idx) => {
          const entry = top[idx];
          if (!entry) return <div key={idx} className="flex-1" />;
          const rank = idx + 1;
          const body = (
            <>
              <span className="text-xl" aria-hidden>{MEDAL[idx]}</span>
              <Avatar src={entry.avatarUrl} name={entry.name} size={idx === 0 ? 'lg' : 'md'} />
              <span className="max-w-full truncate text-xs font-semibold text-on-surface">{entry.name}</span>
              <span className="text-xs text-muted">{entry.score.toLocaleString()}</span>
              <span className={cn('mt-1 w-full rounded-t-md', HEIGHT[idx], idx === 0 ? 'bg-primary/20' : 'bg-neutral-100')} aria-hidden />
            </>
          );
          if (!interactive) return <div key={entry.id} className="flex flex-1 flex-col items-center gap-1">{body}</div>;
          return (
            <button key={entry.id} type="button" aria-label={`Rank ${rank}, ${entry.name}`} onClick={() => onClick?.(entry, rank)} className="flex flex-1 flex-col items-center gap-1">
              {body}
            </button>
          );
        })}
      </div>
    );
  }
);
