import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, ChartEmpty, clamp01, colorVar, safeMax } from './internal';

export interface ColumnChartDatum {
  label: string;
  value: number;
}

export interface ColumnChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Labelled values rendered as horizontal bars. */
  data: ColumnChartDatum[];
  /** Theme color token for the bars. */
  color?: ChartColor;
  /** Value mapped to full bar width; defaults to the largest datum. */
  max?: number;
  /** Per-bar track height in px. */
  barHeight?: number;
  /** Show the numeric value beside each bar. */
  showValues?: boolean;
}

/**
 * Horizontal bar chart — one labelled row per datum, each an inline SVG track
 * (`--xen-border`) with a fill `<rect>` in `var(--xen-<color>)` scaled to
 * `value / max`. Labels/values use token classes; scaling is guarded against a
 * zero divisor.
 */
export const ColumnChart = React.forwardRef<HTMLDivElement, ColumnChartProps>(function ColumnChart(
  { data, color = 'primary', max, barHeight = 12, showValues = false, className, ...rest },
  ref
) {
  if (data.length === 0) return <ChartEmpty />;

  const ceiling = safeMax(data.map((d) => d.value), max);
  const fill = colorVar(color);

  return (
    <div ref={ref} className={cn('flex flex-col gap-2', className)} {...rest}>
      {data.map((d, i) => {
        const ratio = clamp01(d.value / ceiling);
        return (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="truncate text-on-surface text-xs">{d.label}</span>
              {showValues ? <span className="text-muted text-xs">{d.value}</span> : null}
            </div>
            <svg viewBox="0 0 100 10" width="100%" height={barHeight} preserveAspectRatio="none" role="img">
              <rect x={0} y={0} width={100} height={10} rx={5} fill="var(--xen-border)" />
              <rect x={0} y={0} width={Math.max(ratio * 100, 0)} height={10} rx={5} fill={fill} />
            </svg>
          </div>
        );
      })}
    </div>
  );
});
