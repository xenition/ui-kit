import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';

export interface SurveyNavigatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current step, 1-based. */
  step: number;
  /** Total number of steps. */
  total: number;
  /** Fires on Back. The Back button is hidden when unset or on step 1. */
  onBack?: () => void;
  /** Fires on Next (steps before the last). */
  onNext?: () => void;
  /** Fires on Submit (the last step). Falls back to `onNext` when unset. */
  onSubmit?: () => void;
  /** Back button label. Default `'Back'`. */
  backLabel?: string;
  /** Next button label. Default `'Next'`. */
  nextLabel?: string;
  /** Submit button label, shown on the last step. Default `'Submit'`. */
  submitLabel?: string;
  /** Disable the Next/Submit action (e.g. a required answer is missing). */
  nextDisabled?: boolean;
}

/**
 * SurveyNavigator — the survey flow's **footer** (V4 "focus" line). A calm,
 * non-gradient bar: a slim primary progress track with a `Step N of M` caption
 * (exposed as a `progressbar`), a ghost Back button and a primary Next button.
 * On the final step Next becomes Submit (still primary, routed to `onSubmit` and
 * falling back to `onNext`). Both actions are big ≥44px thumb-zone `Button`
 * primitives. Presentational only (step index + callbacks). All colors from
 * `--xen-*` token classes (no literal colors), dark-mode safe.
 */
export const SurveyNavigator = React.forwardRef<HTMLDivElement, SurveyNavigatorProps>(function SurveyNavigator(
  {
    step,
    total,
    onBack,
    onNext,
    onSubmit,
    backLabel = 'Back',
    nextLabel = 'Next',
    submitLabel = 'Submit',
    nextDisabled = false,
    className,
    ...rest
  },
  ref
) {
  const safeTotal = Math.max(1, Math.trunc(total));
  const current = Math.min(Math.max(1, Math.trunc(step)), safeTotal);
  const pct = Math.round((current / safeTotal) * 100);
  const isLast = current >= safeTotal;
  const showBack = onBack != null && current > 1;
  const advance = isLast ? onSubmit ?? onNext : onNext;
  const advanceLabel = isLast ? submitLabel : nextLabel;

  return (
    <div
      ref={ref}
      data-xen-survey-navigator=""
      className={cn(
        'flex flex-col gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-sm',
        className
      )}
      {...rest}
    >
      {/* Inline progress — slim primary track + spoken step caption. */}
      <div className="flex flex-col gap-xs">
        <div
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={safeTotal}
          aria-label={`Step ${current} of ${safeTotal}`}
          className="h-1.5 w-full overflow-hidden rounded-full bg-on-surface/10"
        >
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-semibold text-muted">
          Step {current} of {safeTotal}
        </span>
      </div>

      {/* Actions — ghost Back + primary Next/Submit in the thumb zone. */}
      <div className="flex items-center gap-sm">
        {showBack ? (
          <Button
            variant="ghost"
            size="lg"
            aria-label={backLabel}
            onClick={onBack}
            className="min-h-[44px] flex-1"
          >
            {backLabel}
          </Button>
        ) : null}
        <Button
          variant="primary"
          size="lg"
          aria-label={advanceLabel}
          onClick={advance}
          disabled={nextDisabled}
          className="min-h-[44px] flex-1"
        >
          {advanceLabel}
        </Button>
      </div>
    </div>
  );
});
