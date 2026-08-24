import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LikertScaleProps } from './LikertScale';

/** Same public contract as {@link LikertScale} — a drop-in alternate design. */
export type LikertScaleV2Props = LikertScaleProps;

/**
 * LikertScale, redesigned (v2): **big labelled buttons**. Each agreement point is
 * a large rounded numbered button that fills primary when chosen, with the min/max
 * anchors printed beneath the ends. A bolder scale than v1's dots. Same props,
 * token-only.
 */
export const LikertScaleV2 = React.forwardRef<HTMLDivElement, LikertScaleV2Props>(function LikertScaleV2(
  { points = 5, value, onChange, minLabel, maxLabel, variant, disabled = false, className, ...rest },
  ref
) {
  void variant;
  const n = Math.max(2, Math.floor(points));

  return (
    <div ref={ref} data-xen-likert-scale="" role="radiogroup" aria-label={rest['aria-label'] ?? 'Agreement scale'} className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex gap-2">
        {Array.from({ length: n }).map((_, i) => {
          const point = i + 1;
          const selected = value === point;
          return (
            <button
              key={point}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${point}`}
              disabled={disabled}
              onClick={() => onChange?.(point)}
              className={cn(
                'flex h-11 flex-1 items-center justify-center rounded-lg border-2 text-sm font-bold transition-colors disabled:opacity-50',
                selected ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-on-surface hover:bg-primary/10'
              )}
            >
              {point}
            </button>
          );
        })}
      </div>
      {(minLabel || maxLabel) ? (
        <div className="flex justify-between text-xs text-muted">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      ) : null}
    </div>
  );
});
