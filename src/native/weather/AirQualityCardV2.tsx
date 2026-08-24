import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Icon } from '../primitives/Icon';
import { clamp, withAlpha } from './weather-utils';
import type { AirQualityCardProps, AqiBand } from './AirQualityCard';

/** Drop-in for {@link AirQualityCardProps} — same props, a different design. */
export type AirQualityCardV2Props = AirQualityCardProps;

type Tone = Extract<keyof SemanticColors, 'success' | 'warn' | 'danger'>;

interface Band {
  max: number;
  band: AqiBand;
  label: string;
  glyph: string;
  tone: Tone;
}

const BANDS: Band[] = [
  { max: 50, band: 'good', label: 'Good', glyph: '🟢', tone: 'success' },
  { max: 100, band: 'moderate', label: 'Moderate', glyph: '🟡', tone: 'warn' },
  { max: 150, band: 'sensitive', label: 'Unhealthy for sensitive groups', glyph: '🟠', tone: 'warn' },
  { max: 200, band: 'unhealthy', label: 'Unhealthy', glyph: '🔴', tone: 'danger' },
  { max: 300, band: 'very-unhealthy', label: 'Very unhealthy', glyph: '🟣', tone: 'danger' },
  { max: Infinity, band: 'hazardous', label: 'Hazardous', glyph: '🟤', tone: 'danger' },
];

function bandFor(aqi: number): Band {
  return BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1]!;
}

/**
 * AirQualityCard — **dial** design (v2). The AQI sits large inside a tone-tinted
 * ring, with the severity band shown as a glyph + text label beneath (never
 * color alone). A six-segment token scale band underneath maps the full AQI
 * spectrum, with the active band highlighted and a marker at the current value.
 * Optional pollutant/advice captions follow. Renders a muted empty state when
 * `aqi` is absent and a skeleton when `loading`. Same props as
 * {@link AirQualityCardProps}; token-only colors.
 */
export function AirQualityCardV2({
  aqi,
  pollutant,
  advice,
  loading = false,
  emptyLabel = 'Air quality unavailable',
  style,
}: AirQualityCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const c = colors as unknown as Record<string, string>;

  const container = {
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: tokens.spacing.lg,
  };

  if (loading) {
    return (
      <View style={[container, style]} accessibilityLabel="Loading air quality">
        <View style={{ alignItems: 'center', gap: tokens.spacing.md }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: tokens.radius.full,
              backgroundColor: tokens.ramps.neutral[200],
            }}
          />
          <View
            style={{
              width: 160,
              height: tokens.typography.scale.base,
              borderRadius: tokens.radius.sm,
              backgroundColor: tokens.ramps.neutral[200],
            }}
          />
        </View>
      </View>
    );
  }

  if (aqi == null) {
    return (
      <View style={[container, style]} accessibilityRole="summary">
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  const meta = bandFor(aqi);
  const ringColor = colors[meta.tone];
  const toneText = c[`${meta.tone}Text`] ?? colors.onSurface;
  const markerPct = clamp(aqi, 0, 300) / 300;

  return (
    <View
      style={[container, style]}
      accessibilityRole="summary"
      accessibilityLabel={`Air quality index ${aqi}, ${meta.label}`}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginBottom: tokens.spacing.md }}>
        <Icon glyph="🫁" size="sm" accessibilityLabel="Air quality" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          Air Quality
        </Text>
      </View>

      {/* Dial: big number inside a tone-tinted ring. */}
      <View style={{ alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 128,
            height: 128,
            borderRadius: tokens.radius.full,
            borderWidth: 8,
            borderColor: withAlpha(ringColor, 0.35),
            backgroundColor: withAlpha(ringColor, 0.08),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'] * 1.4, fontWeight: '800' }}
          >
            {aqi}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>AQI</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph={meta.glyph} size="sm" accessibilityLabel={meta.label} />
          <Text style={{ color: toneText, fontSize: tokens.typography.scale.base, fontWeight: '700', textAlign: 'center' }}>
            {meta.label}
          </Text>
        </View>
      </View>

      {/* Six-segment token scale band with a marker. */}
      <View style={{ marginTop: tokens.spacing.md }}>
        <View style={{ flexDirection: 'row', gap: 2, height: 8 }}>
          {BANDS.map((b, i) => {
            const active = b.band === meta.band;
            return (
              <View
                key={b.band}
                style={{
                  flex: 1,
                  borderTopLeftRadius: i === 0 ? tokens.radius.full : 0,
                  borderBottomLeftRadius: i === 0 ? tokens.radius.full : 0,
                  borderTopRightRadius: i === BANDS.length - 1 ? tokens.radius.full : 0,
                  borderBottomRightRadius: i === BANDS.length - 1 ? tokens.radius.full : 0,
                  backgroundColor: withAlpha(colors[b.tone], active ? 0.7 : 0.2),
                }}
              />
            );
          })}
        </View>
        <View style={{ height: 10, justifyContent: 'center' }}>
          <View
            style={{
              position: 'absolute',
              left: `${markerPct * 100}%`,
              width: 4,
              height: 10,
              marginLeft: -2,
              borderRadius: tokens.radius.full,
              backgroundColor: ringColor,
            }}
          />
        </View>
      </View>

      {pollutant ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.sm }}>
          Dominant: {pollutant}
        </Text>
      ) : null}
      {advice ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }}>
          {advice}
        </Text>
      ) : null}
    </View>
  );
}
