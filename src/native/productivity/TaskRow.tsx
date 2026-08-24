import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Checkbox } from '../primitives';
import { PriorityTag, type PriorityLevel } from './PriorityTag';
import { DueDatePill, type DueDateTone } from './DueDatePill';

/**
 * TaskRow layout variants:
 * - `checkbox` — leading checkbox + title only (the baseline task line).
 * - `priority` — adds a trailing {@link PriorityTag} dot.
 * - `dated`    — adds a trailing {@link DueDatePill}.
 */
export type TaskRowVariant = 'checkbox' | 'priority' | 'dated';

export interface TaskRowProps {
  /** Task title. */
  title: string;
  /** Completed state — toggles the checkbox and strikes the title. */
  done?: boolean;
  /** Fires with the next done value when the checkbox is pressed. */
  onToggle?: (done: boolean) => void;
  /** Fires when the row body (not the checkbox) is pressed. */
  onPress?: () => void;
  /** Which trailing accessory to show. */
  variant?: TaskRowVariant;
  /** Priority — required for the `priority` variant. */
  priority?: PriorityLevel;
  /** Due-date label — required for the `dated` variant. */
  dueLabel?: string;
  /** Due-date urgency tone for the `dated` variant. */
  dueTone?: DueDateTone;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single task line: a leading {@link Checkbox}, the title (struck through when
 * `done`), and a variant-driven trailing accessory (priority tag or due-date
 * pill). The checkbox carries its own `checkbox` a11y role; the row body is a
 * separate pressable. No literal colors.
 */
export function TaskRow({
  title,
  done = false,
  onToggle,
  onPress,
  variant = 'checkbox',
  priority = 'low',
  dueLabel,
  dueTone = 'upcoming',
  style,
}: TaskRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
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
          numberOfLines={2}
          style={{
            color: done ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '500',
            textDecorationLine: done ? 'line-through' : 'none',
          }}
        >
          {title}
        </Text>
      </Pressable>

      {variant === 'priority' ? <PriorityTag level={priority} /> : null}
      {variant === 'dated' && dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
    </View>
  );
}
