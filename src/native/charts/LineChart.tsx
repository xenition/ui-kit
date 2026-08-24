import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, Polyline } from 'react-native-svg';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type LineChartColor = keyof SemanticColors;

/** A `{ x, y }` datum or a bare number (index becomes `x`). */
export type LineChartDatum = number | { x: number; y: number };

export interface LineChartProps {
  /** Series values; bare numbers are indexed on x, or explicit `{x,y}` points. */
  data: LineChartDatum[];
  /** Plot height in px. */
  height?: number;
  /** Plot width in px. */
  width?: number;
  /** Theme color key for the line + dots. */
  color?: LineChartColor;
  /** Render a dot at each point. */
  showDots?: boolean;
  /** Stroke width in px. */
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * SVG line chart — token-bound (uses `react-native-svg`). Points are scaled to
 * the plot box from the data's own min/max on each axis; the stroke and dots use
 * a semantic theme color, never a literal hex. Renders a `muted` "No data" note
 * on empty input and guards against zero-range (single point / flat) series.
 */
export function LineChart({
  data,
  height = 160,
  width = 300,
  color = 'primary',
  showDots = false,
  strokeWidth = 2,
  style,
}: LineChartProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (data.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No data</Text>
    );
  }

  const pad = 8;
  const points = data.map((d, i) =>
    typeof d === 'number' ? { x: i, y: d } : { x: d.x, y: d.y }
  );
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const plotW = Math.max(width - pad * 2, 1);
  const plotH = Math.max(height - pad * 2, 1);

  const toPx = (p: { x: number; y: number }): { px: number; py: number } => ({
    px: pad + ((p.x - minX) / spanX) * plotW,
    py: pad + (1 - (p.y - minY) / spanY) * plotH,
  });

  const pixels = points.map(toPx);
  const polyPoints = pixels.map((p) => `${p.px},${p.py}`).join(' ');

  return (
    <View style={style}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Polyline
          points={polyPoints}
          fill="none"
          stroke={colors[color]}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {showDots
          ? pixels.map((p, i) => (
              <Circle key={i} cx={p.px} cy={p.py} r={strokeWidth + 1} fill={colors[color]} />
            ))
          : null}
      </Svg>
    </View>
  );
}
