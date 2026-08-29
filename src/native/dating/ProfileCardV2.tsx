import * as React from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import { DistanceBadge } from './DistanceBadge';
import { IcebreakerChip } from './IcebreakerChip';
import { CompatibilityMeterV2 } from './CompatibilityMeterV2';
import { LikePassButtons } from './LikePassButtons';
import type { ProfileCardProps } from './ProfileCard';

/** Drop-in alternate design — identical props to `ProfileCard`. */
export type ProfileCardV2Props = ProfileCardProps;

/**
 * ProfileCard — design variant **V2**. Where the original stacks a photo
 * carousel above separate meter/bio/prompt blocks, V2 is a single **full-bleed
 * hero**: the primary photo fills the card, a bottom gradient scrim carries the
 * name/age, headline and distance, a compatibility pill floats top-right, and a
 * slim detail strip beneath surfaces bio/interests. Same `ProfileCardProps`, so
 * it is a genuine drop-in. Token-pure (scrims are `withAlpha` of the neutral
 * ramp); explicit loading/empty states; array access is guarded.
 * Stays inside its own design line: the meter is {@link CompatibilityMeterV2},
 * not the base one, because an app that picks V2 picks it for every surface it
 * sees.
 */
export function ProfileCardV2({
  profile,
  variant = 'full',
  showActions = false,
  onAction,
  onPressInterest,
  loading = false,
  emptyLabel = 'No profile to show',
  style,
}: ProfileCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });
  const scrim = tokens.ramps.neutral[900] ?? colors.onSurface;

  const shell = {
    width: '100%' as const,
    borderRadius: tokens.radius.lg,
    overflow: 'hidden' as const,
    backgroundColor: colors.surface,
    ...shadow('lg', tokens),
  };

  if (loading) {
    return (
      <View style={[shell, style]}>
        <View style={{ width: '100%', aspectRatio: 4 / 5, backgroundColor: colors.border }} />
        <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          <View style={{ height: 16, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 12, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      </View>
    );
  }

  if (!profile) {
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={emptyLabel}
        style={[
          shell,
          { alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs, padding: tokens.spacing.xl },
          style,
        ]}
      >
        <Text style={{ fontSize: tokens.typography.scale['2xl'] }} allowFontScaling={false}>
          👤
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
  const photos = profile.photos ?? [];
  const hero = photos.length > 0 ? photos[0] : undefined;
  const interests = (profile.interests ?? []).slice(0, 4);
  const heroRatio = variant === 'compact' ? 16 / 9 : 4 / 5;

  return (
    <Animated.View style={[shell, { opacity: enter.opacity, transform: enter.transform }, style]}>
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={`${title}${profile.headline ? `. ${profile.headline}` : ''}`}
        style={{ width: '100%', aspectRatio: heroRatio, backgroundColor: colors.border }}
      >
        {hero?.uri ? (
          <Image source={{ uri: hero.uri }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: tokens.typography.scale['3xl'] }} allowFontScaling={false}>
              🙂
            </Text>
          </View>
        )}

        {/* Bottom gradient scrim (stacked bands → a token-pure gradient). */}
        <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '72%' }}>
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', backgroundColor: withAlpha(scrim, 0.8) }} />
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: '55%', height: '23%', backgroundColor: withAlpha(scrim, 0.42) }} />
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: '78%', height: '22%', backgroundColor: withAlpha(scrim, 0.16) }} />
        </View>

        {/* Compatibility badge, top-right on a surface chip for contrast. */}
        {profile.compatibility != null ? (
          <View
            style={{
              position: 'absolute',
              top: tokens.spacing.sm,
              right: tokens.spacing.sm,
              backgroundColor: colors.surface,
              borderRadius: tokens.radius.full,
              paddingVertical: 2,
              paddingHorizontal: tokens.spacing.xs,
              ...shadow('sm', tokens),
            }}
          >
            <CompatibilityMeterV2 score={profile.compatibility} variant="compact" showValue />
          </View>
        ) : null}

        {/* Overlaid identity block. */}
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: tokens.spacing.md, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text style={{ color: colors.surface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
              {title}
            </Text>
            {profile.verified ? (
              <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.base }} accessibilityLabel="Verified">
                ✔
              </Text>
            ) : null}
            {profile.online ? (
              <View
                accessibilityRole="text"
                accessibilityLabel="Active now"
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              >
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success }} />
                <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xs }}>Active</Text>
              </View>
            ) : null}
          </View>
          {profile.headline ? (
            <Text numberOfLines={1} style={{ color: withAlpha(colors.surface, 0.92), fontSize: tokens.typography.scale.sm }}>
              {profile.headline}
            </Text>
          ) : null}
          {profile.distanceKm != null ? (
            <View style={{ alignSelf: 'flex-start' }}>
              <DistanceBadge distance={profile.distanceKm} unit="km" variant="soft" />
            </View>
          ) : null}
        </View>
      </View>

      {/* Slim detail strip beneath the hero. */}
      {(profile.bio || interests.length > 0 || showActions) && variant !== 'compact' ? (
        <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          {profile.bio ? (
            <Text
              numberOfLines={3}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, lineHeight: tokens.typography.scale.base * 1.4 }}
            >
              {profile.bio}
            </Text>
          ) : null}
          {interests.length > 0 ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
              {interests.map((interest, i) => (
                <IcebreakerChip key={`${interest}-${i}`} label={interest} variant="soft" size="sm" onPress={onPressInterest} />
              ))}
            </View>
          ) : null}
          {showActions ? (
            <View style={{ marginTop: tokens.spacing.xs }}>
              <LikePassButtons actions={['pass', 'superlike', 'like']} onAction={onAction} />
            </View>
          ) : null}
        </View>
      ) : null}
    </Animated.View>
  );
}
