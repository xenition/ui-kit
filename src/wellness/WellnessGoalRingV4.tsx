import * as React from 'react';
import { cn } from '../primitives/cn';
import { ProgressRing } from '../charts';
import { type WellnessGoalRingProps } from './WellnessGoalRing';

export type WellnessGoalRingV4Props = WellnessGoalRingProps;

/**
 * WellnessGoalRingV4 — the calm redesign of {@link WellnessGoalRing}. Same props,
 * defaults, size, ring color, and "No goal set" empty state. Only the visuals
 * change: a clean centered surface card where the "✓ Goal met" note becomes a
 * small gradient pill (the single calm accent) once the goal is met.
 */
export const WellnessGoalRingV4 = React.forwardRef<HTMLDivElement, WellnessGoalRingV4Props>(
  function WellnessGoalRingV4(
    { label, value, goal, unit, color = 'primary', size = 132, showMetBadge = true, className, ...rest },
    ref
  ) {
    if (goal <= 0) {
      return (
        <div
          ref={ref}
          data-xen-wellness-goal-ring=""
          aria-label={`${label}: no goal set`}
          className={cn(
            'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5',
            'flex flex-col items-center gap-[var(--xen-space-sm)]',
            className
          )}
          {...rest}
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
        className={cn(
          'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5',
          'flex flex-col items-center gap-[var(--xen-space-sm)]',
          className
        )}
        {...rest}
      >
        <ProgressRing value={value} max={goal} size={size} color={color} showValue />
        <span className="text-base font-bold text-on-surface">{label}</span>
        <span className="text-sm text-muted">
          {value} / {goal}
          {unitSuffix}
        </span>
        {met && showMetBadge ? (
          <span className="rounded-full bg-gradient-to-r from-primary-400 to-primary-700 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-on-primary">
            ✓ Goal met
          </span>
        ) : null}
      </div>
    );
  }
);
