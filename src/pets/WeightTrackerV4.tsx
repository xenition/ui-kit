import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { Sparkline } from '../charts';
import type { ChartColor } from '../charts';
import { SLOT_TEXT, type PetSlot } from './_tokens';
import type { WeightTrackerProps, WeightStatus } from './WeightTracker';

/** Drop-in for {@link WeightTrackerProps} — same props, the V4 "companion" design. */
export type WeightTrackerV4Props = WeightTrackerProps;

/** Per-status label / glyph / token color — a labelled chip, never color alone. */
const STATUS_META: Record<WeightStatus, { label: string; glyph: string; tone: PetSlot }> = {
  ideal: { label: 'Ideal weight', glyph: '✓', tone: 'success' },
  under: { label: 'Underweight', glyph: '▼', tone: 'warn' },
  over: { label: 'Overweight', glyph: '▲', tone: 'danger' },
};

function classify(current: number, range?: [number, number]): WeightStatus | undefined {
  if (!range) return undefined;
  const min = range[0] ?? 0;
  const max = range[1] ?? 0;
  if (current < min) return 'under';
  if (current > max) return 'over';
  return 'ideal';
}

/**
 * WeightTracker — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a pet weight tracker: an elevated rounded card with a
 * soft shadow, a big legible current reading with its unit, a change delta (tone
 * follows the ideal range, not the sign — vets track both directions), a status
 * carried in a soft-tinted labelled chip with a glyph (never color alone), and the
 * charts {@link Sparkline} of recent history (kept token-fed and unchanged from
 * the base). Same props/behavior as {@link WeightTrackerProps}: `status` (ideal /
 * under / over) resolves from `idealRange` when omitted; renders a shared empty
 * state when there is no reading. All colors from `--xen-*` token classes.
 */
export const WeightTrackerV4 = React.forwardRef<HTMLDivElement, WeightTrackerV4Props>(function WeightTrackerV4(
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
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between">
        {/* Big legible central value. */}
        <div className="flex items-end gap-[var(--xen-space-xs)]">
          <span className="text-3xl font-bold text-on-surface">{current}</span>
          <span className="mb-[var(--xen-space-xs)] text-base text-muted">{unit}</span>
        </div>
        {statusMeta ? (
          // Status as a soft-tinted labelled chip + glyph (never color alone).
          <span
            className={cn(
              'inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold',
              SLOT_TEXT[statusMeta.tone as PetSlot]
            )}
          >
            <span aria-hidden="true">{statusMeta.glyph}</span>
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
