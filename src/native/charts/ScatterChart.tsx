import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, G, Line } from 'react-native-svg';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type ScatterChartColor = keyof SemanticColors;

export interface ScatterPoint {
  x: number;
  y: number;
}

export interface ScatterChartProps {
  /** Points plotted against their own x/y min-max range. */
  points: ScatterPoint[];
  /** Plot height in px. */
  height?: number;
  /** Plot width in px. */
  width?: number;
  /** Theme color key for the dots. */
  color?: ScatterChartColor;
  /** Dot radius in px. */
  dotRadius?: number;
  /** Draw `border` axis lines along the left + bottom edges. */
  showAxes?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * SVG scatter plot — token-bound (uses `react-native-svg`). Each point is a
 * semantic-`color` circle scaled from the data's own x/y min/max into the plot
 * box; zero-range axes are guarded. Optional `border` axis lines. Renders a
 * `muted` "No data" note on empty input.
 */
export function ScatterChart({
  points,
  height = 200,
  width = 300,
  color = 'primary',
  dotRadius = 4,
  showAxes = true,
  style,
}: ScatterChartProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (points.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No data</Text>
    );
  }

  const pad = 12;
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

  const pixels = points.map((p) => ({
    cx: pad + ((p.x - minX) / spanX) * plotW,
    cy: pad + (1 - (p.y - minY) / spanY) * plotH,
  }));

  return (
    <View style={style}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <G>
          {showAxes ? (
            <>
              <Line x1={pad} y1={pad} x2={pad} y2={pad + plotH} stroke={colors.border} strokeWidth={1} />
              <Line
                x1={pad}
                y1={pad + plotH}
                x2={pad + plotW}
                y2={pad + plotH}
                stroke={colors.border}
                strokeWidth={1}
              />
            </>
          ) : null}
          {pixels.map((p, i) => (
            <Circle key={i} cx={p.cx} cy={p.cy} r={dotRadius} fill={colors[color]} fillOpacity={0.85} />
          ))}
        </G>
      </Svg>
    </View>
  );
}
