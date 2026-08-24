import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Checkbox, Progress, Skeleton } from '../primitives';
import { EmptyState } from '../commerce';
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
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A completion checklist for a service procedure. Each task is a checkbox row
 * whose label strikes through when done (completion reads without color alone).
 * A header progress bar summarizes `done / total`. Handles the empty state (no
 * tasks → `EmptyState`) and a `loading` skeleton. Toggling fires
 * `onToggle(id, next)`. No literal colors.
 */
export const ServiceChecklist = React.forwardRef<HTMLDivElement, ServiceChecklistProps>(
  function ServiceChecklist(
    { title, tasks, onToggle, loading = false, disabled = false, emptyLabel = 'No checklist items', className, style },
    ref
  ) {
    const list = Array.isArray(tasks) ? tasks : [];
    const total = list.length;
    const completed = list.filter((t) => t.done).length;
    const pct = total > 0 ? clampPct((completed / total) * 100) : 0;

    if (loading) {
      return (
        <Card ref={ref} className={className} style={style}>
          <div aria-label="Loading checklist" className="flex flex-col gap-[var(--xen-space-md)]">
            <Skeleton variant="text" width="50%" height={14} />
            <Skeleton variant="text" lines={3} />
          </div>
        </Card>
      );
    }

    if (total === 0) {
      return (
        <EmptyState
          ref={ref}
          title={emptyLabel}
          description="Items will appear here once added."
          className={className}
          style={style}
        />
      );
    }

    return (
      <Card ref={ref} className={className} style={style}>
        <div className="flex items-center justify-between">
          {title != null ? (
            <span className="text-base font-bold text-on-surface">{title}</span>
          ) : (
            <span />
          )}
          <span className="text-xs font-semibold text-muted">
            {completed}/{total}
          </span>
        </div>

        <div className="mt-[var(--xen-space-sm)]">
          <Progress value={completed} max={total} tone={pct === 100 ? 'success' : 'primary'} size="sm" />
        </div>

        <div className="mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]">
          {list.map((task) => (
            <label
              key={task.id}
              className="flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-xs)]"
            >
              <Checkbox
                checked={task.done}
                disabled={disabled}
                onChange={(e) => onToggle?.(task.id, e.target.checked)}
                aria-label={task.label}
              />
              <span
                className={cn(
                  'flex-1 text-sm',
                  task.done ? 'text-muted line-through' : 'text-on-surface'
                )}
              >
                {task.label}
                {task.required ? <span className="text-sm text-danger"> *</span> : null}
              </span>
            </label>
          ))}
        </div>
      </Card>
    );
  }
);
