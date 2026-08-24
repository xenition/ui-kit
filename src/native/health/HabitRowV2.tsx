import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ProgressRing } from '../charts';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { HabitRowProps } from './HabitRow';

/** Drop-in for {@link HabitRowProps} — same props, a different design. */
export type HabitRowV2Props = HabitRowProps;

/**
 * HabitRow — **circular tile** design (v2). A grid-friendly square: a large
 * {@link ProgressRing} (full & `success` when done, an empty `border` track when
 * not) with a check in its center, the habit name beneath, and a streak flame
 * chip. The whole tile is one tap target that toggles `done`. Same props as
 * {@link HabitRowProps}; token-only colors.
 */
export function HabitRowV2({
  name,
  done,
  streak = 0,
  meta,
  onToggle,
  appearance = 'classic',
  style,
}: HabitRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeStreak = Math.max(Math.floor(streak), 0);
  const a11y = `${name}, ${done ? 'done' : 'not done'}${safeStreak > 0 ? `, ${safeStreak} day streak` : ''}`;
  const enter = useEnter();
  const press = usePressScale();

  const tile = (
    <View
      style={[
        {
          ...appearanceStyle(appearance, colors, tokens),
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
          alignItems: 'center',
        },
        style,
      ]}
    >
      <ProgressRing
        value={done ? 1 : 0}
        max={1}
        size={72}
        strokeWidth={8}
        color="success"
        label={done ? '✓' : ''}
        showPercent={false}
        accessibilityLabel={`${name} ${done ? 'done' : 'not done'}`}
      />
      <Text
        numberOfLines={2}
        style={{
          color: done ? colors.onSurface : colors.muted,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        {name}
      </Text>
      {meta ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>
          {meta}
        </Text>
      ) : null}
      {safeStreak > 0 ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
            🔥
          </Text>
          <Text style={{ color: colors.warnText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {safeStreak}
          </Text>
        </View>
      ) : null}
    </View>
  );

  if (!onToggle) {
    return (
      <Animated.View accessibilityLabel={a11y} style={{ opacity: enter.opacity, transform: enter.transform }}>
        {tile}
      </Animated.View>
    );
  }
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: done }}
        accessibilityLabel={a11y}
        onPress={() => onToggle(!done)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      >
        {tile}
      </Pressable>
    </Animated.View>
  );
}
