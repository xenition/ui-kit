import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LikertScaleProps } from './LikertScale';

/** Same public contract as {@link LikertScale} — a drop-in alternate design. */
export type LikertScaleV3Props = LikertScaleProps;

/**
 * LikertScale, redesigned (v3): a **compact dot strip**. Small circular points
 * pack on one line between the min/max anchors; the chosen point fills primary
 * and grows slightly. The tightest scale for a dense form. The opposite of v2's
 * big buttons. Same props, token-only.
 */
export const LikertScaleV3 = React.forwardRef<HTMLDivElement, LikertScaleV3Props>(function LikertScaleV3(
  { points = 5, value, onChange, minLabel, maxLabel, variant, disabled = false, className, ...rest },
  ref
) {
  void variant;
  const n = Math.max(2, Math.floor(points));

  return (
    <div ref={ref} data-xen-likert-scale="" role="radiogroup" aria-label={rest['aria-label'] ?? 'Agreement scale'} className={cn('flex items-center gap-2', className)}>
      {minLabel ? <span className="shrink-0 text-xs text-muted">{minLabel}</span> : null}
      <div className="flex flex-1 items-center justify-between">
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
                'rounded-full border transition-all disabled:opacity-50',
                selected ? 'h-5 w-5 border-primary bg-primary' : 'h-3.5 w-3.5 border-border bg-surface hover:border-primary'
              )}
            />
          );
        })}
      </div>
      {maxLabel ? <span className="shrink-0 text-xs text-muted">{maxLabel}</span> : null}
    </div>
  );
});
