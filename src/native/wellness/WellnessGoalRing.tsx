import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { ProgressRing } from '../charts';

export type WellnessGoalColor = keyof SemanticColors;

export interface WellnessGoalRingProps {
  /** Metric label, e.g. "Mindful minutes". */
  label: string;
  /** Current value. */
  value: number;
  /** Target value; `<= 0` renders an empty "No goal set" state. */
  goal: number;
  /** Unit suffix, e.g. "min". */
  unit?: string;
  /** Ring color (semantic slot). Default `'primary'`. */
  color?: WellnessGoalColor;
  /** Ring diameter in px. Default 132. */
  size?: number;
  /** Show a "✓ Goal met" note once value reaches the goal. Default true. */
  showMetBadge?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A wellness goal dial built on the shared `ProgressRing` chart: a labeled ring
 * showing progress toward a daily target, with the value / goal beneath and a
 * success badge once met. A non-positive `goal` degrades to a "No goal set"
 * note (state, not color alone). Token-only colors — the ring resolves its
 * stroke from a `SemanticColors` key.
 */
export function WellnessGoalRing({
  label,
  value,
  goal,
  unit,
  color = 'primary',
  size = 132,
  showMetBadge = true,
  style,
}: WellnessGoalRingProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (goal <= 0) {
    return (
      <View
        accessibilityLabel={`${label}: no goal set`}
        style={[{ alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.md }, style]}
      >
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {label}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No goal set</Text>
      </View>
    );
  }

  const pct = Math.round((Math.min(Math.max(value, 0), goal) / goal) * 100);
  const met = value >= goal;
  const unitSuffix = unit ? ` ${unit}` : '';

  return (
    <View
      accessibilityLabel={`${label}: ${value} of ${goal}${unitSuffix}, ${pct}%${met ? ', goal met' : ''}`}
      style={[{ alignItems: 'center', gap: tokens.spacing.sm }, style]}
    >
      <ProgressRing value={value} max={goal} size={size} color={color} label={`${pct}%`} showPercent={false} />
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {label}
      </Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
        {value} / {goal}
        {unitSuffix}
      </Text>
      {met && showMetBadge ? (
        <Text style={{ color: colors.success, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          ✓ Goal met
        </Text>
      ) : null}
    </View>
  );
}
