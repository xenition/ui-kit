import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';
import type { BadgeTone } from '../primitives';

/** Task urgency — colors the priority chip and is stated as text. */
export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface FarmTaskRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Task title (e.g. "Spray north orchard"). */
  title: string;
  /** Whether the task is complete. Drives the check control's a11y state. */
  done?: boolean;
  /** Due hint (e.g. "Today", "Aug 14"). */
  due?: string;
  /** Priority. Default `'normal'`. */
  priority?: TaskPriority;
  /** Field / area the task applies to (e.g. "Block C"). */
  field?: string;
  /** Assignee name / initials (e.g. "Sam"). */
  assignee?: string;
  /** Category glyph (e.g. "🚜", "💧"). Default `'✅'`. */
  icon?: string;
  /** Whether the due date is overdue (colors the due text + adds a chip). */
  overdue?: boolean;
  /** Fires with the requested done value when the check control is toggled. */
  onToggle?: (next: boolean) => void;
  /** Fires when the row body (not the check) is activated. */
  onClick?: () => void;
  /** Hide the bottom divider (last row in a list). */
  last?: boolean;
}

const PRIORITY_META: Record<TaskPriority, { label: string; tone: BadgeTone }> = {
  low: { label: 'Low', tone: 'neutral' },
  normal: { label: 'Normal', tone: 'primary' },
  high: { label: 'High', tone: 'warn' },
  urgent: { label: 'Urgent', tone: 'danger' },
};

/**
 * A farm task row — a tappable check control (a themed checkbox `<button>` whose
 * a11y `checked` state carries completion, not color), the task title (struck +
 * muted when done), due / field / assignee meta, and a priority {@link Badge}
 * stated as text. `overdue` adds a text chip and colors the due line so urgency
 * reads without color. Toggling the check fires `onToggle(next)`; activating the
 * body fires `onClick`. Token-bound throughout — no literal colors.
 */
export const FarmTaskRow = React.forwardRef<HTMLDivElement, FarmTaskRowProps>(function FarmTaskRow(
  {
    title,
    done = false,
    due,
    priority = 'normal',
    field,
    assignee,
    icon = '✅',
    overdue = false,
    onToggle,
    onClick,
    last = false,
    className,
    ...rest
  },
  ref
) {
  const meta = PRIORITY_META[priority];
  const metaLine = [due, field, assignee].filter((s) => s != null && s !== '').join(' · ');
  const bodyInteractive = typeof onClick === 'function';

  return (
    <div
      ref={ref}
      data-xen-farm-task-row=""
      className={cn(
        'flex items-center gap-2 py-2',
        !last && 'border-b border-border',
        done && 'opacity-60',
        className
      )}
      {...rest}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={`Mark ${title} ${done ? 'not done' : 'done'}`}
        onClick={() => onToggle?.(!done)}
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] border-2 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
          done ? 'border-success bg-success' : 'border-border bg-transparent'
        )}
      >
        {done ? <Icon glyph="✓" size="sm" color="onSuccess" aria-label="done" /> : null}
      </button>

      <button
        type="button"
        aria-label={title}
        onClick={bodyInteractive ? () => onClick?.() : undefined}
        disabled={!bodyInteractive}
        className="min-w-0 flex-1 text-left disabled:cursor-default"
      >
        <span className="flex items-center gap-1">
          <Icon glyph={icon} size="sm" color="muted" />
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-sm font-semibold text-on-surface',
              done && 'line-through'
            )}
          >
            {title}
          </span>
        </span>
        {metaLine !== '' ? (
          <span
            className={cn('mt-0.5 block truncate text-xs', overdue ? 'text-danger' : 'text-muted')}
          >
            {overdue ? '⚠ Overdue · ' : ''}
            {metaLine}
          </span>
        ) : null}
      </button>

      <div className="flex flex-col items-end gap-1">
        <Badge tone={meta.tone}>{meta.label}</Badge>
        {overdue ? <Badge tone="danger">Overdue</Badge> : null}
      </div>
    </div>
  );
});
