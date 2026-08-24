import * as React from 'react';
import { cn } from '../primitives/cn';
import { ProgressRing } from '../charts/ProgressRing';
import { type HealthColor } from './internal';

export type MetricRingColor = HealthColor;

export interface MetricRingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metric name shown under the ring, e.g. "Move". */
  label: string;
  /** Current value; clamped to `[0, goal]`. */
  value: number;
  /** Goal / full-ring value. */
  goal: number;
  /** Unit shown in the caption, e.g. "kcal". */
  unit?: string;
  /** Ring arc color (semantic token). */
  color?: MetricRingColor;
  /** Outer diameter in px. */
  size?: number;
  /** Center text override; defaults to the percentage. */
  centerLabel?: string;
}

/**
 * A single labelled progress ring for one health metric — wraps the charts
 * {@link ProgressRing} and adds a value/goal caption below. When `goal <= 0` it
 * degrades to a muted "No goal set" note. Web parity of the native `MetricRing`;
 * the ring carries an `aria-label`, token-only colors.
 */
export const MetricRing = React.forwardRef<HTMLDivElement, MetricRingProps>(function MetricRing(
  { label, value, goal, unit, color = 'primary', size = 120, centerLabel, className, ...rest },
  ref
) {
  if (goal <= 0) {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center gap-[var(--xen-space-xs)]', className)}
        {...rest}
      >
        <span className="text-sm text-muted">No goal set</span>
        <span className="text-sm font-semibold text-on-surface">{label}</span>
      </div>
    );
  }

  const clamped = Math.min(Math.max(value, 0), goal);
  const pct = Math.round((clamped / goal) * 100);

  return (
    <div
      ref={ref}
      className={cn('flex flex-col items-center gap-[var(--xen-space-xs)]', className)}
      {...rest}
    >
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <ProgressRing
          value={clamped}
          max={goal}
          size={size}
          color={color}
          showValue={false}
          aria-label={`${label}: ${clamped} of ${goal}${unit ? ` ${unit}` : ''}, ${pct}%`}
        />
        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-on-surface">
          {centerLabel ?? `${pct}%`}
        </span>
      </div>
      <span className="text-sm font-semibold text-on-surface">{label}</span>
      <span className="text-xs text-muted">
        {clamped} / {goal}
        {unit ? ` ${unit}` : ''}
      </span>
    </div>
  );
});
