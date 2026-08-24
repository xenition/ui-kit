import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, ChartEmpty, colorVar } from './internal';

export interface ScatterPoint {
  x: number;
  y: number;
}

export interface ScatterChartProps extends React.SVGAttributes<SVGSVGElement> {
  /** Points plotted as circles; the domain auto-fits unless bounds are given. */
  data: ScatterPoint[];
  /** Plot width in px. */
  width?: number;
  /** Plot height in px. */
  height?: number;
  /** Theme color token for the points. */
  color?: ChartColor;
  /** Point radius in px. */
  radius?: number;
  /** Optional x-domain bounds; default to the data range. */
  xDomain?: [number, number];
  /** Optional y-domain bounds; default to the data range. */
  yDomain?: [number, number];
}

/**
 * Scatter plot — one inline SVG `<circle>` per point, filled with
 * `var(--xen-<color>)`; axes use `--xen-border`. Domains auto-fit the data (or
 * take explicit bounds) with zero-span guards, and y is flipped so larger
 * values sit higher.
 */
export const ScatterChart = React.forwardRef<SVGSVGElement, ScatterChartProps>(function ScatterChart(
  { data, width = 320, height = 200, color = 'primary', radius = 4, xDomain, yDomain, className, ...rest },
  ref
) {
  if (data.length === 0) return <ChartEmpty />;

  const xs = data.map((p) => p.x);
  const ys = data.map((p) => p.y);
  const [x0, x1] = xDomain ?? [Math.min(...xs), Math.max(...xs)];
  const [y0, y1] = yDomain ?? [Math.min(...ys), Math.max(...ys)];
  const xSpan = x1 - x0 || 1;
  const ySpan = y1 - y0 || 1;
  const pad = radius + 2;
  const fill = colorVar(color);

  const px = (x: number) => pad + ((x - x0) / xSpan) * (width - pad * 2);
  const py = (y: number) => height - pad - ((y - y0) / ySpan) * (height - pad * 2);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      role="img"
      className={cn('inline-block', className)}
      {...rest}
    >
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="var(--xen-border)" strokeWidth={1} />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="var(--xen-border)" strokeWidth={1} />
      {data.map((p, i) => (
        <circle key={i} cx={px(p.x)} cy={py(p.y)} r={radius} fill={fill} fillOpacity={0.75} />
      ))}
    </svg>
  );
});
