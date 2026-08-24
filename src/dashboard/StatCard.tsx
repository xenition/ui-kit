import * as React from 'react';
import { cn } from '../primitives/cn';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metric name, e.g. "Monthly revenue". */
  label: string;
  /** The dominant value, e.g. "$12.4k" or 128. */
  value: React.ReactNode;
  /** Optional change readout, e.g. "+12%". */
  delta?: string;
  /** Direction of `delta`; drives the success/danger tone. */
  trend?: 'up' | 'down';
  /** Optional leading icon/illustration slot. */
  icon?: React.ReactNode;
}

/**
 * A single at-a-glance metric card. The `value` is the dominant element; the
 * `delta` reads in a success (up) or danger (down) tone. Token-only; the web
 * mirror of a dashboard stat tile every admin screen otherwise hand-rolls.
 */
export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, delta, trend, icon, className, ...rest },
  ref
) {
  const deltaTone =
    trend === 'down' ? 'text-danger' : trend === 'up' ? 'text-success' : 'text-muted';
  return (
    <div
      ref={ref}
      aria-label={`${label}: ${String(value)}${delta ? `, ${delta}` : ''}`}
      className={cn(
        'flex flex-col gap-xs bg-surface text-on-surface border border-border',
        'rounded-[var(--xen-radius-lg)] p-lg',
        className
      )}
      {...rest}
    >
      <div className="flex items-center justify-between gap-sm">
        <span className="truncate text-sm text-muted">{label}</span>
        {icon ? <span className="shrink-0">{icon}</span> : null}
      </div>
      <span className="text-2xl font-bold text-on-surface">{value}</span>
      {delta ? (
        <span className={cn('text-sm font-semibold', deltaTone)}>
          {trend === 'up' ? '▲ ' : trend === 'down' ? '▼ ' : ''}
          {delta}
        </span>
      ) : null}
    </div>
  );
});
