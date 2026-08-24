import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor, ChartEmpty, colorVar } from './internal';

export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
  /** Trend values, drawn as a compact line. */
  data: number[];
  /** Plot width in px. */
  width?: number;
  /** Plot height in px. */
  height?: number;
  /** Theme color token for the line. */
  color?: ChartColor;
}

/**
 * Compact inline trend line — a minimal SVG `<polyline>` with no axes, stroked
 * with `var(--xen-<color>)`. Scales the series into the box with a zero-range
 * guard; a single point renders a centered dot.
 */
export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(function Sparkline(
  { data, width = 100, height = 28, color = 'primary', className, ...rest },
  ref
) {
  if (data.length === 0) return <ChartEmpty />;

  const hi = Math.max(...data);
  const lo = Math.min(...data);
  const range = hi - lo || 1;
  const stroke = colorVar(color);
  const pad = 2;

  const pts = data.map((v, i) => {
    const x = data.length === 1 ? width / 2 : pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = height - pad - ((v - lo) / range) * (height - pad * 2);
    return { x, y };
  });

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Sparkline, ${data.length} points`}
      className={cn('inline-block align-middle', className)}
      {...rest}
    >
      {data.length === 1 ? (
        <circle cx={pts[0]!.x} cy={pts[0]!.y} r={2} fill={stroke} />
      ) : (
        <polyline
          points={pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')}
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
});
