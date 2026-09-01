import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { BADGE_V4, onPair, spokenLine } from './internal/event-v4';
import type { CheckInRowProps } from './CheckInRow';

export interface CheckInRowV4Props extends CheckInRowProps {
  /** Action label while the attendee is not in. Default `'Check in'`. */
  checkInLabel?: string;
  /** State label once the attendee is in. Default `'Checked in'`. */
  checkedInLabel?: string;
  /** Action label that reverses a check-in. Default `'Undo check-in'`. */
  undoLabel?: string;
}

/**
 * **V4 check-in row** — same props as {@link CheckInRow} plus `checkInLabel`,
 * `checkedInLabel` and `undoLabel`.
 *
 * ## Four changes
 *
 * 1. **The only control on the row clears 44.** The toggle was about 34px
 *    tall, and this is a staff surface: someone works a door with one hand,
 *    at arm's length, holding a scanner in the other. It is now a full tap
 *    target.
 * 2. **The attendee region is a sibling of the toggle, not a wrapper round
 *    it.** The row's identity block names itself once — name, ticket type,
 *    state, time — and the button stays its own reachable element beside it,
 *    rather than being flattened into a single leaf.
 * 3. **A press is a state layer and disabled is 0.38.** The base drew press as
 *    `opacity: 0.85` and disabled as `opacity: 0.5`; the two were close enough
 *    that a pressed button read as an unavailable one.
 * 4. **Every word on the row is a prop.** `Check in`, `Checked in` and
 *    `Undo check-in` were hard-coded English on a component whose whole job is
 *    to be operated at speed by venue staff.
 */
export function CheckInRowV4({
  name,
  avatarUrl,
  ticketType,
  checkedInAt,
  checkedIn = false,
  checkInLabel = 'Check in',
  checkedInLabel = 'Checked in',
  undoLabel = 'Undo check-in',
  onToggle,
  disabled = false,
  style,
}: CheckInRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const tap = minTap(tokens.spacing);
  const stateWord = checkedIn
    ? checkedInAt
      ? `${checkedInLabel} · ${checkedInAt}`
      : checkedInLabel
    : 'Not in';
  const fill = checkedIn ? colors.success : colors.primary;
  const ink = onPair(theme, checkedIn ? 'success' : 'primary');

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          minHeight: tap,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
        style,
      ]}
    >
      {/* One name for the attendee, and it stops here — the toggle below is a
          sibling, so it stays reachable. */}
      <View
        accessible
        accessibilityLabel={spokenLine([name, ticketType, stateWord])}
        style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1 }}
      >
        <AvatarV4 src={avatarUrl} name={name} size="sm" />
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
            {name}
          </TextV4>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.sm,
              flexWrap: 'wrap',
            }}
          >
            {ticketType ? (
              <TextV4 size="sm" tone="mutedText">
                {ticketType}
              </TextV4>
            ) : null}
            <BadgeV4 {...BADGE_V4} tone={checkedIn ? 'success' : 'neutral'}>
              {stateWord}
            </BadgeV4>
          </View>
        </View>
      </View>

      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: checkedIn, disabled }}
        accessibilityLabel={spokenLine([checkedIn ? undoLabel : checkInLabel, name])}
        disabled={disabled}
        onPress={() => onToggle?.(!checkedIn)}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
          minHeight: tap,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.full,
          backgroundColor: pressed && !disabled ? pressOver(theme, fill, ink) : fill,
          opacity: disabledOpacity(theme.state, disabled),
        })}
      >
        <TextV4 size="sm" weight="bold" style={{ color: ink }}>
          {checkedIn ? '✓' : '+'}
        </TextV4>
        <TextV4 size="sm" weight="bold" style={{ color: ink }}>
          {checkedIn ? checkedInLabel : checkInLabel}
        </TextV4>
      </Pressable>
    </View>
  );
}
