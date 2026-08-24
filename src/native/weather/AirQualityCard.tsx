import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { clamp, withAlpha } from './weather-utils';

/** AQI severity band. */
export type AqiBand =
  | 'good'
  | 'moderate'
  | 'sensitive'
  | 'unhealthy'
  | 'very-unhealthy'
  | 'hazardous';

interface BandMeta {
  label: string;
  glyph: string;
  /** Severity tone — success/warn/danger only, always paired with the label. */
  tone: Extract<keyof SemanticColors, 'success' | 'warn' | 'danger'>;
}

const BANDS: { max: number; band: AqiBand; meta: BandMeta }[] = [
  { max: 50, band: 'good', meta: { label: 'Good', glyph: '🟢', tone: 'success' } },
  { max: 100, band: 'moderate', meta: { label: 'Moderate', glyph: '🟡', tone: 'warn' } },
  { max: 150, band: 'sensitive', meta: { label: 'Unhealthy for sensitive groups', glyph: '🟠', tone: 'warn' } },
  { max: 200, band: 'unhealthy', meta: { label: 'Unhealthy', glyph: '🔴', tone: 'danger' } },
  { max: 300, band: 'very-unhealthy', meta: { label: 'Very unhealthy', glyph: '🟣', tone: 'danger' } },
  { max: Infinity, band: 'hazardous', meta: { label: 'Hazardous', glyph: '🟤', tone: 'danger' } },
];

function bandFor(aqi: number): BandMeta {
  return (BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1]!).meta;
}

export interface AirQualityCardProps {
  /** US AQI index value (0–500+). */
  aqi?: number;
  /** Dominant pollutant caption (e.g. `'PM2.5'`). */
  pollutant?: string;
  /** Short guidance sentence. */
  advice?: string;
  /** Loading skeleton. */
  loading?: boolean;
  /** Message shown when `aqi` is absent. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Air-quality index card: the numeric AQI, its severity band shown as a glyph +
 * text label (never color alone), a token-tinted scale bar with a position
 * marker, and optional pollutant/advice captions. Severity maps to
 * success/warn/danger tokens. Renders a muted empty state when `aqi` is absent
 * and a skeleton when `loading`. All colors/sizes come from the compiled theme
 * tokens via `useXenitionTheme()` — no literal colors.
 */
export function AirQualityCard({
  aqi,
  pollutant,
  advice,
  loading = false,
  emptyLabel = 'Air quality unavailable',
  style,
}: AirQualityCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <Card variant="outlined" style={style} accessibilityLabel="Loading air quality">
        <View
          style={{
            height: tokens.typography.scale['2xl'],
            borderRadius: tokens.radius.sm,
            backgroundColor: tokens.ramps.neutral[200],
          }}
        />
      </Card>
    );
  }

  if (aqi == null) {
    return (
      <Card variant="outlined" style={style} accessibilityRole="summary">
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {emptyLabel}
        </Text>
      </Card>
    );
  }

  const meta = bandFor(aqi);
  const toneColor = colors[meta.tone];
  const markerPct = clamp(aqi, 0, 300) / 300;

  return (
    <Card
      variant="outlined"
      style={style}
      accessibilityRole="summary"
      accessibilityLabel={`Air quality index ${aqi}, ${meta.label}`}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph="🫁" size="lg" accessibilityLabel="Air quality" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          Air Quality
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: tokens.spacing.sm,
          marginTop: tokens.spacing.xs,
        }}
      >
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '800',
          }}
        >
          {aqi}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph={meta.glyph} size="sm" accessibilityLabel={meta.label} />
          <Text style={{ color: toneColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {meta.label}
          </Text>
        </View>
      </View>

      {/* Token-tinted scale track with a position marker. */}
      <View
        style={{
          height: 8,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(toneColor, 0.18),
          marginTop: tokens.spacing.sm,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: `${markerPct * 100}%`,
            width: 4,
            height: 14,
            marginLeft: -2,
            borderRadius: tokens.radius.full,
            backgroundColor: toneColor,
          }}
        />
      </View>

      {pollutant ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            marginTop: tokens.spacing.sm,
          }}
        >
          Dominant: {pollutant}
        </Text>
      ) : null}
      {advice ? (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            marginTop: tokens.spacing.xs,
          }}
        >
          {advice}
        </Text>
      ) : null}
    </Card>
  );
}
