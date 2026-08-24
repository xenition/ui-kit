import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { GetStartedButton } from './GetStartedButton';

export type WelcomeScreenVariant = 'centered' | 'bottomSheet';

export interface WelcomeScreenProps {
  /** Product/brand name shown as the hero headline. */
  title: string;
  /** Supporting value line under the title. */
  subtitle?: string;
  /** Optional emoji/glyph for the brand medallion. */
  logoGlyph?: string;
  /** Primary CTA copy. Default `'Get started'`. */
  primaryLabel?: string;
  /** Fires on the primary CTA. */
  onGetStarted?: () => void;
  /** Secondary link copy (e.g. `'I already have an account'`). */
  secondaryLabel?: string;
  /** Fires on the secondary link. Hidden when omitted. */
  onSecondary?: () => void;
  /** Show a spinner on the primary CTA while an async step runs. */
  loading?: boolean;
  /** `'bottomSheet'` left-aligns for a sheet presentation. Default `'centered'`. */
  variant?: WelcomeScreenVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * First-launch welcome — a brand medallion, headline, one value line and the
 * primary {@link GetStartedButton}, with an optional "already have an account"
 * secondary link (design.md §42). The `bottomSheet` variant left-aligns for use
 * inside a sheet. Every color/spacing traces to a token. No literal colors.
 */
export function WelcomeScreen({
  title,
  subtitle,
  logoGlyph,
  primaryLabel = 'Get started',
  onGetStarted,
  secondaryLabel,
  onSecondary,
  loading = false,
  variant = 'centered',
  style,
}: WelcomeScreenProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const centered = variant === 'centered';

  return (
    <View
      style={[
        {
          flex: 1,
          padding: tokens.spacing.xl,
          justifyContent: 'center',
          alignItems: centered ? 'center' : 'flex-start',
          gap: tokens.spacing.lg,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {logoGlyph ? (
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
          }}
        >
          <Icon glyph={logoGlyph} size="2xl" color="onPrimary" />
        </View>
      ) : null}

      <Text
        accessibilityRole="header"
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale['3xl'],
          fontWeight: '700',
          textAlign: centered ? 'center' : 'left',
        }}
      >
        {title}
      </Text>

      {subtitle ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.lg,
            textAlign: centered ? 'center' : 'left',
            lineHeight: tokens.typography.scale.lg * 1.5,
          }}
        >
          {subtitle}
        </Text>
      ) : null}

      <View style={{ alignSelf: 'stretch', gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
        <GetStartedButton label={primaryLabel} onPress={onGetStarted} loading={loading} />
        {secondaryLabel && onSecondary ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={secondaryLabel}
            onPress={onSecondary}
            style={{ alignItems: 'center', paddingVertical: tokens.spacing.sm }}
          >
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {secondaryLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
