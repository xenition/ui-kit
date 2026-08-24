import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type ProgressRingColor = keyof SemanticColors;

export interface ProgressRingProps {
  /** Current value; clamped to `[0, max]`. */
  value: number;
  /** Full-circle value. */
  max?: number;
  /** Outer diameter in px. */
  size?: number;
  /** Ring stroke width in px. */
  strokeWidth?: number;
  /** Theme color key for the progress arc. */
  color?: ProgressRingColor;
  /** Center text; defaults to the rounded percentage when `showPercent`. */
  label?: string;
  /** Show `NN%` in the center when no explicit `label` is given. */
  showPercent?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * SVG progress ring — token-bound (uses `react-native-svg`). A `border` track
 * circle plus a semantic-`color` arc drawn with the stroke-dasharray technique
 * (rotated so it starts at 12 o'clock). `max` guards divide-by-zero. Renders a
 * `muted` "No data" note only when `max <= 0`.
 */
export function ProgressRing({
  value,
  max = 100,
  size = 120,
  strokeWidth = 12,
  color = 'primary',
  label,
  showPercent = true,
  style,
}: ProgressRingProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (max <= 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No data</Text>
    );
  }

  const clamped = Math.min(Math.max(value, 0), max);
  const frac = clamped / max;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * frac;
  const centerText = label ?? (showPercent ? `${Math.round(frac * 100)}%` : undefined);

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation={-90} origin={`${cx}, ${cy}`}>
          <Circle cx={cx} cy={cy} r={r} fill="none" stroke={colors.border} strokeWidth={strokeWidth} />
          <Circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={colors[color]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
          />
        </G>
      </Svg>
      {centerText !== undefined ? (
        <Text
          style={{
            position: 'absolute',
            color: colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontFamily: tokens.typography.fontHeading,
          }}
        >
          {centerText}
        </Text>
      ) : null}
    </View>
  );
}
