import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type ActivityRingColor = keyof SemanticColors;

export interface ActivityRing {
  /** Ring name, e.g. "Move". */
  label: string;
  /** Current value; clamped to `[0, goal]`. */
  value: number;
  /** Goal / full-ring value. */
  goal: number;
  /** Arc color (SemanticColors key). */
  color?: ActivityRingColor;
  /** Unit for the a11y summary, e.g. "kcal". */
  unit?: string;
}

export interface ActivityRingsProps {
  /** Concentric rings, drawn outermost-first. Typically 2–4. */
  rings: ActivityRing[];
  /** Outer diameter in px. */
  size?: number;
  /** Ring stroke width in px. */
  strokeWidth?: number;
  /** Gap between concentric rings in px. */
  gap?: number;
  /** Whether to show the labelled legend beside the rings. */
  showLegend?: boolean;
  /** Accessible summary override; a per-ring summary is generated otherwise. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_COLORS: ActivityRingColor[] = ['danger', 'success', 'primary', 'accent'];

/**
 * Apple-style concentric activity rings drawn with `react-native-svg`. Each ring
 * is a `border` track plus a semantic-color arc (dash-array technique, starting
 * at 12 o'clock). Guards divide-by-zero per ring and renders a muted "No data"
 * note when `rings` is empty. The whole figure exposes one `accessibilityLabel`
 * summarizing every ring. Token-only colors.
 */
export function ActivityRings({
  rings,
  size = 140,
  strokeWidth = 14,
  gap = 4,
  showLegend = false,
  accessibilityLabel,
  style,
}: ActivityRingsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (rings.length === 0) {
    return <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No data</Text>;
  }

  const cx = size / 2;
  const cy = size / 2;

  const summary =
    accessibilityLabel ??
    `Activity rings: ${rings
      .map((ring) => {
        const g = Math.max(ring.goal, 0);
        const pct = g > 0 ? Math.round((Math.min(Math.max(ring.value, 0), g) / g) * 100) : 0;
        return `${ring.label} ${pct}%`;
      })
      .join(', ')}`;

  const figure = (
    <View
      accessibilityRole="image"
      accessibilityLabel={summary}
      style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation={-90} origin={`${cx}, ${cy}`}>
          {rings.map((ring, i) => {
            const r = size / 2 - strokeWidth / 2 - i * (strokeWidth + gap);
            if (r <= 0) return null;
            const circumference = 2 * Math.PI * r;
            const g = Math.max(ring.goal, 0);
            const frac = g > 0 ? Math.min(Math.max(ring.value, 0), g) / g : 0;
            const dash = circumference * frac;
            const arcColor = colors[ring.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? 'primary'];
            return (
              <G key={i}>
                <Circle cx={cx} cy={cy} r={r} fill="none" stroke={colors.border} strokeWidth={strokeWidth} />
                <Circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={arcColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${circumference}`}
                />
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );

  if (!showLegend) {
    return <View style={style}>{figure}</View>;
  }

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg }, style]}>
      {figure}
      <View style={{ gap: tokens.spacing.sm }}>
        {rings.map((ring, i) => {
          const g = Math.max(ring.goal, 0);
          const arcColor = colors[ring.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? 'primary'];
          return (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: tokens.radius.full,
                  backgroundColor: arcColor,
                }}
              />
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                {ring.label}
              </Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {Math.min(Math.max(ring.value, 0), g)} / {g}
                {ring.unit ? ` ${ring.unit}` : ''}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
