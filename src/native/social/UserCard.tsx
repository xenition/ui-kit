import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { usePressScale } from '../primitives/internal/motion';
import { FollowButton, type FollowState } from './FollowButton';
import { ProfileStats, type ProfileStat } from './ProfileStats';

export type UserCardVariant = 'row' | 'card';

export interface SocialUser {
  name: string;
  /** @handle without the `@`. */
  handle?: string;
  avatarUrl?: string;
  bio?: string;
  /** Verified check next to the name. */
  verified?: boolean;
}

export interface UserCardProps {
  user: SocialUser;
  /**
   * `row` — compact list row (avatar · name/handle · follow button).
   * `card` — full profile card (adds bio + stats). Default `row`.
   */
  variant?: UserCardVariant;
  /** Stats shown in the `card` variant. */
  stats?: ReadonlyArray<ProfileStat>;
  /** Follow relationship; when set a {@link FollowButton} is rendered. */
  followState?: FollowState;
  followLoading?: boolean;
  onFollow?: (state: FollowState) => void;
  /** Tapping the card/row (e.g. open the profile). */
  onPress?: () => void;
  /**
   * Surface treatment for the container — fill/border/elevation only;
   * radius/padding are unchanged. Default `'classic'` (the historical look:
   * a bare surface for `row`, a bordered surface for `card`).
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A user identity block in two shapes: a compact `row` for follower lists /
 * search results, and a full `card` with bio + {@link ProfileStats} for
 * profile previews. Includes an inline {@link FollowButton} when a
 * `followState` is given. Token-only.
 */
export function UserCard({
  user,
  variant = 'row',
  stats,
  followState,
  followLoading,
  onFollow,
  onPress,
  appearance = 'classic',
  style,
}: UserCardProps): React.ReactElement {
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
      <Avatar src={user.avatarUrl} name={user.name} size={isCard ? 'lg' : 'md'} />
      {identity}
      {follow}
    </View>
  );

  const inner = isCard ? (
    <View style={{ gap: tokens.spacing.sm }}>
      {header}
      {user.bio ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.4 }}>
          {user.bio}
        </Text>
      ) : null}
      {stats && stats.length > 0 ? <ProfileStats stats={stats} /> : null}
    </View>
  ) : (
    header
  );

  // `classic` preserves the historical look exactly: a bare surface for `row`
  // (no border) and a bordered surface for `card`. Any other appearance opts
  // the container into that shared treatment (fill/border/elevation only).
  const surface: ViewStyle =
    appearance === 'classic'
      ? isCard
        ? appearanceStyle('classic', colors, tokens)
        : { backgroundColor: colors.surface }
      : appearanceStyle(appearance, colors, tokens);

  const containerStyle: StyleProp<ViewStyle> = [
    {
      ...surface,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.md,
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
          style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }]}
        >
          {inner}
        </Pressable>
      </Animated.View>
    );
  }
  return <View style={containerStyle}>{inner}</View>;
}
