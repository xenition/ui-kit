import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import type { StatisticTrend } from '../primitives/Statistic';
import type { QueueStatProps, QueueStatTone } from './QueueStat';

/** Drop-in for {@link QueueStatProps} — same props, the V4 "calm console" design. */
export type QueueStatV4Props = QueueStatProps;

// Chip tone → soft-tint token utility classes (background + on-tone text).
// Token-only; the calm line keeps a single soft tint, never a saturated fill.
const CHIP_CLASS: Record<QueueStatTone, string> = {
  neutral: 'bg-muted/10 text-muted',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warn: 'bg-warn/10 text-warn',
  danger: 'bg-danger/10 text-danger',
};

function inferTrend(delta: string | number | undefined): StatisticTrend {
  if (typeof delta === 'number') {
    if (delta > 0) return 'up';
    if (delta < 0) return 'down';
  }
  return 'flat';
}

// Delta tone → token color + glyph. up → success, down → danger, flat → muted —
// mirrors the base `Statistic` mapping so tone stays consistent.
const TREND_CLASS: Record<StatisticTrend, string> = {
  up: 'text-success',
  down: 'text-danger',
  flat: 'text-muted',
};

const TREND_ARROW: Record<StatisticTrend, string> = {
  up: '▲',
  down: '▼',
  flat: '→',
};

/**
 * QueueStat — **V4** "calm console" design (web parity of the native V4). A clean
 * KPI tile: a muted caption, a **big** value numeral (`text-3xl`, weight 800),
 * an optional unit suffix, and an optional delta indicator colored by tone
 * (up→success / down→danger / flat→muted, per the base) with a matching glyph.
 * An optional leading glyph sits in a soft-tint chip whose tone follows the
 * base's `tone` mapping. Same props/behavior as {@link QueueStatProps}; all
 * colors from `--xen-*` token classes (no literal hex). Supports a `loading`
 * placeholder and an optional card surface.
 */
export const QueueStatV4 = React.forwardRef<HTMLDivElement, QueueStatV4Props>(function QueueStatV4(
  { label, value, delta, trend, suffix, tone = 'neutral', glyph, loading = false, card = true, className, ...rest },
  ref
) {
  const resolvedTrend = trend ?? inferTrend(delta);

  const inner = loading ? (
    <div aria-label="Loading metric" aria-busy="true" className="flex animate-pulse flex-col gap-1.5">
      <span className="h-2.5 w-1/2 rounded bg-on-surface/10" />
      <span className="h-8 w-[35%] rounded bg-on-surface/10" />
    </div>
  ) : (
    <div className="flex items-center gap-3">
      {glyph ? (
        <span
          aria-hidden="true"
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-xl',
            CHIP_CLASS[tone] ?? CHIP_CLASS.neutral
          )}
        >
          {glyph}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm text-muted">{label}</span>
        <span className="flex items-end gap-1">
          <span className="text-3xl font-extrabold leading-none text-on-surface">{value}</span>
          {suffix != null ? <span className="pb-0.5 text-base text-muted">{suffix}</span> : null}
        </span>
        {delta != null ? (
          <span className={cn('flex items-center gap-1 text-sm font-semibold', TREND_CLASS[resolvedTrend])}>
            <span aria-hidden="true" className="text-xs">
              {TREND_ARROW[resolvedTrend]}
            </span>
            {String(delta)}
          </span>
        ) : null}
      </div>
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
    <Card
      ref={ref}
      aria-label={`${label}: ${String(value)}`}
      className={cn('rounded-[var(--xen-radius-lg)] p-[var(--xen-space-md)] shadow-sm', className)}
      {...rest}
    >
      {inner}
    </Card>
  );
});
