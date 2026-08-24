import * as React from 'react';
import { Image, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { DistanceBadge } from './DistanceBadge';

/** Which drag-decision stamp to overlay on the card. */
export type SwipeOverlay = 'like' | 'nope' | 'superlike';

export interface SwipeCardProfile {
  id: string;
  name: string;
  age?: number;
  /** Primary photo URI. */
  photoUri?: string;
  /** One-line tagline / headline. */
  tagline?: string;
  /** Distance in km for the corner badge. */
  distanceKm?: number;
  /** "Active now" / online. */
  online?: boolean;
  /** Verified profile check. */
  verified?: boolean;
}

export type SwipeCardVariant = 'photo' | 'compact';

export interface SwipeCardProps {
  /** The profile to render. */
  profile: SwipeCardProfile;
  /** Presentation. `photo` (full-bleed, default) or `compact`. */
  variant?: SwipeCardVariant;
  /** Drag-decision stamp to reveal (LIKE / NOPE / SUPER). */
  overlay?: SwipeOverlay | null;
  /** Stamp opacity 0–1 (drag progress). Defaults to 1 when `overlay` is set. */
  overlayOpacity?: number;
  /** Aspect ratio of the photo card. Defaults to 3/4. */
  aspectRatio?: number;
  style?: StyleProp<ViewStyle>;
}

const OVERLAY_SPEC: Record<SwipeOverlay, { text: string; slot: keyof SemanticColors }> = {
  like: { text: 'LIKE', slot: 'success' },
  nope: { text: 'NOPE', slot: 'danger' },
  superlike: { text: 'SUPER', slot: 'accent' },
};

/**
 * A single deck card — the native swipe card. Renders a full-bleed profile photo
 * with a bottom scrim carrying the name/age/tagline and a distance badge, plus a
 * decision stamp (LIKE / NOPE / SUPER) whose opacity tracks drag progress. Used
 * standalone or, more often, driven by `SwipeDeck`. Colors and scrims derive
 * from theme tokens via `withAlpha` — no literal colors. Missing photos fall
 * back to a token placeholder.
 */
export function SwipeCard({
  profile,
  variant = 'photo',
  overlay = null,
  overlayOpacity,
  aspectRatio = 3 / 4,
  style,
}: SwipeCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
  const stampOpacity = overlay ? (overlayOpacity ?? 1) : 0;

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
          borderWidth: 1,
          borderColor: colors.border,
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

      {/* Bottom scrim + info. */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: tokens.spacing.md,
          gap: tokens.spacing.xs,
          backgroundColor: withAlpha(colors.onSurface, 0.55),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
            {title}
          </Text>
          {profile.verified ? (
            <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.sm }} accessibilityLabel="Verified">
              ✔
            </Text>
          ) : null}
          {profile.online ? (
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success }} />
          ) : null}
        </View>
        {profile.tagline ? (
          <Text numberOfLines={2} style={{ color: withAlpha(colors.surface, 0.9), fontSize: tokens.typography.scale.sm }}>
            {profile.tagline}
          </Text>
        ) : null}
        {profile.distanceKm != null ? (
          <View style={{ alignSelf: 'flex-start' }}>
            <DistanceBadge distance={profile.distanceKm} unit="km" variant="soft" />
          </View>
        ) : null}
      </View>

      {/* Decision stamp. */}
      {overlay ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            position: 'absolute',
            top: tokens.spacing.lg,
            left: tokens.spacing.lg,
            opacity: Math.max(0, Math.min(1, stampOpacity)),
            transform: [{ rotate: '-14deg' }],
            borderWidth: 3,
            borderColor: colors[OVERLAY_SPEC[overlay].slot],
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            backgroundColor: withAlpha(colors[OVERLAY_SPEC[overlay].slot], 0.14),
          }}
        >
          <Text
            style={{
              color: colors[OVERLAY_SPEC[overlay].slot],
              fontSize: tokens.typography.scale.xl,
              fontWeight: '800',
              letterSpacing: 2,
            }}
          >
            {OVERLAY_SPEC[overlay].text}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
