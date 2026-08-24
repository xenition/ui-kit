import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon, Badge, Progress } from '../primitives';
import { LineChart } from '../charts';

/** Moisture band — colors the reading and pairs with a text chip. */
export type SoilMoistureStatus = 'dry' | 'optimal' | 'wet';

export interface SoilMoistureCardProps {
  /** Current volumetric moisture percent (0–100). Clamped/guarded. */
  moisture?: number;
  /** Sensor / zone label (e.g. "Zone 3 · 30cm"). */
  label?: string;
  /** Moisture band. Default derived from `moisture` thresholds. */
  status?: SoilMoistureStatus;
  /** Recent moisture samples for the trend line. Empty → no chart. */
  trend?: number[];
  /** Companion reading (e.g. soil temperature "18°C"). */
  soilTemp?: string;
  /** Card title. Default "Soil moisture". */
  title?: string;
  /** Chart height in px. Default 90. */
  chartHeight?: number;
  style?: StyleProp<ViewStyle>;
}

const STATUS_META: Record<
  SoilMoistureStatus,
  { label: string; color: keyof SemanticColors; tone: 'warn' | 'success' | 'primary' }
> = {
  dry: { label: 'Dry', color: 'warn', tone: 'warn' },
  optimal: { label: 'Optimal', color: 'success', tone: 'success' },
  wet: { label: 'Saturated', color: 'primary', tone: 'primary' },
};

function deriveStatus(moisture: number): SoilMoistureStatus {
  if (moisture < 30) return 'dry';
  if (moisture > 70) return 'wet';
  return 'optimal';
}

/**
 * A soil-moisture panel — a titled {@link Card} showing the current percent
 * (colored by band and paired with a text {@link Badge}, never color alone), a
 * fill {@link Progress}, an optional companion soil-temperature reading, and a
 * recent {@link LineChart} trend. The moisture value is clamped to [0,100] and
 * `status` defaults to a threshold-derived band. An empty `trend` simply omits
 * the chart. Token-bound throughout — no literal colors.
 */
export function SoilMoistureCard({
  moisture,
  label,
  status,
  trend,
  soilTemp,
  title = 'Soil moisture',
  chartHeight = 90,
  style,
}: SoilMoistureCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = typeof moisture === 'number' ? Math.max(0, Math.min(100, moisture)) : undefined;
  const band = status ?? (pct != null ? deriveStatus(pct) : 'optimal');
  const meta = STATUS_META[band];
  const series = Array.isArray(trend) ? trend : [];

  return (
    <Card variant="outlined" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph="💧" color={meta.color} size="base" />
        <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {title}
        </Text>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: tokens.spacing.sm }}>
        <Text style={{ color: colors[meta.color], fontSize: tokens.typography.scale['3xl'], fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
          {pct != null ? `${pct}` : '—'}
        </Text>
        {pct != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>%</Text>
        ) : null}
        {soilTemp != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, marginLeft: tokens.spacing.sm }}>
            🌡️ {soilTemp}
          </Text>
        ) : null}
      </View>

      {label != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }}>{label}</Text>
      ) : null}

      {pct != null ? (
        <View style={{ marginTop: tokens.spacing.sm }}>
          <Progress value={pct} tone={meta.tone} />
        </View>
      ) : null}

      {series.length > 1 ? (
        <View style={{ marginTop: tokens.spacing.md }}>
          <LineChart
            data={series}
            height={chartHeight}
            color={meta.color}
            accessibilityLabel={`${title} trend, ${series.length} samples`}
          />
        </View>
      ) : null}
    </Card>
  );
}
