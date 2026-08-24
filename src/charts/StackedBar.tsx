import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, ChartEmpty, colorVar, seriesColor } from './internal';

export interface StackedBarSegment {
  value: number;
  /** Theme color token for this segment; defaults to the cycled series color. */
  color?: ChartColor;
  /** Opacity applied to the color (for series that share one theme color). */
  opacity?: number;
  label?: string;
}

export interface StackedBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Segments laid end-to-end; each width is its share of the total. */
  segments: StackedBarSegment[];
  /** Bar height in px. */
  height?: number;
}

/**
 * Single horizontal stacked bar — inline SVG `<rect>`s, each sized to its share
 * of the total. Colors come from the cycled series vars (or an explicit token),
 * distinguished by `opacity` rather than literal hex. Guards an empty list and
 * a zero total.
 */
export const StackedBar = React.forwardRef<HTMLDivElement, StackedBarProps>(function StackedBar(
  { segments, height = 16, className, ...rest },
  ref
) {
  if (segments.length === 0) return <ChartEmpty />;

  const total = segments.reduce((s, seg) => s + Math.max(seg.value, 0), 0);
  if (total <= 0) return <ChartEmpty />;

  let x = 0;

  return (
    <div ref={ref} className={cn('w-full', className)} {...rest}>
      <svg viewBox="0 0 100 10" width="100%" height={height} preserveAspectRatio="none" role="img">
        <rect x={0} y={0} width={100} height={10} rx={5} fill="var(--xen-border)" />
        {segments.map((seg, i) => {
          const w = (Math.max(seg.value, 0) / total) * 100;
          if (w <= 0) return null;
          const rectX = x;
          x += w;
          return (
            <rect
              key={i}
              x={rectX}
              y={0}
              width={w}
              height={10}
              fill={seg.color ? colorVar(seg.color) : seriesColor(i)}
              fillOpacity={seg.opacity ?? 1}
            />
          );
        })}
      </svg>
    </div>
  );
});
