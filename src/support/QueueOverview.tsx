import * as React from 'react';
import { cn } from '../primitives/cn';

/** Accent tone for a stat tile — one primary accent, plus the semantic set. */
export type QueueOverviewTone = 'primary' | 'success' | 'warn' | 'danger' | 'muted';

/** A single queue metric shown as a calm stat tile. */
export interface QueueStatItem {
  /** Muted caption under the value (e.g. "Open tickets"). */
  label: string;
  /** Headline value — a big numeral (number) or preformatted string (e.g. "1.2k", "98%"). */
  value: string | number;
  /** Accent tone for the value + optional delta emphasis. Defaults to `primary`. */
  tone?: QueueOverviewTone;
  /** Signed change vs. the prior period; colored by sign (▲ success / ▼ danger). */
  delta?: number;
}

export interface QueueOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The queue metrics to display, left→right, wrapping on small widths. */
  stats: readonly QueueStatItem[];
  /** Optional section heading above the tile strip. */
  title?: string;
}

// Tone → token utility classes for the big value numeral. Token-only (no hex).
const VALUE_TONE: Record<QueueOverviewTone, string> = {
  primary: 'text-primary',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
  muted: 'text-on-surface',
};

/**
 * QueueOverview — **V4** "calm console" dashboard strip. A responsive
 * row/grid of elevated stat tiles giving a helpdesk queue its at-a-glance vitals
 * ("Open", "Waiting", "Breached SLA", "CSAT"). Each tile is a big value numeral
 * with a muted caption and an optional signed delta colored by sign (▲ up /
 * ▼ down). One accent = primary; other tones swap in a semantic accent. Tiles
 * wrap onto new rows on narrow widths. Presentational only — shaped data in, no
 * fetching. All colors from `--xen-*` token classes (no literal hex).
 * Dark-mode safe.
 */
export const QueueOverview = React.forwardRef<HTMLDivElement, QueueOverviewProps>(
  function QueueOverview({ stats, title, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        aria-label={title ?? 'Queue overview'}
        className={cn('flex flex-col gap-3', className)}
        {...rest}
      >
        {title ? (
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted">{title}</h2>
        ) : null}
        <div className="flex flex-wrap gap-3">
          {stats.map((stat, i) => {
            const tone = stat.tone ?? 'primary';
            const hasDelta = typeof stat.delta === 'number' && Number.isFinite(stat.delta);
            const up = hasDelta && stat.delta! > 0;
            const down = hasDelta && stat.delta! < 0;
            const deltaText = hasDelta
              ? `${up ? '▲' : down ? '▼' : ''} ${Math.abs(stat.delta!)}`.trim()
              : null;
            return (
              <div
                key={`${stat.label}-${i}`}
                aria-label={`${stat.label}: ${String(stat.value)}${
                  deltaText ? `, change ${up ? 'up' : 'down'} ${Math.abs(stat.delta!)}` : ''
                }`}
                className={cn(
                  'flex min-w-[140px] flex-1 flex-col gap-1 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 shadow-sm',
                  tone === 'primary' && 'bg-primary/10'
                )}
              >
                <span className={cn('text-3xl font-bold leading-none', VALUE_TONE[tone] ?? VALUE_TONE.primary)}>
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-muted">{stat.label}</span>
                {deltaText ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'text-xs font-bold',
                      up && 'text-success',
                      down && 'text-danger',
                      !up && !down && 'text-muted'
                    )}
                  >
                    {deltaText}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
