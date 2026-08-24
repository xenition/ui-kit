import * as React from 'react';
import {
  Image,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

/** Layout variants for the gallery header. */
export type GalleryHeaderVariant = 'hero' | 'compact';

export interface GalleryHeaderProps {
  /** Gallery / shoot title. */
  title: string;
  /** Supporting subtitle (client, date, or event). */
  subtitle?: string;
  /** Photo count shown as a small meta pill. */
  photoCount?: number;
  /** Full-bleed cover image URL (`hero` variant). */
  coverUrl?: string;
  /** Layout variant (default `hero`). */
  variant?: GalleryHeaderVariant;
  /** Action slot (e.g. a share / download button row). */
  actions?: React.ReactNode;
  /** Word for the count meta (default `photos`). */
  countLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** Token-derived translucent tint (no literal hex). */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * The masthead for a client gallery — a title with an optional subtitle, a
 * photo-count meta pill, and an `actions` slot. The `hero` variant lays the
 * text over a full-bleed cover image (with a token scrim for legibility); the
 * `compact` variant is a plain titled band. The title is an accessibility
 * `header`. Token-only — the scrim and surfaces trace to theme tokens.
 */
export function GalleryHeader({
  title,
  subtitle,
  photoCount,
  coverUrl,
  variant = 'hero',
  actions,
  countLabel = 'photos',
  style,
}: GalleryHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isHero = variant === 'hero' && Boolean(coverUrl);

  const titleColor = isHero ? colors.onAccent : colors.onSurface;
  const subColor = isHero ? colors.onAccent : colors.muted;

  const textBlock = (
    <View style={{ gap: tokens.spacing.xs }}>
      <Text
        accessibilityRole="header"
        style={{
          color: titleColor,
          fontSize: tokens.typography.scale['2xl'],
          fontWeight: '700',
        }}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text style={{ color: subColor, fontSize: tokens.typography.scale.sm }}>{subtitle}</Text>
      ) : null}
      {typeof photoCount === 'number' ? (
        <View
          style={{
            alignSelf: 'flex-start',
            marginTop: tokens.spacing.xs,
            backgroundColor: isHero ? withAlpha(colors.onSurface, 0.35) : tokens.ramps.neutral[100],
            borderRadius: tokens.radius.full,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
          }}
        >
          <Text
            style={{
              color: isHero ? colors.onAccent : colors.muted,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '600',
            }}
          >
            {photoCount} {countLabel}
          </Text>
        </View>
      ) : null}
      {actions ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
          {actions}
        </View>
      ) : null}
    </View>
  );

  if (isHero) {
    return (
      <View
        style={[
          {
            height: 200,
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            backgroundColor: tokens.ramps.neutral[200],
            justifyContent: 'flex-end',
          },
          style,
        ]}
      >
        <Image
          source={{ uri: coverUrl }}
          accessible={false}
          resizeMode="cover"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
        <View
          style={{
            backgroundColor: withAlpha(colors.onSurface, 0.4),
            padding: tokens.spacing.lg,
          }}
        >
          {textBlock}
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          padding: tokens.spacing.lg,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {textBlock}
    </View>
  );
}
