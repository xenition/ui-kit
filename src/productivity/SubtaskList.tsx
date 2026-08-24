import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChecklistItem } from './ChecklistItem';

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
  className?: string;
}

/**
 * Vertical list of subtasks rendered as {@link ChecklistItem}s, with an optional
 * `done/total` counter and a muted empty state. Web parity of the native
 * `SubtaskList`. Guards against a missing/empty array. Colors come from the theme
 * tokens. No literal colors.
 */
export const SubtaskList = React.forwardRef<HTMLDivElement, SubtaskListProps>(function SubtaskList(
  { subtasks, onToggle, emptyLabel = 'No subtasks yet', showProgress = false, className },
  ref
) {
  const items = Array.isArray(subtasks) ? subtasks : [];
  const done = items.filter((s) => s.done).length;

  return (
    <div ref={ref} className={cn('flex flex-col gap-1', className)}>
      {showProgress && items.length > 0 ? (
        <span className="text-xs font-semibold text-muted">{`${done}/${items.length} done`}</span>
      ) : null}

      {items.length === 0 ? (
        <div className="py-3 text-center text-xs text-muted">{emptyLabel}</div>
      ) : (
        items.map((s) => (
          <ChecklistItem
            key={s.id}
            label={s.title}
            checked={!!s.done}
            onCheckedChange={(next) => onToggle?.(s.id, next)}
          />
        ))
      )}
    </div>
  );
});
