import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce/EmptyState';
import { formatCount, type LeaderboardEntry } from './types';

export interface LeaderboardPodiumProps {
  /** Standings; the top 3 (by array order) form the podium. */
  entries: LeaderboardEntry[];
  /** Message shown when there are no entries. */
  emptyLabel?: string;
  /** Called when a podium place is clicked. */
  onClick?: (entry: LeaderboardEntry, rank: number) => void;
  /** Extra classes on the root. */
  className?: string;
}

// Podium render order (2nd, 1st, 3rd) with per-place heights + accent slots.
const PLACES: { index: number; height: number; medal: string; border: string }[] = [
  { index: 1, height: 56, medal: '🥈', border: 'border-t-border' },
  { index: 0, height: 80, medal: '🥇', border: 'border-t-warn' },
  { index: 2, height: 40, medal: '🥉', border: 'border-t-accent' },
];

/**
 * A top-3 leaderboard podium — the first three `entries` render as centered
 * columns (2nd · 1st · 3rd) with medals, avatars, names, and scores; the tallest
 * block marks the leader. Uses **guarded indexing** so a 1- or 2-entry list
 * simply omits the missing places, and renders an `EmptyState` when there are
 * none. `onClick(entry, rank)` opens a place (a real `<button>`). Composes
 * `Card`, `Avatar`, `Icon`, `EmptyState`. Token-only.
 */
export function LeaderboardPodium({
  entries,
  emptyLabel = 'No rankings yet',
  onClick,
  className,
}: LeaderboardPodiumProps): React.ReactElement {
  if (entries.length === 0) {
    return (
      <EmptyState
        icon={<Icon glyph="🏆" size="2xl" color="muted" aria-label="Leaderboard" />}
        title={emptyLabel}
        className={className}
      />
    );
  }

  return (
    <Card className={cn('flex items-end justify-center gap-[var(--xen-space-sm)]', className)}>
      {PLACES.map((place) => {
        const entry = entries[place.index];
        if (!entry) return <div key={place.index} className="flex-1" />;
        const rank = place.index + 1;
        const label = `Rank ${rank}, ${entry.name}, ${entry.score} points`;

        const column = (
          <div className="flex w-full flex-col items-center gap-[var(--xen-space-xs)]">
            <span aria-hidden="true" className="text-xl leading-none">
              {place.medal}
            </span>
            <Avatar src={entry.avatarUrl} name={entry.name} size={place.index === 0 ? 'lg' : 'md'} />
            <span className="max-w-full truncate text-sm font-bold text-on-surface">{entry.name}</span>
            <div
              className={cn(
                'flex w-full flex-col items-center rounded-t-[var(--xen-radius-md)] border-t-2 bg-neutral-100 pt-[var(--xen-space-xs)]',
                place.border
              )}
              style={{ height: place.height }}
            >
              <span className="text-base font-bold text-on-surface">#{rank}</span>
              <span className="text-xs text-on-surface">{formatCount(entry.score)}</span>
            </div>
          </div>
        );

        if (!onClick) {
          return (
            <div key={entry.id} className="flex-1" aria-label={label}>
              {column}
            </div>
          );
        }
        return (
          <button
            key={entry.id}
            type="button"
            className="flex-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            aria-label={label}
            onClick={() => onClick(entry, rank)}
          >
            {column}
          </button>
        );
      })}
    </Card>
  );
}
