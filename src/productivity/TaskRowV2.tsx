import * as React from 'react';
import { cn } from '../primitives/cn';
import { Checkbox } from '../primitives';
import { PriorityTag } from './PriorityTag';
import { DueDatePill } from './DueDatePill';
import type { TaskRowProps } from './TaskRow';

/** Same public contract as {@link TaskRow} — a drop-in alternate design. */
export type TaskRowV2Props = TaskRowProps;

/**
 * TaskRow, redesigned (v2): an **elevated task card**. The checkbox rides in a soft
 * tinted well, the title is bolder, and the priority/due accessory sits as a chip
 * on a raised surface row. Distinct from v1's flat line. Same props, token-only.
 */
export const TaskRowV2 = React.forwardRef<HTMLDivElement, TaskRowV2Props>(function TaskRowV2(
  { title, done = false, onToggle, onClick, variant = 'checkbox', priority, dueLabel, dueTone, className },
  ref
) {
  const interactive = typeof onClick === 'function';
  return (
    <div
      ref={ref}
      data-xen-task-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={title}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10" onClick={(e) => e.stopPropagation()}>
        <Checkbox checked={done} aria-label={title} onChange={(e) => onToggle?.(e.target.checked)} />
      </span>
      <span className={cn('min-w-0 flex-1 truncate text-sm font-semibold text-on-surface', done && 'text-muted line-through')}>{title}</span>
      {variant === 'priority' && priority ? <PriorityTag level={priority} /> : null}
      {variant === 'dated' && dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
    </div>
  );
});
