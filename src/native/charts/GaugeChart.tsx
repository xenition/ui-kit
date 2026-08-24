import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { G, Line, Path } from 'react-native-svg';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type GaugeChartColor = keyof SemanticColors;

export interface GaugeChartProps {
  /** Current value; clamped to `[0, max]`. */
  value: number;
  /** Full-scale value mapped to the right end of the arc. */
  max?: number;
  /** Width in px (height is roughly half). */
  size?: number;
  /** Arc thickness in px. */
  thickness?: number;
  /** Theme color key for the filled value arc + needle. */
  color?: GaugeChartColor;
  /** Show the value text under the needle. */
  showValue?: boolean;
  style?: StyleProp<ViewStyle>;
}

function polar(cx: number, cy: number, r: number, angle: number): { x: number; y: number } {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

/**
 * SVG gauge — token-bound (uses `react-native-svg`). A 180° semicircular track
 * (`border`) with a value arc filled in a semantic `color` and a needle pointing
 * at the clamped value. `max` guards divide-by-zero. Renders a `muted` "No data"
 * note only when `max <= 0`.
 */
export function GaugeChart({
  value,
  max = 100,
  size = 220,
  thickness = 18,
  color = 'primary',
  showValue = true,
  style,
}: GaugeChartProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (max <= 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No data</Text>
    );
  }

  const width = size;
  const height = size / 2 + thickness;
  const cx = width / 2;
  const cy = size / 2 + thickness / 2;
  const r = size / 2 - thickness / 2;
  const clamped = Math.min(Math.max(value, 0), max);
  const frac = clamped / max;

  // Sweep from 180° (left) to 360° (right) across the top half.
  const start = Math.PI;
  const end = Math.PI + frac * Math.PI;
  const trackStart = polar(cx, cy, r, Math.PI);
  const trackEnd = polar(cx, cy, r, Math.PI * 2);
  const valStart = polar(cx, cy, r, start);
  const valEnd = polar(cx, cy, r, end);
  const largeArc = end - start > Math.PI ? 1 : 0;
  const needle = polar(cx, cy, r, end);

  return (
    <View style={style}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <G>
          <Path
            d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 0 1 ${trackEnd.x} ${trackEnd.y}`}
            fill="none"
            stroke={colors.border}
            strokeWidth={thickness}
            strokeLinecap="round"
          />
          <Path
            d={`M ${valStart.x} ${valStart.y} A ${r} ${r} 0 ${largeArc} 1 ${valEnd.x} ${valEnd.y}`}
            fill="none"
            stroke={colors[color]}
            strokeWidth={thickness}
            strokeLinecap="round"
          />
          <Line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke={colors[color]} strokeWidth={2} />
        </G>
      </Svg>
      {showValue ? (
        <Text
          style={{
            textAlign: 'center',
            marginTop: tokens.spacing.xs,
            color: colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontFamily: tokens.typography.fontHeading,
          }}
        >
          {clamped}
        </Text>
      ) : null}
    </View>
  );
}
