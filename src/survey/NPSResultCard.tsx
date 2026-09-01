import * as React from 'react';
import { cn } from '../primitives/cn';
import type { NPSBucket } from './NPSScale';

export interface NPSResultCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The computed Net Promoter Score, `-100`..`100` (clamped for display). */
  score: number;
  /** Total number of responses the score is computed from. */
  responses: number;
  /** Promoter count (a raw response count, not a percentage). */
  promoters: number;
  /** Passive count (a raw response count, not a percentage). */
  passives: number;
  /** Detractor count (a raw response count, not a percentage). */
  detractors: number;
  /** Hero heading over the score. Default `'Net Promoter Score'`. */
  title?: string;
}

/** One breakdown segment keyed by its {@link NPSBucket} + its token bg class. */
type Segment = { key: NPSBucket; label: string; count: number; bar: string; dot: string };

/**
 * NPSResultCard — the survey's NPS **results hero** (V4 "focus" line). The big
 * computed score (`-100`..`100`) sits on a brand gradient ground
 * (`bg-gradient-to-br from-primary-500 to-primary-700`) in near-white ink
 * (`text-primary-50` / `text-primary-100`) with the response count as a frosted
 * caption. Below, a calm surface footer breaks the responses down into three
 * token bars — promoter→success, passive→warn, detractor→danger — each a
 * proportional fill with its raw count, so meaning is never color-only.
 * `promoters` / `passives` / `detractors` are **counts** (not percentages).
 * Presentational only. All colors from `--xen-*` token classes + gradient
 * utilities (no literal colors), dark-mode safe.
 */
export const NPSResultCard = React.forwardRef<HTMLDivElement, NPSResultCardProps>(function NPSResultCard(
  { score, responses, promoters, passives, detractors, title = 'Net Promoter Score', className, ...rest },
  ref
) {
  const clamped = Math.max(-100, Math.min(100, Math.round(score)));
  const displayScore = clamped > 0 ? `+${clamped}` : `${clamped}`;
  const total = Math.max(0, promoters) + Math.max(0, passives) + Math.max(0, detractors);
  const pct = (n: number) => (total > 0 ? Math.round((Math.max(0, n) / total) * 100) : 0);

  const segments: Segment[] = [
    { key: 'promoter', label: 'Promoters', count: promoters, bar: 'bg-success', dot: 'bg-success' },
    { key: 'passive', label: 'Passives', count: passives, bar: 'bg-warn', dot: 'bg-warn' },
    { key: 'detractor', label: 'Detractors', count: detractors, bar: 'bg-danger', dot: 'bg-danger' },
  ];

  return (
    <div
      ref={ref}
      data-xen-nps-result=""
      className={cn(
        'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm',
        className
      )}
      {...rest}
    >
      {/* Brand gradient hero — the computed score in near-white ink. */}
      <div className="flex flex-col items-center bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-100">{title}</p>
        <p
          aria-label={`${title}: ${displayScore}`}
          className="mt-[var(--xen-space-xs)] text-6xl font-extrabold tracking-tight text-primary-50"
        >
          {displayScore}
        </p>
        <span className="mt-[var(--xen-space-sm)] rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-0.5 text-xs font-semibold text-primary-100">
          {responses} {responses === 1 ? 'response' : 'responses'}
        </span>
      </div>

      {/* Calm surface footer — the token breakdown bars. */}
      <div
        role="list"
        aria-label="Response breakdown"
        className="flex flex-col gap-sm p-[var(--xen-space-lg)]"
      >
        {segments.map((s) => (
          <div key={s.key} role="listitem" aria-label={`${s.label}: ${s.count}, ${pct(s.count)}%`} className="flex flex-col gap-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-xs text-sm font-semibold text-on-surface">
                <span aria-hidden="true" className={cn('h-2.5 w-2.5 rounded-full', s.dot)} />
                {s.label}
              </span>
              <span className="text-sm font-bold text-on-surface">
                {Math.max(0, s.count)} · {pct(s.count)}%
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={pct(s.count)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${s.label} share`}
              className="h-2 w-full overflow-hidden rounded-full bg-on-surface/10"
            >
              <div className={cn('h-full rounded-full', s.bar)} style={{ width: `${pct(s.count)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
