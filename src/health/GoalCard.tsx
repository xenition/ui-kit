import * as React from 'react';
import { cn } from '../primitives/cn';
import { BG_CLASS, type HealthColor } from './internal';

export type GoalCardColor = HealthColor;

export interface GoalCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Goal title, e.g. "Weekly steps". */
  title: string;
  /** Current progress value. */
  value: number;
  /** Target value the goal is measured against. */
  target: number;
  /** Unit label, e.g. "steps", "km". */
  unit?: string;
  /** Progress-bar color; auto-switches to `success` when the goal is met. */
  color?: GoalCardColor;
  /** Optional icon/emoji slot. */
  icon?: React.ReactNode;
  onPress?: () => void;
}

/**
 * A goal-progress card: title, an emphasized `value / target` readout, and a
 * token-bound progress bar. When the target is met the bar and readout switch to
 * the `success` tone and a "Goal met" note appears. Guards `target <= 0`. Web
 * parity of the native `GoalCard`; token-only colors.
 */
export const GoalCard = React.forwardRef<HTMLDivElement, GoalCardProps>(function GoalCard(
  { title, value, target, unit, color = 'primary', icon, onPress, className, ...rest },
  ref
) {
  const hasTarget = target > 0;
  const clamped = hasTarget ? Math.min(Math.max(value, 0), target) : Math.max(value, 0);
  const met = hasTarget && value >= target;
  const pct = hasTarget ? Math.round((clamped / target) * 100) : 0;
  const barColor: GoalCardColor = met ? 'success' : color;
  const a11y = hasTarget
    ? `${title}: ${value} of ${target}${unit ? ` ${unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`
    : `${title}: ${value}${unit ? ` ${unit}` : ''}`;

  const body = (
    <>
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        {icon ? <span>{icon}</span> : null}
        <span className="min-w-0 flex-1 truncate text-base font-semibold text-on-surface">{title}</span>
        {met ? <span className="text-xs font-bold text-success">✓ Goal met</span> : null}
      </div>
      <div className="flex items-baseline gap-[var(--xen-space-xs)]">
        <span className={cn('text-2xl font-bold', met ? 'text-success' : 'text-on-surface')}>{value}</span>
        {hasTarget ? (
          <span className="text-sm text-muted">
            / {target}
            {unit ? ` ${unit}` : ''}
          </span>
        ) : unit ? (
          <span className="text-sm text-muted">{unit}</span>
        ) : null}
      </div>
      {hasTarget ? (
        <div
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={target}
          aria-label={`${title} progress, ${pct}%`}
          className="h-2 overflow-hidden rounded-full bg-border"
        >
          <div className={cn('h-full rounded-full', BG_CLASS[barColor])} style={{ width: `${pct}%` }} />
        </div>
      ) : (
        <span className="text-xs text-muted">No target set</span>
      )}
    </>
  );

  const shell = 'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]';

  if (!onPress) {
    return (
      <div ref={ref} aria-label={a11y} className={cn(shell, className)} {...rest}>
        {body}
      </div>
    );
  }
  return (
    <div
      ref={ref}
      role="button"
      aria-label={a11y}
      tabIndex={0}
      onClick={onPress}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPress();
        }
      }}
      className={cn(
        shell,
        'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
