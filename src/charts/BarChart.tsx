import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, ChartEmpty, clamp01, colorVar, safeMax } from './internal';

export interface BarChartProps extends React.SVGAttributes<SVGSVGElement> {
  /** Bar values; each becomes a vertical bar sized by `value / max`. */
  data: number[];
  /** Optional labels rendered under each bar. */
  labels?: string[];
  /** Plot height in px. */
  height?: number;
  /** Theme color token for the bars. */
  color?: ChartColor;
  /** Value mapped to full bar height; defaults to the largest datum. */
  max?: number;
}

/**
 * Vertical bar chart — inline SVG `<rect>`s sized by `value / max`, filled with
 * `var(--xen-<color>)`. A `--xen-muted` baseline stands in for the axis. Labels
 * use the `text-muted` token class. Divide-by-zero is guarded via {@link safeMax}.
 */
export const BarChart = React.forwardRef<SVGSVGElement, BarChartProps>(function BarChart(
  { data, labels, height = 120, color = 'primary', max, className, ...rest },
  ref
) {
  if (data.length === 0) return <ChartEmpty />;

  const width = 320;
  const ceiling = safeMax(data, max);
  const fill = colorVar(color);
  const slot = width / data.length;
  const barW = slot * 0.66;

  return (
    <div className={cn('inline-block w-full', className)}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none" role="img" aria-label={`Bar chart, ${data.length} bars, max ${ceiling}`} ref={ref} {...rest}>
        {data.map((v, i) => {
          const h = Math.max(clamp01(v / ceiling) * height, 1);
          const x = i * slot + (slot - barW) / 2;
          return <rect key={i} x={x} y={height - h} width={barW} height={h} rx={2} fill={fill} />;
        })}
        <line x1={0} y1={height} x2={width} y2={height} stroke="var(--xen-muted)" strokeWidth={1} />
      </svg>
      {labels ? (
        <div className="flex w-full">
          {labels.map((l, i) => (
            <span key={i} className="flex-1 truncate text-center text-muted text-xs">
              {l}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
});
