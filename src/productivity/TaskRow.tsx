import * as React from 'react';
import { cn } from '../primitives/cn';
import { Checkbox } from '../primitives';
import { PriorityTag, type PriorityLevel } from './PriorityTag';
import { DueDatePill, type DueDateTone } from './DueDatePill';

/**
 * TaskRow layout variants:
 * - `checkbox` — leading checkbox + title only (the baseline task line).
 * - `priority` — adds a trailing {@link PriorityTag}.
 * - `dated`    — adds a trailing {@link DueDatePill}.
 */
export type TaskRowVariant = 'checkbox' | 'priority' | 'dated';

export interface TaskRowProps {
  /** Task title. */
  title: string;
  /** Completed state — toggles the checkbox and strikes the title. */
  done?: boolean;
  /** Fires with the next done value when the checkbox is toggled. */
  onToggle?: (done: boolean) => void;
  /** Fires when the row body (not the checkbox) is clicked. */
  onClick?: () => void;
  /** Which trailing accessory to show. */
  variant?: TaskRowVariant;
  /** Priority — required for the `priority` variant. */
  priority?: PriorityLevel;
  /** Due-date label — required for the `dated` variant. */
  dueLabel?: string;
  /** Due-date urgency tone for the `dated` variant. */
  dueTone?: DueDateTone;
  className?: string;
}

/**
 * A single task line: a leading {@link Checkbox}, the title (struck through when
 * `done`), and a variant-driven trailing accessory (priority tag or due-date
 * pill). The checkbox carries its own `checkbox` role; the row body is a separate
 * button. Web parity of the native `TaskRow` (`onPress` → `onClick`). No literal
 * colors.
 */
export const TaskRow = React.forwardRef<HTMLDivElement, TaskRowProps>(function TaskRow(
  {
    title,
    done = false,
    onToggle,
    onClick,
    variant = 'checkbox',
    priority = 'low',
    dueLabel,
    dueTone = 'upcoming',
    className,
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-2 rounded-[var(--xen-radius-md)] bg-surface p-2',
        className
      )}
    >
      <Checkbox
        checked={done}
        aria-label={title}
        onChange={(e) => onToggle?.(e.currentTarget.checked)}
      />

      <button
        type="button"
        aria-label={title}
        onClick={onClick}
        disabled={!onClick}
        className="min-w-0 flex-1 text-left disabled:cursor-default"
      >
        <span
          className={cn(
            'line-clamp-2 text-sm font-medium',
            done ? 'text-muted line-through' : 'text-on-surface'
          )}
        >
          {title}
        </span>
      </button>

      {variant === 'priority' ? <PriorityTag level={priority} /> : null}
      {variant === 'dated' && dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
    </div>
  );
});
