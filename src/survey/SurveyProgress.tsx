import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives';

export type SurveyProgressVariant = 'bar' | 'steps' | 'fraction';

export interface SurveyProgressProps {
  /** 1-based index of the current question. */
  current: number;
  /** Total number of questions. */
  total: number;
  /** Render style. Default `'bar'`. */
  variant?: SurveyProgressVariant;
  /** Show the `"Question X of Y"` caption above the indicator. Default `true`. */
  showLabel?: boolean;
  /** Override the caption text (e.g. localized). */
  label?: string;
  className?: string;
}

/**
 * Survey completion indicator — `bar` wraps the token `Progress` primitive,
 * `steps` renders a segmented dot-per-question track, and `fraction` shows just
 * the `"X of Y"` caption. Exposes a `progressbar` role with min/max/now so
 * assistive tech can read completion. `current` is clamped into `[0, total]`.
 * No literal colors.
 */
export const SurveyProgress = React.forwardRef<HTMLDivElement, SurveyProgressProps>(
  function SurveyProgress({ current, total, variant = 'bar', showLabel = true, label, className }, ref) {
    const safeTotal = Math.max(1, Math.floor(total));
    const safeCurrent = Math.max(0, Math.min(safeTotal, Math.floor(current)));
    const caption = label ?? `Question ${safeCurrent} of ${safeTotal}`;

    return (
      <div ref={ref} aria-label={caption} className={cn('flex flex-col gap-xs', className)}>
        {showLabel ? (
          <div className="flex justify-between">
            <span className="text-sm font-semibold text-muted">{caption}</span>
            {variant !== 'fraction' ? (
              <span className="text-sm font-bold text-primary">
                {Math.round((safeCurrent / safeTotal) * 100)}%
              </span>
            ) : null}
          </div>
        ) : null}

        {variant === 'bar' ? (
          <Progress value={safeCurrent} max={safeTotal} tone="primary" size="md" aria-label={caption} />
        ) : variant === 'steps' ? (
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={safeTotal}
            aria-valuenow={safeCurrent}
            className="flex gap-xs"
          >
            {Array.from({ length: safeTotal }, (_, i) => (
              <span
                key={i}
                className={cn('h-1.5 flex-1 rounded-full', i < safeCurrent ? 'bg-primary' : 'bg-border')}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
