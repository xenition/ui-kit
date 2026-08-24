import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives';
import { ProgressRing } from '../charts';

/** One tracked step/module in the course path. */
export interface ProgressStep {
  /** Stable id / key. */
  id: string;
  /** Step label, e.g. module title. */
  label: string;
  /** Whether the learner has completed it. */
  completed?: boolean;
}

/** Layout: a horizontal bar summary or a circular ring. */
export type ProgressTrackerVariant = 'bar' | 'ring';

export interface ProgressTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ordered steps; completion is derived from `step.completed`. */
  steps: ProgressStep[];
  /** Visual style. */
  variant?: ProgressTrackerVariant;
  /** Heading label (default "Your progress"). */
  title?: string;
  /** Copy shown when `steps` is empty. */
  emptyLabel?: string;
  /** Show the per-step checklist under the summary. */
  showList?: boolean;
}

/**
 * Course-completion tracker: a percentage summary (bar or ring) over a set of
 * steps, with an optional per-step checklist. Completion is counted from each
 * `step.completed` flag and guarded against an empty list, which renders a muted
 * empty state instead. Token-only colors (`--xen-*`).
 */
export const ProgressTracker = React.forwardRef<HTMLDivElement, ProgressTrackerProps>(
  function ProgressTracker(
    { steps, variant = 'bar', title = 'Your progress', emptyLabel = 'No modules yet', showList = false, className, ...rest },
    ref
  ) {
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]';

    if (steps.length === 0) {
      return (
        <div ref={ref} aria-label={emptyLabel} className={cn(shell, className)} {...rest}>
          <p className="text-sm text-muted">{emptyLabel}</p>
        </div>
      );
    }

    const done = steps.filter((s) => s.completed).length;
    const pct = Math.round((done / steps.length) * 100);

    return (
      <div
        ref={ref}
        aria-label={`${title}: ${done} of ${steps.length} complete, ${pct}%`}
        className={cn('flex flex-col gap-3', shell, className)}
        {...rest}
      >
        <h3 className="text-base font-bold text-on-surface">{title}</h3>

        {variant === 'ring' ? (
          <div className="flex justify-center">
            <ProgressRing value={done} max={steps.length} size={100} color="primary" />
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <Progress value={done} max={steps.length} tone="primary" />
            <span className="text-xs text-muted">
              {done} of {steps.length} complete ({pct}%)
            </span>
          </div>
        )}

        {showList ? (
          <ul className="flex flex-col gap-1">
            {steps.map((step) => (
              <li key={step.id} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={cn('text-sm', step.completed ? 'text-success' : 'text-muted')}
                >
                  {step.completed ? '✓' : '○'}
                </span>
                <span className={cn('flex-1 truncate text-sm', step.completed ? 'text-on-surface' : 'text-muted')}>
                  {step.label}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
);
