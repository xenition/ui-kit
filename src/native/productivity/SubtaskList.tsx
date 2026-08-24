import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useEnter } from '../primitives/internal/motion';
import { ChecklistItem } from './ChecklistItem';

/** One subtask row that fades/rises in on mount via the shared `useEnter`. */
function SubtaskRow({
  subtask,
  onToggle,
}: {
  subtask: Subtask;
  onToggle?: (id: string, done: boolean) => void;
}): React.ReactElement {
  const enter = useEnter();
  return (
    <Animated.View style={enter}>
      <ChecklistItem
        label={subtask.title}
        checked={!!subtask.done}
        onCheckedChange={(next) => onToggle?.(subtask.id, next)}
      />
    </Animated.View>
  );
}

export interface Subtask {
  id: string;
  title: string;
  done?: boolean;
}

export interface SubtaskListProps {
  /** The subtasks to render; an empty array shows the empty state. */
  subtasks: Subtask[];
  /** Fires with the toggled subtask id and its next done value. */
  onToggle?: (id: string, done: boolean) => void;
  /** Copy for the empty state. */
  emptyLabel?: string;
  /** Show a compact `done/total` counter header. */
  showProgress?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Vertical list of subtasks rendered as {@link ChecklistItem}s, with an optional
 * `done/total` counter and a muted empty state. Guards against a missing/empty
 * array. Colors come from the theme tokens. No literal colors.
 */
export function SubtaskList({
  subtasks,
  onToggle,
  emptyLabel = 'No subtasks yet',
  showProgress = false,
  style,
}: SubtaskListProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const items = Array.isArray(subtasks) ? subtasks : [];
  const done = items.filter((s) => s.done).length;

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      {showProgress && items.length > 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {`${done}/${items.length} done`}
        </Text>
      ) : null}

      {items.length === 0 ? (
        <View style={{ paddingVertical: tokens.spacing.md, alignItems: 'center' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{emptyLabel}</Text>
        </View>
      ) : (
        items.map((s) => <SubtaskRow key={s.id} subtask={s} onToggle={onToggle} />)
      )}
    </View>
  );
}
