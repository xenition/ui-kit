import * as React from 'react';
import { cn } from '../primitives/cn';
import { Checkbox } from '../primitives';
import { PriorityTag } from './PriorityTag';
import { DueDatePill } from './DueDatePill';
import type { TaskRowProps } from './TaskRow';

/** Same public contract as {@link TaskRow} — a drop-in alternate design. */
export type TaskRowV3Props = TaskRowProps;

/**
 * TaskRow, redesigned (v3): an **ultra-dense checklist line**. A small checkbox, the
 * title inline, and a compact accessory (priority dot or due pill) on a bare
 * hairline row — the tightest to-do line. The opposite of v2's card. Same props,
 * token-only.
 */
export const TaskRowV3 = React.forwardRef<HTMLDivElement, TaskRowV3Props>(function TaskRowV3(
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
      className={cn('flex items-center gap-2.5 border-b border-border py-1.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
    >
      <span onClick={(e) => e.stopPropagation()} className="shrink-0">
        <Checkbox checked={done} aria-label={title} onChange={(e) => onToggle?.(e.target.checked)} />
      </span>
      <span className={cn('min-w-0 flex-1 truncate text-sm text-on-surface', done && 'text-muted line-through')}>{title}</span>
      {variant === 'priority' && priority ? <PriorityTag level={priority} dotOnly /> : null}
      {variant === 'dated' && dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
    </div>
  );
});
