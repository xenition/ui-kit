import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge } from '../primitives/Badge';
import { Card } from '../primitives/Card';
import type { PlayerProfile } from './types';

export type PlayerStatCardVariant = 'compact' | 'detailed';

export interface PlayerStatCardProps {
  /** The player to render. */
  player: PlayerProfile;
  /**
   * - `compact`  — avatar + name + rank in a single row (default).
   * - `detailed` — adds a grid of the player's headline stats.
   */
  variant?: PlayerStatCardVariant;
  /** Presence indicator on the avatar. */
  online?: boolean;
  /** Called when the card is clicked — open the full profile. */
  onClick?: (player: PlayerProfile) => void;
  /** Extra classes on the root card. */
  className?: string;
}

/**
 * A player profile summary — avatar (with optional presence dot), handle,
 * rank/level, and (in `detailed`) a responsive grid of headline stats. Renders
 * a graceful "No stats yet" line when `detailed` has no stats. `onClick(player)`
 * opens the profile (the card becomes a keyboard-operable `role="button"`).
 * Presence is announced via text, never color alone. Composes `Card`, `Avatar`,
 * `Badge`. Token-only.
 */
export function PlayerStatCard({
  player,
  variant = 'compact',
  online,
  onClick,
  className,
}: PlayerStatCardProps): React.ReactElement {
  const detailed = variant === 'detailed';
  const stats = player.stats ?? [];

  const header = (
    <div className="flex items-center gap-[var(--xen-space-md)]">
      <span className="relative inline-flex shrink-0">
        <Avatar src={player.avatarUrl} name={player.name} size={detailed ? 'lg' : 'md'} />
        {online !== undefined ? (
          <span
            role="img"
            aria-label={online ? 'Online' : 'Offline'}
            className={cn(
              'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-surface',
              online ? 'bg-success' : 'bg-muted'
            )}
          />
        ) : null}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-lg font-bold text-on-surface">{player.name}</p>
        <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
          {player.rank ? <Badge tone="primary">{player.rank}</Badge> : null}
          {player.level != null ? (
            <span className="text-sm text-muted">Level {player.level}</span>
          ) : null}
        </div>
      </div>
    </div>
  );

  const grid = detailed ? (
    stats.length > 0 ? (
      <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
        {stats.map((s, i) => (
          <div
            key={`${s.label}-${i}`}
            className="flex min-w-[84px] flex-1 basis-[30%] flex-col gap-0.5 rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]"
          >
            <span className="text-lg font-bold text-on-surface">{s.value}</span>
            <span className="text-xs text-muted">{s.label}</span>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-muted">No stats yet</p>
    )
  ) : null;

  const interactive = Boolean(onClick);
  return (
    <Card
      className={cn(
        'flex flex-col',
        detailed ? 'gap-[var(--xen-space-md)]' : 'gap-0',
        interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            'aria-label': `${player.name}${player.rank ? `, ${player.rank}` : ''}`,
            onClick: () => onClick!(player),
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick!(player);
              }
            },
          }
        : {})}
    >
      {header}
      {grid}
    </Card>
  );
}
