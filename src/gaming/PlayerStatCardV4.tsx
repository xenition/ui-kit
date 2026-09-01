import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { PlayerStatCardProps } from './PlayerStatCard';
import { BADGE_V4, IDENTITY_TONE, TABULAR_CLASS, spokenLine } from './internal/arcade-v4';

export interface PlayerStatCardV4Props extends PlayerStatCardProps {
  /** The presence word while `online` is true. Default `'Online'`. */
  onlineLabel?: string;
  /** The presence word while it is false. Default `'Offline'`. */
  offlineLabel?: string;
}

const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;

/**
 * **V4 player stat card** — same props as {@link PlayerStatCard} plus
 * `onlineLabel` and `offlineLabel`.
 *
 * ## Four changes
 *
 * 1. **The stats survive being clickable.** `detailed` exists to show the
 *    headline stats, and the moment an `onClick` was passed the card became a
 *    `role="button"` — which makes its whole subtree presentational, so every
 *    K/D, every win count and the "No stats yet" line were removed from the
 *    accessibility tree by the act of making the card open a profile. The card
 *    is a plain `<div>`; the activation is a real `<button>` around the avatar
 *    and the handle, and the stats grid is its **sibling**.
 * 2. **Presence is a word on both twins.** It was a coloured dot with
 *    `role="img"` here and a bare tint on native, and neither joined the
 *    card's name — so a card whose only difference from the next one was
 *    "this player is online" read identically. The dot is decoration; the word
 *    is in the meta line and in the spoken name, and `onlineLabel` /
 *    `offlineLabel` let an app change it.
 * 3. **A rank is identity, not the brand.** `Diamond II` wore `primary`,
 *    which made every rank in a roster the same colour as every primary action
 *    on the screen. It is a neutral chip carrying its own word.
 * 4. **Press is a state layer on a target that clears 44.**
 *    `hover:opacity-90` fades the card's own content, which is how M3 says
 *    *disabled*; the focus ring is the kit's `ring` rather than a ramp step
 *    that inverts; and the stat figures are tabular, so a roster's numbers
 *    line up in a column instead of each cell setting its own width.
 */
export const PlayerStatCardV4 = React.forwardRef<HTMLDivElement, PlayerStatCardV4Props>(
  function PlayerStatCardV4(
    {
      player,
      variant = 'compact',
      online,
      onClick,
      onlineLabel = 'Online',
      offlineLabel = 'Offline',
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!player?.name) return null;

    const detailed = variant === 'detailed';
    const stats = player.stats ?? [];
    const interactive = typeof onClick === 'function';
    const presence = online === undefined ? undefined : online ? onlineLabel : offlineLabel;

    const caption = metaLine([
      player.level != null ? `Level ${player.level}` : undefined,
      presence,
    ]);

    const header = (
      <>
        <span className="relative inline-flex shrink-0">
          <AvatarV4
            src={player.avatarUrl}
            name={player.name}
            alt=""
            size={detailed ? 'lg' : 'md'}
          />
          {presence !== undefined ? (
            // Decoration: the word is in the caption and in the card's name.
            <span
              aria-hidden="true"
              className={cn(
                'absolute bottom-0 right-0 h-sm w-sm rounded-full border-2 border-card',
                online ? 'bg-success' : 'bg-muted'
              )}
            />
          ) : null}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-xs">
          <span className="truncate font-heading text-lg font-bold text-on-card">
            {player.name}
          </span>
          <span className="flex flex-wrap items-center gap-xs">
            {player.rank ? (
              <BadgeV4 {...BADGE_V4} tone={IDENTITY_TONE}>
                {player.rank}
              </BadgeV4>
            ) : null}
            {caption ? <span className="text-sm text-muted-text">{caption}</span> : null}
          </span>
        </span>
      </>
    );

    const headerShape = 'flex w-full items-center gap-md text-left';

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col rounded-[var(--xen-radius-lg)] border border-border',
          'bg-card p-lg text-on-card',
          detailed ? 'gap-md' : 'gap-0',
          className
        )}
      >
        {interactive ? (
          <button
            type="button"
            onClick={() => onClick?.(player)}
            aria-label={spokenLine([
              player.name,
              player.rank,
              player.level != null ? `Level ${player.level}` : undefined,
              presence,
            ])}
            data-xen-v4-state=""
            style={CARD_STATE}
            className={cn(
              headerShape,
              'rounded-[var(--xen-radius-md)]',
              MIN_TAP_CLASS,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {header}
          </button>
        ) : (
          <div className={headerShape}>{header}</div>
        )}

        {/*
          A sibling of the activation, never a descendant: inside `role="button"`
          every one of these cells is presentational — see change 1.
        */}
        {detailed ? (
          stats.length > 0 ? (
            <div className="flex flex-wrap gap-sm">
              {stats.map((stat, index) => (
                <div
                  key={`${stat.label}-${index}`}
                  className={cn(
                    'flex min-w-[calc(var(--xen-space-2xl)_*_2)] flex-1 basis-[30%] flex-col gap-xs',
                    'rounded-[var(--xen-radius-md)] border border-border bg-surface px-md py-sm'
                  )}
                >
                  <span className={cn('text-lg font-bold text-on-surface', TABULAR_CLASS)}>
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-text">{stat.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-text">No stats yet</p>
          )
        ) : null}
      </div>
    );
  }
);
