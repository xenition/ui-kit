import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { MiniBar } from '../charts';

export type GoalCardColor = keyof SemanticColors;

export interface GoalCardProps {
  /** Goal title, e.g. "Weekly steps". */
  title: string;
  /** Current progress value. */
  value: number;
  /** Target value the goal is measured against. */
  target: number;
  /** Unit label, e.g. "steps", "km". */
  unit?: string;
  /** Progress-bar color; auto-switches to `success` when the goal is met. */
  color?: GoalCardColor;
  /** Optional icon/emoji slot. */
  icon?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A goal-progress card: title, an emphasized `value / target` readout, and a
 * {@link MiniBar}. When the target is met the bar and readout switch to the
 * `success` tone and a "Goal met" note appears. Guards `target <= 0`. Token-only.
 */
export function GoalCard({
  title,
  value,
  target,
  unit,
  color = 'primary',
  icon,
  onPress,
  style,
}: GoalCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const hasTarget = target > 0;
  const clamped = hasTarget ? Math.min(Math.max(value, 0), target) : Math.max(value, 0);
  const met = hasTarget && value >= target;
  const pct = hasTarget ? Math.round((clamped / target) * 100) : 0;
  const barColor: GoalCardColor = met ? 'success' : color;
  const a11y = hasTarget
    ? `${title}: ${value} of ${target}${unit ? ` ${unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`
    : `${title}: ${value}${unit ? ` ${unit}` : ''}`;

  const inner = (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {icon ? <View>{icon}</View> : null}
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flex: 1 }}>
          {title}
        </Text>
        {met ? (
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            ✓ Goal met
          </Text>
        ) : null}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <Text style={{ color: met ? colors.success : colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
          {value}
        </Text>
        {hasTarget ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            / {target}
            {unit ? ` ${unit}` : ''}
          </Text>
        ) : unit ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{unit}</Text>
        ) : null}
      </View>
      {hasTarget ? (
        <MiniBar value={clamped} max={target} color={barColor} accessibilityLabel={`${title} progress, ${pct}%`} />
      ) : (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No target set</Text>
      )}
    </View>
  );

  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
