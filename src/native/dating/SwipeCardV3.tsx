import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { DistanceBadge } from './DistanceBadge';
import type { SwipeCardProps, SwipeOverlay } from './SwipeCard';

/** Drop-in alternate design — identical props to `SwipeCard`. */
export type SwipeCardV3Props = SwipeCardProps;

const STAMP: Record<SwipeOverlay, { text: string; slot: keyof SemanticColors }> = {
  like: { text: 'LIKE', slot: 'success' },
  nope: { text: 'NOPE', slot: 'danger' },
  superlike: { text: 'SUPER', slot: 'accent' },
};

/**
 * SwipeCard — design variant **V3**, a **framed card with a caption strip**.
 * Unlike the full-bleed V1/V2, the photo is inset inside a padded surface frame
 * (a tasteful, editorial "polaroid"), and the name/age/tagline/distance live in
 * a **solid caption strip below the image** rather than overlaid on it. The
 * decision stamp still floats over the photo. Same `SwipeCardProps`; token-pure;
 * a token placeholder covers missing photos.
 */
export function SwipeCardV3({
  profile,
  variant = 'photo',
  overlay = null,
  overlayOpacity,
  aspectRatio = 3 / 4,
  style,
}: SwipeCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
  const stampOpacity = overlay ? (overlayOpacity ?? 1) : 0;
  const stamp = overlay ? STAMP[overlay] : null;

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={`${title}${profile.tagline ? `. ${profile.tagline}` : ''}`}
      style={[
        {
          width: '100%',
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          padding: tokens.spacing.sm,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      {/* Framed photo. */}
      <View
        style={{
          width: '100%',
          aspectRatio: variant === 'compact' ? 16 / 9 : aspectRatio,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          backgroundColor: colors.border,
        }}
      >
        {profile.photoUri ? (
          <Image source={{ uri: profile.photoUri }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: tokens.typography.scale['3xl'] }} allowFontScaling={false}>
              🙂
            </Text>
          </View>
        )}

        {/* Decision stamp floats over the framed photo. */}
        {overlay && stamp ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              position: 'absolute',
              top: tokens.spacing.md,
              left: tokens.spacing.md,
              opacity: Math.max(0, Math.min(1, stampOpacity)),
              transform: [{ rotate: '-12deg' }],
              borderWidth: 3,
              borderColor: colors[stamp.slot],
              borderRadius: tokens.radius.md,
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.sm,
              backgroundColor: withAlpha(colors[stamp.slot], 0.14),
            }}
          >
            <Text style={{ color: colors[stamp.slot], fontSize: tokens.typography.scale.xl, fontWeight: '800', letterSpacing: 2 }}>
              {stamp.text}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Caption strip. */}
      <View style={{ paddingHorizontal: tokens.spacing.xs, paddingTop: tokens.spacing.sm, gap: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>{title}</Text>
          {profile.verified ? (
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm }} accessibilityLabel="Verified">
              ✔
            </Text>
          ) : null}
          {profile.online ? (
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success }} accessibilityLabel="Active now" />
          ) : null}
          {profile.distanceKm != null ? (
            <View style={{ marginLeft: 'auto' }}>
              <DistanceBadge distance={profile.distanceKm} unit="km" variant="outline" />
            </View>
          ) : null}
        </View>
        {profile.tagline ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {profile.tagline}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
