import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { LineChart } from '../charts';

export type GrowthMetric = 'height' | 'weight' | 'head' | 'other';

interface MetricMeta {
  glyph: string;
  label: string;
}

const METRIC_META: Record<GrowthMetric, MetricMeta> = {
  height: { glyph: '📏', label: 'Height' },
  weight: { glyph: '⚖️', label: 'Weight' },
  head: { glyph: '🧢', label: 'Head circumference' },
  other: { glyph: '📈', label: 'Growth' },
};

export interface GrowthChartProps {
  /** Series of measurements over time (bare numbers indexed on x). */
  data: number[];
  /** Which growth metric this chart plots; drives the title + icon. */
  metric?: GrowthMetric;
  /** Unit suffix for the latest-value readout, e.g. "cm" or "kg". */
  unit?: string;
  /** Optional percentile subtitle, e.g. "75th percentile". */
  percentile?: string;
  /** Line color slot. */
  color?: keyof SemanticColors;
  /** Plot height in px. */
  height?: number;
  /** Loading placeholder state. */
  loading?: boolean;
  /** Copy shown when there is no data. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A child's growth curve — a titled card wrapping the shared `LineChart` with a
 * latest-value + percentile readout. Reuses the charts module rather than
 * re-plotting. Renders an explicit empty state when `data` is empty. All colors
 * are `SemanticColors` tokens — no literals.
 */
export function GrowthChart({
  data,
  metric = 'height',
  unit,
  percentile,
  color = 'primary',
  height = 160,
  loading = false,
  emptyLabel = 'No measurements logged yet',
  style,
}: GrowthChartProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = METRIC_META[metric] ?? METRIC_META.other;

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading growth chart" style={container}>
        <View style={{ height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height, width: '100%', borderRadius: tokens.radius.md, backgroundColor: colors.border }} />
      </View>
    );
  }

  const latest = data.length > 0 ? data[data.length - 1] : undefined;

  if (data.length === 0) {
    return (
      <View accessibilityLabel={emptyLabel} style={container}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {meta.glyph} {meta.label}
        </Text>
        <View style={{ alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
            📉
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      accessibilityLabel={`${meta.label} growth${latest !== undefined ? `, latest ${latest}${unit ? ` ${unit}` : ''}` : ''}${percentile ? `, ${percentile}` : ''}`}
      style={container}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {meta.glyph} {meta.label}
        </Text>
        {latest !== undefined ? (
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
            {latest}
            {unit ? ` ${unit}` : ''}
          </Text>
        ) : null}
      </View>
      {percentile ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{percentile}</Text>
      ) : null}
      <LineChart data={data} color={color} height={height} showDots accessibilityLabel={`${meta.label} over time`} />
    </View>
  );
}
