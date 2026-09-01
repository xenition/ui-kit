import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, PriceTag } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { journeyDisc, journeyInk } from './internal/journey';
import type { FlightCardProps } from './FlightCard';

/** Drop-in for {@link FlightCardProps} — same props, the V4 "journey" design. */
export type FlightCardV4Props = FlightCardProps;

/**
 * FlightCard — **V4** "journey" design. The boarding-pass take on a bookable
 * flight: an elevated clean card, the origin→destination route drawn as a rail
 * with a small brand-gradient plane disc at its midpoint (the signature V4
 * touch), and the fare sitting below a dashed boarding-pass tear line. Same
 * props/behavior as {@link FlightCardProps}; token-only colors via
 * `useXenitionTheme()`. `loading` shows a placeholder recap; `variant="compact"`
 * tightens the padding.
 */
export function FlightCardV4({
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
}: FlightCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const compact = variant === 'compact';
  const stopLabel = stops <= 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`;

  const body = (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          padding: compact ? tokens.spacing.md : tokens.spacing.lg,
          gap: compact ? tokens.spacing.sm : tokens.spacing.md,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.1,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
        >
          {airline}
        </Text>
        {flightNumber ? (
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
            {flightNumber}
          </Text>
        ) : null}
      </View>

      {loading ? (
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
          Loading flight…
        </Text>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
              {from.code}
            </Text>
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{from.time}</Text>
          </View>

          {/* Route rail: line — gradient plane disc — line */}
          <View style={{ flex: 1, alignItems: 'center', gap: 4 }}>
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{duration}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' }}>
              <View style={{ flex: 1, height: 2, borderRadius: 1, backgroundColor: colors.border }} />
              <GradientSurface
                colors={journeyDisc(r)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 6,
                  overflow: 'hidden',
                }}
              >
                <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale.sm }}>✈</Text>
              </GradientSurface>
              <View style={{ flex: 1, height: 2, borderRadius: 1, backgroundColor: colors.border }} />
            </View>
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{stopLabel}</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
              {to.code}
            </Text>
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{to.time}</Text>
          </View>
        </View>
      )}

      {typeof priceCents === 'number' && !loading ? (
        <View
          style={{
            marginTop: tokens.spacing.xs,
            paddingTop: tokens.spacing.md,
            borderTopWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.border,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>Fare from</Text>
          <PriceTag cents={priceCents} currency={currency} size={compact ? 'sm' : 'md'} />
        </View>
      ) : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${airline} ${from.code} to ${to.code}, ${duration}, ${stopLabel}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}
