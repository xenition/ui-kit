import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, ChartEmpty, colorVar, seriesColor } from './internal';

export interface PieDatum {
  value: number;
  label?: string;
  /** Override the auto-cycled series color for this slice. */
  color?: ChartColor;
}

export interface PieChartProps extends React.SVGAttributes<SVGSVGElement> {
  /** Slice values; each slice's angle is `value / total`. */
  data: PieDatum[];
  /** Diameter in px. */
  size?: number;
}

/** Point on a circle of radius `r` centered at `(cx, cy)` at `angle` radians. */
function polar(cx: number, cy: number, r: number, angle: number): [number, number] {
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

/**
 * Pie chart — inline SVG arc `<path>`s, one per slice. Slice colors cycle the
 * theme series vars (`var(--xen-primary|accent|success|warn|danger)`); no
 * literal colors. A total of zero renders the empty state; a single non-zero
 * slice draws a full `<circle>` (arc paths can't express 360°).
 */
export const PieChart = React.forwardRef<SVGSVGElement, PieChartProps>(function PieChart(
  { data, size = 160, className, ...rest },
  ref
) {
  const values = data.map((d) => Math.max(d.value, 0));
  const total = values.reduce((s, v) => s + v, 0);
  if (data.length === 0 || total <= 0) return <ChartEmpty />;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;
  const fillFor = (d: PieDatum, i: number) => (d.color ? colorVar(d.color) : seriesColor(i));

  const nonZero = data.filter((d) => Math.max(d.value, 0) > 0);
  const single = nonZero.length === 1;

  let angle = -Math.PI / 2; // start at 12 o'clock

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label={`Pie chart, ${data.length} slices`}
      className={cn('inline-block', className)}
      {...rest}
    >
      {single ? (
        <circle cx={cx} cy={cy} r={r} fill={fillFor(nonZero[0] ?? data[0]!, data.indexOf(nonZero[0] ?? data[0]!))} />
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
          const d0 = `M${cx} ${cy} L${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
          return <path key={i} d={d0} fill={fillFor(d, i)} stroke="var(--xen-surface)" strokeWidth={1} />;
        })
      )}
    </svg>
  );
});
