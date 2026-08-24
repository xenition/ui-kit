import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Checkbox } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import { PriorityTag } from './PriorityTag';
import { DueDatePill } from './DueDatePill';
import type { TaskRowProps } from './TaskRow';

/** Same public contract as {@link TaskRow} — a drop-in alternate design. */
export type TaskRowV2Props = TaskRowProps;

/**
 * TaskRow, redesigned (v2): an **elevated task card**. The checkbox rides in a soft
 * tinted well, the title is bolder, and the accessory sits on a shadowed surface
 * row. Distinct from v1's flat line. Same props, token-only.
 */
export function TaskRowV2({
  title,
  done = false,
  onToggle,
  onPress,
  variant = 'checkbox',
  priority = 'low',
  dueLabel,
  dueTone = 'upcoming',
  appearance,
  style,
}: TaskRowV2Props): React.ReactElement {
  void appearance;
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          ...shadow('sm', tokens),
        },
        style,
      ]}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(colors.primary, 0.1),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Checkbox checked={done} onCheckedChange={onToggle} accessibilityLabel={title} />
      </View>

      <Animated.View style={{ flex: 1, transform: [{ scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={title}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          disabled={!onPress}
        >
          <Text
            numberOfLines={2}
            style={{
              color: done ? colors.muted : colors.onSurface,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '700',
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
