import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChartColor } from './internal';
import { Sparkline } from './Sparkline';

export interface TrendCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metric label, e.g. "Revenue". */
  label: string;
  /** Primary stat value shown large. */
  value: string | number;
  /** Optional delta caption, e.g. "+12%". */
  delta?: string;
  /** Trend series rendered as an inline sparkline. */
  data?: number[];
  /** Theme color token for the sparkline + delta accent. */
  color?: ChartColor;
}

/**
 * A labelled stat paired with an inline {@link Sparkline}. Token-bound surface:
 * `bg-surface` / `border-border` container, `text-muted` label, `text-on-surface`
 * value, and the delta tinted by the chosen color token. No literal colors.
 */
export const TrendCard = React.forwardRef<HTMLDivElement, TrendCardProps>(function TrendCard(
  { label, value, delta, data, color = 'primary', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${label}, ${value}${delta ? `, ${delta}` : ''}`}
      className={cn(
        'bg-surface text-on-surface border border-border shadow-sm',
        'rounded-[var(--xen-radius-lg)] p-[var(--xen-space-md)] flex flex-col gap-2',
        className
      )}
      {...rest}
    >
      <span className="text-muted text-sm">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-on-surface text-2xl font-bold">{value}</span>
        {delta ? (
          <span className="text-sm font-semibold" style={{ color: `var(--xen-${color})` }}>
            {delta}
          </span>
        ) : null}
      </div>
      {data && data.length > 0 ? <Sparkline data={data} color={color} height={28} width={120} /> : null}
    </div>
  );
});
