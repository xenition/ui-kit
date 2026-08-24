import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, clamp01, colorVar } from './internal';

export interface GaugeChartProps extends React.SVGAttributes<SVGSVGElement> {
  /** Current value, between `min` and `max`. */
  value: number;
  /** Lower bound (left of the arc). */
  min?: number;
  /** Upper bound (right of the arc). */
  max?: number;
  /** Diameter in px (the gauge occupies the top semicircle). */
  size?: number;
  /** Theme color token for the filled arc + needle. */
  color?: ChartColor;
  /** Show the numeric value in the center. */
  showValue?: boolean;
}

/** Point on a semicircle: `t` in [0,1] maps 180°→0° (left→right). */
function arcPoint(cx: number, cy: number, r: number, t: number): [number, number] {
  const a = Math.PI * (1 - t);
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
}

/**
 * Semicircular gauge — a `--xen-border` track arc, a value arc in
 * `var(--xen-<color>)`, and a needle to the current value. All colors are
 * tokens. `value` is clamped into `[min, max]` and a zero span is guarded.
 */
export const GaugeChart = React.forwardRef<SVGSVGElement, GaugeChartProps>(function GaugeChart(
  { value, min = 0, max = 100, size = 200, color = 'primary', showValue = true, className, ...rest },
  ref
) {
  const span = max - min || 1;
  const t = clamp01((value - min) / span);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 6;
  const stroke = colorVar(color);

  const [sx, sy] = arcPoint(cx, cy, r, 0);
  const [ex, ey] = arcPoint(cx, cy, r, 1);
  const [vx, vy] = arcPoint(cx, cy, r, t);
  const track = `M${sx.toFixed(2)} ${sy.toFixed(2)} A${r} ${r} 0 0 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
  const large = t > 0.5 ? 1 : 0;
  const fill = `M${sx.toFixed(2)} ${sy.toFixed(2)} A${r} ${r} 0 ${large} 1 ${vx.toFixed(2)} ${vy.toFixed(2)}`;
  const height = cy + 8;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${height}`}
      width={size}
      height={height}
      role="img"
      className={cn('inline-block', className)}
      {...rest}
    >
      <path d={track} fill="none" stroke="var(--xen-border)" strokeWidth={10} strokeLinecap="round" />
      <path d={fill} fill="none" stroke={stroke} strokeWidth={10} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={vx} y2={vy} stroke={stroke} strokeWidth={2} />
      <circle cx={cx} cy={cy} r={4} fill={stroke} />
      {showValue ? (
        <text
          x={cx}
          y={cy - r / 2}
          className="fill-current text-on-surface"
          fontSize={size * 0.14}
          fontWeight={600}
          textAnchor="middle"
        >
          {value}
        </text>
      ) : null}
    </svg>
  );
});
