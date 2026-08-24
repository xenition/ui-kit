import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, clamp01, colorVar } from './internal';

export interface ProgressRingProps extends React.SVGAttributes<SVGSVGElement> {
  /** Current value, between 0 and `max`. */
  value: number;
  /** Value representing a full ring. */
  max?: number;
  /** Diameter in px. */
  size?: number;
  /** Ring stroke width in px. */
  thickness?: number;
  /** Theme color token for the progress stroke. */
  color?: ChartColor;
  /** Show the percentage in the center. */
  showValue?: boolean;
}

/**
 * Circular progress indicator — a `--xen-border` track circle plus a
 * `var(--xen-<color>)` progress circle drawn with `stroke-dasharray` /
 * `stroke-dashoffset`. The ratio is clamped to `[0, 1]` and a zero `max` is
 * guarded; the optional center label uses `text-on-surface`.
 */
export const ProgressRing = React.forwardRef<SVGSVGElement, ProgressRingProps>(function ProgressRing(
  { value, max = 100, size = 120, thickness = 10, color = 'primary', showValue = true, className, ...rest },
  ref
) {
  const ratio = clamp01(value / (max || 1));
  const r = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * ratio;
  const stroke = colorVar(color);
  const cx = size / 2;

  return (
    <div className={cn('relative inline-block', className)} style={{ width: size, height: size }}>
      <svg ref={ref} viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label={`Progress ring, ${Math.round(ratio * 100)}%`} {...rest}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--xen-border)" strokeWidth={thickness} />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          transform={`rotate(-90 ${cx} ${cx})`}
        />
      </svg>
      {showValue ? (
        <span className="absolute inset-0 flex items-center justify-center text-on-surface text-lg font-semibold">
          {Math.round(ratio * 100)}%
        </span>
      ) : null}
    </div>
  );
});
