import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type DonutChartColor = keyof SemanticColors;

export interface DonutChartDatum {
  label: string;
  value: number;
  /** Optional semantic color; falls back to a cycled palette. */
  color?: DonutChartColor;
}

export interface DonutChartProps {
  /** Ring segments; each segment's sweep is `value / total`. */
  data: DonutChartDatum[];
  /** Outer diameter in px (chart is square). */
  size?: number;
  /** Ring thickness in px. */
  thickness?: number;
  /** Optional text drawn in the hole (e.g. a total). */
  centerLabel?: string;
  /** Render a swatch + label legend beneath the donut. */
  showLegend?: boolean;
  /** Accessible one-line summary; a sensible default is generated when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const PALETTE: DonutChartColor[] = ['primary', 'accent', 'success', 'warn', 'danger'];

function polar(cx: number, cy: number, r: number, angle: number): { x: number; y: number } {
  const a = angle - Math.PI / 2;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

/**
 * SVG donut chart — token-bound (uses `react-native-svg`). Like `PieChart` but
 * each segment is an annular sector between an inner and outer radius, leaving a
 * hole for an optional `centerLabel`. Colors are semantic keys or a cycled
 * palette. Renders a `muted` "No data" note when empty or all-zero.
 */
export function DonutChart({
  data,
  size = 200,
  thickness = 32,
  centerLabel,
  showLegend = false,
  accessibilityLabel,
  style,
}: DonutChartProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = data.reduce((sum, d) => sum + Math.max(d.value, 0), 0);

  if (data.length === 0 || total <= 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No data</Text>
    );
  }

  const rOuter = size / 2;
  const rInner = Math.max(rOuter - thickness, 1);
  const cx = rOuter;
  const cy = rOuter;
  const segColor = (d: DonutChartDatum, i: number): string =>
    colors[d.color ?? (PALETTE[i % PALETTE.length] ?? 'primary')];
  const segOpacity = (d: DonutChartDatum, i: number): number =>
    d.color ? 1 : 1 - Math.floor(i / PALETTE.length) * 0.25;

  let cursor = 0;
  const segments = data.map((d, i) => {
    const frac = Math.max(d.value, 0) / total;
    const start = cursor * Math.PI * 2;
    cursor += frac;
    const end = cursor * Math.PI * 2;
    const o0 = polar(cx, cy, rOuter, start);
    const o1 = polar(cx, cy, rOuter, end);
    const i1 = polar(cx, cy, rInner, end);
    const i0 = polar(cx, cy, rInner, start);
    const largeArc = end - start > Math.PI ? 1 : 0;
    const path =
      `M ${o0.x} ${o0.y} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${o1.x} ${o1.y} ` +
      `L ${i1.x} ${i1.y} A ${rInner} ${rInner} 0 ${largeArc} 0 ${i0.x} ${i0.y} Z`;
    return { path, fill: segColor(d, i), opacity: segOpacity(d, i) };
  });

  const single = segments.length === 1;

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={
        accessibilityLabel ??
        `Donut chart, ${data.length} segments${centerLabel ? `, ${centerLabel}` : ''}`
      }
      style={style}
    >
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G>
            {single ? (
              <>
                <Circle cx={cx} cy={cy} r={rOuter} fill={segments[0]?.fill ?? colors.primary} fillOpacity={segments[0]?.opacity ?? 1} />
                <Circle cx={cx} cy={cy} r={rInner} fill={colors.surface} />
              </>
            ) : (
              segments.map((s, i) => (
                <Path key={i} d={s.path} fill={s.fill} fillOpacity={s.opacity} />
              ))
            )}
          </G>
        </Svg>
        {centerLabel ? (
          <Text
            style={{
              position: 'absolute',
              color: colors.onSurface,
              fontSize: tokens.typography.scale.lg,
              fontFamily: tokens.typography.fontHeading,
            }}
          >
            {centerLabel}
          </Text>
        ) : null}
      </View>
      {showLegend ? (
        <View style={{ marginTop: tokens.spacing.sm, gap: tokens.spacing.xs }}>
          {data.map((d, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: segColor(d, i),
                  opacity: segOpacity(d, i),
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
