import * as React from 'react';
import { cn } from '../primitives/cn';
import { clampPct } from './internal';
import type { LoadPlanBarProps, LoadSegment } from './LoadPlanBar';

/** Drop-in for {@link LoadPlanBarProps} — same props, the V4 "dispatch" design. */
export type LoadPlanBarV4Props = LoadPlanBarProps;

/**
 * LoadPlanBar — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a trailer/container load plan: an elevated
 * rounded card with a soft shadow holding a caption row with a big legible
 * **tabular-nums** utilization figure, and a thick stacked capacity bar. Pass
 * `segments` (each a token-ramp slice) or a single `utilization`; the bar fills
 * proportionally and flips to a warn ramp past `warnAt`. Utilization is announced
 * via the `progressbar` role + `aria-valuenow` and echoed in the figure, so
 * fullness is never color-only. Identical props/behavior to
 * {@link LoadPlanBarProps}. Every fill is a token ramp class — no literals.
 */
export const LoadPlanBarV4 = React.forwardRef<HTMLDivElement, LoadPlanBarV4Props>(function LoadPlanBarV4(
  { segments, utilization, caption, warnAt = 90, loading = false, className, ...rest },
  ref
) {
  const list = Array.isArray(segments) ? segments : [];
  const total = list.length
    ? clampPct(list.reduce((sum, s) => sum + clampPct(s.pct), 0))
    : clampPct(utilization);
  const over = total >= clampPct(warnAt);
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

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
      data-xen-load-plan-bar=""
      className={cn(shell, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]', className)}
      {...rest}
    >
      <div className="flex items-end justify-between gap-[var(--xen-space-sm)]">
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-muted">{caption ?? 'Load plan'}</span>
        <span className={cn('text-2xl font-bold tabular-nums', over ? 'text-accent' : 'text-on-surface')}>
          {`${total}%`}
        </span>
      </div>

      <div className="flex h-4 overflow-hidden rounded-full bg-neutral-100">
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

      {over ? (
        <span className="inline-flex w-fit items-center gap-[var(--xen-space-xs)] rounded-full bg-accent/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold text-accent">
          <span aria-hidden="true">⚠</span> Near capacity
        </span>
      ) : null}
    </div>
  );
});
