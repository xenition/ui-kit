import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Button } from '../primitives';

export type BoostVariant = 'boost' | 'superboost' | 'premium';

export interface BoostBannerProps {
  /** Which upsell. Drives glyph + accent slot. Defaults to `boost`. */
  variant?: BoostVariant;
  /** Headline. Sensible default per variant. */
  title?: string;
  /** Supporting line. */
  subtitle?: string;
  /** CTA button label. Defaults per variant. */
  ctaLabel?: string;
  /** Fires the CTA (and card tap). */
  onPress?: () => void;
  /** Live countdown text (e.g. "Boost active · 22m left"). Switches to active styling. */
  activeLabel?: string;
  /** Dismiss handler; renders a close affordance when provided. */
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
}

const SPEC: Record<
  BoostVariant,
  { glyph: string; slot: keyof SemanticColors; title: string; subtitle: string; cta: string }
> = {
  boost: {
    glyph: '⚡',
    slot: 'primary',
    title: 'Be seen first',
    subtitle: 'Boost your profile to the top for 30 minutes.',
    cta: 'Boost me',
  },
  superboost: {
    glyph: '🚀',
    slot: 'accent',
    title: 'Super Boost tonight',
    subtitle: 'Up to 100× more profile views during peak hours.',
    cta: 'Super Boost',
  },
  premium: {
    glyph: '★',
    slot: 'warn',
    title: 'Go Premium',
    subtitle: 'Unlimited likes, see who likes you, and more.',
    cta: 'Upgrade',
  },
};

/**
 * Upsell banner for boosts / premium — the native boost banner. Presents a
 * glyph, headline, subtitle, and a CTA, switching to an "active" treatment when
 * an `activeLabel` (countdown) is supplied. The whole card is tappable and the
 * CTA repeats the action for clarity. Colors are token-derived via `withAlpha`
 * tints — no literal colors; state is conveyed by text, not color alone.
 */
export function BoostBanner({
  variant = 'boost',
  title,
  subtitle,
  ctaLabel,
  onPress,
  activeLabel,
  onDismiss,
  style,
}: BoostBannerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const spec = SPEC[variant];
  const accent = colors[spec.slot];
  const active = activeLabel != null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title ?? spec.title}. ${active ? activeLabel : subtitle ?? spec.subtitle}`}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: withAlpha(accent, active ? 0.9 : 0.4),
          backgroundColor: withAlpha(accent, active ? 0.2 : 0.1),
          padding: tokens.spacing.md,
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(accent, 0.2),
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale.xl }} allowFontScaling={false}>
          {spec.glyph}
        </Text>
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {title ?? spec.title}
        </Text>
        <Text numberOfLines={2} style={{ color: active ? accent : colors.muted, fontSize: tokens.typography.scale.sm }}>
          {active ? activeLabel : subtitle ?? spec.subtitle}
        </Text>
      </View>

      {onDismiss ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Dismiss" hitSlop={8} onPress={onDismiss}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.lg }}>✕</Text>
        </Pressable>
      ) : (
        <View pointerEvents="none">
          <Button variant="primary" size="sm" tone={variant === 'premium' ? 'default' : 'primary'} onPress={onPress}>
            {ctaLabel ?? spec.cta}
          </Button>
        </View>
      )}
    </Pressable>
  );
}
