import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon } from '../primitives';
import { BarChart } from '../charts';

export interface EnergyUsageProps {
  /** Per-period usage samples (e.g. kWh per day). */
  data: number[];
  /** Labels under each bar (e.g. weekday initials). Indexed defensively. */
  labels?: string[];
  /** Card title. Default "Energy usage". */
  title?: string;
  /** Total for the period (pre-formatted or numeric). */
  total?: string | number;
  /** Unit suffix for the total (e.g. "kWh"). */
  unit?: string;
  /** Bar color slot. Default `'primary'`. */
  color?: keyof SemanticColors;
  /** Plot height in px. Default 120. */
  height?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Energy-usage panel — a titled {@link Card} wrapping the shared View-based
 * {@link BarChart} (no new chart code). The header shows the period total + unit;
 * the chart renders each sample as a `color`-slot bar. When `data` is empty the
 * card shows a muted "No usage data yet" line instead of an axis. `labels` are
 * passed straight through (BarChart aligns them per bar). Token-bound throughout.
 */
export function EnergyUsage({
  data,
  labels,
  title = 'Energy usage',
  total,
  unit,
  color = 'primary',
  height = 120,
  style,
}: EnergyUsageProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasData = data.length > 0;

  return (
    <Card variant="outlined" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph="⚡" color={color} size="base" />
        <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {title}
        </Text>
      </View>

      {total != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
            {String(total)}
          </Text>
          {unit != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{unit}</Text>
          ) : null}
        </View>
      ) : null}

      <View style={{ marginTop: tokens.spacing.md }}>
        {hasData ? (
          <BarChart data={data} labels={labels} height={height} color={color} accessibilityLabel={`${title}, ${data.length} periods`} />
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No usage data yet</Text>
        )}
      </View>
    </Card>
  );
}
