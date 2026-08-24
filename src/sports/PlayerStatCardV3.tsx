import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { tappableProps } from './interactive';
import type { PlayerStatCardProps } from './PlayerStatCard';

/** Same public contract as {@link PlayerStatCard} — a drop-in alternate design. */
export type PlayerStatCardV3Props = PlayerStatCardProps;

const STATUS_GLYPH: Record<NonNullable<PlayerStatCardProps['status']>, string> = {
  available: '✓', injured: '＋', suspended: '⛔',
};
const STATUS_TEXT: Record<NonNullable<PlayerStatCardProps['status']>, string> = {
  available: 'text-success', injured: 'text-danger', suspended: 'text-warn',
};

/**
 * PlayerStatCard, redesigned (v3): a **compact roster row**. A small avatar with
 * the shirt number, the name over position·team, and the first couple of stats
 * inline on the right — hairline-bordered for a squad list. The opposite of v2's
 * hero. Same props, token-only.
 */
export const PlayerStatCardV3 = React.forwardRef<HTMLDivElement, PlayerStatCardV3Props>(
  function PlayerStatCardV3(
    { name, position, number, photo, team, stats = [], variant, status, loading = false, onClick, className, ...rest },
    ref
  ) {
    void variant;
    if (loading) {
      return <div ref={ref} data-xen-player-stat-card="" aria-label="Loading player" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}><div className="h-9 w-9 animate-pulse rounded-full bg-neutral-100" /><div className="h-3 w-1/3 animate-pulse rounded-sm bg-neutral-100" /></div>;
    }

    const sub = [position, team].filter((s): s is string => !!s).join(' · ');
    const tap = tappableProps(onClick, name);
    const top = stats.slice(0, 2);

    return (
      <div
        ref={ref}
        data-xen-player-stat-card=""
        className={cn('flex items-center gap-3 border-b border-border py-2.5', onClick && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
        {...tap}
        {...rest}
      >
        <div className="relative shrink-0">
          <Avatar src={photo} name={name} size="sm" />
          {typeof number === 'number' ? (
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary">{number}</span>
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 truncate text-sm font-semibold text-on-surface">
            {name}
            {status ? <span className={cn('text-xs', STATUS_TEXT[status])} aria-label={status}>{STATUS_GLYPH[status]}</span> : null}
          </p>
          {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
        </div>
        {top.map((s, i) => (
          <div key={i} className="text-right">
            <p className={cn('text-sm font-bold', s.highlight ? 'text-primary' : 'text-on-surface')}>{s.value}</p>
            <p className="text-[10px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    );
  }
);
