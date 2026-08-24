import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { BarChart } from '../charts/BarChart';
import type { ChartColor } from '../charts/internal';

export interface EnergyUsageProps {
  /** Per-period usage samples (e.g. kWh per day). */
  data: number[];
  /** Labels under each bar (e.g. weekday initials). Indexed defensively by BarChart. */
  labels?: string[];
  /** Card title. Default "Energy usage". */
  title?: string;
  /** Total for the period (pre-formatted or numeric). */
  total?: string | number;
  /** Unit suffix for the total (e.g. "kWh"). */
  unit?: string;
  /** Bar color token. Default `'primary'`. */
  color?: ChartColor;
  /** Plot height in px. Default 120. */
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Energy-usage panel — a titled {@link Card} wrapping the shared inline-SVG
 * {@link BarChart} (no new chart code). The header shows the period total + unit;
 * the chart renders each sample as a `color`-token bar. When `data` is empty the
 * card shows a muted "No usage data yet" line instead of an axis. `labels` are
 * passed straight through (BarChart aligns them per bar). Token-bound throughout.
 */
export const EnergyUsage = React.forwardRef<HTMLDivElement, EnergyUsageProps>(function EnergyUsage(
  { data, labels, title = 'Energy usage', total, unit, color = 'primary', height = 120, className, style },
  ref
) {
  const hasData = data.length > 0;

  return (
    <Card ref={ref} style={style} className={className}>
      <div className="flex items-center gap-[var(--xen-space-xs)]">
        <Icon glyph="⚡" color={color === 'accent' ? 'primary' : color} size="base" />
        <span className="flex-1 text-base font-semibold text-on-surface">{title}</span>
      </div>

      {total != null ? (
        <div className="mt-[var(--xen-space-xs)] flex items-baseline gap-1">
          <span className="font-heading text-2xl font-bold text-on-surface">{String(total)}</span>
          {unit != null ? <span className="text-sm text-muted">{unit}</span> : null}
        </div>
      ) : null}

      <div className="mt-[var(--xen-space-md)]">
        {hasData ? (
          <BarChart data={data} labels={labels} height={height} color={color} aria-label={`${title}, ${data.length} periods`} />
        ) : (
          <p className="text-sm text-muted">No usage data yet</p>
        )}
      </div>
    </Card>
  );
});
