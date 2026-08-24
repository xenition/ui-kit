import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, ChartEmpty, colorVar, seriesColor } from './internal';
import type { PieDatum } from './PieChart';

export interface DonutChartProps extends React.SVGAttributes<SVGSVGElement> {
  /** Slice values; each slice's angle is `value / total`. */
  data: PieDatum[];
  /** Outer diameter in px. */
  size?: number;
  /** Ring thickness as a fraction of the radius (0–1). */
  thickness?: number;
  /** Optional centered label (e.g. a total). */
  centerLabel?: string;
}

/** Point on a circle of radius `r` centered at `(cx, cy)` at `angle` radians. */
function polar(cx: number, cy: number, r: number, angle: number): [number, number] {
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

/**
 * Donut chart — a pie with a `--xen-surface` hole punched in the center (drawn
 * as a surface-filled `<circle>` over the slices). Slice colors cycle the theme
 * series vars; the center label uses the `text-on-surface` token class. Guards
 * a zero total and a single full slice.
 */
export const DonutChart = React.forwardRef<SVGSVGElement, DonutChartProps>(function DonutChart(
  { data, size = 160, thickness = 0.42, centerLabel, className, ...rest },
  ref
) {
  const values = data.map((d) => Math.max(d.value, 0));
  const total = values.reduce((s, v) => s + v, 0);
  if (data.length === 0 || total <= 0) return <ChartEmpty />;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;
  const innerR = r * (1 - Math.min(Math.max(thickness, 0.05), 0.95));
  const fillFor = (d: PieDatum, i: number) => (d.color ? colorVar(d.color) : seriesColor(i));

  const nonZero = data.filter((d) => Math.max(d.value, 0) > 0);
  const single = nonZero.length === 1;
  let angle = -Math.PI / 2;

  return (
    <div className={cn('relative inline-block', className)} style={{ width: size, height: size }}>
      <svg
        ref={ref}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label={`Donut chart, ${data.length} segments${centerLabel ? `, ${centerLabel}` : ''}`}
        {...rest}
      >
        {single ? (
          <circle cx={cx} cy={cy} r={r} fill={fillFor(nonZero[0] ?? data[0]!, 0)} />
        ) : (
          data.map((d, i) => {
            const frac = Math.max(d.value, 0) / total;
            if (frac <= 0) return null;
            const a0 = angle;
            const a1 = angle + frac * Math.PI * 2;
            angle = a1;
            const [x0, y0] = polar(cx, cy, r, a0);
            const [x1, y1] = polar(cx, cy, r, a1);
            const large = a1 - a0 > Math.PI ? 1 : 0;
            const path = `M${cx} ${cy} L${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
            return <path key={i} d={path} fill={fillFor(d, i)} stroke="var(--xen-surface)" strokeWidth={1} />;
          })
        )}
        <circle cx={cx} cy={cy} r={innerR} fill="var(--xen-surface)" />
      </svg>
      {centerLabel ? (
        <span className="absolute inset-0 flex items-center justify-center text-on-surface text-lg font-semibold">
          {centerLabel}
        </span>
      ) : null}
    </div>
  );
});
