import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { EmptyState } from '../commerce/EmptyState';
import type { LeaderboardPodiumProps } from './LeaderboardPodium';

/** Same public contract as {@link LeaderboardPodium} — a drop-in alternate design. */
export type LeaderboardPodiumV3Props = LeaderboardPodiumProps;

const MEDAL = ['🥇', '🥈', '🥉'];

/**
 * LeaderboardPodium, redesigned (v3): a **compact top-3 list**. The three leaders
 * stack as hairline rows — medal, avatar, name, and score pinned right — for a
 * tight standings widget. The opposite of v2's pillars. Same props, token-only.
 */
export const LeaderboardPodiumV3 = React.forwardRef<HTMLDivElement, LeaderboardPodiumV3Props>(
  function LeaderboardPodiumV3({ entries, emptyLabel = 'No rankings yet', onClick, className }, ref) {
    if (entries.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">🏆</span>} title={emptyLabel} className={className} />;
    }
    const top = entries.slice(0, 3);
    const interactive = typeof onClick === 'function';

    return (
      <div ref={ref} data-xen-leaderboard-podium="" className={cn('flex flex-col', className)}>
        {top.map((entry, idx) => {
          const rank = idx + 1;
          const body = (
            <>
              <span className="w-6 text-center text-base" aria-hidden>{MEDAL[idx]}</span>
              <Avatar src={entry.avatarUrl} name={entry.name} size="sm" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-on-surface">{entry.name}</span>
              <span className="text-sm font-bold tabular-nums text-on-surface">{entry.score.toLocaleString()}</span>
            </>
          );
          if (!interactive) return <div key={entry.id} className="flex items-center gap-3 border-b border-border py-2">{body}</div>;
          return (
            <button key={entry.id} type="button" aria-label={`Rank ${rank}, ${entry.name}`} onClick={() => onClick?.(entry, rank)} className="flex items-center gap-3 border-b border-border py-2 text-left transition-colors hover:bg-neutral-50">
              {body}
            </button>
          );
        })}
      </div>
    );
  }
);
