import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { HabitRowProps } from './HabitRow';

/** Drop-in for {@link HabitRowProps} — same props, a different design. */
export type HabitRowV3Props = HabitRowProps;

/** How many streak dots the minimal line renders at most. */
const MAX_DOTS = 7;

/**
 * HabitRow — **minimal line** design (v3). A single quiet line: a small round
 * check on the left, the habit name, then a `flame + count` and a compact row
 * of week dots (the last {@link MAX_DOTS} filled in `success`). No surface fill
 * by default — separation comes from spacing. Tapping toggles `done`. Same props
 * as {@link HabitRowProps}; token-only colors.
 */
export function HabitRowV3({
  name,
  done,
  streak = 0,
  meta,
  onToggle,
  appearance = 'classic',
  style,
}: HabitRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeStreak = Math.max(Math.floor(streak), 0);
  const a11y = `${name}, ${done ? 'done' : 'not done'}${safeStreak > 0 ? `, ${safeStreak} day streak` : ''}`;
  const enter = useEnter();
  const press = usePressScale();

  const filled = Math.min(safeStreak, MAX_DOTS);
  const dots = Array.from({ length: MAX_DOTS }, (_, i) => i < filled);

  const line = (
    <View
      style={[
        {
          ...(appearance !== 'classic'
            ? { ...appearanceStyle(appearance, colors, tokens), borderRadius: tokens.radius.md }
            : null),
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.xs,
          minHeight: 44,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: tokens.radius.full,
          borderWidth: 2,
          borderColor: done ? colors.success : colors.border,
          backgroundColor: done ? colors.success : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {done ? (
          <Text allowFontScaling={false} style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
            ✓
          </Text>
        ) : null}
      </View>

      <View style={{ flex: 1, minWidth: 0 }}>
        <Text
          numberOfLines={1}
          style={{
            color: done ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
            textDecorationLine: done ? 'line-through' : 'none',
          }}
        >
          {name}
        </Text>
        {meta ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {meta}
          </Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {dots.map((on, i) => (
          <View
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: tokens.radius.full,
              backgroundColor: on ? colors.success : colors.border,
            }}
          />
        ))}
      </View>

      {safeStreak > 0 ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
            🔥
          </Text>
          <Text style={{ color: colors.warnText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {safeStreak}
          </Text>
        </View>
      ) : null}
    </View>
  );

  if (!onToggle) {
    return (
      <Animated.View accessibilityLabel={a11y} style={{ opacity: enter.opacity, transform: enter.transform }}>
        {line}
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
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {line}
      </Pressable>
    </Animated.View>
  );
}
