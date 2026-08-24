import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Progress } from '../primitives';
import type { ProgressTone } from '../primitives';
import { EmptyState } from '../commerce';

export interface ScreenTimeBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Minutes (or `unit`s) used so far. */
  used: number;
  /** Daily limit. `<= 0` renders a "no limit set" state. */
  limit: number;
  /** Unit suffix for the readout. */
  unit?: string;
  /** Section label. */
  label?: string;
  /** Loading placeholder state. */
  loading?: boolean;
  /** Copy shown when no limit is configured. */
  emptyLabel?: string;
}

function fmtMinutes(mins: number, unit: string): string {
  if (unit !== 'min') return `${mins} ${unit}`;
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/**
 * Screen-time usage against a daily limit: a labelled readout plus a progress
 * bar that shifts tone as usage climbs (primary → warn near the cap → danger
 * once over). The over/near state is conveyed in the readout text + a11y label,
 * not by color alone. Renders the shared {@link EmptyState} when `limit <= 0`.
 * Token-bound throughout — no literal colors.
 */
export const ScreenTimeBar = React.forwardRef<HTMLDivElement, ScreenTimeBarProps>(
  function ScreenTimeBar(
    { used, limit, unit = 'min', label = 'Screen time', loading = false, emptyLabel = 'No screen-time limit set', className, ...rest },
    ref
  ) {
    if (loading) {
      return (
        <Card ref={ref} data-xen-screen-time-bar="" aria-label="Loading screen time" className={className} {...rest}>
          <div className="space-y-2">
            <div className="h-3 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
            <div className="h-2.5 w-full animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          </div>
        </Card>
      );
    }

    if (!(limit > 0)) {
      return (
        <EmptyState
          ref={ref}
          data-xen-screen-time-bar=""
          aria-label={emptyLabel}
          className={className}
          icon={<span className="text-3xl">⏱️</span>}
          title={label}
          description={emptyLabel}
          {...rest}
        />
      );
    }

    const safeUsed = Math.max(0, used);
    const pct = (safeUsed / limit) * 100;
    const over = safeUsed > limit;
    const near = !over && pct >= 80;
    const tone: ProgressTone = over ? 'danger' : near ? 'warn' : 'primary';
    const readoutColor = over ? 'text-danger' : near ? 'text-warn' : 'text-on-surface';

    const stateNote = over
      ? `over by ${fmtMinutes(safeUsed - limit, unit)}`
      : `${fmtMinutes(Math.max(0, limit - safeUsed), unit)} left`;

    return (
      <Card
        ref={ref}
        data-xen-screen-time-bar=""
        aria-label={`${label}, ${fmtMinutes(safeUsed, unit)} of ${fmtMinutes(limit, unit)}, ${stateNote}`}
        className={className}
        {...rest}
      >
        <div className="flex items-baseline justify-between">
          <span className="text-base font-bold text-on-surface">{label}</span>
          <span className={cn('text-sm font-bold', readoutColor)}>
            {fmtMinutes(safeUsed, unit)} / {fmtMinutes(limit, unit)}
          </span>
        </div>
        <div className="mt-2">
          <Progress value={safeUsed} max={limit} tone={tone} />
        </div>
        <p className={cn('mt-1 text-xs', over ? 'font-bold text-danger' : 'text-muted')}>
          {over ? `⚠️ ${stateNote}` : stateNote}
        </p>
      </Card>
    );
  }
);
