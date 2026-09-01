import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { GradientSurface } from './internal/GradientSurface';
import { feedGradient, feedInk, feedInkSoft, feedTile, feedBorder } from './internal/feed';

/** One profile stat (posts / followers / following) rendered as a frosted tile. */
export interface ProfileStat {
  /** Short caption under the value (e.g. `Followers`). */
  label: string;
  /** Pre-formatted display value (e.g. `12.4k`). */
  value: string;
}

export interface ProfileHeaderProps {
  /** Display name shown large in near-white ink over the gradient. */
  name: string;
  /** `@handle` without the leading `@`; shown as the soft-ink subtitle. */
  handle?: string;
  /** Avatar image URL; falls back to initials from `name`. */
  avatarUrl?: string;
  /** Show the primary verified tick beside the name. */
  verified?: boolean;
  /** Short bio / tagline shown under the identity line. */
  bio?: string;
  /** Stats rendered as a row of frosted tiles (posts / followers / following). */
  stats?: readonly ProfileStat[];
  /** Optional cover image URL layered under the brand gradient scrim. */
  coverUrl?: string;
  /** Owner mode: when `true`, renders an "Edit profile" CTA instead of Follow. */
  owner?: boolean;
  /** Current follow state (drives the Follow/Following CTA label + style). */
  following?: boolean;
  /** Fires when the Follow / Following CTA is pressed (visitor mode). */
  onFollow?: () => void;
  /** Fires when the "Edit profile" CTA is pressed (owner mode). */
  onEditProfile?: () => void;
  /** Optional style override for the outer container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * ProfileHeader — the profile-page hero for the social V4 "feed" line, and one of
 * the module's gradient identity moments. A brand-gradient cover (optionally over
 * a `coverUrl`) carries a large overlapping avatar, the name with a primary
 * verified tick, `@handle` + `bio` in near-white ink, a row of frosted stat tiles
 * (posts / followers / following), and a single CTA — "Edit profile" in `owner`
 * mode, otherwise a Follow / Following toggle. Every color derives from the brand
 * ramp via `GradientSurface` + `feed*` + `useXenitionTheme()` (no literals);
 * dark-mode safe.
 */
export function ProfileHeader({
  name,
  handle,
  avatarUrl,
  verified = false,
  bio,
  stats,
  coverUrl,
  owner = false,
  following = false,
  onFollow,
  onEditProfile,
  style,
}: ProfileHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = feedInk(r);
  const inkSoft = feedInkSoft(r);

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface colors={feedGradient(r)} style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }}>
        {coverUrl ? (
          <Image
            source={{ uri: coverUrl }}
            accessible={false}
            resizeMode="cover"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3 }}
          />
        ) : null}

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          <View style={{ borderRadius: tokens.radius.full, borderWidth: 3, borderColor: feedBorder(r, 0.4) }}>
            <Avatar src={avatarUrl} name={name} size="xl" />
          </View>

          {owner ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit profile"
              onPress={onEditProfile}
              style={({ pressed }) => ({
                minHeight: 44,
                justifyContent: 'center',
                paddingHorizontal: tokens.spacing.lg,
                borderRadius: tokens.radius.md,
                backgroundColor: feedTile(r),
                borderWidth: 1,
                borderColor: feedBorder(r),
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>Edit profile</Text>
            </Pressable>
          ) : (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: following }}
              accessibilityLabel={following ? 'Following' : 'Follow'}
              onPress={onFollow}
              style={({ pressed }) => ({
                minHeight: 44,
                justifyContent: 'center',
                paddingHorizontal: tokens.spacing.lg,
                borderRadius: tokens.radius.md,
                backgroundColor: following ? feedTile(r) : ink,
                borderWidth: following ? 1 : 0,
                borderColor: feedBorder(r),
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text style={{ color: following ? ink : colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                {following ? 'Following' : 'Follow'}
              </Text>
            </Pressable>
          )}
        </View>

        <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', flexShrink: 1 }}>
              {name}
            </Text>
            {verified ? (
              <Text accessibilityLabel="Verified" style={{ color: inkSoft, fontSize: tokens.typography.scale.lg }}>
                ✓
              </Text>
            ) : null}
          </View>
          {handle ? (
            <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              @{handle}
            </Text>
          ) : null}
          {bio ? <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.5 }}>{bio}</Text> : null}
        </View>

        {stats && stats.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
            {stats.map((stat) => (
              <View
                key={stat.label}
                style={{
                  flex: 1,
                  minWidth: 96,
                  alignItems: 'center',
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.radius.md,
                  backgroundColor: feedTile(r),
                  borderWidth: 1,
                  borderColor: feedBorder(r),
                }}
              >
                <Text style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>{stat.value}</Text>
                <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{stat.label}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
