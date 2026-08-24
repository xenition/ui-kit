import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { PriceTag } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { usePressScale } from '../primitives/internal/motion';

/** Presentation density for a {@link FlightCard}. */
export type FlightCardVariant = 'default' | 'compact';

/** One leg of a journey (origin → destination). */
export interface FlightLeg {
  /** IATA airport code, e.g. `'SFO'`. */
  code: string;
  /** Human airport / city name. */
  city?: string;
  /** Local departure/arrival clock time, pre-formatted (e.g. `'08:15'`). */
  time: string;
}

export interface FlightCardProps {
  /** Marketing carrier name. */
  airline: string;
  /** Flight designator, e.g. `'XN 482'`. */
  flightNumber?: string;
  /** Departure leg. */
  from: FlightLeg;
  /** Arrival leg. */
  to: FlightLeg;
  /** Total elapsed time, pre-formatted (e.g. `'5h 40m'`). */
  duration: string;
  /** Number of stops; `0` renders "Nonstop". */
  stops?: number;
  /** Price in integer minor units (cents) for the whole fare. */
  priceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Density variant. */
  variant?: FlightCardVariant;
  /** Surface treatment (visual diversity). Default `'classic'` — the original look. */
  appearance?: Appearance;
  /** Fires when the card is pressed (e.g. to open fare details). */
  onPress?: () => void;
  /** Shows a shimmer-free skeleton recap instead of data. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single bookable flight itinerary — carrier, the origin→destination route
 * with departure/arrival times, duration, stop count, and an optional fare.
 * Data + `onPress` only; nothing fetches. Token-only colors via
 * `useXenitionTheme()`. Pass `loading` for a placeholder recap and
 * `variant="compact"` for a denser list row.
 */
export function FlightCard({
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
}: FlightCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const compact = variant === 'compact';

  const stopLabel = stops <= 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`;

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
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {airline}
        </Text>
        {flightNumber ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {flightNumber}
          </Text>
        ) : null}
      </View>

      {loading ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Loading flight…</Text>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
              {from.code}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{from.time}</Text>
          </View>

          <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{duration}</Text>
            <View style={{ height: 1, alignSelf: 'stretch', backgroundColor: colors.border }} />
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{stopLabel}</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
              {to.code}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{to.time}</Text>
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
