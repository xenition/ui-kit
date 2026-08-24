import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Badge, PriceTag } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { withAlpha } from '../primitives/internal/color';
import { usePressScale } from '../primitives/internal/motion';
import type { DestinationCardProps } from './DestinationCard';

/**
 * Drop-in alternate design for {@link DestinationCard} — same props, new look.
 *
 * V3 is a **compact tile**: a rounded glyph chip on the left with the name /
 * country / "from" price stacked beside it — a dense horizontal cell for grids
 * and carousels, no tall media banner. Honours `appearance`. Identical
 * `DestinationCardProps`.
 */
export type DestinationCardV3Props = DestinationCardProps;

export function DestinationCardV3({
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
}: DestinationCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const wide = variant === 'wide';

  const body = (
    <View
      style={[
        appearanceStyle(appearance, colors, tokens),
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.sm,
          width: wide ? '100%' : 240,
        },
        style,
      ]}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: 56,
          height: 56,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(colors.primary, 0.1),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale['2xl'], color: colors.muted }}>{glyph}</Text>
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {name}
          </Text>
          {badge ? <Badge tone="primary">{badge}</Badge> : null}
        </View>
        {country ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {country}
          </Text>
        ) : null}
        {tagline ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {tagline}
          </Text>
        ) : null}
      </View>

      {typeof fromCents === 'number' ? (
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>from</Text>
          <PriceTag cents={fromCents} currency={currency} size="sm" />
        </View>
      ) : null}
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
