import * as React from 'react';
import { cn } from '../primitives/cn';
import { ProgressRing } from '../charts';

/** Ring color — a semantic slot the shared `ProgressRing` chart understands. */
export type WellnessGoalColor = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';

export interface WellnessGoalRingProps {
  /** Metric label, e.g. "Mindful minutes". */
  label: string;
  /** Current value. */
  value: number;
  /** Target value; `<= 0` renders an empty "No goal set" state. */
  goal: number;
  /** Unit suffix, e.g. "min". */
  unit?: string;
  /** Ring color (semantic slot). Default `'primary'`. */
  color?: WellnessGoalColor;
  /** Ring diameter in px. Default 132. */
  size?: number;
  /** Show a "✓ Goal met" note once value reaches the goal. Default true. */
  showMetBadge?: boolean;
  className?: string;
}

/**
 * A wellness goal dial built on the shared `ProgressRing` chart (web parity of
 * the native block): a labeled ring showing progress toward a daily target, with
 * the value / goal beneath and a success badge once met. A non-positive `goal`
 * degrades to a "No goal set" note (state, not color alone). Token-only colors —
 * the ring resolves its stroke from a semantic color slot.
 */
export const WellnessGoalRing = React.forwardRef<HTMLDivElement, WellnessGoalRingProps>(
  function WellnessGoalRing(
    { label, value, goal, unit, color = 'primary', size = 132, showMetBadge = true, className },
    ref
  ) {
    if (goal <= 0) {
      return (
        <div
          ref={ref}
          data-xen-wellness-goal-ring=""
          aria-label={`${label}: no goal set`}
          className={cn('flex flex-col items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]', className)}
        >
          <span className="text-base font-semibold text-on-surface">{label}</span>
          <span className="text-sm text-muted">No goal set</span>
        </div>
      );
    }

    const pct = Math.round((Math.min(Math.max(value, 0), goal) / goal) * 100);
    const met = value >= goal;
    const unitSuffix = unit ? ` ${unit}` : '';

    return (
      <div
        ref={ref}
        data-xen-wellness-goal-ring=""
        aria-label={`${label}: ${value} of ${goal}${unitSuffix}, ${pct}%${met ? ', goal met' : ''}`}
        className={cn('flex flex-col items-center gap-[var(--xen-space-sm)]', className)}
      >
        <ProgressRing value={value} max={goal} size={size} color={color} showValue />
        <span className="text-base font-bold text-on-surface">{label}</span>
        <span className="text-sm text-muted">
          {value} / {goal}
          {unitSuffix}
        </span>
        {met && showMetBadge ? <span className="text-sm font-bold text-success">✓ Goal met</span> : null}
      </div>
    );
  }
);
