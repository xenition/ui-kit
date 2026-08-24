import * as React from 'react';
import { cn } from '../primitives/cn';
import { clampPct } from './internal';

export interface LoadSegment {
  /** Stable key. */
  id: string;
  /** Short label for the segment (e.g. a stop, a pallet group). */
  label?: string;
  /** Portion of total capacity this segment occupies, 0–100. */
  pct: number;
  /** Ramp emphasis for the segment fill (all token-derived). */
  emphasis?: 'strong' | 'medium' | 'soft';
}

export interface LoadPlanBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Capacity segments, drawn left→right; total is clamped to 100%. */
  segments?: LoadSegment[];
  /** When no segments are given, a single utilization percentage 0–100. */
  utilization?: number;
  /** Capacity caption (e.g. `18 / 24 pallets`). */
  caption?: string;
  /** Warn styling once utilization crosses this threshold (default 90). */
  warnAt?: number;
  /** Muted placeholder while the plan is computing. */
  loading?: boolean;
}

/**
 * A stacked capacity/utilization bar for trailer or container load planning.
 * Either pass `segments` (each a token-ramp slice) or a single `utilization`
 * value; the bar fills proportionally and flips to a warn ramp past `warnAt`.
 * Utilization is announced via the `progressbar` role + `aria-valuenow` and
 * echoed in the caption, so fullness is never color-only. No literal colors —
 * every fill is a token ramp class. Web parity of the native `LoadPlanBar`.
 */
export const LoadPlanBar = React.forwardRef<HTMLDivElement, LoadPlanBarProps>(function LoadPlanBar(
  { segments, utilization, caption, warnAt = 90, loading = false, className, ...rest },
  ref
) {
  const list = Array.isArray(segments) ? segments : [];
  const total = list.length
    ? clampPct(list.reduce((sum, s) => sum + clampPct(s.pct), 0))
    : clampPct(utilization);
  const over = total >= clampPct(warnAt);

  const rampFor = (emphasis: LoadSegment['emphasis']): string => {
    if (over) return 'bg-accent-400';
    if (emphasis === 'soft') return 'bg-primary-200';
    if (emphasis === 'medium') return 'bg-primary-400';
    return 'bg-primary-500';
  };

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={loading ? undefined : 0}
      aria-valuemax={loading ? undefined : 100}
      aria-valuenow={loading ? undefined : total}
      aria-busy={loading ? true : undefined}
      aria-label={loading ? 'Load plan computing' : `Load ${total}% full${over ? ', near capacity' : ''}`}
      className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)}
      {...rest}
    >
      <div className="flex h-3 overflow-hidden rounded-full bg-neutral-100">
        {loading ? (
          <div className="h-full w-[35%] animate-pulse bg-neutral-200" />
        ) : list.length ? (
          list.map((seg, i) => {
            const w = clampPct(seg.pct);
            if (w <= 0) return null;
            return (
              <div
                key={seg.id}
                className={cn('h-full', rampFor(seg.emphasis), i < list.length - 1 && 'border-r border-surface')}
                style={{ width: `${w}%` }}
              />
            );
          })
        ) : (
          <div className={cn('h-full', rampFor('strong'))} style={{ width: `${total}%` }} />
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">{caption ?? ''}</span>
        <span className={cn('text-xs font-bold', over ? 'text-accent' : 'text-on-surface')}>
          {`${total}%${over ? ' · near capacity' : ''}`}
        </span>
      </div>
    </div>
  );
});
