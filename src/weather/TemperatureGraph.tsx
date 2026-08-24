import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { LineChart, type ChartColor } from '../charts';

export interface TemperatureGraphProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'color'> {
  /** Temperature series (one value per period). */
  data: number[];
  /** X-axis tick labels aligned to `data` (e.g. hours). Optional. */
  labels?: string[];
  /** Unit suffix for the min/max annotations. Default `'°'`. */
  unit?: string;
  /** Card title. Default `'Temperature'`. */
  title?: string;
  /** Line color token key. Default `'primary'`. */
  color?: ChartColor;
  /** Plot height in px. Default `160`. */
  height?: number;
  /** Plot width in px. Default `300`. */
  width?: number;
  /** Message shown when `data` is empty. */
  emptyLabel?: string;
}

/**
 * Temperature trend graph (web parity of the native `TemperatureGraph`) — a thin
 * wrapper over the shared web `LineChart` that adds a titled card, min/max
 * annotations, and optional x-axis labels. The line color is a semantic token
 * key (default `primary`); the chart itself is token-bound and handles the
 * empty/flat/single-point cases. Renders a muted empty state when `data` is
 * empty. All colors come from the `--xen-*` tokens via Tailwind classes.
 */
export const TemperatureGraph = React.forwardRef<HTMLDivElement, TemperatureGraphProps>(
  function TemperatureGraph(
    {
      data,
      labels,
      unit = '°',
      title = 'Temperature',
      color = 'primary',
      height = 160,
      width = 300,
      emptyLabel = 'No temperature data',
      className,
      ...rest
    },
    ref
  ) {
    if (data.length === 0) {
      return (
        <Card ref={ref} className={className} {...rest}>
          <p className="text-base font-bold text-on-surface">{title}</p>
          <p className="mt-2 text-sm text-muted">{emptyLabel}</p>
        </Card>
      );
    }

    const min = Math.min(...data);
    const max = Math.max(...data);

    return (
      <Card ref={ref} className={className} {...rest}>
        <div className="mb-2 flex flex-row items-center justify-between">
          <span className="text-base font-bold text-on-surface">{title}</span>
          <span className="text-xs text-muted">
            H {max}
            {unit} · L {min}
            {unit}
          </span>
        </div>

        <LineChart
          data={data}
          color={color}
          height={height}
          width={width}
          showDots
          aria-label={`Temperature graph, high ${max}${unit}, low ${min}${unit}, ${data.length} points`}
        />

        {labels && labels.length > 0 ? (
          <div className="mt-1 flex flex-row justify-between">
            {labels.map((label, index) => (
              <span key={`${label}-${index}`} className={cn('text-xs text-muted')}>
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </Card>
    );
  }
);
