import * as React from 'react';
import { Card, Icon } from '../primitives';
import type { IconColor } from '../primitives';
import { BarChart, LineChart } from '../charts';
import type { ChartColor } from '../charts';

/** Which shared chart to render. */
export type YieldChartVariant = 'bars' | 'line';

export interface YieldChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Yield samples per period (e.g. t/ha per season). Empty → muted note. */
  data: number[];
  /** Labels under each period (bars only). Passed through; guarded per bar. */
  labels?: string[];
  /** Card title. Default "Yield". */
  title?: string;
  /** Pre-formatted headline figure (e.g. "4.8 t/ha"). */
  headline?: string;
  /** Unit suffix for the headline (e.g. "avg"). */
  unit?: string;
  /** Which shared chart to reuse. Default `'bars'`. */
  variant?: YieldChartVariant;
  /** Series color token. Default `'success'`. */
  color?: ChartColor;
  /** Plot height in px. Default 140. */
  height?: number;
}

/** Chart color tokens that also map to an `Icon` color slot (all but `accent`). */
const ICON_COLOR: Record<ChartColor, IconColor> = {
  primary: 'primary',
  accent: 'primary',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
  muted: 'muted',
};

/**
 * A yield visualization — a titled {@link Card} that reuses the shared
 * {@link BarChart} (`variant='bars'`) or {@link LineChart} (`variant='line'`);
 * no new chart code. The header carries an optional `headline` + `unit`. An
 * empty `data` array renders a muted "No yield data yet" note instead of an
 * axis. Series color keys off a {@link ChartColor} token. Token-bound
 * throughout — no literal colors.
 */
export const YieldChart = React.forwardRef<HTMLDivElement, YieldChartProps>(function YieldChart(
  {
    data,
    labels,
    title = 'Yield',
    headline,
    unit,
    variant = 'bars',
    color = 'success',
    height = 140,
    className,
    ...rest
  },
  ref
) {
  const series = Array.isArray(data) ? data : [];
  const hasData = series.length > 0;

  return (
    <Card ref={ref} data-xen-yield-chart="" className={className} {...rest}>
      <div className="flex items-center gap-1">
        <Icon glyph="📈" color={ICON_COLOR[color]} size="base" />
        <span className="flex-1 text-base font-semibold text-on-surface">{title}</span>
      </div>

      {headline != null ? (
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-heading text-2xl font-bold text-on-surface">{headline}</span>
          {unit != null ? <span className="text-sm text-muted">{unit}</span> : null}
        </div>
      ) : null}

      <div className="mt-3">
        {hasData ? (
          variant === 'line' ? (
            <LineChart
              data={series}
              height={height}
              color={color}
              showDots
              aria-label={`${title}, ${series.length} periods`}
            />
          ) : (
            <BarChart
              data={series}
              labels={labels}
              height={height}
              color={color}
              aria-label={`${title}, ${series.length} periods`}
            />
          )
        ) : (
          <p className="text-sm text-muted">No yield data yet</p>
        )}
      </div>
    </Card>
  );
});
