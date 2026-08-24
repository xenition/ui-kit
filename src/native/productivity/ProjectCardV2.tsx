import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Progress } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import { AssigneeGroup } from './AssigneeGroup';
import { DueDatePill } from './DueDatePill';
import type { ProjectCardProps } from './ProjectCard';

/** Same public contract as {@link ProjectCard} — a drop-in alternate design. */
export type ProjectCardV2Props = ProjectCardProps;

/**
 * ProjectCard, redesigned (v2): an **elevated project card**. A bold title/desc, a
 * percent read-out over a progress bar, then assignees, a task-count meta and a due
 * pill on a footer row. Shadowed, press-scales. Distinct from v1. Same props,
 * token-only.
 */
export function ProjectCardV2({
  title, description, progress, taskCount, assignees, dueLabel, dueTone, onPress, appearance, style,
}: ProjectCardV2Props): React.ReactElement {
  void appearance;
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : null;

  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        disabled={!onPress}
        style={[
          {
            gap: tokens.spacing.sm,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.surface,
            ...shadow('md', tokens),
          },
          style,
        ]}
      >
        <View>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
          {description ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text> : null}
        </View>
        {pct !== null ? (
          <View style={{ gap: tokens.spacing.xs }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Progress</Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{pct}%</Text>
            </View>
            <Progress value={pct} tone="primary" size="sm" />
          </View>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          {assignees && assignees.length > 0 ? <AssigneeGroup assignees={assignees} /> : <View />}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            {typeof taskCount === 'number' ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{taskCount} tasks</Text> : null}
            {dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
