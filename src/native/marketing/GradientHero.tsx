import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Eyebrow } from '../primitives/Eyebrow';
import { withAlpha } from '../primitives/internal/color';
import { Gradient } from '../commerce/internal/Gradient';

export interface GradientHeroProps {
  /** Small kicker line above the title. */
  eyebrow?: React.ReactNode;
  /** Main headline. */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  subtitle?: React.ReactNode;
  /** Call-to-action row (buttons/links) — rendered as-is. */
  actions?: React.ReactNode;
  /** Optional media (screenshot, illustration) below the copy. */
  media?: React.ReactNode;
  /** Horizontal alignment of the copy block. */
  align?: 'left' | 'center';
  style?: StyleProp<ViewStyle>;
}

/**
 * Full-bleed marketing hero — the native mirror of the web `GradientHero`.
 *
 * The web version paints an animated `AuroraBackground` (multiple blurred
 * blobs + grain/pattern overlays) behind the copy; React Native has no
 * `filter: blur()` or CSS keyframe machinery, so native **simplifies to a
 * static two-tone linear gradient** (primary→accent ramp tints fading into
 * `surface`) via the shared `expo-linear-gradient` wrapper — the same real-
 * gradient approach `GenerativeCover` uses. The web `variant`/`grain`/`pattern`
 * props are aurora/DOM-specific and are therefore dropped. Token-only.
 */
export function GradientHero({
  eyebrow,
  title,
  subtitle,
  actions,
  media,
  align = 'center',
  style,
}: GradientHeroProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const centered = align === 'center';

  return (
    <View
      style={[
        {
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          paddingVertical: tokens.spacing['2xl'],
          paddingHorizontal: tokens.spacing.lg,
        },
        style,
      ]}
    >
      <Gradient
        colors={[
          withAlpha(colors.primary, 0.2),
          withAlpha(colors.accent, 0.14),
          colors.surface,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          gap: tokens.spacing.lg,
          alignItems: centered ? 'center' : 'flex-start',
        }}
      >
        {eyebrow !== undefined && eyebrow !== null ? (
          typeof eyebrow === 'string' ? (
            <Eyebrow tone="primary" align={centered ? 'center' : 'start'}>
              {eyebrow}
            </Eyebrow>
          ) : (
            eyebrow
          )
        ) : null}

        {typeof title === 'string' ? (
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale['3xl'],
              fontWeight: '700',
              textAlign: centered ? 'center' : 'left',
            }}
          >
            {title}
          </Text>
        ) : (
          title
        )}

        {subtitle !== undefined && subtitle !== null ? (
          typeof subtitle === 'string' ? (
            <Text
              style={{
                color: colors.muted,
                fontSize: tokens.typography.scale.lg,
                textAlign: centered ? 'center' : 'left',
              }}
            >
              {subtitle}
            </Text>
          ) : (
            subtitle
          )
        ) : null}

        {actions !== undefined && actions !== null ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: tokens.spacing.sm,
              justifyContent: centered ? 'center' : 'flex-start',
            }}
          >
            {actions}
          </View>
        ) : null}

        {media !== undefined && media !== null ? (
          <View style={{ marginTop: tokens.spacing.xl, width: '100%' }}>{media}</View>
        ) : null}
      </View>
    </View>
  );
}
