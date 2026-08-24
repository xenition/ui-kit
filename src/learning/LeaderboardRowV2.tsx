import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';
import type { LeaderboardRowProps } from './LeaderboardRow';

/** Same public contract as {@link LeaderboardRow} — a drop-in alternate design. */
export type LeaderboardRowV2Props = LeaderboardRowProps;

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

/**
 * LeaderboardRow, redesigned (v2): an **elevated podium card**. The rank shows as
 * a medal (top 3) or a big numbered disc, the avatar + name lead, and the score
 * is a large right-aligned figure with its unit and trend beneath. Highlighted
 * rows gain a primary ring + tint. Distinct from v1's flat line. Same props,
 * token-only.
 */
export const LeaderboardRowV2 = React.forwardRef<HTMLDivElement, LeaderboardRowV2Props>(
  function LeaderboardRowV2(
    { rank, name, avatar, score, scoreUnit = 'pts', highlighted = false, empty = false, trend, onSelect, className, ...rest },
    ref
  ) {
    const interactive = typeof onSelect === 'function' && !empty;
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onSelect?.();
      }
    };

    if (empty) {
      return (
        <div
          ref={ref}
          data-xen-leaderboard-row=""
          aria-label={`Rank ${rank}, open`}
          className={cn('flex items-center gap-3 rounded-lg border border-dashed border-border p-3 opacity-60', className)}
          {...rest}
        >
          <span className="w-8 text-center text-sm font-bold text-muted">{rank}</span>
          <span className="text-sm text-muted">Open spot</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-leaderboard-row=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`Rank ${rank}${name ? `, ${name}` : ''}${typeof score === 'number' ? `, ${score} ${scoreUnit}` : ''}`}
        onClick={interactive ? () => onSelect?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        className={cn(
          'flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm transition-transform',
          highlighted && 'bg-primary/10 ring-2 ring-primary',
          interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0',
          className
        )}
        {...rest}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-lg font-bold text-on-surface">
          {MEDAL[rank] ?? rank}
        </span>
        <Avatar src={avatar} name={name} size="md" />
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">{name ?? `Player ${rank}`}</p>
        <div className="text-right">
          {typeof score === 'number' ? (
            <p className="text-lg font-bold text-on-surface">
              {score.toLocaleString()} <span className="text-xs font-normal text-muted">{scoreUnit}</span>
            </p>
          ) : null}
          {trend ? <p className="text-xs text-muted">{trend}</p> : null}
        </div>
      </div>
    );
  }
);
