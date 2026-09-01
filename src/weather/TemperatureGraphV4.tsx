import * as React from 'react';
import { cn } from '../primitives/cn';
import { LineChart, type ChartColor } from '../charts';
import type { TemperatureGraphProps } from './TemperatureGraph';

/** Drop-in for {@link TemperatureGraphProps} — same props, a different design. */
export type TemperatureGraphV4Props = TemperatureGraphProps;

/**
 * TemperatureGraph — **on a brand ground** design (v4), web parity of the native
 * `TemperatureGraphV4`. The shared web `LineChart` over a full `primary`-colored
 * panel, with the title and min/max annotation in `on-primary` and x-axis labels
 * in `primary-100` — the weather-app "chance of rain" look. The curve defaults to
 * the `accent` token so it reads on the brand ground (overridable via `color`);
 * all colors come from `--xen-*` classes / vars, no literals. Renders a muted
 * note when `data` is empty. Same props as {@link TemperatureGraphProps}.
 */
export const TemperatureGraphV4 = React.forwardRef<HTMLDivElement, TemperatureGraphV4Props>(
  function TemperatureGraphV4(
    {
      data,
      labels,
      unit = '°',
      title = 'Temperature',
      color = 'accent' as ChartColor,
      height = 160,
      width = 300,
      emptyLabel = 'No temperature data',
      className,
      ...rest
    },
    ref
  ) {
    const ground = 'rounded-[var(--xen-radius-lg)] bg-gradient-to-b from-primary-400 to-primary-700 p-5';

    if (data.length === 0) {
      return (
        <div ref={ref} className={cn(ground, className)} {...rest}>
          <p className="text-base font-bold text-on-primary">{title}</p>
          <p className="mt-2 text-sm text-primary-100">{emptyLabel}</p>
        </div>
      );
    }

    const min = Math.min(...data);
    const max = Math.max(...data);

    return (
      <div ref={ref} className={cn(ground, className)} {...rest}>
        <div className="mb-2 flex flex-row items-center justify-between">
          <span className="text-base font-bold text-on-primary">{title}</span>
          <span className="text-xs text-primary-100">
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
              <span key={`${label}-${index}`} className="text-xs text-primary-100">
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
