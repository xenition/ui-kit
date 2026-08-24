import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { Avatar, Badge, useXenitionTheme } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { withAlpha } from './types';
import type { PlayerStatCardProps } from './PlayerStatCard';

/** Drop-in alternate of {@link PlayerStatCardProps} — identical prop contract. */
export type PlayerStatCardV2Props = PlayerStatCardProps;

/**
 * PlayerStatCard — design variant **V2**: a **centered profile card** with a
 * large ringed avatar over a tinted banner, the handle + rank + level stacked
 * below it, and the headline stats in a bordered grid. Where V1 is a left-
 * aligned single row (avatar · name · rank), V2 is a portrait "player passport"
 * — hero avatar centered, identity underneath, then a full stat grid regardless
 * of the (removed) variant switch. Same props as {@link PlayerStatCardProps};
 * renders a graceful "No stats yet" line when empty. Token-only, elevated.
 */
export function PlayerStatCardV2({
  player,
  online,
  onPress,
  style,
}: PlayerStatCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter({ translateY: 8 });
  const stats = player.stats ?? [];

  const body = (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      {/* Tinted identity banner behind the avatar. */}
      <View style={{ height: 44, backgroundColor: withAlpha(colors.primary, 0.14) }} />
      <View style={{ alignItems: 'center', paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, marginTop: -28, gap: tokens.spacing.xs }}>
        <Avatar
          src={player.avatarUrl}
          name={player.name}
          size="xl"
          ring
          status={online === undefined ? undefined : online ? 'online' : 'offline'}
        />
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
          {player.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap', justifyContent: 'center' }}>
          {player.rank ? (
            <Badge tone="primary" variant="soft" size="sm">
              {player.rank}
            </Badge>
          ) : null}
          {player.level != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Level {player.level}</Text>
          ) : null}
        </View>

        {stats.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm, alignSelf: 'stretch' }}>
            {stats.map((s, i) => (
              <View
                key={`${s.label}-${i}`}
                style={{
                  flexGrow: 1,
                  flexBasis: '28%',
                  minWidth: 80,
                  alignItems: 'center',
                  backgroundColor: withAlpha(colors.primary, 0.06),
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: tokens.radius.md,
                  paddingVertical: tokens.spacing.sm,
                  paddingHorizontal: tokens.spacing.sm,
                  gap: 2,
                }}
              >
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{s.value}</Text>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{s.label}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.sm }}>No stats yet</Text>
        )}
      </View>
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
