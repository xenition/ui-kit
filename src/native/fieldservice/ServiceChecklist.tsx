import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Card, Checkbox, Progress, Skeleton, EmptyState } from '../primitives';
import { clampPct } from './internal/format';

export interface ServiceTask {
  /** Stable id for the task. */
  id: string;
  /** Task label (e.g. "Verify refrigerant charge"). */
  label: string;
  /** Whether the task is complete. */
  done: boolean;
  /** Marks the task as mandatory (rendered with a required marker). */
  required?: boolean;
}

export interface ServiceChecklistProps {
  /** Section title (e.g. "Startup procedure"). */
  title?: string;
  /** The tasks to render. */
  tasks: ServiceTask[];
  /** Fires with the task id and its next `done` value on toggle. */
  onToggle?: (id: string, done: boolean) => void;
  /** Show skeleton placeholders instead of the list. */
  loading?: boolean;
  /** Disable all checkboxes. */
  disabled?: boolean;
  /** Copy for the empty state when there are no tasks. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A completion checklist for a service procedure. Each task is a checkbox row
 * whose label strikes through when done (completion reads without color alone).
 * A header progress bar summarizes `done / total`. Handles the empty state (no
 * tasks → `EmptyState`) and a `loading` skeleton. Toggling fires `onToggle(id,
 * next)`. No literal colors.
 */
export function ServiceChecklist({
  title,
  tasks,
  onToggle,
  loading = false,
  disabled = false,
  emptyLabel = 'No checklist items',
  style,
}: ServiceChecklistProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(tasks) ? tasks : [];
  const total = list.length;
  const completed = list.filter((t) => t.done).length;
  const pct = total > 0 ? clampPct((completed / total) * 100) : 0;

  if (loading) {
    return (
      <Card variant="outlined" style={style}>
        <View accessibilityLabel="Loading checklist" style={{ gap: tokens.spacing.md }}>
          <Skeleton variant="text" width="50%" height={14} />
          <Skeleton variant="text" lines={3} />
        </View>
      </Card>
    );
  }

  if (total === 0) {
    return <EmptyState title={emptyLabel} description="Items will appear here once added." style={style} />;
  }

  return (
    <Card variant="outlined" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {title != null ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
        ) : (
          <View />
        )}
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {completed}/{total}
        </Text>
      </View>

      <View style={{ marginTop: tokens.spacing.sm }}>
        <Progress value={completed} max={total} tone={pct === 100 ? 'success' : 'primary'} size="sm" />
      </View>

      <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
        {list.map((task) => (
          <View
            key={task.id}
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.xs }}
          >
            <Checkbox
              checked={task.done}
              disabled={disabled}
              onCheckedChange={(next) => onToggle?.(task.id, next)}
              accessibilityLabel={task.label}
            />
            <Text
              style={{
                flex: 1,
                color: task.done ? colors.muted : colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                textDecorationLine: task.done ? 'line-through' : 'none',
              }}
            >
              {task.label}
              {task.required ? (
                <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.sm }}> *</Text>
              ) : null}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
