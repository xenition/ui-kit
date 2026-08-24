import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, Path, Polyline } from 'react-native-svg';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type AreaChartColor = keyof SemanticColors;

/** A `{ x, y }` datum or a bare number (index becomes `x`). */
export type AreaChartDatum = number | { x: number; y: number };

export interface AreaChartProps {
  /** Series values; bare numbers are indexed on x, or explicit `{x,y}` points. */
  data: AreaChartDatum[];
  /** Plot height in px. */
  height?: number;
  /** Plot width in px. */
  width?: number;
  /** Theme color key for the line + filled area. */
  color?: AreaChartColor;
  /** Fill opacity for the area under the line. */
  fillOpacity?: number;
  /** Stroke width in px. */
  strokeWidth?: number;
  /** Render a dot at each point. */
  showDots?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * SVG area chart — token-bound (uses `react-native-svg`). A line over a filled
 * region (semantic `color` at a low `fillOpacity`); geometry is scaled from the
 * data's own min/max. Renders a `muted` "No data" note on empty input and guards
 * zero-range series.
 */
export function AreaChart({
  data,
  height = 160,
  width = 300,
  color = 'primary',
  fillOpacity = 0.2,
  strokeWidth = 2,
  showDots = false,
  style,
}: AreaChartProps): React.ReactElement {
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
  const baseY = pad + plotH;

  const pixels = points.map((p) => ({
    px: pad + ((p.x - minX) / spanX) * plotW,
    py: pad + (1 - (p.y - minY) / spanY) * plotH,
  }));

  const first = pixels[0] ?? { px: pad, py: baseY };
  const last = pixels[pixels.length - 1] ?? first;
  const lineSegs = pixels.map((p) => `L ${p.px} ${p.py}`).join(' ');
  const areaPath = `M ${first.px} ${baseY} L ${first.px} ${first.py} ${lineSegs} L ${last.px} ${baseY} Z`;
  const polyPoints = pixels.map((p) => `${p.px},${p.py}`).join(' ');

  return (
    <View style={style}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Path d={areaPath} fill={colors[color]} fillOpacity={fillOpacity} stroke="none" />
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
