import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type SparklineColor = keyof SemanticColors;

export interface SparklineProps {
  /** Trend values, approximated as a row of thin vertical bars. */
  data: number[];
  /** Plot height in px. */
  height?: number;
  /** Theme color key for the bars. */
  color?: SparklineColor;
  /** Value mapped to full height; defaults to the largest datum. */
  max?: number;
  /** Accessible one-line summary; a sensible default is generated when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Compact trend indicator approximated with thin View-based bars (no SVG — the
 * kit has no `react-native-svg`). Each datum is a hairline-gapped bar whose
 * height tracks its value, reading as a sparkline at a glance.
 */
export function Sparkline({
  data,
  height = 32,
  color = 'primary',
  max,
  accessibilityLabel,
  style,
}: SparklineProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (data.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
        No data
      </Text>
    );
  }

  const ceiling = Math.max(max ?? Math.max(...data), 1);

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? `Sparkline, ${data.length} points`}
      style={[{ flexDirection: 'row', alignItems: 'flex-end', height, gap: 1 }, style]}
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
              borderRadius: tokens.radius.sm,
            }}
          />
        );
      })}
    </View>
  );
}
