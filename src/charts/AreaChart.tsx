import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, ChartEmpty, colorVar } from './internal';

export interface AreaChartProps extends React.SVGAttributes<SVGSVGElement> {
  /** Series values, plotted left-to-right; the area below the line is filled. */
  data: number[];
  /** Plot height in px (SVG viewBox height). */
  height?: number;
  /** Plot width in px (SVG viewBox width). */
  width?: number;
  /** Theme color token for the line + fill. */
  color?: ChartColor;
  /** Value mapped to the top of the plot; defaults to the series max. */
  max?: number;
  /** Value mapped to the bottom of the plot; defaults to the series min. */
  min?: number;
}

/**
 * Filled area chart — an inline SVG `<path>` for the line with a translucent
 * fill down to the baseline. Both stroke and fill reference `var(--xen-<color>)`
 * (fill at reduced opacity), so no literal colors appear. Scaling is guarded
 * against a zero range.
 */
export const AreaChart = React.forwardRef<SVGSVGElement, AreaChartProps>(function AreaChart(
  { data, height = 120, width = 320, color = 'primary', max, min, className, ...rest },
  ref
) {
  if (data.length === 0) return <ChartEmpty />;

  const hi = max ?? Math.max(...data);
  const lo = min ?? Math.min(...data);
  const range = hi - lo || 1;
  const c = colorVar(color);

  const pts = data.map((v, i) => {
    const x = data.length === 1 ? width / 2 : (i / (data.length - 1)) * width;
    const y = height - ((v - lo) / range) * height;
    return { x, y };
  });

  const first = pts[0] ?? { x: 0, y: height };
  const last = pts[pts.length - 1] ?? { x: width, y: height };
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
  const area = `${line} L${last.x.toFixed(2)} ${height} L${first.x.toFixed(2)} ${height} Z`;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      role="img"
      className={cn('overflow-visible', className)}
      {...rest}
    >
      <path d={area} fill={c} fillOpacity={0.18} stroke="none" />
      <path d={line} fill="none" stroke={c} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
});
