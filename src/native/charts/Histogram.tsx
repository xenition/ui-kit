import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type HistogramColor = keyof SemanticColors;

export interface HistogramProps {
  /** Bin counts; each becomes an adjacent vertical bar. */
  bins: number[];
  /** Plot height in px. */
  height?: number;
  /** Theme color key for the bars. */
  color?: HistogramColor;
  /** Count mapped to full height; defaults to the largest bin. */
  max?: number;
  /** Accessible one-line summary; a sensible default is generated when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Frequency histogram — token-bound, View/flex-based (no SVG). Like a bar chart
 * but bars sit flush (gapless) to read as a distribution. Bar height is
 * `count / max`; a `muted` baseline stands in for the axis.
 */
export function Histogram({
  bins,
  height = 120,
  color = 'primary',
  max,
  accessibilityLabel,
  style,
}: HistogramProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (bins.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
        No data
      </Text>
    );
  }

  const ceiling = Math.max(max ?? Math.max(...bins), 1);

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? `Histogram, ${bins.length} bins, max ${ceiling}`}
      style={style}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', height }}>
        {bins.map((count, i) => {
          const ratio = Math.min(Math.max(count / ceiling, 0), 1);
          return (
            <View
              key={i}
              style={{
                flex: 1,
                height: Math.max(ratio * height, 1),
                backgroundColor: colors[color],
                borderColor: colors.surface,
                borderLeftWidth: i === 0 ? 0 : 1,
              }}
            />
          );
        })}
      </View>
      <View style={{ height: 1, backgroundColor: colors.muted, marginTop: tokens.spacing.xs }} />
    </View>
  );
}
