import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, ChartEmpty, colorVar } from './internal';

export interface LineChartProps extends React.SVGAttributes<SVGSVGElement> {
  /** Series values, plotted left-to-right and joined by a polyline. */
  data: number[];
  /** Plot height in px (SVG viewBox height). */
  height?: number;
  /** Plot width in px (SVG viewBox width). */
  width?: number;
  /** Theme color token for the line. */
  color?: ChartColor;
  /** Value mapped to the top of the plot; defaults to the series max. */
  max?: number;
  /** Value mapped to the bottom of the plot; defaults to the series min. */
  min?: number;
  /** Draw a dot at each datum. */
  showDots?: boolean;
}

/**
 * Single-series line chart drawn as an inline SVG `<polyline>` — token-bound
 * (`stroke: var(--xen-<color>)`), no literal colors and no charting dependency.
 * Values are scaled into the viewBox with divide-by-zero guards; a flat series
 * (min === max) renders as a centered horizontal line.
 */
export const LineChart = React.forwardRef<SVGSVGElement, LineChartProps>(function LineChart(
  { data, height = 120, width = 320, color = 'primary', max, min, showDots = false, className, ...rest },
  ref
) {
  if (data.length === 0) return <ChartEmpty />;

  const hi = max ?? Math.max(...data);
  const lo = min ?? Math.min(...data);
  const range = hi - lo || 1;
  const stroke = colorVar(color);

  const points = data.map((v, i) => {
    const x = data.length === 1 ? width / 2 : (i / (data.length - 1)) * width;
    const y = height - ((v - lo) / range) * height;
    return { x, y };
  });

  const poly = points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Line chart, ${data.length} points, max ${Math.max(...data)}`}
      className={cn('overflow-visible', className)}
      {...rest}
    >
      <polyline points={poly} fill="none" stroke={stroke} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {showDots
        ? points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3} fill={stroke} />)
        : null}
    </svg>
  );
});
