import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ProgressRing } from '../charts';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient, calmInk } from './internal/calm';
import { WellnessGoalRing, type WellnessGoalRingProps } from './WellnessGoalRing';

export type WellnessGoalRingV4Props = WellnessGoalRingProps;

/**
 * WellnessGoalRingV4 — the calm redesign of {@link WellnessGoalRing}. Same props,
 * defaults, size, ring color, and "No goal set" empty state. Only the visuals
 * change: the "✓ Goal met" note becomes a small gradient pill (the single calm
 * accent) once the goal is met.
 */
export function WellnessGoalRingV4({
  label,
  value,
  goal,
  unit,
  color = 'primary',
  size = 132,
  showMetBadge = true,
  style,
}: WellnessGoalRingV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;

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
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          alignItems: 'center',
          gap: tokens.spacing.sm,
        },
        style,
      ]}
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
        <GradientSurface
          colors={calmGradient(r)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            overflow: 'hidden',
          }}
        >
          <Text style={{ color: calmInk(r), fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            ✓ Goal met
          </Text>
        </GradientSurface>
      ) : null}
    </View>
  );
}
