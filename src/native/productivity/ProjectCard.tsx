import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Progress } from '../primitives';
import { AssigneeGroup, type Assignee } from './AssigneeGroup';
import { DueDatePill, type DueDateTone } from './DueDatePill';

export interface ProjectCardProps {
  /** Project name. */
  title: string;
  /** Short description / subtitle. */
  description?: string;
  /** Completion percent 0–100 (guarded/clamped by the bar). */
  progress?: number;
  /** Count of open tasks (rendered as a subtle meta). */
  taskCount?: number;
  /** People on the project. */
  assignees?: Assignee[];
  /** Optional deadline label + tone. */
  dueLabel?: string;
  dueTone?: DueDateTone;
  /** Fires when the card is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A project summary card composed on the primitive {@link Card}: title +
 * description, a {@link Progress} completion bar, and a footer with an
 * {@link AssigneeGroup} and optional {@link DueDatePill}. Progress tone shifts to
 * success at 100%. No literal colors.
 */
export function ProjectCard({
  title,
  description,
  progress,
  taskCount,
  assignees = [],
  dueLabel,
  dueTone = 'upcoming',
  onPress,
  style,
}: ProjectCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;

  const inner = (
    <Card style={{ gap: tokens.spacing.sm }}>
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
          <Progress value={pct} tone={pct >= 100 ? 'success' : 'primary'} size="sm" />
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
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, style]}
      >
        {inner}
      </Pressable>
    );
  }
  return <View style={style}>{inner}</View>;
}
