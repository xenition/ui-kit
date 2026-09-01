import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import { ChecklistItem } from './ChecklistItem';
import type { Subtask, SubtaskListProps } from './SubtaskList';

/** Drop-in for {@link SubtaskListProps} — same props, the V4 "flow" design. */
export type SubtaskListV4Props = SubtaskListProps;

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

/**
 * SubtaskList — **V4** "flow" design. The focused-workspace take on a subtask
 * list: a calm header carrying a **soft-primary progress bar** and an "N/M done"
 * count, then the {@link ChecklistItem} rows. Guards against a missing/empty
 * array and keeps the add/toggle callbacks. Same props/behavior as
 * {@link SubtaskListProps}; token-only colors via `useXenitionTheme()`.
 */
export function SubtaskListV4({
  subtasks,
  onToggle,
  emptyLabel = 'No subtasks yet',
  showProgress = false,
  style,
}: SubtaskListV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const items = Array.isArray(subtasks) ? subtasks : [];
  const done = items.filter((s) => s.done).length;
  const pct = items.length > 0 ? (done / items.length) * 100 : 0;

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {showProgress && items.length > 0 ? (
        <View style={{ gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {`${done}/${items.length} done`}
          </Text>
          <View
            accessibilityRole="progressbar"
            style={{
              height: 6,
              borderRadius: tokens.radius.full,
              overflow: 'hidden',
              backgroundColor: withAlpha(colors.primary, 0.1),
            }}
          >
            <View style={{ width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: colors.primary }} />
          </View>
        </View>
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
