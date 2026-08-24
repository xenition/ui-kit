import * as React from 'react';
import { cn } from '../primitives/cn';

export type LikertVariant = 'dots' | 'numbered';

export interface LikertScaleProps {
  /** Number of agreement points (default 5). Common: 5 or 7. */
  points?: number;
  /** Selected point, 1-based. `null`/`undefined` → nothing selected. */
  value?: number | null;
  /** Fires with the chosen 1-based point. */
  onChange?: (value: number) => void;
  /** Label under the left-most (lowest) point. */
  minLabel?: string;
  /** Label under the right-most (highest) point. */
  maxLabel?: string;
  /** Accessible name for the whole scale. Default `'Agreement scale'`. */
  'aria-label'?: string;
  /** `numbered` prints the point number inside each button. Default `'dots'`. */
  variant?: LikertVariant;
  disabled?: boolean;
  className?: string;
}

/**
 * A Likert agreement scale — N equally-weighted points rendered as a
 * `radiogroup` of circular `radio` buttons, with optional anchor labels under
 * the extremes ("Strongly disagree" … "Strongly agree"). The selected point
 * fills with the primary token and is announced via `aria-checked` (selection
 * is never color-alone). `numbered` prints each point's ordinal. No literal
 * colors.
 */
export const LikertScale = React.forwardRef<HTMLDivElement, LikertScaleProps>(
  function LikertScale(
    {
      points = 5,
      value,
      onChange,
      minLabel,
      maxLabel,
      'aria-label': ariaLabel = 'Agreement scale',
      variant = 'dots',
      disabled = false,
      className,
    },
    ref
  ) {
    const count = Math.max(2, Math.floor(points));

    return (
      <div ref={ref} className={cn('flex flex-col gap-sm', className)}>
        <div role="radiogroup" aria-label={ariaLabel} className="flex justify-between gap-xs">
          {Array.from({ length: count }, (_, i) => {
            const point = i + 1;
            const selected = value === point;
            return (
              <button
                key={point}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`Point ${point} of ${count}`}
                disabled={disabled}
                onClick={() => onChange?.(point)}
                className={cn(
                  'flex aspect-square max-w-[56px] flex-1 items-center justify-center rounded-full border transition-colors',
                  'disabled:pointer-events-none disabled:opacity-50',
                  selected
                    ? 'border-2 border-primary bg-primary text-on-primary'
                    : 'border-border bg-surface text-on-surface hover:bg-primary-50'
                )}
              >
                {variant === 'numbered' ? (
                  <span className="text-sm font-bold">{point}</span>
                ) : null}
              </button>
            );
          })}
        </div>

        {minLabel || maxLabel ? (
          <div className="flex justify-between">
            <span className="shrink text-xs text-muted">{minLabel ?? ''}</span>
            <span className="shrink text-right text-xs text-muted">{maxLabel ?? ''}</span>
          </div>
        ) : null}
      </div>
    );
  }
);
