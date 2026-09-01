import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { BADGE_V4, IDENTITY_TONE, spokenLine } from './internal/arcade-v4';
import type { PlayerStatCardProps } from './PlayerStatCard';

export interface PlayerStatCardV4Props extends PlayerStatCardProps {
  /** Presence wording while `online` is true. Default `'Online'`. */
  onlineLabel?: string;
  /** Presence wording while it is false. Default `'Offline'`. */
  offlineLabel?: string;
}

/**
 * **V4 player stat card** — same props as {@link PlayerStatCard} plus
 * `onlineLabel` and `offlineLabel`.
 *
 * ## Four changes
 *
 * 1. **The stats grid survives the card being tappable.** `detailed` exists
 *    entirely to show K/D, wins and hours — and the moment `onPress` was
 *    supplied, the whole card became one `accessible` `Pressable` named
 *    `` `${name}, ${rank}` ``, which prunes every one of those cells. (On web
 *    the same shape means the grid is inside `role="button"`, where its
 *    content is presentational.) The activation now wraps the header only and
 *    the grid is its sibling, announced as one line.
 * 2. **Presence is a word, on both twins.** It was a coloured dot on the
 *    avatar and nothing else — the one state in the card that a colour-blind
 *    or blind user could not read at all, and the twins disagreed about
 *    whether it was announced.
 * 3. **A rank is identity, not a status.** `Diamond II` was a `primary` badge;
 *    a tier is a category, and the whole point of this module's `IDENTITY_TONE`
 *    is that a category does not spend a status slot.
 * 4. **A press is a state layer**, not `opacity: 0.9`, and the empty
 *    `detailed` grid still says so in words rather than collapsing.
 */
export function PlayerStatCardV4({
  player,
  variant = 'compact',
  online,
  onlineLabel = 'Online',
  offlineLabel = 'Offline',
  onPress,
  style,
}: PlayerStatCardV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const detailed = variant === 'detailed';
  const stats = player.stats ?? [];
  const presence = online === undefined ? null : online ? onlineLabel : offlineLabel;

  const header = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <AvatarV4
        src={player.avatarUrl}
        name={player.name}
        size={detailed ? 'lg' : 'md'}
        status={online === undefined ? undefined : online ? 'online' : 'offline'}
      />
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <TextV4 size="lg" weight="bold" tone="onCard" numberOfLines={1}>
          {player.name}
        </TextV4>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            flexWrap: 'wrap',
          }}
        >
          {player.rank ? (
            <BadgeV4 {...BADGE_V4} tone={IDENTITY_TONE}>
              {player.rank}
            </BadgeV4>
          ) : null}
          {player.level != null ? (
            <TextV4 size="sm" tone="mutedText" numeric="tabular">
              {`Level ${player.level}`}
            </TextV4>
          ) : null}
          {/* Change 2: the presence dot on the avatar is colour alone. */}
          {presence ? (
            <TextV4 size="sm" tone="mutedText">
              {presence}
            </TextV4>
          ) : null}
        </View>
      </View>
    </View>
  );

  const headerName = spokenLine([
    player.name,
    player.rank,
    player.level != null ? `Level ${player.level}` : null,
    presence,
  ]);

  const statsName = spokenLine(stats.map((s) => `${s.label} ${s.value}`));

  const grid = detailed ? (
    stats.length > 0 ? (
      // Change 1: a sibling of the activation, so naming the card cannot
      // delete the numbers the variant exists to show.
      <View
        accessible
        accessibilityLabel={statsName}
        style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}
      >
        {stats.map((s, i) => (
          <View
            key={`${s.label}-${i}`}
            style={{
              flexGrow: 1,
              flexBasis: '30%',
              minWidth: tokens.spacing['2xl'] + tokens.spacing.xl,
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.md,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              gap: tokens.spacing.xs / 2,
            }}
          >
            <TextV4 size="lg" weight="bold" tone="onSurface" numeric="tabular">
              {s.value}
            </TextV4>
            <TextV4 size="xs" tone="mutedText">
              {s.label}
            </TextV4>
          </View>
        ))}
      </View>
    ) : (
      <TextV4 size="sm" tone="mutedText">
        No stats yet
      </TextV4>
    )
  ) : null;

  return (
    <View
      style={[
        {
          gap: detailed ? tokens.spacing.md : 0,
          padding: tokens.spacing.lg,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
        style,
      ]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={headerName}
          onPress={() => onPress(player)}
        >
          {({ pressed }) => header(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={headerName}>
          {header(false)}
        </View>
      )}
      {grid}
    </View>
  );
}
