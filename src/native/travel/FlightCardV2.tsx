import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, PriceTag } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { usePressScale } from '../primitives/internal/motion';
import type { FlightCardProps } from './FlightCard';

/**
 * Drop-in alternate design for {@link FlightCard} — same props, different look.
 *
 * V2 is a **route timeline**: the two airport codes anchor either end as large
 * display type, and a horizontal connector rail runs between them with a plane
 * glyph riding the middle and end-node dots. Duration sits above the rail, the
 * stop count below it. Token-only colors; identical `FlightCardProps` so it is
 * interchangeable with the original.
 */
export type FlightCardV2Props = FlightCardProps;

export function FlightCardV2({
  airline,
  flightNumber,
  from,
  to,
  duration,
  stops = 0,
  priceCents,
  currency = 'USD',
  variant = 'default',
  appearance = 'classic',
  onPress,
  loading = false,
  style,
}: FlightCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const compact = variant === 'compact';

  const stopLabel = stops <= 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`;

  const node = (
    <View
      style={{
        width: 10,
        height: 10,
        borderRadius: tokens.radius.full,
        borderWidth: 2,
        borderColor: colors.primary,
        backgroundColor: colors.surface,
      }}
    />
  );

  const body = (
    <View
      style={[
        appearanceStyle(appearance, colors, tokens),
        {
          gap: compact ? tokens.spacing.sm : tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          padding: compact ? tokens.spacing.md : tokens.spacing.lg,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {airline}
        </Text>
        {flightNumber ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{flightNumber}</Text>
        ) : null}
      </View>

      {loading ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Loading flight…</Text>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}
            >
              {from.code}
            </Text>
            {from.city ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {from.city}
              </Text>
            ) : null}
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {from.time}
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: 'center', gap: 4, paddingHorizontal: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{duration}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' }}>
              {node}
              <View style={{ flex: 1, height: 2, backgroundColor: colors.border }} />
              <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.base }}>✈</Text>
              <View style={{ flex: 1, height: 2, backgroundColor: colors.border }} />
              {node}
            </View>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{stopLabel}</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}
            >
              {to.code}
            </Text>
            {to.city ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {to.city}
              </Text>
            ) : null}
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {to.time}
            </Text>
          </View>
        </View>
      )}

      {typeof priceCents === 'number' && !loading ? (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <PriceTag cents={priceCents} currency={currency} size={compact ? 'sm' : 'md'} />
        </View>
      ) : null}
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
