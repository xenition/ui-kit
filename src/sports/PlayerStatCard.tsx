import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { tappableProps, FOCUS_RING } from './interactive';

/** A single labelled stat cell. */
export interface PlayerStat {
  /** Caption (e.g. `Goals`). */
  label: string;
  /** Value (number or preformatted string). */
  value: React.ReactNode;
  /** Optional emphasis — draws the value in the primary accent. */
  highlight?: boolean;
}

export interface PlayerStatCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Player display name. */
  name: string;
  /** Squad position (e.g. `Forward`). */
  position?: string;
  /** Shirt number. */
  number?: number;
  /** Photo URL (initials fallback when absent). */
  photo?: string;
  /** Team caption under the name. */
  team?: string;
  /** Stat cells laid out in a responsive grid. */
  stats?: PlayerStat[];
  /** `full` card / `compact` header-only. Default `full`. */
  variant?: 'full' | 'compact';
  /** Availability flag — shows an "Injured/Out" chip (text + glyph). */
  status?: 'available' | 'injured' | 'suspended';
  /** Loading skeleton. */
  loading?: boolean;
  /** Fires on activation (web parity of native `onPress`). */
  onClick?: () => void;
}

const STATUS_META: Record<
  NonNullable<PlayerStatCardProps['status']>,
  { label: string; glyph: string; tone: BadgeTone }
> = {
  available: { label: 'Available', glyph: '✓', tone: 'success' },
  injured: { label: 'Injured', glyph: '＋', tone: 'danger' },
  suspended: { label: 'Suspended', glyph: '⛔', tone: 'warn' },
};

/**
 * A player profile + stat grid — avatar (initials fallback via the shared
 * `Avatar`), name/position/number, and a grid of labelled stat cells.
 * Availability is a `Badge` carrying both a glyph and text so it never reads by
 * color alone. Presentational; shaped props plus optional `onClick`. Empty
 * stats and a loading skeleton are handled. Token-only colors.
 */
export const PlayerStatCard = React.forwardRef<HTMLDivElement, PlayerStatCardProps>(
  function PlayerStatCard(
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
      'flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 text-on-surface',
      className
    );

    if (loading) {
      return (
        <div ref={ref} aria-busy="true" aria-label="Loading player" className={shell} {...rest}>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-neutral-200" />
            <div className="flex-1 space-y-1">
              <div className="h-4 rounded-sm bg-neutral-200" />
              <div className="h-3 w-1/2 rounded-sm bg-neutral-100" />
            </div>
          </div>
        </div>
      );
    }

    const meta = status ? STATUS_META[status] : undefined;
    const a11y = `${name}${position ? `, ${position}` : ''}${meta ? `, ${meta.label}` : ''}`;
    const interactive = tappableProps(onClick, a11y);

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
                <span className="text-base font-bold text-primary">{number}</span>
              ) : null}
              <span className="flex-1 truncate text-base font-bold text-on-surface">{name}</span>
            </div>
            <span className="truncate text-xs text-muted">
              {[position, team].filter(Boolean).join(' · ') || 'Player'}
            </span>
          </div>
          {meta ? (
            <Badge tone={meta.tone} aria-label={meta.label}>
              <Icon glyph={meta.glyph} size="xs" aria-label={meta.label} />
              {meta.label}
            </Badge>
          ) : null}
        </div>

        {!compact && stats.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {stats.map((s, i) => (
              <div
                key={`${s.label}-${i}`}
                className="min-w-[72px] flex-1 basis-[28%] rounded-md bg-neutral-50 p-2"
              >
                <div
                  className={cn(
                    'text-lg font-bold',
                    s.highlight ? 'text-primary' : 'text-on-surface'
                  )}
                >
                  {s.value}
                </div>
                <div className="truncate text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        ) : !compact ? (
          <p className="text-sm text-muted">No stats recorded</p>
        ) : null}
      </div>
    );
  }
);
