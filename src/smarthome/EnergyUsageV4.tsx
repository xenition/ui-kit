import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { BarChart } from '../charts/BarChart';
import type { ChartColor } from '../charts/internal';
import type { EnergyUsageProps } from './EnergyUsage';

/** Drop-in for {@link EnergyUsageProps} — same props, the V4 "ambient" design. */
export type EnergyUsageV4Props = EnergyUsageProps;

/**
 * Trend of a usage series — compares the first vs last samples. For **usage**,
 * rising is bad: `up`→danger, `down`→success, `flat`→muted. Returned meaning is
 * always carried by an arrow glyph + label, never color alone.
 */
function usageTrend(data: number[]): { glyph: string; label: string; color: 'danger' | 'success' | 'muted' } | null {
  if (data.length < 2) return null;
  const first = data[0]!;
  const last = data[data.length - 1]!;
  if (last > first) return { glyph: '↑', label: 'Up', color: 'danger' };
  if (last < first) return { glyph: '↓', label: 'Down', color: 'success' };
  return { glyph: '→', label: 'Flat', color: 'muted' };
}

const TREND_TEXT: Record<'danger' | 'success' | 'muted', string> = {
  danger: 'text-danger',
  success: 'text-success',
  muted: 'text-muted',
};

/**
 * EnergyUsage — **V4** "ambient" design (web parity of the native V4). The calm
 * take on an energy panel: a **big kWh/cost numeral** leads, a **trend
 * indicator** reads the series (rising usage → danger, falling → success, by
 * arrow + label so it is legible without color), a soft breakdown
 * {@link BarChart} keeps the base's per-period data, and the `title` sits as the
 * period caption. When `data` is empty the card shows a muted "No usage data
 * yet" line instead of an axis. Same props/behavior as {@link EnergyUsageProps};
 * all colors from `--xen-*` token classes (no literals).
 */
export const EnergyUsageV4 = React.forwardRef<HTMLDivElement, EnergyUsageV4Props>(function EnergyUsageV4(
  { data, labels, title = 'Energy usage', total, unit, color = 'primary', height = 120, className, style, ...rest },
  ref
) {
  const hasData = data.length > 0;
  const barColor: ChartColor = color === 'accent' ? 'primary' : color;
  const trend = usageTrend(data);

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-sm',
        className
      )}
      {...rest}
    >
      <div className="flex items-start gap-[var(--xen-space-sm)]">
        {/* Ambient accent disc. */}
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border border-primary/40 bg-primary/[0.12]">
          <Icon glyph="⚡" color="primary" size="lg" />
        </span>
        <div className="min-w-0 flex-1">
          {total != null ? (
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-3xl font-extrabold leading-none text-on-surface">{String(total)}</span>
              {unit != null ? <span className="text-base text-muted">{unit}</span> : null}
            </div>
          ) : null}
          <p className="mt-[var(--xen-space-xs)] truncate text-xs text-muted">{title}</p>
        </div>
        {trend != null ? (
          <span
            className={cn('inline-flex shrink-0 items-center gap-1 text-sm font-semibold', TREND_TEXT[trend.color])}
            aria-label={`Trend ${trend.label}`}
          >
            <span aria-hidden>{trend.glyph}</span>
            {trend.label}
          </span>
        ) : null}
      </div>

      <div className="mt-[var(--xen-space-md)]">
        {hasData ? (
          <BarChart data={data} labels={labels} height={height} color={barColor} aria-label={`${title}, ${data.length} periods`} />
        ) : (
          <p className="text-sm text-muted">No usage data yet</p>
        )}
      </div>
    </div>
  );
});
