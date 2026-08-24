import * as React from 'react';
import { cn } from '../primitives/cn';
import { Checkbox, Avatar } from '../primitives';
import { StatusPill } from './StatusPill';
import { TASK_STATUS_META, TONE_TEXT_CLASS, type TaskStatus } from './internal';

export type OnboardingTaskVariant = 'default' | 'compact';

export interface OnboardingTaskProps {
  /** Task title (e.g. "Sign employment contract"). */
  title: string;
  /** Grouping category (e.g. "Paperwork", "IT setup"). */
  category?: string;
  /** Workflow status — glyph + word pill. Drives the checkbox when `done`. */
  status?: TaskStatus;
  /** Pre-formatted due date. */
  dueDate?: string;
  /** Whether this task is past due — flagged by word, not color alone. */
  overdue?: boolean;
  /** Assignee / owner name. */
  assignee?: string;
  /** Assignee avatar. */
  assigneeAvatarUrl?: string;
  /** Density. */
  variant?: OnboardingTaskVariant;
  /** Fires with the next completed value when the checkbox is toggled. */
  onToggle?: (done: boolean) => void;
  /** Click handler for the title body (web parity of native `onPress`). */
  onClick?: () => void;
  className?: string;
}

/**
 * A single onboarding checklist item: a checkbox, title, category, and status
 * pill (glyph + word — `blocked` reads danger, `done` success, never color
 * alone). Overdue tasks are called out with a word. Toggling the checkbox fires
 * `onToggle(next)` for optimistic completion. When `onClick` is set the title
 * becomes a real `<button>` (kept out of the checkbox so no interactive nests in
 * another). `compact` drops the category / assignee meta. All colors are
 * `--xen-*` token classes — no literals. `forwardRef` to the root `<div>`.
 */
export const OnboardingTask = React.forwardRef<HTMLDivElement, OnboardingTaskProps>(
  function OnboardingTask(
    {
      title,
      category,
      status = 'todo',
      dueDate,
      overdue = false,
      assignee,
      assigneeAvatarUrl,
      variant = 'default',
      onToggle,
      onClick,
      className,
    },
    ref
  ) {
    const compact = variant === 'compact';
    const done = status === 'done';
    const meta = [category, dueDate ? `Due ${dueDate}` : null].filter(Boolean).join('  ·  ');

    const titleClasses = cn(
      'text-left text-sm font-semibold',
      done ? 'text-muted line-through' : 'text-on-surface'
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start gap-3 rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2',
          className
        )}
      >
        <div className="pt-0.5">
          <Checkbox
            checked={done}
            onChange={(e) => onToggle?.(e.target.checked)}
            aria-label={`${done ? 'Mark incomplete' : 'Mark complete'}: ${title}`}
          />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          {onClick ? (
            <button
              type="button"
              onClick={onClick}
              className={cn(
                titleClasses,
                'block w-full truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
              )}
            >
              {title}
            </button>
          ) : (
            <p className={cn(titleClasses, 'line-clamp-2')}>{title}</p>
          )}
          {!compact && meta ? <p className="truncate text-xs text-muted">{meta}</p> : null}
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill meta={TASK_STATUS_META[status]} size="sm" />
            {overdue && !done ? (
              <span className={cn('text-xs font-semibold', TONE_TEXT_CLASS.danger)}>⚠ Overdue</span>
            ) : null}
            {!compact && assignee ? (
              <span className="flex items-center gap-1">
                <Avatar size="sm" name={assignee} src={assigneeAvatarUrl} />
                <span className="text-xs text-muted">{assignee}</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
