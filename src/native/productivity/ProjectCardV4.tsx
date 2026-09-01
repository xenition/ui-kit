import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Progress } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { usePressScale } from '../primitives/internal/motion';
import { AssigneeGroup } from './AssigneeGroup';
import { DueDatePill } from './DueDatePill';
import type { ProjectCardProps } from './ProjectCard';

/** Drop-in for {@link ProjectCardProps} — same props, the V4 "flow" design. */
export type ProjectCardV4Props = ProjectCardProps;

/**
 * ProjectCard — **V4** "flow" design. The focused-workspace take on a project
 * summary: a clean, softly-elevated {@link Card} with a legible title, one
 * **primary** progress track (which settles into a **soft-success glow** at
 * 100%), an {@link AssigneeGroup}, task-count meta, and an optional
 * {@link DueDatePill}. A hairline primary accent edge is the only flourish.
 * Same props/behavior as {@link ProjectCardProps}; token-only colors via
 * `useXenitionTheme()`.
 */
export function ProjectCardV4({
  title,
  description,
  progress,
  taskCount,
  assignees = [],
  dueLabel,
  dueTone = 'upcoming',
  onPress,
  style,
}: ProjectCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;
  const complete = pct != null && pct >= 100;

  const inner = (
    <Card
      style={{
        gap: tokens.spacing.md,
        borderRadius: tokens.radius.lg,
        borderLeftWidth: 3,
        borderLeftColor: colors.primary,
        backgroundColor: complete ? withAlpha(colors.success, 0.08) : colors.surface,
      }}
    >
      <View style={{ gap: tokens.spacing.xs }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {title}
        </Text>
        {description ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {description}
          </Text>
        ) : null}
      </View>

      {pct != null ? (
        <View style={{ gap: tokens.spacing.xs }}>
          <Progress value={pct} tone={complete ? 'success' : 'primary'} size="sm" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {`${pct}% complete${typeof taskCount === 'number' ? ` · ${taskCount} tasks` : ''}`}
          </Text>
        </View>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <AssigneeGroup assignees={assignees} />
        {dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
      </View>
    </Card>
  );

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={title}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, style]}
        >
          {inner}
        </Pressable>
      </Animated.View>
    );
  }
  return <View style={style}>{inner}</View>;
}
