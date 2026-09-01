import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Checkbox } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { usePressScale } from '../primitives/internal/motion';
import { PriorityTag } from './PriorityTag';
import { DueDatePill } from './DueDatePill';
import type { TaskRowProps } from './TaskRow';

/** Drop-in for {@link TaskRowProps} — same props, the V4 "flow" design. */
export type TaskRowV4Props = TaskRowProps;

/**
 * TaskRow — **V4** "flow" design. The focused-workspace take on a task line: a
 * leading {@link Checkbox}, a bigger, more legible title, and the variant-driven
 * trailing accessory (priority tag or due pill). Completing a task is the
 * satisfying moment — the row settles into a **soft-success glow** with the title
 * struck through. Same props/behavior as {@link TaskRowProps}; token-only colors
 * via `useXenitionTheme()`.
 */
export function TaskRowV4({
  title,
  done = false,
  onToggle,
  onPress,
  variant = 'checkbox',
  priority = 'low',
  dueLabel,
  dueTone = 'upcoming',
  style,
}: TaskRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          backgroundColor: done ? withAlpha(colors.success, 0.08) : 'transparent',
        },
        style,
      ]}
    >
      <Checkbox checked={done} onCheckedChange={onToggle} accessibilityLabel={title} />

      <Animated.View style={{ flex: 1, transform: [{ scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={title}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          disabled={!onPress}
          style={{ flex: 1 }}
        >
          <Text
            numberOfLines={2}
            style={{
              color: done ? colors.muted : colors.onSurface,
              fontSize: tokens.typography.scale.base,
              fontWeight: '600',
              lineHeight: tokens.typography.scale.base * 1.4,
              textDecorationLine: done ? 'line-through' : 'none',
            }}
          >
            {title}
          </Text>
        </Pressable>
      </Animated.View>

      {variant === 'priority' ? <PriorityTag level={priority} /> : null}
      {variant === 'dated' && dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
    </View>
  );
}
