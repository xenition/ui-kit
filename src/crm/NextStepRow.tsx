import * as React from 'react';
import { cn } from '../primitives/cn';

export type NextStepPriority = 'low' | 'normal' | 'high';

const PRIORITY_META: Record<NextStepPriority, { glyph: string; label: string }> = {
  low: { glyph: '↓', label: 'Low' },
  normal: { glyph: '•', label: 'Normal' },
  high: { glyph: '↑', label: 'High' },
};

export interface NextStepRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The action to take (e.g. "Send proposal"). */
  title: string;
  /** Pre-formatted due date. */
  dueDate?: string;
  /** Marks the step past due — shown as an "Overdue" word + ⚠ glyph. */
  overdue?: boolean;
  /** Completed state — checkbox fills, title strikes through. */
  done?: boolean;
  /** Who owns the step. */
  assignee?: string;
  /** Priority — a leading glyph + label, not color-only. */
  priority?: NextStepPriority;
  /** Fired with the next `done` value when the checkbox is toggled. */
  onToggle?: (done: boolean) => void;
  /** Fired when the row body (not the checkbox) is activated. */
  onClick?: () => void;
}

/**
 * A single "next step" / task row for a deal or contact: a toggleable checkbox,
 * the action title (struck through when `done`), and a meta line of assignee,
 * priority (glyph + label) and due date. `overdue` is surfaced as the word
 * "Overdue" plus a ⚠ glyph in the `text-danger` tone — never color alone. The
 * checkbox reports the next state via `onToggle`. All colors are `--xen-*` token
 * classes.
 */
export const NextStepRow = React.forwardRef<HTMLDivElement, NextStepRowProps>(function NextStepRow(
  { title, dueDate, overdue = false, done = false, assignee, priority, onToggle, onClick, className, ...rest },
  ref
) {
  const prio = priority ? PRIORITY_META[priority] : undefined;

  return (
    <div ref={ref} className={cn('flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', className)} {...rest}>
      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={`${done ? 'Completed' : 'Mark complete'}: ${title}`}
        disabled={!onToggle}
        onClick={() => onToggle?.(!done)}
        className={cn(
          'flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] border-2',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none',
          done ? 'border-success bg-success text-on-success' : 'border-border bg-transparent'
        )}
      >
        {done ? (
          <span aria-hidden="true" className="text-xs font-black">
            ✓
          </span>
        ) : null}
      </button>

      <button
        type="button"
        aria-label={title}
        disabled={!onClick}
        onClick={onClick}
        className="min-w-0 flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none"
      >
        <p className={cn('text-sm font-semibold', done ? 'text-muted line-through' : 'text-on-surface')}>{title}</p>

        <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
          {prio ? (
            <span className="text-xs font-semibold text-muted">{`${prio.glyph} ${prio.label}`}</span>
          ) : null}
          {assignee ? <span className="text-xs text-muted">{assignee}</span> : null}
          {overdue ? (
            <span className="text-xs font-bold text-danger">{`⚠ Overdue${dueDate ? ` · ${dueDate}` : ''}`}</span>
          ) : dueDate ? (
            <span className="text-xs text-muted">{dueDate}</span>
          ) : null}
        </div>
      </button>
    </div>
  );
});
