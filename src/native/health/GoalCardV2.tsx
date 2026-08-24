import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ProgressRing } from '../charts';
import { Badge } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { GoalCardProps, GoalCardColor } from './GoalCard';

/** Drop-in for {@link GoalCardProps} — same props, a different design. */
export type GoalCardV2Props = GoalCardProps;

/**
 * GoalCard — **ring hero** design (v2). A large {@link ProgressRing} showing the
 * completion percentage anchors the card, with the title, `value / target`
 * readout, and (when reached) a `success` "Goal met" badge alongside. The ring
 * and readout switch to the `success` tone on completion. Guards `target <= 0`.
 * Same props as {@link GoalCardProps}; token-only colors.
 */
export function GoalCardV2({
  title,
  value,
  target,
  unit,
  color = 'primary',
  icon,
  onPress,
  appearance = 'classic',
  style,
}: GoalCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();

  const hasTarget = target > 0;
  const clamped = hasTarget ? Math.min(Math.max(value, 0), target) : Math.max(value, 0);
  const met = hasTarget && value >= target;
  const pct = hasTarget ? Math.round((clamped / target) * 100) : 0;
  const ringColor: GoalCardColor = met ? 'success' : color;
  const a11y = hasTarget
    ? `${title}: ${value} of ${target}${unit ? ` ${unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`
    : `${title}: ${value}${unit ? ` ${unit}` : ''}`;

  const inner = (
    <View
      style={[
        {
          ...appearanceStyle(appearance, colors, tokens),
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}
    >
      {hasTarget ? (
        <ProgressRing
          value={clamped}
          max={target}
          size={96}
          strokeWidth={11}
          color={ringColor}
          label={`${pct}%`}
          showPercent={false}
          accessibilityLabel={`${title} progress, ${pct}%`}
        />
      ) : (
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: tokens.radius.full,
            borderWidth: 2,
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>No target</Text>
        </View>
      )}

      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {icon ? <View>{icon}</View> : null}
          <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flex: 1 }}>
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          <Text style={{ color: met ? colors.successText : colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
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
        {met ? (
          <Badge tone="success" variant="soft" size="sm">
            ✓ Goal met
          </Badge>
        ) : null}
      </View>
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
