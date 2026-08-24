import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, ChartEmpty, clamp01, colorVar, safeMax } from './internal';

export interface HeatmapProps extends React.SVGAttributes<SVGSVGElement> {
  /** Row-major grid of values; intensity maps to cell opacity. */
  data: number[][];
  /** Theme color token painted at varying opacity. */
  color?: ChartColor;
  /** Value mapped to full opacity; defaults to the grid maximum. */
  max?: number;
  /** Cell edge length in px. */
  cellSize?: number;
  /** Gap between cells in px. */
  gap?: number;
}

/**
 * Grid heatmap — one inline SVG `<rect>` per cell, all painting the SAME
 * `var(--xen-<color>)` and varying only `fill-opacity` (`value / max`), so no
 * literal colors are introduced. A floor keeps zero cells faintly visible.
 * Empty / ragged grids are guarded, as is a zero max.
 */
export const Heatmap = React.forwardRef<SVGSVGElement, HeatmapProps>(function Heatmap(
  { data, color = 'primary', max, cellSize = 16, gap = 2, className, ...rest },
  ref
) {
  if (data.length === 0 || data.every((row) => row.length === 0)) return <ChartEmpty />;

  const cols = Math.max(...data.map((row) => row.length), 0);
  const rows = data.length;
  const ceiling = safeMax(data.flat(), max);
  const fill = colorVar(color);
  const width = cols * cellSize + (cols - 1) * gap;
  const height = rows * cellSize + (rows - 1) * gap;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${Math.max(width, 1)} ${Math.max(height, 1)}`}
      width={width}
      height={height}
      role="img"
      className={cn('inline-block', className)}
      {...rest}
    >
      {data.map((row, r) =>
        Array.from({ length: cols }, (_, c) => {
          const value = row[c] ?? 0;
          const intensity = clamp01(value / ceiling);
          return (
            <rect
              key={`${r}-${c}`}
              x={c * (cellSize + gap)}
              y={r * (cellSize + gap)}
              width={cellSize}
              height={cellSize}
              rx={2}
              fill={fill}
              fillOpacity={0.08 + intensity * 0.92}
            />
          );
        })
      )}
    </svg>
  );
});
