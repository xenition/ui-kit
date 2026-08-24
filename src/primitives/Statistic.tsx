import * as React from 'react';
import { cn } from './cn';

export type StatisticTrend = 'up' | 'down' | 'flat';

export interface StatisticProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small caption above the value. */
  label: React.ReactNode;
  /** The headline number/string. */
  value: React.ReactNode;
  /** Optional change indicator shown beside the value. */
  delta?: string | number;
  /**
   * Tone/arrow for `delta`. Omit to infer from a numeric `delta`
   * (positive → up/success, negative → down/danger, 0 → flat/muted).
   */
  trend?: StatisticTrend;
  /** Optional unit/suffix rendered muted after the value (e.g. `%`, `MB`). */
  suffix?: React.ReactNode;
}

function inferTrend(delta: string | number | undefined): StatisticTrend {
  if (typeof delta === 'number') {
    if (delta > 0) return 'up';
    if (delta < 0) return 'down';
  }
  return 'flat';
}

const TREND_CLASS: Record<StatisticTrend, string> = {
  up: 'text-success',
  down: 'text-danger',
  flat: 'text-muted',
};

const TREND_ARROW: Record<StatisticTrend, string> = {
  up: '▲',
  down: '▼',
  flat: '→',
};

/**
 * Web parity of the native `Statistic`: a compact inline metric — caption label,
 * a large value, and an optional up/down/flat delta. Renders bare (not a card) so
 * it can sit in rows, headers, or grids. All colors/sizes come from the `--xen-*`
 * tokens via Tailwind classes — no literal colors.
 */
export const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>(function Statistic(
  { className, label, value, delta, trend, suffix, ...rest },
  ref
) {
  const resolvedTrend = trend ?? inferTrend(delta);
  return (
    <div ref={ref} className={cn('inline-flex flex-col gap-0.5', className)} {...rest}>
      <span className="text-sm text-muted">{label}</span>
      <span className="flex items-end gap-1">
        <span className="text-3xl font-bold leading-none text-on-surface">{value}</span>
        {suffix != null ? <span className="pb-0.5 text-base text-muted">{suffix}</span> : null}
      </span>
      {delta != null ? (
        <span className={cn('flex items-center gap-1 text-sm font-semibold', TREND_CLASS[resolvedTrend])}>
          <span aria-hidden="true" className="text-xs">
            {TREND_ARROW[resolvedTrend]}
          </span>
          {String(delta)}
        </span>
      ) : null}
    </div>
  );
});
