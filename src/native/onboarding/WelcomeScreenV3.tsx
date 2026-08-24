import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { WelcomeScreenProps } from './WelcomeScreen';

/** Drop-in for {@link WelcomeScreen} — identical props, different design. */
export type WelcomeScreenV3Props = WelcomeScreenProps;

/**
 * First-launch welcome — V3. A split composition: the top half is an art panel
 * (tinted stage + brand medallion), the bottom half is an elevated CTA card that
 * overlaps the seam and stacks the headline, value line and primary action. Same
 * props as {@link WelcomeScreen}. Token-pure.
 */
export function WelcomeScreenV3({
  title,
  subtitle,
  logoGlyph,
  primaryLabel = 'Get started',
  onGetStarted,
  secondaryLabel,
  onSecondary,
  loading = false,
  style,
}: WelcomeScreenV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      {/* Top art panel. */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.primary, 0.12),
        }}
      >
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
          }}
        >
          <Icon glyph={logoGlyph ?? '✦'} size="3xl" color="onPrimary" />
        </View>
      </View>

      {/* Bottom stacked CTA card, lifted to overlap the seam. */}
      <View
        style={{
          marginTop: -tokens.spacing.xl,
          padding: tokens.spacing.xl,
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderTopLeftRadius: tokens.radius.lg,
          borderTopRightRadius: tokens.radius.lg,
          ...shadow('lg', tokens),
        }}
      >
        <Text
          accessibilityRole="header"
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}
        >
          {title}
        </Text>

        {subtitle ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.base,
              lineHeight: tokens.typography.scale.base * 1.5,
            }}
          >
            {subtitle}
          </Text>
        ) : null}

        <View style={{ gap: tokens.spacing.md, marginTop: tokens.spacing.sm }}>
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
      </View>
    </View>
  );
}
