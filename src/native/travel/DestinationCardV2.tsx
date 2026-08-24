import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Badge, formatMoney } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import type { DestinationCardProps } from './DestinationCard';

/**
 * Drop-in alternate design for {@link DestinationCard} — same props, new look.
 *
 * V2 is a **full-bleed poster**: a tall media placeholder with the glyph
 * enlarged behind, and the name / country / "from" price stacked over a
 * bottom-anchored scrim (stacked translucent token washes standing in for a
 * gradient — no literal color). The badge rides the top-left. Identical
 * `DestinationCardProps`.
 */
export type DestinationCardV2Props = DestinationCardProps;

export function DestinationCardV2({
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
}: DestinationCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const wide = variant === 'wide';

  const scrimBase = tokens.ramps.neutral[900] ?? colors.onSurface;
  const overlayText = colors.onPrimary;

  const body = (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          width: wide ? '100%' : 240,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View
        style={{
          height: wide ? 200 : 260,
          backgroundColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ fontSize: 88, color: colors.muted }}
        >
          {glyph}
        </Text>

        {badge ? (
          <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
            <Badge tone="primary">{badge}</Badge>
          </View>
        ) : null}

        {/* Stacked scrim washes deepen toward the base, faking a gradient. */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            paddingTop: tokens.spacing.xl,
            backgroundColor: withAlpha(scrimBase, 0.3),
          }}
        >
          <View style={{ padding: tokens.spacing.md, gap: 2, backgroundColor: withAlpha(scrimBase, 0.4) }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
              <Text numberOfLines={1} style={{ flexShrink: 1, color: overlayText, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
                {name}
              </Text>
              {country ? (
                <Text style={{ color: withAlpha(overlayText, 0.85), fontSize: tokens.typography.scale.xs }}>{country}</Text>
              ) : null}
            </View>
            {tagline ? (
              <Text numberOfLines={2} style={{ color: withAlpha(overlayText, 0.85), fontSize: tokens.typography.scale.sm }}>
                {tagline}
              </Text>
            ) : null}
            {typeof fromCents === 'number' ? (
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, marginTop: 2 }}>
                <Text style={{ color: withAlpha(overlayText, 0.85), fontSize: tokens.typography.scale.xs }}>from</Text>
                <Text style={{ color: overlayText, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
                  {formatMoney(fromCents, currency)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );

  void appearance;

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
