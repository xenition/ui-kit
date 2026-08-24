import * as React from 'react';
import { cn } from '../primitives/cn';
import { TEXT_CLASS } from './internal';
import type { GoalCardProps, GoalCardColor } from './GoalCard';

/** Drop-in for {@link GoalCardProps} — same props, a different design. */
export type GoalCardV2Props = GoalCardProps;

const RING_R = 34;
const RING_C = 2 * Math.PI * RING_R;

/**
 * GoalCard — **ring hero** design (v2). A large SVG progress ring showing the
 * completion percentage anchors the card, with the title, `value / target`
 * readout, and (when reached) a `success` "Goal met" badge alongside. Elevated
 * surface that lifts on hover. Guards `target <= 0`. Same props as
 * {@link GoalCardProps}; token-only colors.
 */
export const GoalCardV2 = React.forwardRef<HTMLDivElement, GoalCardV2Props>(function GoalCardV2(
  { title, value, target, unit, color = 'primary', icon, onPress, className, ...rest },
  ref
) {
  const hasTarget = target > 0;
  const clamped = hasTarget ? Math.min(Math.max(value, 0), target) : Math.max(value, 0);
  const met = hasTarget && value >= target;
  const pct = hasTarget ? Math.round((clamped / target) * 100) : 0;
  const ringColor: GoalCardColor = met ? 'success' : color;
  const a11y = hasTarget
    ? `${title}: ${value} of ${target}${unit ? ` ${unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`
    : `${title}: ${value}${unit ? ` ${unit}` : ''}`;

  const ring = hasTarget ? (
    <div
      role="img"
      aria-label={`${title} progress, ${pct}%`}
      className="relative h-20 w-20 shrink-0"
    >
      <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
        <circle cx={40} cy={40} r={RING_R} fill="none" strokeWidth={8} stroke="currentColor" className="text-border" />
        <circle
          cx={40}
          cy={40}
          r={RING_R}
          fill="none"
          strokeWidth={8}
          strokeLinecap="round"
          stroke="currentColor"
          strokeDasharray={RING_C}
          strokeDashoffset={RING_C - (RING_C * pct) / 100}
          className={cn('transition-[stroke-dashoffset] duration-500 motion-reduce:transition-none', TEXT_CLASS[ringColor])}
        />
      </svg>
      <span className={cn('absolute inset-0 flex items-center justify-center text-base font-bold', TEXT_CLASS[ringColor])}>
        {pct}%
      </span>
    </div>
  ) : (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-border">
      <span className="text-center text-xs text-muted">No target</span>
    </div>
  );

  const body = (
    <>
      {ring}
      <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]">
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          {icon ? <span>{icon}</span> : null}
          <span className="min-w-0 flex-1 truncate text-base font-bold text-on-surface">{title}</span>
        </div>
        <div className="flex items-baseline gap-[var(--xen-space-xs)]">
          <span className={cn('text-3xl font-extrabold', met ? 'text-success' : 'text-on-surface')}>{value}</span>
          {hasTarget ? (
            <span className="text-sm text-muted">
              / {target}
              {unit ? ` ${unit}` : ''}
            </span>
          ) : unit ? (
            <span className="text-sm text-muted">{unit}</span>
          ) : null}
        </div>
        {met ? (
          <span className="w-fit rounded-full bg-success/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold text-success">
            ✓ Goal met
          </span>
        ) : null}
      </div>
    </>
  );

  const shell =
    'flex items-center gap-[var(--xen-space-lg)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-lg)] shadow-md';

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
        'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
