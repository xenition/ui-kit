import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type PieChartColor = keyof SemanticColors;

export interface PieChartDatum {
  label: string;
  value: number;
  /** Optional semantic color; falls back to a cycled palette. */
  color?: PieChartColor;
}

export interface PieChartProps {
  /** Slices; each slice's sweep is `value / total`. */
  data: PieChartDatum[];
  /** Diameter in px (chart is square). */
  size?: number;
  /** Render a swatch + label legend beneath the pie. */
  showLegend?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Semantic palette cycled for slices without an explicit color. */
const PALETTE: PieChartColor[] = ['primary', 'accent', 'success', 'warn', 'danger'];

/** Cartesian point on a circle for an angle measured clockwise from 12 o'clock. */
function polar(cx: number, cy: number, r: number, angle: number): { x: number; y: number } {
  const a = angle - Math.PI / 2;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

/**
 * SVG pie chart — token-bound (uses `react-native-svg`). Slice angles accumulate
 * from each value's share of the total; colors come from a semantic key or a
 * cycled palette (opacity steps down on wrap-around). Renders a `muted` "No data"
 * note when empty or when every value is zero.
 */
export function PieChart({
  data,
  size = 200,
  showLegend = false,
  style,
}: PieChartProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = data.reduce((sum, d) => sum + Math.max(d.value, 0), 0);

  if (data.length === 0 || total <= 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No data</Text>
    );
  }

  const r = size / 2;
  const cx = r;
  const cy = r;
  const sliceColor = (d: PieChartDatum, i: number): string =>
    colors[d.color ?? (PALETTE[i % PALETTE.length] ?? 'primary')];
  const sliceOpacity = (d: PieChartDatum, i: number): number =>
    d.color ? 1 : 1 - Math.floor(i / PALETTE.length) * 0.25;

  let cursor = 0;
  const slices = data.map((d, i) => {
    const frac = Math.max(d.value, 0) / total;
    const start = cursor * Math.PI * 2;
    cursor += frac;
    const end = cursor * Math.PI * 2;
    const p0 = polar(cx, cy, r, start);
    const p1 = polar(cx, cy, r, end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    const d3 = `M ${cx} ${cy} L ${p0.x} ${p0.y} A ${r} ${r} 0 ${largeArc} 1 ${p1.x} ${p1.y} Z`;
    return { d: d3, fill: sliceColor(d, i), opacity: sliceOpacity(d, i), frac };
  });

  const single = slices.length === 1;

  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G>
          {single ? (
            <Circle
              cx={cx}
              cy={cy}
              r={r}
              fill={slices[0]?.fill ?? colors.primary}
              fillOpacity={slices[0]?.opacity ?? 1}
            />
          ) : (
            slices.map((s, i) => (
              <Path key={i} d={s.d} fill={s.fill} fillOpacity={s.opacity} />
            ))
          )}
        </G>
      </Svg>
      {showLegend ? (
        <View style={{ marginTop: tokens.spacing.sm, gap: tokens.spacing.xs }}>
          {data.map((d, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: sliceColor(d, i),
                  opacity: sliceOpacity(d, i),
                }}
              />
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs }}>
                {d.label}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
