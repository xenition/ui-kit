import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Checkbox, Avatar } from '../primitives';
import { StatusPill } from './StatusPill';
import { toneColor, TASK_STATUS_META, type TaskStatus } from './internal';

export type OnboardingTaskVariant = 'default' | 'compact';

export interface OnboardingTaskProps {
  /** Task title (e.g. "Sign employment contract"). */
  title: string;
  /** Grouping category (e.g. "Paperwork", "IT setup"). */
  category?: string;
  /** Workflow status — glyph + word pill. Drives the checkbox when `done`. */
  status?: TaskStatus;
  /** Pre-formatted due date. */
  dueDate?: string;
  /** Whether this task is past due — flagged by word, not color alone. */
  overdue?: boolean;
  /** Assignee / owner name. */
  assignee?: string;
  /** Assignee avatar. */
  assigneeAvatarUrl?: string;
  /** Density. */
  variant?: OnboardingTaskVariant;
  /** Fires with the next completed value when the checkbox is toggled. */
  onToggle?: (done: boolean) => void;
  /** Tap handler for the row body. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single onboarding checklist item: a checkbox, title, category, and status
 * pill (glyph + word — `blocked` reads danger, `done` success, never color
 * alone). Overdue tasks are called out with a word. Toggling the checkbox fires
 * `onToggle(next)` for optimistic completion. `compact` drops the category /
 * assignee meta. All colors are theme tokens — no literals.
 */
export function OnboardingTask({
  title,
  category,
  status = 'todo',
  dueDate,
  overdue = false,
  assignee,
  assigneeAvatarUrl,
  variant = 'default',
  onToggle,
  onPress,
  testID,
  style,
}: OnboardingTaskProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const done = status === 'done';

  const meta = [category, dueDate ? `Due ${dueDate}` : null].filter(Boolean).join('  ·  ');

  const inner = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ paddingTop: 2 }}>
        <Checkbox
          checked={done}
          onCheckedChange={(next) => onToggle?.(next)}
          accessibilityLabel={`${done ? 'Mark incomplete' : 'Mark complete'}: ${title}`}
        />
      </View>
      <View style={{ flex: 1, gap: tokens.spacing.xs / 2 }}>
        <Text
          numberOfLines={2}
          style={{
            color: done ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
            textDecorationLine: done ? 'line-through' : 'none',
          }}
        >
          {title}
        </Text>
        {!compact && meta ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {meta}
          </Text>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          <StatusPill meta={TASK_STATUS_META[status]} size="sm" />
          {overdue && !done ? (
            <Text style={{ color: toneColor(colors, 'danger'), fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              ⚠ Overdue
            </Text>
          ) : null}
          {!compact && assignee ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }}>
              <Avatar size="xs" name={assignee} src={assigneeAvatarUrl} />
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{assignee}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Onboarding task ${title}`} onPress={onPress} testID={testID}>
        {inner}
      </Pressable>
    );
  }
  return <View testID={testID}>{inner}</View>;
}
