import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { FollowButton } from './FollowButton';

/** One suggested account in the "who to follow" row. */
export interface SuggestedUser {
  /** Stable id passed back to `onFollow` / `onPressUser`. */
  id: string;
  /** Display name (shown bold, truncated). */
  name: string;
  /** @handle without the leading `@`. */
  handle?: string;
  /** Avatar image; falls back to initials from `name`. */
  avatarUrl?: string;
  /** Show the primary verified tick after the name. */
  verified?: boolean;
  /** Optional one-line bio shown muted under the handle. */
  bio?: string;
  /** Whether the viewer already follows this user (drives the button state). */
  following?: boolean;
}

export interface SuggestedUsersProps {
  /** Section header. Defaults to `Who to follow`. */
  title?: string;
  /** The accounts to show as horizontally-scrolling chip cards. */
  users: readonly SuggestedUser[];
  /** Fires with the user's `id` when its Follow/Following button is tapped. */
  onFollow?: (id: string) => void;
  /** Fires with the user's `id` when the chip (avatar/name) is tapped. */
  onPressUser?: (id: string) => void;
  /** Fires when the header "See all" action is tapped. Renders the action when set. */
  onSeeAll?: () => void;
  /** Optional style override for the block container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * SuggestedUsers — **V4** "feed" design. A "who to follow" block: a header
 * (`title` + optional "See all") over a horizontally-scrolling `ScrollView` of
 * user chip cards. Each chip is an elevated rounded card with a big avatar, bold
 * name with a primary verified tick, muted handle/bio, and a
 * {@link FollowButton}; the whole chip (min 44px) opens the profile via
 * `onPressUser`. Presentational; token-only colors via `useXenitionTheme()`.
 * Native twin of the web `SuggestedUsers`.
 */
export function SuggestedUsers({
  title = 'Who to follow',
  users,
  onFollow,
  onPressUser,
  onSeeAll,
  style,
}: SuggestedUsersProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View accessibilityRole="list" accessibilityLabel={title} style={[{ gap: tokens.spacing.sm }, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale.base, fontWeight: '800', color: colors.onSurface }}>{title}</Text>
        {onSeeAll ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="See all"
            onPress={onSeeAll}
            hitSlop={8}
            style={({ pressed }) => ({
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: tokens.spacing.xs,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.primaryText }}>See all</Text>
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md, paddingBottom: tokens.spacing.xs }}
      >
        {users.map((user) => {
          const meta = user.bio ?? (user.handle ? `@${user.handle}` : undefined);
          return (
            <View
              key={user.id}
              accessibilityRole="none"
              style={{
                width: 160,
                alignItems: 'center',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
              }}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={user.name}
                disabled={!onPressUser}
                onPress={onPressUser ? () => onPressUser(user.id) : undefined}
                style={({ pressed }) => ({
                  minHeight: 44,
                  alignItems: 'center',
                  gap: tokens.spacing.xs,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Avatar src={user.avatarUrl} name={user.name} size="lg" />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, maxWidth: '100%' }}>
                  <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.sm, fontWeight: '800', color: colors.onSurface }}>
                    {user.name}
                  </Text>
                  {user.verified ? (
                    <Text accessibilityLabel="Verified" style={{ fontSize: tokens.typography.scale.xs, color: colors.primaryText }}>
                      ✓
                    </Text>
                  ) : null}
                </View>
                {meta ? (
                  <Text numberOfLines={2} style={{ fontSize: tokens.typography.scale.xs, textAlign: 'center', color: colors.muted }}>
                    {meta}
                  </Text>
                ) : null}
              </Pressable>

              <FollowButton
                state={user.following ? 'following' : 'follow'}
                size="sm"
                style={{ alignSelf: 'stretch' }}
                onPress={onFollow ? () => onFollow(user.id) : undefined}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
