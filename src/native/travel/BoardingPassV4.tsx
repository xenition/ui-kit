import * as React from 'react';
import { Text, View } from 'react-native';
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
import type { BoardingField, BoardingPassProps } from './BoardingPass';

/** Drop-in for {@link BoardingPassProps} — same props, the V4 "journey" design. */
export type BoardingPassV4Props = BoardingPassProps;

/**
 * BoardingPass — **V4** "journey" design. The signature of the boarding-pass
 * line: a saturated brand-gradient header band carrying the airline/flight and
 * the from→gradient-plane-disc→to route in near-white ink (the FlightCardV4 rail
 * motif), the gate/seat/zone/boarding fields as frosted glass tiles, then a
 * dashed perforated tear line — notched at both edges — dividing the header from
 * a stub bearing a token-drawn barcode and the passenger name / confirmation
 * code. Same props/behavior as {@link BoardingPassProps}; token-only colors via
 * `useXenitionTheme()` and the `journey*` helpers; dark-mode safe.
 */
export function BoardingPassV4({
  passenger,
  from,
  to,
  flight,
  gate,
  seat,
  zone,
  boardingTime,
  extraFields = [],
  barcode,
  style,
}: BoardingPassV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;

  const fields: BoardingField[] = [
    gate ? { label: 'Gate', value: gate } : null,
    seat ? { label: 'Seat', value: seat } : null,
    zone ? { label: 'Zone', value: zone } : null,
    boardingTime ? { label: 'Boarding', value: boardingTime } : null,
    ...extraFields,
  ].filter((f): f is BoardingField => f != null);

  return (
    <View
      accessible
      accessibilityLabel={`Boarding pass for ${passenger}, ${from} to ${to}, flight ${flight}`}
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          shadowColor: colors.onSurface,
          shadowOpacity: 0.1,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {/* Gradient header band — airline/flight, route rail in near-white ink, frosted field tiles */}
      <GradientSurface
        colors={journeyGradient(r)}
        style={{ padding: tokens.spacing.lg, gap: tokens.spacing.md }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text style={{ color: journeyInkSoft(r), fontSize: tokens.typography.scale.xs, fontWeight: '600', letterSpacing: 2 }}>
            BOARDING PASS
          </Text>
          <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{flight}</Text>
        </View>

        {/* Route rail: code — line — gradient plane disc — line — code */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>{from}</Text>
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
              <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale.sm }}>✈</Text>
            </GradientSurface>
            <View style={{ flex: 1, height: 2, borderRadius: 1, backgroundColor: journeyBorder(r, 0.4) }} />
          </View>
          <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>{to}</Text>
        </View>

        {fields.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
            {fields.map((f, i) => (
              <View
                key={`${f.label}-${i}`}
                style={{
                  gap: 2,
                  minWidth: 64,
                  flexGrow: 1,
                  flexBasis: 0,
                  borderRadius: tokens.radius.md,
                  borderWidth: 1,
                  borderColor: journeyBorder(r),
                  backgroundColor: journeyTile(r),
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: tokens.spacing.xs,
                }}
              >
                <Text style={{ color: journeyInkSoft(r), fontSize: tokens.typography.scale.xs }}>{f.label}</Text>
                <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                  {f.value}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </GradientSurface>

      {/* Dashed perforated tear line with notch circles overlapping each edge */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ borderTopWidth: 1, borderStyle: 'dashed', borderColor: colors.border }}
      >
        <View
          style={{
            position: 'absolute',
            left: -6,
            top: -6,
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: colors.card,
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -6,
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: colors.card,
          }}
        />
      </View>

      {/* Stub — passenger / confirmation code + token-drawn barcode strip */}
      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          <View style={{ gap: 2 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Passenger</Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {passenger}
            </Text>
          </View>
          {barcode ? (
            <View style={{ gap: 2, alignItems: 'flex-end' }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Confirmation</Text>
              <Text
                style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', letterSpacing: 2 }}
              >
                {barcode}
              </Text>
            </View>
          ) : null}
        </View>

        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ flexDirection: 'row', gap: 2, height: 44, alignItems: 'stretch' }}
        >
          {Array.from({ length: 40 }, (_, i) => (
            <View
              key={i}
              style={{
                flex: i % 3 === 0 ? 2 : 1,
                backgroundColor: i % 2 === 0 ? colors.onSurface : colors.border,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
