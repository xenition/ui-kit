import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';
import type { LeaderboardRowProps } from './LeaderboardRow';

/** Same public contract as {@link LeaderboardRow} — a drop-in alternate design. */
export type LeaderboardRowV3Props = LeaderboardRowProps;

/**
 * LeaderboardRow, redesigned (v3): a **dense ranking line**. A fixed-width rank
 * number, a tiny avatar, the name inline, and the score pinned right with its
 * trend as a small trailing note — hairline-separated so a full ladder stacks
 * tightly. Highlighted rows get a primary left accent bar (plus text weight),
 * never color alone. Same props, token-only.
 */
export const LeaderboardRowV3 = React.forwardRef<HTMLDivElement, LeaderboardRowV3Props>(
  function LeaderboardRowV3(
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
          className={cn('flex items-center gap-3 border-b border-border py-2 opacity-60', className)}
          {...rest}
        >
          <span className="w-6 text-center text-xs font-bold text-muted">{rank}</span>
          <span className="text-xs text-muted">Open spot</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-leaderboard-row=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`Rank ${rank}${name ? `, ${name}` : ''}${typeof score === 'number' ? `, ${score} ${scoreUnit}` : ''}${highlighted ? ', you' : ''}`}
        onClick={interactive ? () => onSelect?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        className={cn(
          'flex items-center gap-3 border-b border-border py-2 pl-2',
          highlighted && 'border-l-2 border-l-primary bg-primary/5',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
          className
        )}
        {...rest}
      >
        <span className={cn('w-6 text-center text-sm font-bold', highlighted ? 'text-primary' : 'text-muted')}>
          {rank}
        </span>
        <Avatar src={avatar} name={name} size="xs" />
        <p className={cn('min-w-0 flex-1 truncate text-sm', highlighted ? 'font-bold text-on-surface' : 'text-on-surface')}>
          {name ?? `Player ${rank}`}
        </p>
        {trend ? <span className="text-xs text-muted">{trend}</span> : null}
        {typeof score === 'number' ? (
          <span className="text-sm font-semibold text-on-surface">
            {score.toLocaleString()} <span className="text-xs font-normal text-muted">{scoreUnit}</span>
          </span>
        ) : null}
      </div>
    );
  }
);
