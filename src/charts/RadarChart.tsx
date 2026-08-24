import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartEmpty, safeMax, seriesColor } from './internal';

export interface RadarChartProps extends React.SVGAttributes<SVGSVGElement> {
  /** Single series of per-axis values. Ignored when `series` is provided. */
  data?: number[];
  /** Multiple series (each an equal-length per-axis value list). */
  series?: number[][];
  /** Optional axis labels, positioned around the perimeter. */
  labels?: string[];
  /** Value mapped to the outer ring; defaults to the largest datum. */
  max?: number;
  /** Diameter in px. */
  size?: number;
}

/** Point at `angle` (radians, from top) and radius `r` around center `c`. */
function spoke(c: number, r: number, angle: number): [number, number] {
  return [c + r * Math.sin(angle), c - r * Math.cos(angle)];
}

/**
 * Radar / spider chart — one polygon per series over evenly-spaced axes. Series
 * strokes/fills cycle the theme series vars (fill at low opacity); grid rings
 * use `--xen-border`. No literal colors. Guards empty data and a zero `max`.
 */
export const RadarChart = React.forwardRef<SVGSVGElement, RadarChartProps>(function RadarChart(
  { data, series, labels, max, size = 200, className, ...rest },
  ref
) {
  const allSeries = series && series.length > 0 ? series : data ? [data] : [];
  const axisCount = Math.max(...allSeries.map((s) => s.length), 0);
  if (allSeries.length === 0 || axisCount === 0) return <ChartEmpty />;

  const c = size / 2;
  const r = size / 2 - 1;
  const ceiling = safeMax(allSeries.flat(), max);
  const step = (Math.PI * 2) / axisCount;

  const ringPoints = (radius: number) =>
    Array.from({ length: axisCount }, (_, i) => spoke(c, radius, i * step))
      .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
      .join(' ');

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label={`Radar chart, ${allSeries.length} series, ${axisCount} axes`}
      className={cn('inline-block', className)}
      {...rest}
    >
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={ringPoints(r * f)} fill="none" stroke="var(--xen-border)" strokeWidth={1} />
      ))}
      {allSeries.map((s, si) => {
        const stroke = seriesColor(si);
        const pts = Array.from({ length: axisCount }, (_, i) => {
          const v = s[i] ?? 0;
          const radius = (Math.min(Math.max(v, 0), ceiling) / ceiling) * r;
          return spoke(c, radius, i * step);
        });
        const poly = pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
        return <polygon key={si} points={poly} fill={stroke} fillOpacity={0.15} stroke={stroke} strokeWidth={2} />;
      })}
      {labels
        ? labels.slice(0, axisCount).map((label, i) => {
            const [x, y] = spoke(c, r + 0.5, i * step);
            return (
              <text
                key={i}
                x={x.toFixed(2)}
                y={y.toFixed(2)}
                className="fill-current text-muted"
                fontSize={9}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {label}
              </text>
            );
          })
        : null}
    </svg>
  );
});
