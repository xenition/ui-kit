import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { formatUsage, formatPct, clamp } from './internal/format';
import { utilityKind, type UtilityKind } from './internal/status';

export interface UsageComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Utility line — picks the glyph and the default unit. */
  kind: UtilityKind;
  /** This period's metered quantity. */
  current: number;
  /** The prior period's metered quantity. */
  previous: number;
  /** Unit label; defaults to the kind's meter unit (e.g. "kWh"). */
  unit?: string;
  /** Human label for the comparison window (default "last period"). */
  period?: string;
  /** Fixed decimals for the rendered quantities (default 0). */
  decimals?: number;
}

/**
 * This period vs last (web parity) — the clean, trust-first usage card: the
 * utility glyph in a small brand-gradient disc, the current quantity big
 * (`formatUsage`), and a delta chip that spells out the change in **words + an
 * arrow** (never color alone): more usage reads `warn` (⬆), less reads `success`
 * (⬇), equal is muted. Two thin bars compare current against previous by ratio.
 * Token-only colors.
 */
export const UsageComparison = React.forwardRef<HTMLDivElement, UsageComparisonProps>(function UsageComparison(
  { kind, current, previous, unit, period = 'last period', decimals = 0, className, ...rest },
  ref
) {
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;

  const cur = Number.isFinite(current) ? current : 0;
  const prev = Number.isFinite(previous) ? previous : 0;

  const pct = prev > 0 ? ((cur - prev) / prev) * 100 : cur > 0 ? 100 : 0;
  const direction: 'more' | 'less' | 'same' = cur > prev ? 'more' : cur < prev ? 'less' : 'same';

  const deltaTone =
    direction === 'more'
      ? { chip: 'bg-warn/10 text-warn', arrow: '⬆', word: 'more' }
      : direction === 'less'
        ? { chip: 'bg-success/10 text-success', arrow: '⬇', word: 'less' }
        : { chip: 'bg-neutral-100 text-muted', arrow: '→', word: 'same as' };

  const max = Math.max(cur, prev, 1);
  const curRatio = clamp(cur / max, 0, 1);
  const prevRatio = clamp(prev / max, 0, 1);

  const deltaLabel =
    direction === 'same' ? `Same as ${period}` : `${formatPct(Math.abs(pct))} ${deltaTone.word} than ${period}`;

  const Bar = ({ label, value, ratio, strong }: { label: string; value: number; ratio: number; strong: boolean }) => (
    <div className="flex flex-col gap-[var(--xen-space-xs)]">
      <div className="flex justify-between">
        <span className="text-xs text-muted">{label}</span>
        <span className="text-xs font-semibold text-on-surface">{formatUsage(value, u, decimals)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
        <div
          className={cn('h-full rounded-full', strong ? 'bg-primary' : 'bg-primary/40')}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      aria-label={`${kd.label} usage, ${formatUsage(cur, u, decimals)}, ${deltaLabel}`}
      className={cn('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', className)}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span className="flex h-12 w-12 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
          <Icon glyph={kd.glyph} color="onPrimary" size="xl" aria-label={`${kd.label} usage`} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-xs text-muted">{kd.label} this period</span>
          <span className="text-2xl font-extrabold text-on-surface">{formatUsage(cur, u, decimals)}</span>
        </div>
      </div>

      <div
        className={cn(
          'mt-[var(--xen-space-md)] inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
          deltaTone.chip
        )}
      >
        <span aria-hidden="true" className="text-sm">
          {deltaTone.arrow}
        </span>
        <span className="text-sm font-bold">{deltaLabel}</span>
      </div>

      <div className="mt-[var(--xen-space-lg)] flex flex-col gap-[var(--xen-space-md)]">
        <Bar label="This period" value={cur} ratio={curRatio} strong />
        <Bar label={period} value={prev} ratio={prevRatio} strong={false} />
      </div>
    </div>
  );
});
