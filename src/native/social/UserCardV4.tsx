import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { usePressScale } from '../primitives/internal/motion';
import { FollowButton } from './FollowButton';
import { ProfileStats } from './ProfileStats';
import type { UserCardProps } from './UserCard';

/** Drop-in for {@link UserCardProps} — same props, the V4 "feed" design. */
export type UserCardV4Props = UserCardProps;

/**
 * UserCard — **V4** "feed" design. The clean, airy take on a user block: a
 * larger avatar, a bold name with a primary verified tick, a muted handle, a
 * bio line and {@link ProfileStats} in the `card` variant, plus an inline
 * {@link FollowButton} when a `followState` is given. The `card` variant is an
 * elevated rounded surface with generous whitespace. Same props/behavior as
 * {@link UserCardProps}; token-only colors via `useXenitionTheme()`. The
 * `appearance` prop is accepted for drop-in parity; the feed line keeps its own
 * clean elevated surface.
 */
export function UserCardV4({
  user,
  variant = 'row',
  stats,
  followState,
  followLoading,
  onFollow,
  onPress,
  appearance: _appearance = 'classic',
  style,
}: UserCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const isCard = variant === 'card';

  const identity = (
    <View style={{ flex: 1, gap: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {user.name}
        </Text>
        {user.verified ? (
          <Text accessibilityLabel="Verified" style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm }}>
            ✓
          </Text>
        ) : null}
      </View>
      {user.handle ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          @{user.handle}
        </Text>
      ) : null}
    </View>
  );

  const follow =
    followState != null ? (
      <FollowButton state={followState} loading={followLoading} onPress={onFollow} />
    ) : null;

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
      <Avatar src={user.avatarUrl} name={user.name} size={isCard ? 'xl' : 'lg'} />
      {identity}
      {follow}
    </View>
  );

  const inner = isCard ? (
    <View style={{ gap: tokens.spacing.md }}>
      {header}
      {user.bio ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.5 }}>
          {user.bio}
        </Text>
      ) : null}
      {stats && stats.length > 0 ? <ProfileStats stats={stats} /> : null}
    </View>
  ) : (
    header
  );

  // The feed line's user block is a clean elevated surface: a bordered, softly
  // shadowed card for the `card` variant, and a bare surface for the compact
  // `row`. Every value is a compiled theme token (no literals).
  const containerStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: isCard ? colors.card : colors.surface,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      ...(isCard
        ? {
            borderColor: colors.border,
            borderWidth: 1,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.06,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
          }
        : null),
    },
    style,
  ];

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={user.name}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.98 : 1 }]}
        >
          {inner}
        </Pressable>
      </Animated.View>
    );
  }
  return <View style={containerStyle}>{inner}</View>;
}
