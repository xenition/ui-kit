import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import {
  journeyBorder,
  journeyDisc,
  journeyGradient,
  journeyInk,
  journeyInkSoft,
  journeyTile,
} from './internal/journey';

/** A place on the journey — a city name plus an optional short code (IATA / airport). */
export interface TripPlace {
  /** City / place name (e.g. "San Francisco"). */
  city: string;
  /** Optional short code shown beneath the city (e.g. "SFO"). */
  code?: string;
}

export interface TripHeaderProps {
  /** Where the trip starts (city + optional code). */
  origin: TripPlace;
  /** Where the trip ends (city + optional code). */
  destination: TripPlace;
  /** Localized trip start date string (e.g. "Sep 3"). */
  startDate: string;
  /** Localized trip end date string (e.g. "Sep 10"). */
  endDate?: string;
  /** Number of travelers on the trip (shows a frosted "travelers" tile when set). */
  travelers?: number;
  /** Number of nights (shows a frosted "nights" tile when set). */
  nights?: number;
  /** Optional short line under the route (e.g. "Business trip"). */
  subtitle?: string;
  /** Manage-trip CTA label (default "Manage trip"). Hidden when no `onManage`. */
  manageLabel?: string;
  /** Fires on the manage-trip action. */
  onManage?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * TripHeader — a **V4** "journey" hero. The trip cover for an itinerary screen: a
 * saturated brand-gradient ground carrying the origin→destination route drawn as
 * a rail with a small brand-gradient plane disc at its midpoint (the signature
 * FlightCardV4 motif) in near-white ink, an optional subtitle, then the dates /
 * travelers / nights as frosted glass tiles and an optional manage CTA (a
 * near-white pill). Token-only colors via `useXenitionTheme()` and the `journey*`
 * helpers; dark-mode safe.
 */
export function TripHeader({
  origin,
  destination,
  startDate,
  endDate,
  travelers,
  nights,
  subtitle,
  manageLabel = 'Manage trip',
  onManage,
  style,
}: TripHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = journeyInk(r);
  const inkSoft = journeyInkSoft(r);
  const dateRange = endDate ? `${startDate} – ${endDate}` : startDate;

  const Endpoint = ({ place, align }: { place: TripPlace; align: 'flex-start' | 'flex-end' }) => (
    <View style={{ alignItems: align, minWidth: 0, flexShrink: 1 }}>
      <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
        {place.city}
      </Text>
      {place.code ? (
        <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600', letterSpacing: 1 }}>
          {place.code}
        </Text>
      ) : null}
    </View>
  );

  const Tile = ({ label, value }: { label: string; value: string }) => (
    <View
      style={{
        gap: 2,
        minWidth: 72,
        flexGrow: 1,
        flexBasis: 0,
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: journeyBorder(r),
        backgroundColor: journeyTile(r),
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
      }}
    >
      <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>{label}</Text>
      <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
        {value}
      </Text>
    </View>
  );

  return (
    <View
      accessible
      accessibilityLabel={`Trip from ${origin.city} to ${destination.city}, ${dateRange}`}
      style={[{ borderRadius: tokens.radius.lg }, style]}
    >
      <GradientSurface
        colors={journeyGradient(r)}
        style={{ borderRadius: tokens.radius.lg, overflow: 'hidden', padding: tokens.spacing.lg, gap: tokens.spacing.lg }}
      >
        {/* Route rail: origin — line — gradient plane disc — line — destination */}
        <View style={{ gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
            <Endpoint place={origin} align="flex-start" />
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, height: 2, borderRadius: 1, backgroundColor: journeyBorder(r, 0.4) }} />
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
                <Text style={{ color: ink, fontSize: tokens.typography.scale.sm }}>✈</Text>
              </GradientSurface>
              <View style={{ flex: 1, height: 2, borderRadius: 1, backgroundColor: journeyBorder(r, 0.4) }} />
            </View>
            <Endpoint place={destination} align="flex-end" />
          </View>
          {subtitle ? (
            <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          <Tile label="Dates" value={dateRange} />
          {typeof travelers === 'number' ? (
            <Tile label="Travelers" value={`${travelers} ${travelers === 1 ? 'traveler' : 'travelers'}`} />
          ) : null}
          {typeof nights === 'number' ? (
            <Tile label="Nights" value={`${nights} ${nights === 1 ? 'night' : 'nights'}`} />
          ) : null}
        </View>

        {onManage ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={manageLabel}
            onPress={onManage}
            style={({ pressed }) => ({
              paddingVertical: tokens.spacing.md,
              borderRadius: tokens.radius.md,
              alignItems: 'center',
              backgroundColor: ink,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
              {manageLabel}
            </Text>
          </Pressable>
        ) : null}
      </GradientSurface>
    </View>
  );
}
