import * as React from 'react';
import { cn } from '../primitives/cn';

/** One `{ label, value }` stat rendered as a frosted tile on the gradient. */
export interface PlayerStat {
  /** Short caption under the value (e.g. `Goals`). */
  label: string;
  /** The stat value, pre-formatted by the caller (e.g. `24`, `1.4k`). */
  value: string;
}

/** A gradient player hero: crest/photo, jersey number, name, and frosted stat tiles. */
export interface PlayerProfileHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Player display name (the near-white headline). */
  name: string;
  /** Playing position (e.g. `Forward`). */
  position?: string;
  /** Club / national side the player belongs to. */
  team?: string;
  /** Jersey number, rendered large in near-white ink. */
  number?: number;
  /** Photo/avatar URL. When present it fills the avatar; otherwise `crest` is shown. */
  photoUrl?: string;
  /** Crest/emoji glyph shown in the avatar when no `photoUrl` is given. */
  crest?: string;
  /** Career/season stats, rendered as frosted tiles (`bg-primary-50/15`). */
  stats: readonly PlayerStat[];
  /** Fires on the follow toggle; the CTA only renders when set. */
  onFollow?: () => void;
  /** Whether the viewer already follows this player (drives the CTA label/state). */
  following?: boolean;
}

/**
 * PlayerProfileHeader — a **gradient player hero** (web parity of the native twin).
 * A brand-gradient ground with the player's crest/photo avatar and big jersey
 * number up top, the near-white name + position · team beneath, an optional
 * follow CTA, and a row of frosted stat tiles (`bg-primary-50/15 border
 * border-primary-50/30`) along the bottom. Presentational only: shaped `stats`
 * plus an optional `onFollow`; nothing fetches. Every color derives from the
 * brand ramp (`--xen-*` classes + gradient utilities) — no literals, dark-safe.
 */
export const PlayerProfileHeader = React.forwardRef<HTMLDivElement, PlayerProfileHeaderProps>(
  function PlayerProfileHeader(
    {
      name,
      position,
      team,
      number,
      photoUrl,
      crest,
      stats,
      onFollow,
      following = false,
      className,
      ...rest
    },
    ref
  ) {
    const subtitle = [position, team].filter(Boolean).join(' · ');

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-primary-50 shadow-sm',
          className
        )}
        {...rest}
      >
        <div className="flex items-start gap-4">
          <span
            role="img"
            aria-label={`${name} avatar`}
            className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary-50/30 bg-primary-50/15 text-3xl"
          >
            {photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <span aria-hidden="true">{crest ?? '🧑'}</span>
            )}
          </span>
          {number !== undefined ? (
            <span
              aria-label={`Jersey number ${number}`}
              className="ml-auto text-5xl font-extrabold leading-none tracking-tight text-primary-50"
            >
              {number}
            </span>
          ) : null}
        </div>

        <p className="mt-4 truncate text-2xl font-extrabold text-primary-50">{name}</p>
        {subtitle ? (
          <p className="mt-0.5 truncate text-sm font-semibold text-primary-100">{subtitle}</p>
        ) : null}

        {onFollow ? (
          <button
            type="button"
            aria-label={following ? `Unfollow ${name}` : `Follow ${name}`}
            aria-pressed={following}
            onClick={onFollow}
            className={cn(
              'mt-4 inline-flex min-h-11 items-center justify-center self-start rounded-full px-5 text-sm font-extrabold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
              following
                ? 'border border-primary-50/30 bg-primary-50/15 text-primary-50'
                : 'bg-on-primary text-primary'
            )}
          >
            {following ? 'Following' : 'Follow'}
          </button>
        ) : null}

        {stats.length > 0 ? (
          <div className="mt-6 grid grid-cols-3 gap-2">
            {stats.map((s, i) => (
              <div
                key={`${s.label}-${i}`}
                className="flex flex-col items-center gap-0.5 rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-2 py-3"
              >
                <span className="text-lg font-extrabold text-primary-50">{s.value}</span>
                <span className="truncate text-xs font-semibold text-primary-100">{s.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
