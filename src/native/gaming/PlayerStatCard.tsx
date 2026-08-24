import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Avatar, Badge, Card, useXenitionTheme } from '../primitives';
import type { PlayerProfile } from './types';

export type PlayerStatCardVariant = 'compact' | 'detailed';

export interface PlayerStatCardProps {
  /** The player to render. */
  player: PlayerProfile;
  /**
   * - `compact`  — avatar + name + rank in a single row (default).
   * - `detailed` — adds a grid of the player's headline stats.
   */
  variant?: PlayerStatCardVariant;
  /** Presence indicator on the avatar. */
  online?: boolean;
  /** Called when the card is tapped — open the full profile. */
  onPress?: (player: PlayerProfile) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A player profile summary — avatar (with optional presence), handle, rank/
 * level, and (in `detailed`) a responsive grid of headline stats. Renders a
 * graceful "No stats yet" line when `detailed` has no stats. `onPress(player)`
 * opens the profile. Composes `Card`, `Avatar`, `Badge`. Token-only.
 */
export function PlayerStatCard({
  player,
  variant = 'compact',
  online,
  onPress,
  style,
}: PlayerStatCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const detailed = variant === 'detailed';
  const stats = player.stats ?? [];

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      <Avatar
        src={player.avatarUrl}
        name={player.name}
        size={detailed ? 'lg' : 'md'}
        status={online === undefined ? undefined : online ? 'online' : 'offline'}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
        >
          {player.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          {player.rank ? (
            <Badge tone="primary" variant="soft" size="sm">
              {player.rank}
            </Badge>
          ) : null}
          {player.level != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              Level {player.level}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );

  const grid = detailed ? (
    stats.length > 0 ? (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
        {stats.map((s, i) => (
          <View
            key={`${s.label}-${i}`}
            style={{
              flexGrow: 1,
              flexBasis: '30%',
              minWidth: 84,
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.md,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              gap: 2,
            }}
          >
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
              {s.value}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{s.label}</Text>
          </View>
        ))}
      </View>
    ) : (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No stats yet</Text>
    )
  ) : null;

  const card = (
    <Card style={[{ gap: detailed ? tokens.spacing.md : 0 }, style]}>
      {header}
      {grid}
    </Card>
  );

  if (!onPress) return card;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${player.name}${player.rank ? `, ${player.rank}` : ''}`}
      onPress={() => onPress(player)}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {card}
    </Pressable>
  );
}
