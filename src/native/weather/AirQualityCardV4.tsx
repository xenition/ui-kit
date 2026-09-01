import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Icon } from '../primitives/Icon';
import { clamp, withAlpha } from './weather-utils';
import type { AirQualityCardProps } from './AirQualityCard';

/** Drop-in for {@link AirQualityCardProps} — same props, a different design. */
export type AirQualityCardV4Props = AirQualityCardProps;

/** AQI severity band. */
type AqiBand =
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

/** `onSuccess`/`onWarn`/`onDanger` ink for a given severity tone. */
const ON_TONE: Record<BandMeta['tone'], keyof SemanticColors> = {
  success: 'onSuccess',
  warn: 'onWarn',
  danger: 'onDanger',
};

/**
 * AirQualityCard — **elevated card** design (v4). A polished white card sitting on
 * the page: an oversized AQI numeral, its severity band as a solid pill (glyph +
 * text — never color alone), a token-tinted scale track with a position marker,
 * and optional pollutant / advice captions. Band severity maps to
 * success/warn/danger tokens, every color/size traces to the compiled theme via
 * `useXenitionTheme()` — no literal colors. Renders a skeleton when `loading` and
 * a muted empty state when `aqi` is absent. Same props as {@link AirQualityCardProps}.
 */
export function AirQualityCardV4({
  aqi,
  pollutant,
  advice,
  loading = false,
  emptyLabel = 'Air quality unavailable',
  style,
}: AirQualityCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const surface: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.card,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.12,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading air quality" style={surface}>
        <View
          style={{
            height: tokens.typography.scale['2xl'],
            borderRadius: tokens.radius.sm,
            backgroundColor: withAlpha(colors.onSurface, 0.12),
          }}
        />
      </View>
    );
  }

  if (aqi == null) {
    return (
      <View accessibilityRole="summary" style={surface}>
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const meta = bandFor(aqi);
  const toneColor = colors[meta.tone];
  const onTone = colors[ON_TONE[meta.tone]];
  const markerPct = clamp(aqi, 0, 300) / 300;

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={`Air quality index ${aqi}, ${meta.label}`}
      style={surface}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph="🫁" size="lg" accessibilityLabel="Air quality" />
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          Air Quality
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
          marginTop: tokens.spacing.sm,
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '800',
            letterSpacing: -1,
          }}
        >
          {aqi}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: toneColor,
          }}
        >
          <Icon glyph={meta.glyph} size="sm" accessibilityLabel={meta.label} />
          <Text style={{ color: onTone, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {meta.label}
          </Text>
        </View>
      </View>

      {/* Token-tinted scale track with a position marker. */}
      <View
        style={{
          height: 10,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(toneColor, 0.15),
          marginTop: tokens.spacing.md,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: `${markerPct * 100}%`,
            width: 4,
            height: 16,
            marginLeft: -2,
            borderRadius: tokens.radius.full,
            backgroundColor: toneColor,
          }}
        />
      </View>

      {pollutant ? (
        <Text
          style={{
            color: colors.mutedText,
            fontSize: tokens.typography.scale.xs,
            marginTop: tokens.spacing.md,
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
    </View>
  );
}
