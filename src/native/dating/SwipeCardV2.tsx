import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { DistanceBadge } from './DistanceBadge';
import type { SwipeCardProps, SwipeOverlay } from './SwipeCard';

/** Drop-in alternate design — identical props to `SwipeCard`. */
export type SwipeCardV2Props = SwipeCardProps;

/** Filled decision-stamp spec: a solid tone badge rather than an outline. */
const STAMP: Record<SwipeOverlay, { text: string; slot: keyof SemanticColors; on: keyof SemanticColors; side: 'left' | 'right'; rotate: string }> = {
  like: { text: 'LIKE', slot: 'success', on: 'onSuccess', side: 'left', rotate: '-8deg' },
  nope: { text: 'NOPE', slot: 'danger', on: 'onDanger', side: 'right', rotate: '8deg' },
  superlike: { text: 'SUPER', slot: 'accent', on: 'onAccent', side: 'left', rotate: '-8deg' },
};

/**
 * SwipeCard — design variant **V2**. A softly **rounded full-bleed** card with a
 * multi-band gradient (not the original's single flat scrim), an inline
 * name·distance line, and a **solid, filled decision stamp** that swings in from
 * the like/nope side. Reads as a plusher, more modern deck card at a glance.
 * Same `SwipeCardProps`, so it drops straight into `SwipeDeck`. Token-pure
 * scrims via `withAlpha` of the neutral ramp; photo-less profiles fall back to a
 * token placeholder.
 */
export function SwipeCardV2({
  profile,
  variant = 'photo',
  overlay = null,
  overlayOpacity,
  aspectRatio = 3 / 4,
  style,
}: SwipeCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
  const stampOpacity = overlay ? (overlayOpacity ?? 1) : 0;
  const scrim = tokens.ramps.neutral[900] ?? colors.onSurface;
  const stamp = overlay ? STAMP[overlay] : null;

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={`${title}${profile.tagline ? `. ${profile.tagline}` : ''}`}
      style={[
        {
          width: '100%',
          aspectRatio: variant === 'compact' ? 16 / 9 : aspectRatio,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          backgroundColor: colors.border,
          ...shadow('lg', tokens),
        },
        style,
      ]}
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

      {/* Multi-band bottom gradient scrim. */}
      <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '60%' }}>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', backgroundColor: withAlpha(scrim, 0.78) }} />
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: '55%', height: '25%', backgroundColor: withAlpha(scrim, 0.4) }} />
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: '80%', height: '20%', backgroundColor: withAlpha(scrim, 0.14) }} />
      </View>

      {/* Info block. */}
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: tokens.spacing.md, gap: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.surface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>{title}</Text>
          {profile.verified ? (
            <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.base }} accessibilityLabel="Verified">
              ✔
            </Text>
          ) : null}
          {profile.online ? (
            <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: colors.success }} accessibilityLabel="Active now" />
          ) : null}
          {profile.distanceKm != null ? (
            <View style={{ marginLeft: 'auto' }}>
              <DistanceBadge distance={profile.distanceKm} unit="km" variant="soft" />
            </View>
          ) : null}
        </View>
        {profile.tagline ? (
          <Text numberOfLines={2} style={{ color: withAlpha(colors.surface, 0.9), fontSize: tokens.typography.scale.sm }}>
            {profile.tagline}
          </Text>
        ) : null}
      </View>

      {/* Solid, filled decision stamp. */}
      {overlay && stamp ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            position: 'absolute',
            top: tokens.spacing.lg,
            left: stamp.side === 'left' ? tokens.spacing.lg : undefined,
            right: stamp.side === 'right' ? tokens.spacing.lg : undefined,
            opacity: Math.max(0, Math.min(1, stampOpacity)),
            transform: [{ rotate: stamp.rotate }],
            backgroundColor: colors[stamp.slot],
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            ...shadow('md', tokens),
          }}
        >
          <Text style={{ color: colors[stamp.on], fontSize: tokens.typography.scale.xl, fontWeight: '800', letterSpacing: 2 }}>
            {stamp.text}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
