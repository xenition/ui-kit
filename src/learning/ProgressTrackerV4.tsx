import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives';
import { ProgressRing } from '../charts';
import type { ProgressTrackerProps } from './ProgressTracker';

/** Drop-in for {@link ProgressTrackerProps} — same props, the V4 "campus" design. */
export type ProgressTrackerV4Props = ProgressTrackerProps;

/**
 * ProgressTracker — **V4** "campus" design (web parity of the native V4). An
 * elevated rounded card with a soft shadow holding a course-completion summary
 * (a bar or a circular ring) with a big legible **tabular-nums** percentage, and
 * an optional per-step checklist. Completion is counted from each `step.completed`
 * flag and guarded against an empty list, which renders a muted empty state.
 * Reuses the base `variant` (`bar` / `ring`). Identical props/behavior to
 * {@link ProgressTrackerProps}. All colors from `--xen-*` token classes (no
 * literals).
 */
export const ProgressTrackerV4 = React.forwardRef<HTMLDivElement, ProgressTrackerV4Props>(function ProgressTrackerV4(
  { steps, variant = 'bar', title = 'Your progress', emptyLabel = 'No modules yet', showList = false, className, ...rest },
  ref
) {
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-lg)]';

  if (steps.length === 0) {
    return (
      <div ref={ref} data-xen-progress-tracker="" aria-label={emptyLabel} className={cn(shell, className)} {...rest}>
        <p className="text-sm text-muted">{emptyLabel}</p>
      </div>
    );
  }

  const done = steps.filter((s) => s.completed).length;
  const pct = Math.round((done / steps.length) * 100);

  return (
    <div
      ref={ref}
      data-xen-progress-tracker=""
      aria-label={`${title}: ${done} of ${steps.length} complete, ${pct}%`}
      className={cn('flex flex-col gap-3', shell, className)}
      {...rest}
    >
      <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
        <h3 className="text-base font-bold text-on-surface">{title}</h3>
        <span className="text-lg font-bold tabular-nums text-primary">{pct}%</span>
      </div>

      {variant === 'ring' ? (
        <div className="flex justify-center">
          <ProgressRing value={done} max={steps.length} size={100} color="primary" />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <Progress value={done} max={steps.length} tone="primary" />
          <span className="text-xs tabular-nums text-muted">{done} of {steps.length} complete ({pct}%)</span>
        </div>
      )}

      {showList ? (
        <ul className="flex flex-col gap-1">
          {steps.map((step) => (
            <li key={step.id} className="flex items-center gap-2">
              <span aria-hidden="true" className={cn('flex h-5 w-5 items-center justify-center rounded-full text-xs', step.completed ? 'bg-success/10 text-success' : 'bg-neutral-100 text-muted')}>
                {step.completed ? '✓' : '○'}
              </span>
              <span className={cn('flex-1 truncate text-sm', step.completed ? 'text-on-surface' : 'text-muted')}>{step.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
});
