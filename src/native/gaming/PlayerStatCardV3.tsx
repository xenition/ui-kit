import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { Avatar, useXenitionTheme } from '../primitives';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { PlayerStatCardProps } from './PlayerStatCard';

/** Drop-in alternate of {@link PlayerStatCardProps} — identical prop contract. */
export type PlayerStatCardV3Props = PlayerStatCardProps;

/**
 * PlayerStatCard — design variant **V3**: a **single compact row with inline
 * stats**. A small avatar and the handle · rank on the left, then the headline
 * stats pushed to the right as tight `value / label` pairs — a scan-friendly
 * roster line rather than V1's card or V2's portrait passport. Same props as
 * {@link PlayerStatCardProps}; the (removed) variant switch is ignored and up to
 * three inline stats are shown. Token-only, minimal (hairline underline, no box).
 */
export function PlayerStatCardV3({
  player,
  online,
  onPress,
  style,
}: PlayerStatCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter({ translateY: 6 });
  const stats = (player.stats ?? []).slice(0, 3);

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <Avatar
        src={player.avatarUrl}
        name={player.name}
        size="sm"
        status={online === undefined ? undefined : online ? 'online' : 'offline'}
      />
      <View style={{ flex: 1, gap: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {player.name}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[player.rank, player.level != null ? `Lv ${player.level}` : null].filter(Boolean).join(' · ') || 'Unranked'}
        </Text>
      </View>
      {stats.length > 0 ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
          {stats.map((s, i) => (
            <View key={`${s.label}-${i}`} style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{s.value}</Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{s.label}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );

  if (!onPress) {
    return <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>{body}</Animated.View>;
  }
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${player.name}${player.rank ? `, ${player.rank}` : ''}`}
        onPress={() => onPress(player)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
