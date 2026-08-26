import * as React from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import { DistanceBadge } from './DistanceBadge';
import { IcebreakerChip } from './IcebreakerChip';
import { CompatibilityMeterV3 } from './CompatibilityMeterV3';
import { ProfilePrompt } from './ProfilePrompt';
import { LikePassButtons } from './LikePassButtons';
import type { ProfileCardProps } from './ProfileCard';

/** Drop-in alternate design — identical props to `ProfileCard`. */
export type ProfileCardV3Props = ProfileCardProps;

/**
 * ProfileCard — design variant **V3**, an **editorial split**. A rounded hero
 * photo sits at the top; below it an editorial header (oversized name, headline,
 * distance) leads into the compatibility bar, then the profile **prompts are the
 * hero content** — each rendered as a raised card — followed by an interest rail.
 * Airy, type-led, and unmistakably distinct from the summary (V1) and full-bleed
 * (V2) layouts. Same `ProfileCardProps`. Token-pure; guarded; loading/empty
 * states included.
 * Stays inside its own design line: the meter is {@link CompatibilityMeterV3},
 * not the base one, because an app that picks V3 picks it for every surface it
 * sees.
 */
export function ProfileCardV3({
  profile,
  variant = 'full',
  showActions = false,
  onAction,
  onPressInterest,
  loading = false,
  emptyLabel = 'No profile to show',
  style,
}: ProfileCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });

  if (loading) {
    return (
      <View style={[{ width: '100%', gap: tokens.spacing.md }, style]}>
        <View style={{ width: '100%', aspectRatio: 5 / 4, borderRadius: tokens.radius.lg, backgroundColor: colors.border }} />
        <View style={{ gap: tokens.spacing.sm }}>
          <View style={{ height: 22, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 14, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
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
          {
            width: '100%',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            padding: tokens.spacing.xl,
            borderWidth: 1.5,
            borderColor: colors.border,
            borderRadius: tokens.radius.lg,
          },
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
  const interests = profile.interests ?? [];
  const prompts = profile.prompts ?? [];
  const heroRatio = variant === 'compact' ? 16 / 9 : 5 / 4;

  return (
    <Animated.View style={[{ width: '100%', gap: tokens.spacing.lg }, { opacity: enter.opacity, transform: enter.transform }, style]}>
      {/* Editorial hero photo. */}
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={title}
        style={{ width: '100%', aspectRatio: heroRatio, borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.border, ...shadow('md', tokens) }}
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
      </View>

      {/* Editorial header. */}
      <View style={{ gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5 }}>
            {title}
          </Text>
          {profile.verified ? (
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.lg }} accessibilityLabel="Verified">
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
              <Text style={{ color: colors.successText, fontSize: tokens.typography.scale.xs }}>Active</Text>
            </View>
          ) : null}
        </View>
        {profile.headline ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>{profile.headline}</Text>
        ) : null}
        {profile.distanceKm != null ? (
          <View style={{ alignSelf: 'flex-start', marginTop: tokens.spacing.xs }}>
            <DistanceBadge distance={profile.distanceKm} variant="outline" />
          </View>
        ) : null}
      </View>

      {profile.compatibility != null ? <CompatibilityMeterV3 score={profile.compatibility} /> : null}

      {profile.bio ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, lineHeight: tokens.typography.scale.base * 1.5 }}>
          {profile.bio}
        </Text>
      ) : null}

      {/* Prompts as the editorial centrepiece — raised cards. */}
      {prompts.length > 0 ? (
        <View style={{ gap: tokens.spacing.md }}>
          {prompts.map((p) => (
            <View key={p.id} style={{ borderRadius: tokens.radius.lg, backgroundColor: colors.surface, ...shadow('sm', tokens) }}>
              <ProfilePrompt prompt={p.prompt} answer={p.answer} variant="card" />
            </View>
          ))}
        </View>
      ) : null}

      {interests.length > 0 ? (
        <View style={{ gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' }}>
            Interests
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
            {interests.map((interest, i) => (
              <IcebreakerChip key={`${interest}-${i}`} label={interest} variant="outline" size="sm" onPress={onPressInterest} />
            ))}
          </View>
        </View>
      ) : null}

      {showActions ? (
        <View
          style={{
            marginTop: tokens.spacing.xs,
            paddingTop: tokens.spacing.md,
            borderTopWidth: 1,
            borderTopColor: withAlpha(colors.border, 0.9),
          }}
        >
          <LikePassButtons actions={['rewind', 'pass', 'superlike', 'like']} onAction={onAction} />
        </View>
      ) : null}
    </Animated.View>
  );
}
