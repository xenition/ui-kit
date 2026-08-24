import * as React from 'react';
import { cn } from '../primitives/cn';

export interface WaterTrackerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Glasses (or units) consumed so far. Clamped to `[0, goal]`. */
  count: number;
  /** Daily goal in glasses/units. */
  goal: number;
  /** Volume per glass in ml, used for the total readout. */
  mlPerGlass?: number;
  /** Fires with the next count when a glass icon is tapped. */
  onChange?: (next: number) => void;
}

/**
 * A hydration tracker rendered as a row of tappable glass icons: filled glasses
 * up to `count`, empty ones to `goal`. Tapping a glass sets the count to that
 * position (tapping the last filled glass clears it back one). Shows a
 * `current / goal` and optional ml total. Guards `goal <= 0` with a muted note.
 * Web parity of the native `WaterTracker`; token-only colors.
 */
export const WaterTracker = React.forwardRef<HTMLDivElement, WaterTrackerProps>(function WaterTracker(
  { count, goal, mlPerGlass, onChange, className, ...rest },
  ref
) {
  if (goal <= 0) {
    return (
      <div ref={ref} className={cn('text-sm text-muted', className)} {...rest}>
        No hydration goal set
      </div>
    );
  }

  const safeGoal = Math.floor(goal);
  const filled = Math.min(Math.max(Math.floor(count), 0), safeGoal);
  const met = filled >= safeGoal;

  const handlePress = (index: number): void => {
    if (!onChange) return;
    const position = index + 1;
    onChange(position === filled ? position - 1 : position);
  };

  return (
    <div
      ref={ref}
      aria-label={`Water: ${filled} of ${safeGoal} glasses${met ? ', goal reached' : ''}`}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-on-surface">💧 Water</span>
        <span className={cn('text-sm font-semibold', met ? 'text-success' : 'text-muted')}>
          {filled} / {safeGoal}
          {mlPerGlass != null ? `  ·  ${filled * mlPerGlass} ml` : ''}
        </span>
      </div>

      <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
        {Array.from({ length: safeGoal }, (_, i) => {
          const isFilled = i < filled;
          const glassLabel = `Glass ${i + 1}, ${isFilled ? 'filled' : 'empty'}`;
          const glyph = (
            <span aria-hidden="true" className={cn('text-xl leading-none', isFilled ? 'opacity-100' : 'opacity-30')}>
              🥛
            </span>
          );
          if (!onChange) {
            return (
              <span key={i} aria-label={glassLabel}>
                {glyph}
              </span>
            );
          }
          return (
            <button
              key={i}
              type="button"
              aria-label={glassLabel}
              onClick={() => handlePress(i)}
              className="transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              {glyph}
            </button>
          );
        })}
      </div>
    </div>
  );
});
