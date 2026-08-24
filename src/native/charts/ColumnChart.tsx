import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type ColumnChartColor = keyof SemanticColors;

export interface ColumnChartDatum {
  label: string;
  value: number;
}

export interface ColumnChartProps {
  /** Labelled values rendered as horizontal bars. */
  data: ColumnChartDatum[];
  /** Theme color key for the bars. */
  color?: ColumnChartColor;
  /** Value mapped to full bar width; defaults to the largest datum. */
  max?: number;
  /** Per-bar track height in px. */
  barHeight?: number;
  /** Show the numeric value at the end of each bar. */
  showValues?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Horizontal bar chart — token-bound, View/flex-based (no SVG). Each row is a
 * label plus a `View` whose width flexes to `value / max`. Track uses `border`,
 * fill uses the chosen theme color.
 */
export function ColumnChart({
  data,
  color = 'primary',
  max,
  barHeight = 12,
  showValues = false,
  style,
}: ColumnChartProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (data.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
        No data
      </Text>
    );
  }

  const ceiling = Math.max(max ?? Math.max(...data.map((d) => d.value)), 1);

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {data.map((d, i) => {
        const ratio = Math.min(Math.max(d.value / ceiling, 0), 1);
        return (
          <View key={i} style={{ gap: tokens.spacing.xs }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                numberOfLines={1}
                style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, flex: 1 }}
              >
                {d.label}
              </Text>
              {showValues ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {d.value}
                </Text>
              ) : null}
            </View>
            <View
              style={{
                height: barHeight,
                backgroundColor: colors.border,
                borderRadius: tokens.radius.full,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: `${ratio * 100}%`,
                  height: '100%',
                  backgroundColor: colors[color],
                  borderRadius: tokens.radius.full,
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}
