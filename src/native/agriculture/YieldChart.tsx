import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon } from '../primitives';
import { BarChart, LineChart } from '../charts';

/** Which shared chart to render. */
export type YieldChartVariant = 'bars' | 'line';

export interface YieldChartProps {
  /** Yield samples per period (e.g. t/ha per season). Empty → muted note. */
  data: number[];
  /** Labels under each period (bars only). Passed through; guarded per bar. */
  labels?: string[];
  /** Card title. Default "Yield". */
  title?: string;
  /** Pre-formatted headline figure (e.g. "4.8 t/ha"). */
  headline?: string;
  /** Unit suffix for the headline (e.g. "avg"). */
  unit?: string;
  /** Which shared chart to reuse. Default `'bars'`. */
  variant?: YieldChartVariant;
  /** Series color slot. Default `'success'`. */
  color?: keyof SemanticColors;
  /** Plot height in px. Default 140. */
  height?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A yield visualization — a titled {@link Card} that reuses the shared
 * {@link BarChart} (`variant='bars'`) or {@link LineChart} (`variant='line'`);
 * no new chart code. The header carries an optional `headline` + `unit`. An
 * empty `data` array renders a muted "No yield data yet" note instead of an
 * axis. Series color keys off a `SemanticColors` slot. Token-bound throughout —
 * no literal colors.
 */
export function YieldChart({
  data,
  labels,
  title = 'Yield',
  headline,
  unit,
  variant = 'bars',
  color = 'success',
  height = 140,
  style,
}: YieldChartProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const series = Array.isArray(data) ? data : [];
  const hasData = series.length > 0;

  return (
    <Card variant="outlined" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph="📈" color={color} size="base" />
        <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {title}
        </Text>
      </View>

      {headline != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
            {headline}
          </Text>
          {unit != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{unit}</Text>
          ) : null}
        </View>
      ) : null}

      <View style={{ marginTop: tokens.spacing.md }}>
        {hasData ? (
          variant === 'line' ? (
            <LineChart data={series} height={height} color={color} showDots accessibilityLabel={`${title}, ${series.length} periods`} />
          ) : (
            <BarChart data={series} labels={labels} height={height} color={color} accessibilityLabel={`${title}, ${series.length} periods`} />
          )
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No yield data yet</Text>
        )}
      </View>
    </Card>
  );
}
