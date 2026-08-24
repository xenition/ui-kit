import * as React from 'react';
import { cn } from '../primitives/cn';

export interface OnboardingStep {
  label: string;
  done: boolean;
  /** Optional supporting line under the label. */
  description?: string;
  /** Fires when the row is clicked (e.g. to jump into that step). */
  onClick?: () => void;
}

export interface OnboardingChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: OnboardingStep[];
  /** Heading; defaults to "Get started". */
  title?: string;
}

/**
 * A getting-started checklist with a completion meter (design.md §42): a
 * progress bar + "N of M" count over a list of steps, each showing a check when
 * done. Completed steps are struck-through and muted. Token-only.
 */
export const OnboardingChecklist = React.forwardRef<HTMLDivElement, OnboardingChecklistProps>(
  function OnboardingChecklist({ steps, title = 'Get started', className, ...rest }, ref) {
    const total = steps.length;
    const doneCount = steps.filter((s) => s.done).length;
    const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-md rounded-[var(--xen-radius-lg)] border border-border bg-surface p-lg text-on-surface',
          className
        )}
        {...rest}
      >
        <div className="flex flex-col gap-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-on-surface">{title}</h3>
            <span className="text-sm text-muted">
              {doneCount} of {total}
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            className="h-1.5 overflow-hidden rounded-full bg-border"
          >
            <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <ul className="flex flex-col gap-xs">
          {steps.map((step, i) => {
            const marker = (
              <span
                aria-hidden
                className={cn(
                  'flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-sm font-bold',
                  step.done
                    ? 'bg-success text-on-success'
                    : 'border border-border bg-surface'
                )}
              >
                {step.done ? '✓' : ''}
              </span>
            );
            const text = (
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
                <span
                  className={cn(
                    'text-base font-semibold',
                    step.done ? 'text-muted line-through' : 'text-on-surface'
                  )}
                >
                  {step.label}
                </span>
                {step.description ? (
                  <span className="text-sm text-muted">{step.description}</span>
                ) : null}
              </span>
            );
            const label = `${step.label}, ${step.done ? 'completed' : 'not completed'}`;

            return (
              <li key={`${step.label}-${i}`}>
                {step.onClick ? (
                  <button
                    type="button"
                    aria-label={label}
                    onClick={step.onClick}
                    className="flex w-full items-start gap-sm py-xs text-left transition-opacity hover:opacity-80"
                  >
                    {marker}
                    {text}
                  </button>
                ) : (
                  <div aria-label={label} className="flex items-start gap-sm py-xs">
                    {marker}
                    {text}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
