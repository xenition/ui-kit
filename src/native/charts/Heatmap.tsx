import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type HeatmapColor = keyof SemanticColors;

export interface HeatmapProps {
  /** Row-major grid of values; intensity maps to cell opacity. */
  data: number[][];
  /** Theme color key painted at varying opacity. */
  color?: HeatmapColor;
  /** Value mapped to full opacity; defaults to the grid maximum. */
  max?: number;
  /** Cell edge length in px. */
  cellSize?: number;
  /** Accessible one-line summary; a sensible default is generated when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Grid heatmap — token-bound, View-based (no SVG). Every cell paints ONE theme
 * color and varies only its `opacity` (`value / max`), so no literal colors are
 * introduced. Empty cells fall back to a `border`-tinted blank.
 */
export function Heatmap({
  data,
  color = 'primary',
  max,
  cellSize = 16,
  accessibilityLabel,
  style,
}: HeatmapProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (data.length === 0 || data.every((row) => row.length === 0)) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
        No data
      </Text>
    );
  }

  const flat = data.flat();
  const ceiling = Math.max(max ?? Math.max(...flat), 1);
  const cols = Math.max(...data.map((row) => row.length));

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={
        accessibilityLabel ?? `Heatmap, ${data.length}×${cols} grid, max ${ceiling}`
      }
      style={[{ gap: 2 }, style]}
    >
      {data.map((row, r) => (
        <View key={r} style={{ flexDirection: 'row', gap: 2 }}>
          {row.map((value, c) => {
            const intensity = Math.min(Math.max(value / ceiling, 0), 1);
            return (
              <View
                key={c}
                style={{
                  width: cellSize,
                  height: cellSize,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: colors[color],
                  // Floor so a zero cell still shows a faint tile edge.
                  opacity: 0.08 + intensity * 0.92,
                }}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}
