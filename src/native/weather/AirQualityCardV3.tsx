import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import type { AirQualityCardProps, AqiBand } from './AirQualityCard';

/** Drop-in for {@link AirQualityCardProps} — same props, a different design. */
export type AirQualityCardV3Props = AirQualityCardProps;

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
  { max: 150, band: 'sensitive', label: 'Sensitive groups', glyph: '🟠', tone: 'warn' },
  { max: 200, band: 'unhealthy', label: 'Unhealthy', glyph: '🔴', tone: 'danger' },
  { max: 300, band: 'very-unhealthy', label: 'Very unhealthy', glyph: '🟣', tone: 'danger' },
  { max: Infinity, band: 'hazardous', label: 'Hazardous', glyph: '🟤', tone: 'danger' },
];

function bandFor(aqi: number): Band {
  return BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1]!;
}

/**
 * AirQualityCard — **compact chip row** design (v3). A single inline line: a lung
 * glyph, the "AQI" caption, the numeric value, and a tone `Badge` carrying the
 * severity band's glyph + text label (never color alone). An optional pollutant
 * caption trails on the right; advice, if given, wraps underneath. Sized for
 * dense dashboards and list rows. Renders a muted empty state when `aqi` is
 * absent and a skeleton when `loading`. Same props as
 * {@link AirQualityCardProps}; token-only colors.
 */
export function AirQualityCardV3({
  aqi,
  pollutant,
  advice,
  loading = false,
  emptyLabel = 'Air quality unavailable',
  style,
}: AirQualityCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container = {
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
  };

  if (loading) {
    return (
      <View style={[container, style]} accessibilityLabel="Loading air quality">
        <View
          style={{
            height: tokens.typography.scale.xl,
            borderRadius: tokens.radius.sm,
            backgroundColor: tokens.ramps.neutral[200],
          }}
        />
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

  return (
    <View
      style={[container, style]}
      accessibilityRole="summary"
      accessibilityLabel={`Air quality index ${aqi}, ${meta.label}`}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph="🫁" size="base" accessibilityLabel="Air quality" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>AQI</Text>
        <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
          {aqi}
        </Text>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
        {pollutant ? (
          <Text style={{ marginLeft: 'auto', color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {pollutant}
          </Text>
        ) : null}
      </View>
      {advice ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }}>
          {advice}
        </Text>
      ) : null}
    </View>
  );
}
