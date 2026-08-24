import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { G, Line, Polygon } from 'react-native-svg';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type RadarChartColor = keyof SemanticColors;

export interface RadarChartProps {
  /** Axis labels; also fixes the number of spokes. */
  axes: string[];
  /** One number per axis, per series. Extra/short rows are padded with 0. */
  series: number[][];
  /** Diameter in px (chart is square). */
  size?: number;
  /** Value mapped to the outer ring; defaults to the largest datum. */
  max?: number;
  /** Number of concentric grid rings. */
  rings?: number;
  /** Accessible one-line summary; a sensible default is generated when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const PALETTE: RadarChartColor[] = ['primary', 'accent', 'success', 'warn', 'danger'];

/**
 * SVG radar / spider chart — token-bound (uses `react-native-svg`). Draws `border`
 * grid rings and spokes, then one filled `Polygon` per series (semantic color,
 * low fill opacity). Values are normalized to `max`. Renders a `muted` "No data"
 * note when there are no axes or no series.
 */
export function RadarChart({
  axes,
  series,
  size = 220,
  max,
  rings = 4,
  accessibilityLabel,
  style,
}: RadarChartProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (axes.length === 0 || series.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No data</Text>
    );
  }

  const n = axes.length;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;
  const ceiling = Math.max(max ?? Math.max(1, ...series.flat()), 1);
  const angleAt = (i: number): number => -Math.PI / 2 + (i / n) * Math.PI * 2;
  const point = (i: number, radius: number): { x: number; y: number } => ({
    x: cx + radius * Math.cos(angleAt(i)),
    y: cy + radius * Math.sin(angleAt(i)),
  });

  const ringPolys = Array.from({ length: rings }, (_, ri) => {
    const rr = (r * (ri + 1)) / rings;
    return Array.from({ length: n }, (_, i) => {
      const p = point(i, rr);
      return `${p.x},${p.y}`;
    }).join(' ');
  });

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={
        accessibilityLabel ?? `Radar chart, ${series.length} series, ${axes.length} axes`
      }
      style={style}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G>
          {ringPolys.map((pts, i) => (
            <Polygon key={`ring-${i}`} points={pts} fill="none" stroke={colors.border} strokeWidth={1} />
          ))}
          {axes.map((_, i) => {
            const p = point(i, r);
            return (
              <Line key={`spoke-${i}`} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={colors.border} strokeWidth={1} />
            );
          })}
          {series.map((row, si) => {
            const stroke = colors[PALETTE[si % PALETTE.length] ?? 'primary'];
            const pts = Array.from({ length: n }, (_, i) => {
              const v = Math.max(row[i] ?? 0, 0);
              const p = point(i, (Math.min(v, ceiling) / ceiling) * r);
              return `${p.x},${p.y}`;
            }).join(' ');
            return (
              <Polygon
                key={`series-${si}`}
                points={pts}
                fill={stroke}
                fillOpacity={0.2}
                stroke={stroke}
                strokeWidth={2}
              />
            );
          })}
        </G>
      </Svg>
    </View>
  );
}
