import * as React from 'react';
import { cn } from '../primitives/cn';
import { npsBucket } from './NPSScale';
import type { NPSScaleProps } from './NPSScale';

/** Same public contract as {@link NPSScale} — a drop-in alternate design. */
export type NPSScaleV2Props = NPSScaleProps;

const BUCKET_SELECTED: Record<string, string> = {
  detractor: 'border-danger bg-danger text-on-danger',
  passive: 'border-warn bg-warn text-on-warn',
  promoter: 'border-success bg-success text-on-success',
};

/**
 * NPSScale, redesigned (v2): a **big 0–10 tile grid**. Eleven large square tiles
 * wrap into a grid; when `colorByBucket` is on, a chosen tile fills its bucket
 * tone (detractor/passive/promoter), else primary. Anchors sit beneath. Bolder
 * than v1's strip. Same props, token-only.
 */
export const NPSScaleV2 = React.forwardRef<HTMLDivElement, NPSScaleV2Props>(function NPSScaleV2(
  { value, onChange, minLabel = 'Not at all likely', maxLabel = 'Extremely likely', colorByBucket = false, disabled = false, className, ...rest },
  ref
) {
  return (
    <div ref={ref} data-xen-nps-scale="" role="radiogroup" aria-label={rest['aria-label'] ?? 'Likelihood to recommend, 0 to 10'} className={cn('flex flex-col gap-1.5', className)}>
      <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-11">
        {Array.from({ length: 11 }).map((_, score) => {
          const selected = value === score;
          const selCls = colorByBucket ? BUCKET_SELECTED[npsBucket(score)]! : 'border-primary bg-primary text-on-primary';
          return (
            <button
              key={score}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${score}`}
              disabled={disabled}
              onClick={() => onChange?.(score)}
              className={cn(
                'flex h-10 items-center justify-center rounded-md border-2 text-sm font-bold transition-colors disabled:opacity-50',
                selected ? selCls : 'border-border bg-surface text-on-surface hover:bg-primary/10'
              )}
            >
              {score}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-muted">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
});
