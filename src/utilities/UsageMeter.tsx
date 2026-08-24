import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Progress, type ProgressTone } from '../primitives';
import { formatUsage, formatPct, clamp, TEXT_TINT } from './internal/format';
import { utilityKind, type UtilityKind } from './internal/status';

export type { UtilityKind };

export interface UsageMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Utility line — drives the leading glyph, label, and default unit. */
  kind: UtilityKind;
  /** Consumption so far this period, in `unit`s. */
  used: number;
  /** Allowance / plan cap for the period, in `unit`s (0 → no cap shown). */
  allowance?: number;
  /** Metered unit override (defaults to the utility's canonical unit). */
  unit?: string;
  /** Decimal places for the printed quantities (default `0`). */
  decimals?: number;
  /** Localized period label (e.g. "This month"). */
  period?: string;
  /** Warn threshold as a fraction of allowance (default `0.8`). */
  warnAt?: number;
  /** Loading skeleton flag — renders a placeholder instead of data. */
  loading?: boolean;
}

/**
 * A consumption gauge for one utility: current usage against an optional
 * allowance, drawn with the token-bound `Progress` bar. The fill tone escalates
 * by threshold (under `warnAt` → primary, over → warn, at/over cap → danger) and
 * the same escalation is echoed in a text percentage, so status is never
 * color-alone. Quantities run through `formatUsage` (fixed decimals, no `NaN`
 * leak) and a zero/absent allowance is guarded to avoid divide-by-zero. Every
 * color traces to a `--xen-*` token. Web parity of the native `UsageMeter`.
 */
export const UsageMeter = React.forwardRef<HTMLDivElement, UsageMeterProps>(function UsageMeter(
  {
    kind,
    used,
    allowance = 0,
    unit,
    decimals = 0,
    period,
    warnAt = 0.8,
    loading = false,
    className,
    ...rest
  },
  ref
) {
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;

  if (loading) {
    return (
      <Card ref={ref} className={className} {...rest}>
        <div aria-busy="true" aria-label="Loading usage" className="flex flex-col gap-[var(--xen-space-sm)]">
          <div className="h-4 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          <div className="h-2.5 animate-pulse rounded-full bg-neutral-100" />
        </div>
      </Card>
    );
  }

  const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
  const cap = Number.isFinite(allowance) ? Math.max(0, allowance) : 0;
  const hasCap = cap > 0;
  const ratio = hasCap ? clamp(safeUsed / cap, 0, 1.5) : 0;
  const pct = Math.round(ratio * 100);

  const tone: ProgressTone = !hasCap ? 'primary' : ratio >= 1 ? 'danger' : ratio >= warnAt ? 'warn' : 'primary';

  return (
    <Card ref={ref} className={className} {...rest}>
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <Icon glyph={kd.glyph} size="lg" aria-label={`${kd.label} usage`} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-semibold text-on-surface">{kd.label}</span>
          {period != null ? <span className="text-xs text-muted">{period}</span> : null}
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-lg font-bold text-on-surface">{formatUsage(safeUsed, u, decimals)}</span>
          {hasCap ? <span className="text-xs text-muted">of {formatUsage(cap, u, decimals)}</span> : null}
        </div>
      </div>

      {hasCap ? (
        <div className="mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]">
          <Progress
            value={Math.min(pct, 100)}
            max={100}
            tone={tone}
            aria-label={`${kd.label} usage, ${formatPct(pct)} of allowance`}
          />
          <span className={cn('text-xs font-semibold', TEXT_TINT[tone])}>
            {ratio >= 1 ? `Over allowance · ${formatPct(pct)}` : `${formatPct(pct)} of allowance`}
          </span>
        </div>
      ) : null}
    </Card>
  );
});
