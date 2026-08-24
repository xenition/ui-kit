import * as React from 'react';
import { cn } from '../primitives/cn';

/** NPS bucket for a 0-10 score. */
export type NPSBucket = 'detractor' | 'passive' | 'promoter';

/** Classify a 0-10 score into its Net Promoter bucket. */
export function npsBucket(score: number): NPSBucket {
  if (score <= 6) return 'detractor';
  if (score <= 8) return 'passive';
  return 'promoter';
}

export interface NPSScaleProps {
  /** Selected score 0-10. `null`/`undefined` → nothing selected. */
  value?: number | null;
  /** Fires with the chosen 0-10 score. */
  onChange?: (value: number) => void;
  /** Anchor under the 0 end. Default `'Not at all likely'`. */
  minLabel?: string;
  /** Anchor under the 10 end. Default `'Extremely likely'`. */
  maxLabel?: string;
  /**
   * Color each cell by its NPS bucket (detractor=danger, passive=warn,
   * promoter=success) instead of the flat primary fill. Default `false`.
   */
  colorByBucket?: boolean;
  /** Accessible name for the scale. Default `'Likelihood to recommend, 0 to 10'`. */
  'aria-label'?: string;
  disabled?: boolean;
  className?: string;
}

const BUCKET_BG: Record<NPSBucket, string> = {
  detractor: 'bg-danger border-danger text-on-danger',
  passive: 'bg-warn border-warn text-on-warn',
  promoter: 'bg-success border-success text-on-success',
};

/**
 * The 0-10 Net Promoter Score picker — eleven `radio` cells in a `radiogroup`
 * with anchor labels under the extremes. Each cell announces its bucket
 * (detractor / passive / promoter) so the meaning is never conveyed by color
 * alone; `colorByBucket` additionally tints selected cells by bucket using the
 * danger / warn / success tokens. Selection uses the primary token otherwise.
 * No literal colors.
 */
export const NPSScale = React.forwardRef<HTMLDivElement, NPSScaleProps>(function NPSScale(
  {
    value,
    onChange,
    minLabel = 'Not at all likely',
    maxLabel = 'Extremely likely',
    colorByBucket = false,
    'aria-label': ariaLabel = 'Likelihood to recommend, 0 to 10',
    disabled = false,
    className,
  },
  ref
) {
  return (
    <div ref={ref} className={cn('flex flex-col gap-sm', className)}>
      <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap gap-xs">
        {Array.from({ length: 11 }, (_, score) => {
          const selected = value === score;
          const bucket = npsBucket(score);
          const selectedClasses = colorByBucket ? BUCKET_BG[bucket] : 'bg-primary border-primary text-on-primary';
          return (
            <button
              key={score}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${score}, ${bucket}`}
              disabled={disabled}
              onClick={() => onChange?.(score)}
              className={cn(
                'flex h-10 w-[34px] items-center justify-center rounded-sm border text-sm font-bold transition-colors',
                'disabled:pointer-events-none disabled:opacity-50',
                selected
                  ? cn('border-2', selectedClasses)
                  : 'border-border bg-surface text-on-surface hover:bg-primary-50'
              )}
            >
              {score}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <span className="shrink text-xs text-muted">{minLabel}</span>
        <span className="shrink text-right text-xs text-muted">{maxLabel}</span>
      </div>
    </div>
  );
});
