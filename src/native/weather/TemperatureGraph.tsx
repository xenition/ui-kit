import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Card } from '../primitives/Card';
import { LineChart } from '../charts/LineChart';

export interface TemperatureGraphProps {
  /** Temperature series (one value per period). */
  data: number[];
  /** X-axis tick labels aligned to `data` (e.g. hours). Optional. */
  labels?: string[];
  /** Unit suffix for the min/max annotations. Default `'°'`. */
  unit?: string;
  /** Card title. Default `'Temperature'`. */
  title?: string;
  /** Line color token key. Default `'primary'`. */
  color?: keyof SemanticColors;
  /** Plot height in px. Default `160`. */
  height?: number;
  /** Plot width in px. Default `300`. */
  width?: number;
  /** Message shown when `data` is empty. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Temperature trend graph — a thin wrapper over the shared `LineChart` that adds
 * a titled card, min/max annotations, and optional x-axis labels. The line color
 * is a semantic token key (default `primary`); the chart itself is token-bound
 * and handles the empty/flat/single-point cases. Renders a muted empty state
 * when `data` is empty. All colors/sizes come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors.
 */
export function TemperatureGraph({
  data,
  labels,
  unit = '°',
  title = 'Temperature',
  color = 'primary',
  height = 160,
  width = 300,
  emptyLabel = 'No temperature data',
  style,
}: TemperatureGraphProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (data.length === 0) {
    return (
      <Card variant="outlined" style={style} accessibilityRole="summary">
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {title}
        </Text>
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.sm,
            marginTop: tokens.spacing.sm,
          }}
        >
          {emptyLabel}
        </Text>
      </Card>
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);

  return (
    <Card variant="outlined" style={style}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: tokens.spacing.sm,
        }}
      >
        <Text
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          H {max}
          {unit} · L {min}
          {unit}
        </Text>
      </View>

      <LineChart
        data={data}
        color={color}
        height={height}
        width={width}
        showDots
        accessibilityLabel={`Temperature graph, high ${max}${unit}, low ${min}${unit}, ${data.length} points`}
      />

      {labels && labels.length > 0 ? (
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: tokens.spacing.xs }}
        >
          {labels.map((label, index) => (
            <Text
              key={`${label}-${index}`}
              style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}
            >
              {label}
            </Text>
          ))}
        </View>
      ) : null}
    </Card>
  );
}
