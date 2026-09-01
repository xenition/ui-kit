import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  BADGE_V4,
  IDENTITY_TONE,
  placeholderGround,
  slotParts,
  spokenLine,
} from './internal/arcade-v4';
import type { LobbyRowProps } from './LobbyRow';

export interface LobbyRowV4Props extends LobbyRowProps {
  /** The join button's label while the room can be joined. Default `'Join'`. */
  joinLabel?: string;
  /** Its label once the room is full. Default `'Full'`. */
  fullLabel?: string;
  /** Its label once the match has started. Default `'In progress'`. */
  inProgressLabel?: string;
  /** The slot readout. Default `'3 / 10'`. */
  formatSlots?: (filled: number, capacity: number) => string;
}

/**
 * **V4 lobby row** — same props as {@link LobbyRow} plus `joinLabel`,
 * `fullLabel`, `inProgressLabel` and `formatSlots`.
 *
 * ## Five changes
 *
 * 1. **A lobby with no capacity stops calling itself full.** The base computed
 *    `clamp(players, 0, capacity || players)` and printed
 *    `` `${filled}/${capacity || players}` ``, so a room with `capacity: 0`
 *    showed **5/5** — apparently full — while `isFull` required `capacity > 0`
 *    and so left Join **enabled**. The badge and the button read the same zero
 *    and disagreed about it. `slotParts()` reads it once: no capacity is an
 *    unknown room, not a full one, and an unknown room is not joinable.
 * 2. **A full room is a capacity fact, not an error.** The badge was `danger`
 *    — the tone this kit spends on failures — for a room that is simply
 *    popular. It is a neutral chip, and the word in the button says which
 *    state it is in.
 * 3. **The slot meter is a real `progressbar` with a value.** It was a row of
 *    coloured pips under one flattened label, so a reader was told "3 of 10
 *    slots filled" but could not get the meter itself, and a screen at 200%
 *    got ten one-pixel slivers. The track is the module's opaque placeholder
 *    ground rather than the `border` hairline used as a fill.
 * 4. **The row is one spoken name**, built from the lock, the name, the host,
 *    the mode and the slots — the base left the title, the meta line, the
 *    padlock and the badge as four separate stops, and drew a blank
 *    `' '` caption when a lobby had neither host nor mode.
 * 5. **Join clears 44** and its label is a prop on both twins.
 */
export function LobbyRowV4({
  lobby,
  variant = 'default',
  joining = false,
  joinLabel = 'Join',
  fullLabel = 'Full',
  inProgressLabel = 'In progress',
  formatSlots = (filled, capacity) => `${filled} / ${capacity}`,
  onJoin,
  style,
}: LobbyRowV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const compact = variant === 'compact';
  const tap = minTap(tokens.spacing);

  const slots = slotParts(lobby.players, lobby.capacity);
  // With no capacity there is no fraction to be part of, so the bare count is
  // the honest readout — inventing a denominator is what produced "5/5".
  const slotText =
    slots.capacity > 0 ? formatSlots(slots.filled, slots.capacity) : String(slots.filled);

  const canJoin = slots.joinable && lobby.inProgress !== true;
  const buttonLabel =
    lobby.inProgress === true ? inProgressLabel : slots.full ? fullLabel : joinLabel;

  const caption = metaLine([
    lobby.host ? `Host ${lobby.host}` : undefined,
    !compact ? lobby.mode : undefined,
  ]);

  const name = spokenLine([
    lobby.locked ? 'Locked' : null,
    lobby.name,
    lobby.host ? `Host ${lobby.host}` : null,
    lobby.mode,
    slotText,
    lobby.inProgress === true ? inProgressLabel : null,
  ]);

  return (
    <View
      style={[
        {
          gap: compact ? tokens.spacing.xs : tokens.spacing.sm,
          padding: tokens.spacing.lg,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {/* Change 4: one name, on the element that holds no controls. */}
        <View
          accessible
          accessibilityLabel={name}
          style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            {lobby.locked ? <TextV4 size="sm" tone="mutedText">🔒</TextV4> : null}
            <TextV4
              size="base"
              weight="bold"
              tone="onCard"
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >
              {lobby.name}
            </TextV4>
          </View>
          {caption ? (
            <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
              {caption}
            </TextV4>
          ) : null}
        </View>

        {/* The count is already in the row's name and in the meter's value, so
            the chip is a third reading of it and is drawn, not spoken. */}
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <BadgeV4 {...BADGE_V4} tone={IDENTITY_TONE}>
            {slotText}
          </BadgeV4>
        </View>

        {onJoin ? (
          <ButtonV4
            variant={canJoin ? 'primary' : 'secondary'}
            size="sm"
            loading={joining}
            disabled={!canJoin}
            onPress={() => onJoin(lobby)}
            accessibilityLabel={spokenLine([buttonLabel, lobby.name])}
            style={{ minHeight: tap }}
          >
            {buttonLabel}
          </ButtonV4>
        ) : null}
      </View>

      {!compact && slots.ratio != null ? (
        <View
          accessibilityRole="progressbar"
          accessibilityLabel={slotText}
          accessibilityValue={{ min: 0, max: slots.capacity, now: slots.filled }}
          style={{
            height: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: placeholderGround(theme),
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${Math.round(slots.ratio * 100)}%`,
              height: '100%',
              backgroundColor: colors.primary,
            }}
          />
        </View>
      ) : null}
    </View>
  );
}
