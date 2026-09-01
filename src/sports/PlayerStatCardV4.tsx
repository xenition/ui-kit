import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { tappableProps, FOCUS_RING } from './interactive';
import type { PlayerStatCardProps, PlayerStat } from './PlayerStatCard';

/** Drop-in for {@link PlayerStatCardProps} — same props, the V4 "broadcast" design. */
export type PlayerStatCardV4Props = PlayerStatCardProps;

const STATUS_META: Record<
  NonNullable<PlayerStatCardV4Props['status']>,
  { label: string; glyph: string; pill: string }
> = {
  available: { label: 'Available', glyph: '✓', pill: 'bg-success/10 text-success' },
  injured: { label: 'Injured', glyph: '＋', pill: 'bg-danger/10 text-danger' },
  suspended: { label: 'Suspended', glyph: '⛔', pill: 'bg-warn/10 text-warn' },
};

/**
 * PlayerStatCard — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a player profile: an elevated card with a shirt-number chip in
 * a soft-primary tint, name/position/team, an availability pill that reads by
 * glyph + text (never color alone), and the key stats as big bold numerals over
 * muted labels — the leading `highlight` stat sits on a soft-primary tile. Same
 * props/behavior as {@link PlayerStatCardProps}; all colors from `--xen-*` token
 * classes (no literals). `loading` swaps in a token skeleton.
 */
export const PlayerStatCardV4 = React.forwardRef<HTMLDivElement, PlayerStatCardV4Props>(
  function PlayerStatCardV4(
    {
      name,
      position,
      number,
      photo,
      team,
      stats = [],
      variant = 'full',
      status,
      loading = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';
    const shell = cn(
      'flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 text-on-surface shadow-sm',
      className
    );

    if (loading) {
      return (
        <div ref={ref} aria-busy="true" aria-label="Loading player" className={shell} {...rest}>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-on-surface/10" />
            <div className="flex-1 space-y-1">
              <div className="h-4 rounded-sm bg-on-surface/10" />
              <div className="h-3 w-1/2 rounded-sm bg-on-surface/10" />
            </div>
          </div>
        </div>
      );
    }

    const meta = status ? STATUS_META[status] : undefined;
    const a11y = `${name}${position ? `, ${position}` : ''}${meta ? `, ${meta.label}` : ''}`;
    const interactive = tappableProps(onClick, a11y);

    const renderStat = (s: PlayerStat, i: number): React.ReactElement => (
      <div
        key={`${s.label}-${i}`}
        className={cn(
          'min-w-[72px] flex-1 basis-[28%] rounded-md p-2',
          s.highlight ? 'bg-primary/10' : 'bg-on-surface/5'
        )}
      >
        <div
          className={cn(
            'text-2xl font-extrabold tabular-nums',
            s.highlight ? 'text-primary' : 'text-on-surface'
          )}
        >
          {s.value}
        </div>
        <div className="truncate text-xs text-muted">{s.label}</div>
      </div>
    );

    return (
      <div
        ref={ref}
        className={onClick ? cn(shell, FOCUS_RING) : shell}
        {...(onClick ? {} : { 'aria-label': a11y })}
        {...interactive}
        {...rest}
      >
        <div className="flex items-center gap-2">
          <Avatar src={photo} name={name} size={compact ? 'sm' : 'lg'} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              {number !== undefined ? (
                <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-md bg-primary/10 px-1 text-sm font-extrabold text-primary tabular-nums">
                  {number}
                </span>
              ) : null}
              <span className="flex-1 truncate text-base font-extrabold text-on-surface">{name}</span>
            </div>
            <span className="truncate text-xs text-muted">
              {[position, team].filter(Boolean).join(' · ') || 'Player'}
            </span>
          </div>
          {meta ? (
            <span
              aria-label={meta.label}
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-extrabold',
                meta.pill
              )}
            >
              <Icon glyph={meta.glyph} size="xs" aria-label={meta.label} />
              {meta.label}
            </span>
          ) : null}
        </div>

        {!compact && stats.length > 0 ? (
          <div className="flex flex-wrap gap-2">{stats.map(renderStat)}</div>
        ) : !compact ? (
          <p className="text-sm text-muted">No stats recorded</p>
        ) : null}
      </div>
    );
  }
);
