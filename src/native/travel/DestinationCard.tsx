import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Badge, PriceTag } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { usePressScale } from '../primitives/internal/motion';

/** Visual size for a {@link DestinationCard}. */
export type DestinationCardVariant = 'default' | 'wide';

export interface DestinationCardProps {
  /** Destination/city name. */
  name: string;
  /** Country or region line. */
  country?: string;
  /** Short evocative tagline. */
  tagline?: string;
  /** Leading emoji/glyph overlaid on the media placeholder (e.g. `'🗼'`). */
  glyph?: string;
  /** "From" price in integer minor units (cents). */
  fromCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Corner ribbon label, e.g. `'Popular'`. */
  badge?: string;
  /** Size variant. */
  variant?: DestinationCardVariant;
  /** Surface treatment (visual diversity). Default `'classic'` — the original look. */
  appearance?: Appearance;
  /** Fires when the card is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A destination discovery tile — a token-styled media placeholder (no image
 * dependency) with an overlaid glyph, the place name/country, an optional
 * tagline, a "from" price, and an optional badge ribbon. Data + `onPress`
 * only. Token-only colors.
 */
export function DestinationCard({
  name,
  country,
  tagline,
  glyph = '🌍',
  fromCents,
  currency = 'USD',
  badge,
  variant = 'default',
  appearance = 'classic',
  onPress,
  style,
}: DestinationCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const wide = variant === 'wide';

  const body = (
    <View
      style={[
        appearanceStyle(appearance, colors, tokens),
        {
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          width: wide ? '100%' : 220,
        },
        style,
      ]}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          height: wide ? 120 : 140,
          backgroundColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale['3xl'], color: colors.muted }}>{glyph}</Text>
        {badge ? (
          <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
            <Badge tone="primary">{badge}</Badge>
          </View>
        ) : null}
      </View>

      <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={1}
            style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {name}
          </Text>
          {country ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{country}</Text>
          ) : null}
        </View>
        {tagline ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {tagline}
          </Text>
        ) : null}
        {typeof fromCents === 'number' ? (
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>from</Text>
            <PriceTag cents={fromCents} currency={currency} size="sm" />
          </View>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}${country ? `, ${country}` : ''}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
