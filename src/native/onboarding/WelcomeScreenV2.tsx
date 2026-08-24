import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import { useEnter } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import type { WelcomeScreenProps } from './WelcomeScreen';

/** Drop-in for {@link WelcomeScreen} — identical props, different design. */
export type WelcomeScreenV2Props = WelcomeScreenProps;

/**
 * First-launch welcome — V2. A full-screen, immersive hero: a stack of
 * primary-tinted scrim layers stands in for a brand gradient (React Native has
 * no gradient primitive, so translucency is derived from a token via
 * {@link withAlpha}), a brand medallion floats center-high, and the headline,
 * value line and CTA sit anchored toward the bottom. Same props as
 * {@link WelcomeScreen}. Token-pure.
 */
export function WelcomeScreenV2({
  title,
  subtitle,
  logoGlyph,
  primaryLabel = 'Get started',
  onGetStarted,
  secondaryLabel,
  onSecondary,
  loading = false,
  style,
}: WelcomeScreenV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 14 });

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      {/* Layered scrim standing in for a brand gradient wash. */}
      <View
        pointerEvents="none"
        style={{ ...StyleSheetAbsolute, backgroundColor: withAlpha(colors.primary, 0.14) }}
      />
      <View
        pointerEvents="none"
        style={{ ...StyleSheetAbsolute, top: '45%', backgroundColor: withAlpha(colors.accent, 0.12) }}
      />

      <Animated.View
        style={{
          flex: 1,
          padding: tokens.spacing.xl,
          justifyContent: 'flex-end',
          gap: tokens.spacing.lg,
          opacity: enter.opacity,
          transform: enter.transform,
        }}
      >
        {logoGlyph ? (
          <View
            style={{
              width: 88,
              height: 88,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.primary,
            }}
          >
            <Icon glyph={logoGlyph} size="3xl" color="onPrimary" />
          </View>
        ) : null}

        <Text
          accessibilityRole="header"
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}
        >
          {title}
        </Text>

        {subtitle ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.lg,
              lineHeight: tokens.typography.scale.lg * 1.5,
            }}
          >
            {subtitle}
          </Text>
        ) : null}

        <View style={{ alignSelf: 'stretch', gap: tokens.spacing.md, marginTop: tokens.spacing.sm }}>
          <GetStartedButton label={primaryLabel} onPress={onGetStarted} loading={loading} />
          {secondaryLabel && onSecondary ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={secondaryLabel}
              onPress={onSecondary}
              style={{ alignItems: 'center', paddingVertical: tokens.spacing.sm }}
            >
              <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
                {secondaryLabel}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </Animated.View>
    </View>
  );
}

/** Absolute fill preset (kept local so no StyleSheet import is needed). */
const StyleSheetAbsolute = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;
