import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { ROW_V4_TEXT_CLASS, ROW_V4_TRAILING_CLASS } from '../dashboard/internal/row-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import type { LobbyRowProps } from './LobbyRow';
import { BADGE_V4, IDENTITY_TONE, TABULAR_CLASS, slotParts, spokenLine } from './internal/arcade-v4';

export interface LobbyRowV4Props extends LobbyRowProps {
  /** The join action's copy while the room can be joined. Default `'Join'`. */
  joinLabel?: string;
  /** Its copy while the room is at capacity. Default `'Full'`. */
  fullLabel?: string;
  /** Its copy while the match has already started. Default `'In progress'`. */
  inProgressLabel?: string;
  /** The slot meter's caption. Default `'3 / 10 players'`. */
  formatSlots?: (filled: number, capacity: number) => string;
}

/**
 * **V4 lobby row** — same props as {@link LobbyRow} plus `joinLabel`,
 * `fullLabel`, `inProgressLabel` and `formatSlots`.
 *
 * ## Four changes
 *
 * 1. **A room with no capacity stops claiming to be full.** The base computed
 *    `clamp(players, 0, cap || players)` and printed `` `${filled}/${cap || players}` ``,
 *    so a lobby with `capacity: 0` rendered **5/5** and a red "full" badge —
 *    while `isFull` required `cap > 0`, so `joinable` stayed true and the
 *    button beside the badge still said **Join**. The badge and the button
 *    were reading the same zero and disagreeing about it. `slotParts()` reads
 *    it once, for both twins, and answers what it actually means: no capacity
 *    is an *unknown* room, not a full one.
 * 2. **The slot meter is a meter.** It was a strip of `aria-hidden`-by-omission
 *    pips inside a role-less `<div>` that carried an `aria-label` — which ARIA
 *    forbids on a generic element, so the browser discarded it and the
 *    occupancy was drawn for sighted users and for nobody else. It is a real
 *    `progressbar` with a value now, and its caption is `formatSlots`.
 * 3. **A full room is not an error.** The badge was `danger`. Capacity is a
 *    fact about a room, not a fault in it, and painting it red leaves the
 *    status colours meaning nothing when a queue genuinely fails. It is a
 *    neutral chip, and the reason a room cannot be joined is a **word** on the
 *    button — `fullLabel` or `inProgressLabel` — not a colour.
 * 4. **The row has one name**, built with `spokenLine()`, on a `group` rather
 *    than scattered across four unlabelled stops; and it borrows the shared
 *    row family's text and trailing columns so a lobby list lines up with
 *    every other list in the kit.
 */
export const LobbyRowV4 = React.forwardRef<HTMLDivElement, LobbyRowV4Props>(function LobbyRowV4(
  {
    lobby,
    variant = 'default',
    joining = false,
    onJoin,
    joinLabel = 'Join',
    fullLabel = 'Full',
    inProgressLabel = 'In progress',
    formatSlots,
    className,
  },
  ref
) {
  if (!lobby?.name) return null;

  const compact = variant === 'compact';
  const slots = slotParts(lobby.players, lobby.capacity);
  const known = slots.capacity > 0;

  const joinable = slots.joinable && !lobby.inProgress;
  const actionWord = lobby.inProgress ? inProgressLabel : slots.full ? fullLabel : joinLabel;

  const slotText = known
    ? (formatSlots ?? ((filled: number, capacity: number) => `${filled} / ${capacity} players`))(
        slots.filled,
        slots.capacity
      )
    : undefined;
  const countText = known ? `${slots.filled}/${slots.capacity}` : String(slots.filled);

  const subline = metaLine([
    lobby.host ? `Host ${lobby.host}` : undefined,
    compact ? undefined : lobby.mode,
  ]);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={spokenLine([
        lobby.name,
        lobby.locked ? 'Locked' : undefined,
        lobby.host ? `Host ${lobby.host}` : undefined,
        lobby.mode,
        slotText,
        lobby.inProgress ? inProgressLabel : slots.full ? fullLabel : undefined,
      ])}
      className={cn(
        'flex flex-col rounded-[var(--xen-radius-lg)] border border-border',
        'bg-card p-lg text-on-card',
        compact ? 'gap-xs' : 'gap-sm',
        className
      )}
    >
      <div className="flex items-center gap-md">
        <div className={ROW_V4_TEXT_CLASS}>
          <span className="flex items-center gap-xs">
            {lobby.locked ? <IconV4 glyph="🔒" size="sm" color="muted" aria-hidden="true" /> : null}
            <span className="min-w-0 truncate text-base font-bold text-on-card">{lobby.name}</span>
          </span>
          {subline ? <span className="truncate text-xs text-muted-text">{subline}</span> : null}
        </div>

        <div className={ROW_V4_TRAILING_CLASS}>
          <BadgeV4 {...BADGE_V4} tone={IDENTITY_TONE} className={TABULAR_CLASS}>
            {countText}
          </BadgeV4>
          {onJoin ? (
            <ButtonV4
              variant={joinable ? 'primary' : 'secondary'}
              size="sm"
              disabled={!joinable || joining}
              aria-busy={joining || undefined}
              onClick={() => onJoin(lobby)}
              aria-label={`${actionWord} ${lobby.name}`}
            >
              {actionWord}
            </ButtonV4>
          ) : null}
        </div>
      </div>

      {/*
        A value, not a row of coloured pips: the occupancy is the one number in
        this row a player is actually deciding on.
      */}
      {!compact && known && slotText ? (
        <ProgressV4
          value={slots.filled}
          max={slots.capacity}
          tone="primary"
          size="sm"
          aria-label={slotText}
        />
      ) : null}
    </div>
  );
});
