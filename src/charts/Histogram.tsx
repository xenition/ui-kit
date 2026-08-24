import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, ChartEmpty, clamp01, colorVar, safeMax } from './internal';

export interface HistogramProps extends React.SVGAttributes<SVGSVGElement> {
  /** Bin counts; each becomes an adjacent (gapless) vertical bar. */
  bins: number[];
  /** Plot height in px. */
  height?: number;
  /** Theme color token for the bars. */
  color?: ChartColor;
  /** Count mapped to full height; defaults to the largest bin. */
  max?: number;
}

/**
 * Frequency histogram — inline SVG `<rect>`s sitting flush (a hairline
 * `--xen-surface` gap between them) to read as a distribution. Bars fill with
 * `var(--xen-<color>)` and a `--xen-muted` baseline stands in for the axis.
 * Divide-by-zero is guarded via {@link safeMax}.
 */
export const Histogram = React.forwardRef<SVGSVGElement, HistogramProps>(function Histogram(
  { bins, height = 120, color = 'primary', max, className, ...rest },
  ref
) {
  if (bins.length === 0) return <ChartEmpty />;

  const width = 320;
  const ceiling = safeMax(bins, max);
  const fill = colorVar(color);
  const slot = width / bins.length;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      role="img"
      className={cn('inline-block', className)}
      {...rest}
    >
      {bins.map((count, i) => {
        const h = Math.max(clamp01(count / ceiling) * height, 1);
        return (
          <rect
            key={i}
            x={i * slot}
            y={height - h}
            width={slot}
            height={h}
            fill={fill}
            stroke="var(--xen-surface)"
            strokeWidth={1}
          />
        );
      })}
      <line x1={0} y1={height} x2={width} y2={height} stroke="var(--xen-muted)" strokeWidth={1} />
    </svg>
  );
});
