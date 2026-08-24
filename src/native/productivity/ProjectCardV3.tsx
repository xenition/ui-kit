import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Progress } from '../primitives';
import { AssigneeGroup } from './AssigneeGroup';
import { DueDatePill } from './DueDatePill';
import type { ProjectCardProps } from './ProjectCard';

/** Same public contract as {@link ProjectCard} — a drop-in alternate design. */
export type ProjectCardV3Props = ProjectCardProps;

/**
 * ProjectCard, redesigned (v3): a **dense project row**. The title over a
 * description·task-count line with a thin progress bar, and assignees + a due pill
 * on the right — a hairline row for a projects list. The opposite of v2's card.
 * Same props, token-only.
 */
export function ProjectCardV3({
  title, description, progress, taskCount, assignees, dueLabel, dueTone, onPress, appearance, style,
}: ProjectCardV3Props): React.ReactElement {
  void appearance;
  const { colors, tokens } = useXenitionTheme();
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : null;
  const sub = [description, typeof taskCount === 'number' ? `${taskCount} tasks` : null].filter((s): s is string => !!s).join('  ·  ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{title}</Text>
        {sub ? <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{sub}</Text> : null}
        {pct !== null ? <Progress value={pct} tone="primary" size="sm" /> : null}
      </View>
      {assignees && assignees.length > 0 ? <AssigneeGroup assignees={assignees} max={3} /> : null}
      {dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
    </Pressable>
  );
}
