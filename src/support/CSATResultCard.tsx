import * as React from 'react';
import { cn } from '../primitives/cn';
import { clamp } from './internal';

export interface CSATResultCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Satisfaction score as a percentage `0–100`; the big near-white numeral. */
  score: number;
  /** Total number of survey responses this score is based on. */
  responses: number;
  /** Count of **positive** ratings (raw response count, not a percentage). */
  positive: number;
  /** Count of **neutral** ratings (raw response count, not a percentage). */
  neutral: number;
  /** Count of **negative** ratings (raw response count, not a percentage). */
  negative: number;
  /** Headline (default `"Customer satisfaction"`). */
  title?: string;
}

/** Breakdown bar rows — positive→success, neutral→warn, negative→danger. */
const BREAKDOWN: readonly { key: 'positive' | 'neutral' | 'negative'; label: string; bar: string }[] = [
  { key: 'positive', label: 'Positive', bar: 'bg-success' },
  { key: 'neutral', label: 'Neutral', bar: 'bg-warn' },
  { key: 'negative', label: 'Negative', bar: 'bg-danger' },
];

/**
 * CSATResultCard — a gradient "console" results hero for a customer-satisfaction
 * score. The title and a big near-white `score%` numeral sit over a
 * `from-primary-500 to-primary-700` ground, above the response count. A
 * positive/neutral/negative breakdown reads as three token bars
 * (success/warn/danger) whose widths are the share of the total raw counts, each
 * on a frosted track (`bg-primary-50/15`). A calm peak-moment surface,
 * dark-mode safe, every color from the brand + semantic ramps (token-only, no
 * literals). Presentational — shaped counts only, nothing fetches.
 */
export const CSATResultCard = React.forwardRef<HTMLDivElement, CSATResultCardProps>(
  function CSATResultCard(
    { score, responses, positive, neutral, negative, title = 'Customer satisfaction', className, ...rest },
    ref
  ) {
    const pct = Math.round(clamp(score, 0, 100));
    const p = Math.max(0, Math.trunc(positive || 0));
    const n = Math.max(0, Math.trunc(neutral || 0));
    const g = Math.max(0, Math.trunc(negative || 0));
    const total = p + n + g;
    const counts: Record<'positive' | 'neutral' | 'negative', number> = {
      positive: p,
      neutral: n,
      negative: g,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]',
          className
        )}
        {...rest}
      >
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          <span className="text-sm font-semibold text-primary-100">{title}</span>
          <span
            aria-label={`${pct} percent satisfaction`}
            className="text-5xl font-extrabold leading-none tracking-tight text-primary-50"
          >
            {pct}
            <span className="text-3xl font-extrabold">%</span>
          </span>
          <span className="text-sm text-primary-100">
            {responses} {responses === 1 ? 'response' : 'responses'}
          </span>
        </div>

        <dl className="flex flex-col gap-[var(--xen-space-sm)]">
          {BREAKDOWN.map(({ key, label, bar }) => {
            const count = counts[key];
            const width = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={key} className="flex items-center gap-[var(--xen-space-md)]">
                <dt className="w-16 shrink-0 text-sm font-semibold text-primary-100">{label}</dt>
                <div
                  role="img"
                  aria-label={`${label} ${count} of ${total}`}
                  className="h-2 flex-1 overflow-hidden rounded-full bg-primary-50/15"
                >
                  <div className={cn('h-full rounded-full', bar)} style={{ width: `${width}%` }} />
                </div>
                <dd className="w-10 shrink-0 text-right text-sm font-bold text-primary-50">{count}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    );
  }
);
