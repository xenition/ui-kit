import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, PriceTag } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import type { FlightCardProps } from './FlightCard';

/**
 * Drop-in alternate design for {@link FlightCard} — same props, different look.
 *
 * V3 is an **elevated boarding-pass**: a floating shadowed surface split into a
 * main panel (route + times) and a right stub (carrier / price) by a vertical
 * perforation of dots, echoing a tear-off ticket. Ignores `appearance` in favour
 * of its own committed treatment. Token-only colors; identical `FlightCardProps`.
 */
export type FlightCardV3Props = FlightCardProps;

export function FlightCardV3({
  airline,
  flightNumber,
  from,
  to,
  duration,
  stops = 0,
  priceCents,
  currency = 'USD',
  variant = 'default',
  onPress,
  loading = false,
  style,
}: FlightCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const compact = variant === 'compact';

  const stopLabel = stops <= 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`;

  const perforation = (
    <View style={{ justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 }}>
      {Array.from({ length: 7 }).map((_, i) => (
        <View
          key={i}
          style={{
            width: 4,
            height: 4,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.border,
          }}
        />
      ))}
    </View>
  );

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      {/* Main panel */}
      <View style={{ flex: 1, padding: compact ? tokens.spacing.md : tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.base }}>✈</Text>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
          >
            {airline}
          </Text>
        </View>

        {loading ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Loading flight…</Text>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
                {from.code}
              </Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{from.time}</Text>
            </View>
            <View style={{ alignItems: 'center', paddingBottom: tokens.spacing.xs }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{duration}</Text>
              <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm }}>→</Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{stopLabel}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
                {to.code}
              </Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{to.time}</Text>
            </View>
          </View>
        )}
      </View>

      {perforation}

      {/* Tear-off stub */}
      <View
        style={{
          width: compact ? 92 : 104,
          padding: compact ? tokens.spacing.md : tokens.spacing.lg,
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: tokens.spacing.xs,
        }}
      >
        {flightNumber ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {flightNumber}
          </Text>
        ) : null}
        {typeof priceCents === 'number' && !loading ? (
          <PriceTag cents={priceCents} currency={currency} size={compact ? 'sm' : 'md'} />
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${airline} ${from.code} to ${to.code}, ${duration}, ${stopLabel}`}
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
