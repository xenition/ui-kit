import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge } from '../primitives/Badge';
import type { PlayerStatCardProps } from './PlayerStatCard';

/** Same public contract as {@link PlayerStatCard} — a drop-in alternate design. */
export type PlayerStatCardV2Props = PlayerStatCardProps;

/**
 * PlayerStatCard, redesigned (v2): a **hero profile card**. A tinted header holds
 * a large avatar (with an online dot), the gamertag, and a rank/level badge; the
 * headline stats render as a grid of tiles beneath. Bolder than v1. Same props,
 * token-only.
 */
export const PlayerStatCardV2 = React.forwardRef<HTMLDivElement, PlayerStatCardV2Props>(
  function PlayerStatCardV2({ player, variant, online = false, onClick, className }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const badge = [player.rank, typeof player.level === 'number' ? `Lv ${player.level}` : null].filter((s): s is string => !!s).join(' · ');
    const stats = player.stats ?? [];

    return (
      <div
        ref={ref}
        data-xen-player-stat-card=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={player.name}
        onClick={interactive ? () => onClick?.(player) : undefined}
        onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(player); } } : undefined}
        className={cn('overflow-hidden rounded-lg bg-surface shadow-sm', interactive && 'cursor-pointer transition-opacity hover:opacity-90', className)}
      >
        <div className="flex items-center gap-3 bg-primary/10 p-md">
          <div className="relative">
            <Avatar src={player.avatarUrl} name={player.name} size="lg" />
            {online ? <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-success" aria-label="Online" /> : null}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-on-surface">{player.name}</p>
            {badge ? <Badge tone="primary">{badge}</Badge> : null}
          </div>
        </div>
        {stats.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 p-md">
            {stats.map((s, i) => (
              <div key={i} className="rounded-md bg-neutral-100 px-2 py-2 text-center">
                <p className="text-lg font-bold text-on-surface">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
