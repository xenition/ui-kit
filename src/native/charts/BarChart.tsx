import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type ChartColor = keyof SemanticColors;

export interface BarChartProps {
  /** Bar values; each becomes a vertical bar sized by value / max. */
  data: number[];
  /** Optional labels rendered under each bar. */
  labels?: string[];
  /** Plot height in px. */
  height?: number;
  /** Theme color key for the bars. */
  color?: ChartColor;
  /** Value mapped to full bar height; defaults to the largest datum. */
  max?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Vertical bar chart — token-bound, View/flex-based (no SVG). Each datum is a
 * `View` whose height is `(value / max) * height`. A `muted` baseline stands in
 * for the axis; labels use `onSurface`.
 */
export function BarChart({
  data,
  labels,
  height = 120,
  color = 'primary',
  max,
  style,
}: BarChartProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (data.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
        No data
      </Text>
    );
  }

  const ceiling = Math.max(max ?? Math.max(...data), 1);

  return (
    <View style={style}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          height,
          gap: tokens.spacing.xs,
        }}
      >
        {data.map((value, i) => {
          const ratio = Math.min(Math.max(value / ceiling, 0), 1);
          return (
            <View
              key={i}
              style={{
                flex: 1,
                height: Math.max(ratio * height, 1),
                backgroundColor: colors[color],
                borderTopLeftRadius: tokens.radius.sm,
                borderTopRightRadius: tokens.radius.sm,
              }}
            />
          );
        })}
      </View>
      <View style={{ height: 1, backgroundColor: colors.muted, marginTop: tokens.spacing.xs }} />
      {labels ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
          {labels.map((label, i) => (
            <Text
              key={i}
              numberOfLines={1}
              style={{
                flex: 1,
                textAlign: 'center',
                color: colors.onSurface,
                fontSize: tokens.typography.scale.xs,
              }}
            >
              {label}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}
