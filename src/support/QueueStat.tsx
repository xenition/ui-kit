import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Statistic, type StatisticTrend } from '../primitives/Statistic';

/** Accent tone for the stat tile's icon chip / emphasis. */
export type QueueStatTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

export interface QueueStatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Caption (e.g. "Open tickets"). */
  label: string;
  /** Headline value (number or preformatted string). */
  value: React.ReactNode;
  /** Optional change indicator (see `Statistic`). */
  delta?: string | number;
  /** Explicit delta trend; otherwise inferred from a numeric delta. */
  trend?: StatisticTrend;
  /** Optional unit suffix (e.g. `%`, `min`). */
  suffix?: React.ReactNode;
  /** Accent tone for the leading glyph chip (default `neutral`). */
  tone?: QueueStatTone;
  /** Optional glyph shown in a tinted chip. */
  glyph?: string;
  /** Render a loading placeholder. */
  loading?: boolean;
  /** Wrap in a card surface (default true). */
  card?: boolean;
}

// Chip tone → token utility classes (background + on-tone text). Token-only.
const CHIP_CLASS: Record<QueueStatTone, string> = {
  neutral: 'bg-neutral-100 text-muted',
  primary: 'bg-primary-50 text-primary',
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
};

/**
 * A single queue KPI tile — a leading tinted glyph chip plus a `Statistic`
 * (caption, big value, optional delta/suffix). Built for helpdesk dashboards
 * ("Open", "Waiting", "Breached SLA", "CSAT"). The chip tone maps to token
 * classes; the delta arrow/tone comes from the underlying `Statistic`. Supports
 * a `loading` placeholder. No literal hex.
 */
export const QueueStat = React.forwardRef<HTMLDivElement, QueueStatProps>(function QueueStat(
  { label, value, delta, trend, suffix, tone = 'neutral', glyph, loading = false, card = true, className, ...rest },
  ref
) {
  const inner = loading ? (
    <div aria-label="Loading metric" aria-busy="true" className="flex animate-pulse flex-col gap-1">
      <span className="h-2.5 w-1/2 rounded bg-neutral-100" />
      <span className="h-7 w-[35%] rounded bg-neutral-100" />
    </div>
  ) : (
    <div className="flex items-center gap-3">
      {glyph ? (
        <span
          aria-hidden="true"
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-lg',
            CHIP_CLASS[tone] ?? CHIP_CLASS.neutral
          )}
        >
          {glyph}
        </span>
      ) : null}
      <Statistic className="flex-1" label={label} value={value} delta={delta} trend={trend} suffix={suffix} />
    </div>
  );

  if (!card) {
    return (
      <div ref={ref} aria-label={`${label}: ${String(value)}`} className={className} {...rest}>
        {inner}
      </div>
    );
  }

  return (
    <Card ref={ref} aria-label={`${label}: ${String(value)}`} className={cn('p-[var(--xen-space-md)]', className)} {...rest}>
      {inner}
    </Card>
  );
});
