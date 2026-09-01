import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChecklistItem } from './ChecklistItem';
import type { SubtaskListProps } from './SubtaskList';

/** Drop-in for {@link SubtaskListProps} — same props, the V4 "flow" design. */
export type SubtaskListV4Props = SubtaskListProps;

/**
 * SubtaskList — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a subtask list: a calm header carrying a
 * **soft-primary progress bar** and an "N/M done" count, then the
 * {@link ChecklistItem} rows. Guards against a missing/empty array and keeps the
 * add/toggle callbacks. Same props/behavior as {@link SubtaskListProps}; all
 * colors from `--xen-*` token classes (no literals).
 */
export const SubtaskListV4 = React.forwardRef<HTMLDivElement, SubtaskListV4Props>(
  function SubtaskListV4(
    { subtasks, onToggle, emptyLabel = 'No subtasks yet', showProgress = false, className },
    ref
  ) {
    const items = Array.isArray(subtasks) ? subtasks : [];
    const done = items.filter((s) => s.done).length;
    const pct = items.length > 0 ? (done / items.length) * 100 : 0;

    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)}>
        {showProgress && items.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-muted">{`${done}/${items.length} done`}</span>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/10" aria-hidden>
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
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
  }
);
