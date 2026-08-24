import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { usePressScale } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { FollowButton } from './FollowButton';
import { ProfileStats } from './ProfileStats';
import type { UserCardProps } from './UserCard';

/** Drop-in for {@link UserCard} — identical props, a different design. */
export type UserCardV2Props = UserCardProps;

/**
 * UserCard, design V2 — a **banner profile card**: a tinted cover strip with an
 * **overlapping avatar**, centered identity, bio, {@link ProfileStats}, and a
 * prominent follow CTA. The `row` variant renders the same banner idiom, minus
 * bio/stats. Same props as {@link UserCard}, token-only.
 */
export function UserCardV2({
  user,
  variant = 'row',
  stats,
  followState,
  followLoading,
  onFollow,
  onPress,
  style,
}: UserCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const isCard = variant === 'card';
  const bannerHeight = isCard ? 72 : 48;
  const avatarSize = isCard ? 'lg' : 'md';
  const avatarOverlap = isCard ? 28 : 20;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderRadius: tokens.radius.lg,
      overflow: 'hidden',
      ...shadow('md', tokens),
    },
    style,
  ];

  const banner = (
    <View style={{ height: bannerHeight, backgroundColor: withAlpha(colors.primary, 0.16) }}>
      {/* A second tint on the right fakes a two-tone gradient wash, token-pure. */}
      <View style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%', backgroundColor: withAlpha(colors.accent, 0.16) }} />
    </View>
  );

  const identity = (
    <View style={{ alignItems: 'center', gap: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {user.name}
        </Text>
        {user.verified ? (
          <Text accessibilityLabel="Verified" style={{ color: colors.primaryText, fontSize: tokens.typography.scale.base }}>
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

  const inner = (
    <View>
      {banner}
      <View style={{ alignItems: 'center', paddingHorizontal: tokens.spacing.md, paddingBottom: tokens.spacing.md, marginTop: -avatarOverlap, gap: tokens.spacing.sm }}>
        <View style={{ borderRadius: tokens.radius.full, borderWidth: 3, borderColor: colors.surface }}>
          <Avatar src={user.avatarUrl} name={user.name} size={avatarSize} />
        </View>
        {identity}
        {isCard && user.bio ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, textAlign: 'center', lineHeight: tokens.typography.scale.sm * 1.4 }}>
            {user.bio}
          </Text>
        ) : null}
        {isCard && stats && stats.length > 0 ? <ProfileStats stats={stats} dividers style={{ alignSelf: 'stretch' }} /> : null}
        {followState != null ? (
          <FollowButton state={followState} loading={followLoading} onPress={onFollow} size={isCard ? 'md' : 'sm'} style={{ minWidth: isCard ? 160 : 120 }} />
        ) : null}
      </View>
    </View>
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
          style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.95 : 1 }]}
        >
          {inner}
        </Pressable>
      </Animated.View>
    );
  }
  return <View style={containerStyle}>{inner}</View>;
}
