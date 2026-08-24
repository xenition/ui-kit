import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import type { PlayerStatCardProps } from './PlayerStatCard';

/** Same public contract as {@link PlayerStatCard} — a drop-in alternate design. */
export type PlayerStatCardV3Props = PlayerStatCardProps;

/**
 * PlayerStatCard, redesigned (v3): a **compact roster row**. A small avatar with an
 * online dot, the gamertag over a rank·level line, and the first couple of stats
 * inline on the right — hairline-bordered for a friends/party list. The opposite
 * of v2's hero. Same props, token-only.
 */
export const PlayerStatCardV3 = React.forwardRef<HTMLDivElement, PlayerStatCardV3Props>(
  function PlayerStatCardV3({ player, variant, online = false, onClick, className }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const sub = [player.rank, typeof player.level === 'number' ? `Lv ${player.level}` : null].filter((s): s is string => !!s).join(' · ');
    const top = (player.stats ?? []).slice(0, 2);

    return (
      <div
        ref={ref}
        data-xen-player-stat-card=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={player.name}
        onClick={interactive ? () => onClick?.(player) : undefined}
        onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(player); } } : undefined}
        className={cn('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      >
        <div className="relative shrink-0">
          <Avatar src={player.avatarUrl} name={player.name} size="sm" />
          {online ? <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-success" aria-label="Online" /> : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">{player.name}</p>
          {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
        </div>
        {top.map((s, i) => (
          <div key={i} className="text-right">
            <p className="text-sm font-bold text-on-surface">{s.value}</p>
            <p className="text-[10px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    );
  }
);
