import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

export interface WeeklyReviewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tasks completed this week — the big near-white headline numeral. */
  completed: number;
  /** Current streak length in days; rendered as a frosted flame tile. */
  streakDays?: number;
  /**
   * Per-day completions for the 7-bar mini chart. Each bar's height scales to the
   * week's max; heights read in near-white opacity steps.
   */
  perDay?: readonly { label: string; count: number }[];
  /** Optional focused-hours label (e.g. "12h 30m"); rendered as a frosted tile. */
  focusHours?: string;
  /** Fires on the "Share" action. Hidden when unset. */
  onShare?: () => void;
}

/**
 * WeeklyReview — the weekly stats / streak hero for the productivity V4 "flow"
 * line. A brand-gradient panel that closes the week: a big near-white
 * **completed** numeral, a 7-bar mini chart of per-day completions (bars in
 * near-white opacity steps), a streak flame tile, an optional focus-hours tile,
 * and an optional "Share" CTA. Presentational — shaped data + a callback, nothing
 * fetches. Every color derives from the brand ramp via `--xen-*` token classes
 * and gradient utilities — no literals, light + dark.
 */
export const WeeklyReview = React.forwardRef<HTMLDivElement, WeeklyReviewProps>(
  function WeeklyReview(
    { completed, streakDays, perDay, focusHours, onShare, className, ...rest },
    ref
  ) {
    const total = Math.max(0, Math.trunc(completed || 0));
    const bars = perDay ?? [];
    const max = bars.reduce((m, d) => Math.max(m, d.count), 0);

    const Tile = ({ glyph, label, value }: { glyph: string; label: string; value: string }) => (
      <div className="flex min-w-0 flex-1 items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
        <Icon glyph={glyph} size="lg" aria-hidden />
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-primary-50">{value}</p>
          <p className="text-xs font-semibold text-primary-100">{label}</p>
        </div>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]',
          className
        )}
        {...rest}
      >
        <div className="flex items-start justify-between gap-[var(--xen-space-md)]">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary-100">This week</p>
            <p
              aria-label={`${total} tasks completed this week`}
              className="text-4xl font-extrabold tracking-tight text-primary-50"
            >
              {total}
            </p>
            <p className="text-base font-semibold text-primary-100">
              {total === 1 ? 'task completed' : 'tasks completed'}
            </p>
          </div>
          {onShare ? (
            <button
              type="button"
              aria-label="Share weekly review"
              onClick={onShare}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              <Icon glyph="↗" size="lg" aria-hidden />
            </button>
          ) : null}
        </div>

        {bars.length > 0 ? (
          <div
            role="img"
            aria-label={`Completed per day: ${bars.map((d) => `${d.label} ${d.count}`).join(', ')}`}
            className="flex items-end gap-[var(--xen-space-sm)]"
            style={{ height: 96 }}
          >
            {bars.map((d, i) => {
              const ratio = max > 0 ? d.count / max : 0;
              // Near-white opacity steps: taller bars read brighter.
              const opacityClass =
                ratio >= 0.75
                  ? 'bg-primary-50/90'
                  : ratio >= 0.5
                    ? 'bg-primary-50/70'
                    : ratio >= 0.25
                      ? 'bg-primary-50/50'
                      : 'bg-primary-50/30';
              return (
                <div key={`${d.label}-${i}`} className="flex min-w-0 flex-1 flex-col items-center gap-[var(--xen-space-xs)]">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className={cn('w-full rounded-[var(--xen-radius-sm)]', opacityClass)}
                      style={{ height: `${Math.max(6, ratio * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-primary-100">{d.label}</span>
                </div>
              );
            })}
          </div>
        ) : null}

        {streakDays != null || focusHours ? (
          <div className="flex gap-[var(--xen-space-sm)]">
            {streakDays != null ? (
              <Tile glyph="🔥" label="Day streak" value={String(Math.max(0, Math.trunc(streakDays)))} />
            ) : null}
            {focusHours ? <Tile glyph="⏱️" label="Focus time" value={focusHours} /> : null}
          </div>
        ) : null}
      </div>
    );
  }
);
