import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { usePressScale } from '../primitives/internal/motion';
import { FollowButton } from './FollowButton';
import type { UserCardProps } from './UserCard';

/** Drop-in for {@link UserCard} — identical props, a different design. */
export type UserCardV3Props = UserCardProps;

/**
 * UserCard, design V3 — a **compact follow row**: small avatar, a tight
 * name/handle stack, and a trailing {@link FollowButton}. The `card` variant
 * adds a single-line bio and an inline stats summary but stays dense and
 * borderless. Same props as {@link UserCard}, token-only.
 */
export function UserCardV3({
  user,
  variant = 'row',
  stats,
  followState,
  followLoading,
  onFollow,
  onPress,
  style,
}: UserCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const isCard = variant === 'card';

  const containerStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.sm,
    },
    style,
  ];

  // Compact single-line stats summary (e.g. "12 Posts · 3.4k Followers").
  const statsLine =
    isCard && stats && stats.length > 0
      ? stats.map((s) => `${String(s.value)} ${s.label}`).join(' · ')
      : null;

  const inner = (
    <>
      <Avatar src={user.avatarUrl} name={user.name} size="md" />
      <View style={{ flex: 1, gap: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {user.name}
          </Text>
          {user.verified ? (
            <Text accessibilityLabel="Verified" style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs }}>
              ✓
            </Text>
          ) : null}
          {user.handle ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              @{user.handle}
            </Text>
          ) : null}
        </View>
        {isCard && user.bio ? (
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs }}>
            {user.bio}
          </Text>
        ) : null}
        {statsLine ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {statsLine}
          </Text>
        ) : null}
      </View>
      {followState != null ? (
        <FollowButton state={followState} loading={followLoading} onPress={onFollow} size="sm" />
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={user.name}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.85 : 1 }]}
        >
          {inner}
        </Pressable>
      </Animated.View>
    );
  }
  return <View style={containerStyle}>{inner}</View>;
}
