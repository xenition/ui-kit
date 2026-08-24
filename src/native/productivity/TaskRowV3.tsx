import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Checkbox } from '../primitives';
import { PriorityTag } from './PriorityTag';
import { DueDatePill } from './DueDatePill';
import type { TaskRowProps } from './TaskRow';

/** Same public contract as {@link TaskRow} — a drop-in alternate design. */
export type TaskRowV3Props = TaskRowProps;

/**
 * TaskRow, redesigned (v3): an **ultra-dense checklist line**. A small checkbox, the
 * title inline, and a compact accessory on a bare hairline row — the tightest to-do
 * line. The opposite of v2's card. Same props, token-only.
 */
export function TaskRowV3({
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
}: TaskRowV3Props): React.ReactElement {
  void appearance;
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <Checkbox checked={done} onCheckedChange={onToggle} accessibilityLabel={title} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        disabled={!onPress}
        style={{ flex: 1 }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: done ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            textDecorationLine: done ? 'line-through' : 'none',
          }}
        >
          {title}
        </Text>
      </Pressable>
      {variant === 'priority' ? <PriorityTag level={priority} dotOnly /> : null}
      {variant === 'dated' && dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
    </View>
  );
}
