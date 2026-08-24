import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { Sparkline } from '../charts';
import type { ChartColor } from '../charts';
import { SLOT_BORDER, SLOT_TEXT, type PetSlot } from './_tokens';

export type WeightStatus = 'ideal' | 'under' | 'over';

const STATUS_META: Record<WeightStatus, { label: string; tone: PetSlot }> = {
  ideal: { label: 'Ideal weight', tone: 'success' },
  under: { label: 'Underweight', tone: 'warn' },
  over: { label: 'Overweight', tone: 'danger' },
};

export interface WeightTrackerProps {
  /** Latest weight reading. */
  current: number;
  /** Unit label, e.g. "kg" or "lb". */
  unit?: string;
  /** Change vs. previous reading (same unit). */
  delta?: number;
  /** Recent readings, oldest → newest, for the trend line. */
  history?: number[];
  /** Ideal range `[min, max]` in the same unit; drives the status classification. */
  idealRange?: [number, number];
  /** Explicit status override; computed from `idealRange` otherwise. */
  status?: WeightStatus;
  /** Copy when there is no reading yet. */
  emptyLabel?: string;
  /** Extra classes on the root. */
  className?: string;
}

function classify(current: number, range?: [number, number]): WeightStatus | undefined {
  if (!range) return undefined;
  const min = range[0] ?? 0;
  const max = range[1] ?? 0;
  if (current < min) return 'under';
  if (current > max) return 'over';
  return 'ideal';
}

/**
 * A pet weight tracker: the current reading with unit, a change delta (the delta
 * tone follows the ideal range, not the sign — vets track both directions), a
 * status chip vs. the ideal band, and a {@link Sparkline} of recent history.
 * Renders a shared empty state when there is no reading. Status reads via a
 * labelled chip (not color alone). Token-only colors.
 */
export const WeightTracker = React.forwardRef<HTMLDivElement, WeightTrackerProps>(function WeightTracker(
  { current, unit = 'kg', delta, history, idealRange, status, emptyLabel = 'No weight logged yet', className },
  ref
) {
  const safeHistory = history ?? [];

  if (current == null || Number.isNaN(current)) {
    return (
      <EmptyState
        ref={ref}
        aria-label={emptyLabel}
        icon={<span className="text-2xl">⚖️</span>}
        title="Weight"
        description={emptyLabel}
        className={className}
      />
    );
  }

  const resolvedStatus = status ?? classify(current, idealRange);
  const statusMeta = resolvedStatus ? STATUS_META[resolvedStatus] : undefined;
  const trendColor: ChartColor = statusMeta?.tone ?? 'primary';
  const deltaClass = delta == null || delta === 0 ? 'text-muted' : 'text-on-surface';

  return (
    <div
      ref={ref}
      aria-label={`Weight ${current} ${unit}${statusMeta ? `, ${statusMeta.label}` : ''}`}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
        className
      )}
    >
      <div className="flex items-end justify-between">
        <div className="flex items-end gap-[var(--xen-space-xs)]">
          <span className="text-3xl font-bold text-on-surface">{current}</span>
          <span className="mb-[var(--xen-space-xs)] text-base text-muted">{unit}</span>
        </div>
        {statusMeta ? (
          <span className={cn('self-start rounded-full border bg-transparent px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold', SLOT_BORDER[statusMeta.tone], SLOT_TEXT[statusMeta.tone])}>
            {statusMeta.label}
          </span>
        ) : null}
      </div>

      {delta != null ? (
        <p className={cn('text-sm font-semibold', deltaClass)}>
          {delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : ''}
          {Math.abs(delta)} {unit} since last
        </p>
      ) : null}

      {idealRange ? (
        <p className="text-xs text-muted">
          Ideal range {idealRange[0] ?? 0}–{idealRange[1] ?? 0} {unit}
        </p>
      ) : null}

      {safeHistory.length > 0 ? (
        <Sparkline data={safeHistory} color={trendColor} width={220} aria-label={`Weight trend over ${safeHistory.length} readings`} />
      ) : null}
    </div>
  );
});
