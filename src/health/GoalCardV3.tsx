import * as React from 'react';
import { cn } from '../primitives/cn';
import { BG_CLASS } from './internal';
import type { GoalCardProps, GoalCardColor } from './GoalCard';

/** Drop-in for {@link GoalCardProps} — same props, a different design. */
export type GoalCardV3Props = GoalCardProps;

/**
 * GoalCard — **thin value-first line** design (v3). The current value leads
 * large with its unit, the title sits quietly above, a trailing `NN%` reads the
 * completion, and a thin token bar underlines it all. Borderless and compact —
 * dense enough for a stacked list. Switches to the `success` tone when the
 * target is met. Guards `target <= 0`. Same props as {@link GoalCardProps};
 * token-only colors.
 */
export const GoalCardV3 = React.forwardRef<HTMLDivElement, GoalCardV3Props>(function GoalCardV3(
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
      <div className="flex items-end gap-[var(--xen-space-sm)]">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            {icon ? <span>{icon}</span> : null}
            <span className="min-w-0 flex-1 truncate text-xs font-semibold uppercase tracking-wide text-muted">
              {title}
            </span>
          </div>
          <div className="flex items-baseline gap-[var(--xen-space-xs)]">
            <span className={cn('text-xl font-extrabold', met ? 'text-success' : 'text-on-surface')}>{value}</span>
            {unit ? <span className="text-xs text-muted">{unit}</span> : null}
            {hasTarget ? <span className="text-xs text-muted">/ {target}</span> : null}
          </div>
        </div>
        {hasTarget ? (
          <span className={cn('text-base font-extrabold', met ? 'text-success' : 'text-on-surface')}>{pct}%</span>
        ) : null}
      </div>
      {hasTarget ? (
        <div
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={target}
          aria-label={`${title} progress, ${pct}%`}
          className="h-[5px] overflow-hidden rounded-full bg-border"
        >
          <div
            className={cn('h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none', BG_CLASS[barColor])}
            style={{ width: `${pct}%` }}
          />
        </div>
      ) : (
        <span className="text-xs text-muted">No target set</span>
      )}
    </>
  );

  const shell =
    'flex flex-col gap-[var(--xen-space-xs)] border-l-2 border-border py-[var(--xen-space-sm)] pl-[var(--xen-space-md)] pr-[var(--xen-space-sm)]';

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
        'cursor-pointer transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
