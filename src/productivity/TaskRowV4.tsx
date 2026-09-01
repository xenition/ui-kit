import * as React from 'react';
import { cn } from '../primitives/cn';
import { Checkbox } from '../primitives';
import { PriorityTag } from './PriorityTag';
import { DueDatePill } from './DueDatePill';
import type { TaskRowProps } from './TaskRow';

/** Drop-in for {@link TaskRowProps} — same props, the V4 "flow" design. */
export type TaskRowV4Props = TaskRowProps;

/**
 * TaskRow — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a task line: a leading {@link Checkbox}, a bigger,
 * more legible title, and the variant-driven trailing accessory (priority tag or
 * due pill). Completing a task is the satisfying moment — the row settles into a
 * **soft-success glow** with the title struck through. Same props/behavior as
 * {@link TaskRowProps}; all colors from `--xen-*` token classes (no literals).
 */
export const TaskRowV4 = React.forwardRef<HTMLDivElement, TaskRowV4Props>(function TaskRowV4(
  { title, done = false, onToggle, onClick, variant = 'checkbox', priority = 'low', dueLabel, dueTone = 'upcoming', className },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3 rounded-[var(--xen-radius-md)] p-2 transition-colors',
        done ? 'bg-success/[0.08]' : 'bg-surface',
        className
      )}
    >
      <Checkbox checked={done} aria-label={title} onChange={(e) => onToggle?.(e.currentTarget.checked)} />

      <button
        type="button"
        aria-label={title}
        onClick={onClick}
        disabled={!onClick}
        className="min-w-0 flex-1 text-left disabled:cursor-default"
      >
        <span className={cn('line-clamp-2 text-base font-semibold leading-relaxed', done ? 'text-muted line-through' : 'text-on-surface')}>
          {title}
        </span>
      </button>

      {variant === 'priority' ? <PriorityTag level={priority} /> : null}
      {variant === 'dated' && dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
    </div>
  );
});
