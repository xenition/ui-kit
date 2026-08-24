import * as React from 'react';
import { cn } from '../primitives/cn';
import { npsBucket } from './NPSScale';
import type { NPSScaleProps } from './NPSScale';

/** Same public contract as {@link NPSScale} — a drop-in alternate design. */
export type NPSScaleV3Props = NPSScaleProps;

const BUCKET_SELECTED: Record<string, string> = {
  detractor: 'bg-danger text-on-danger',
  passive: 'bg-warn text-on-warn',
  promoter: 'bg-success text-on-success',
};

/**
 * NPSScale, redesigned (v3): a **compact number strip**. Eleven small cells in a
 * single tight row with anchors as tiny end labels; the chosen cell fills (bucket
 * tone when `colorByBucket`, else primary). The minimal counterpart to v2's grid.
 * Same props, token-only.
 */
export const NPSScaleV3 = React.forwardRef<HTMLDivElement, NPSScaleV3Props>(function NPSScaleV3(
  { value, onChange, minLabel = 'Not likely', maxLabel = 'Very likely', colorByBucket = false, disabled = false, className, ...rest },
  ref
) {
  return (
    <div ref={ref} data-xen-nps-scale="" role="radiogroup" aria-label={rest['aria-label'] ?? 'Likelihood to recommend, 0 to 10'} className={cn('flex flex-col gap-1', className)}>
      <div className="flex gap-0.5">
        {Array.from({ length: 11 }).map((_, score) => {
          const selected = value === score;
          const selCls = colorByBucket ? BUCKET_SELECTED[npsBucket(score)]! : 'bg-primary text-on-primary';
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
                'flex h-7 flex-1 items-center justify-center rounded border text-xs font-semibold transition-colors disabled:opacity-50',
                selected ? cn('border-transparent', selCls) : 'border-border bg-surface text-on-surface hover:bg-neutral-50'
              )}
            >
              {score}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-muted">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
});
