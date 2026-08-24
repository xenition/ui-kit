import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';

/** A labelled field shown in the boarding-pass detail grid. */
export interface BoardingField {
  label: string;
  value: string;
}

export interface BoardingPassProps {
  /** Passenger full name. */
  passenger: string;
  /** Origin IATA code. */
  from: string;
  /** Destination IATA code. */
  to: string;
  /** Flight designator, e.g. `'XN 482'`. */
  flight: string;
  /** Boarding gate. */
  gate?: string;
  /** Seat assignment, e.g. `'12A'`. */
  seat?: string;
  /** Boarding zone/group. */
  zone?: string;
  /** Pre-formatted boarding time. */
  boardingTime?: string;
  /** Extra fields appended to the detail grid. */
  extraFields?: readonly BoardingField[];
  /** Barcode payload string, rendered as a token-styled placeholder (no scan lib). */
  barcode?: string;
  /**
   * Surface treatment for the OUTER card frame (visual diversity). Default
   * `'classic'` — the original look. The primary header band and barcode
   * placeholder keep their inner look regardless.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A mobile boarding pass — passenger, the from→to route, flight, and a grid of
 * gate/seat/zone/boarding fields, capped by a token-styled barcode placeholder
 * (no barcode dependency; the `barcode` string is shown beneath it). Token-only
 * colors.
 */
export function BoardingPass({
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
  appearance = 'classic',
  style,
}: BoardingPassProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

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
        appearanceStyle(appearance, colors, tokens),
        {
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View style={{ backgroundColor: colors.primary, padding: tokens.spacing.md }}>
        <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          BOARDING PASS
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
          <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>{from}</Text>
          <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.lg }}>✈</Text>
          <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>{to}</Text>
        </View>
      </View>

      <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          <View style={{ gap: 2 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Passenger</Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {passenger}
            </Text>
          </View>
          <View style={{ gap: 2, alignItems: 'flex-end' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Flight</Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {flight}
            </Text>
          </View>
        </View>

        {fields.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }}>
            {fields.map((f, i) => (
              <View key={`${f.label}-${i}`} style={{ gap: 2, minWidth: 64 }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{f.label}</Text>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                  {f.value}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ flexDirection: 'row', gap: 2, height: 44, alignItems: 'stretch' }}
        >
          {Array.from({ length: 32 }, (_, i) => (
            <View
              key={i}
              style={{
                flex: i % 3 === 0 ? 2 : 1,
                backgroundColor: i % 2 === 0 ? colors.onSurface : colors.surface,
              }}
            />
          ))}
        </View>
        {barcode ? (
          <Text style={{ textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.xs, letterSpacing: 2 }}>
            {barcode}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
