import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { tappableProps } from './interactive';
import type { PlayerStatCardProps } from './PlayerStatCard';

/** Same public contract as {@link PlayerStatCard} — a drop-in alternate design. */
export type PlayerStatCardV2Props = PlayerStatCardProps;

const STATUS: Record<NonNullable<PlayerStatCardProps['status']>, { label: string; glyph: string; tone: BadgeTone }> = {
  available: { label: 'Available', glyph: '✓', tone: 'success' },
  injured: { label: 'Injured', glyph: '＋', tone: 'danger' },
  suspended: { label: 'Suspended', glyph: '⛔', tone: 'warn' },
};

/**
 * PlayerStatCard, redesigned (v2): a **hero profile card**. A primary-tinted
 * header carries the photo, shirt number, name, position·team and a status chip;
 * the stats render as a grid of tiles beneath. Bolder than v1. Same props,
 * token-only.
 */
export const PlayerStatCardV2 = React.forwardRef<HTMLDivElement, PlayerStatCardV2Props>(
  function PlayerStatCardV2(
    { name, position, number, photo, team, stats = [], variant = 'full', status, loading = false, onClick, className, ...rest },
    ref
  ) {
    if (loading) {
      return <div ref={ref} data-xen-player-stat-card="" aria-label="Loading player" className={cn('h-40 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
    }

    const st = status ? STATUS[status] : undefined;
    const sub = [position, team].filter((s): s is string => !!s).join(' · ');
    const tap = tappableProps(onClick, name);

    return (
      <div
        ref={ref}
        data-xen-player-stat-card=""
        className={cn('overflow-hidden rounded-lg bg-surface shadow-sm', onClick && 'cursor-pointer transition-opacity hover:opacity-90', className)}
        {...tap}
        {...rest}
      >
        <div className="flex items-center gap-3 bg-primary/10 p-md">
          <div className="relative">
            <Avatar src={photo} name={name} size="lg" />
            {typeof number === 'number' ? (
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">{number}</span>
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-on-surface">{name}</p>
            {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
          </div>
          {st ? <Badge tone={st.tone}>{`${st.glyph} ${st.label}`}</Badge> : null}
        </div>
        {variant === 'full' && stats.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 p-md">
            {stats.map((s, i) => (
              <div key={i} className="rounded-md bg-neutral-100 px-2 py-2 text-center">
                <p className={cn('text-lg font-bold', s.highlight ? 'text-primary' : 'text-on-surface')}>{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
