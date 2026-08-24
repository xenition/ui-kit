import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { MiniBar } from '../charts';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { GoalCardProps, GoalCardColor } from './GoalCard';

/** Drop-in for {@link GoalCardProps} — same props, a different design. */
export type GoalCardV3Props = GoalCardProps;

/**
 * GoalCard — **thin value-first line** design (v3). The current value leads
 * large with its unit, the title sits quietly above, a trailing `NN%` reads the
 * completion, and a thin {@link MiniBar} underlines it all. Switches to the
 * `success` tone when the target is met. Compact enough for a stacked list.
 * Guards `target <= 0`. Same props as {@link GoalCardProps}; token-only colors.
 */
export function GoalCardV3({
  title,
  value,
  target,
  unit,
  color = 'primary',
  icon,
  onPress,
  appearance = 'classic',
  style,
}: GoalCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();

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
          ...(appearance !== 'classic'
            ? { ...appearanceStyle(appearance, colors, tokens), borderRadius: tokens.radius.md }
            : null),
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            {icon ? <View>{icon}</View> : null}
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', flex: 1 }}>
              {title}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
            <Text style={{ color: met ? colors.successText : colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
              {value}
            </Text>
            {unit ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{unit}</Text>
            ) : null}
            {hasTarget ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>/ {target}</Text>
            ) : null}
          </View>
        </View>
        {hasTarget ? (
          <Text style={{ color: met ? colors.successText : colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
            {pct}%
          </Text>
        ) : null}
      </View>

      {hasTarget ? (
        <MiniBar value={clamped} max={target} color={barColor} height={5} accessibilityLabel={`${title} progress, ${pct}%`} />
      ) : (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No target set</Text>
      )}
    </View>
  );

  if (!onPress) {
    return (
      <Animated.View accessibilityLabel={a11y} style={{ opacity: enter.opacity, transform: enter.transform }}>
        {inner}
      </Animated.View>
    );
  }
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {inner}
      </Pressable>
    </Animated.View>
  );
}
